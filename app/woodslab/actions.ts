'use server'

import { supabaseServer } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'

const TABLE = "products"
const LIST_SELECT = "id,name,sku,barcode,price,image_url,status,specs,updated_at,created_at"

// ✅ Helper: เลือก Prefix ตามหมวดหมู่
const getPrefix = (category: string) => {
  return category === 'rough' ? 'ROUGH-' : 'WOODSLABS'
}

export type FilterState = {
  type: string
  material: string
  panel: string
  status: string
  lengthMin: string
  lengthMax: string
  widthMin: string
  widthMax: string
  thickMin: string
  thickMax: string
  priceMin: string
  priceMax: string
  q: string
  discount: string
}

// ==========================================
// 1. ส่วนดึงข้อมูลสำหรับหน้า Main Listing
// ==========================================

// 1.1 ดึงส่วนลด (Active Discounts)
export async function getActiveDiscounts() {
  const { data, error } = await supabaseServer
    .from('discounts')
    .select('*, discount_rules(*)')
    .eq('active', true)

  if (error) {
    console.error("Discount Fetch Error:", error)
    return []
  }
  return data || []
}

// 1.2 ดึงรายการสินค้า (Main Fetch List) - ✅ เพิ่ม param category
export async function getProducts(page: number, limit: number, filters: FilterState, category: 'slabs' | 'rough' = 'slabs') {
  const offset = page * limit
  const skuPrefix = getPrefix(category) // ✅ เลือก Prefix

  let query = supabaseServer
    .from(TABLE)
    .select(LIST_SELECT)
    .ilike('sku', `${skuPrefix}%`) // ✅ กรองตาม Prefix
    .range(offset, offset + limit - 1)
    .order('status', { ascending: true })
    .order('updated_at', { ascending: false })

  // --- Apply Filters ---
  if (filters.type) query = query.eq('specs->>spec_type', filters.type)
  if (filters.material) query = query.eq('specs->>material', filters.material)
  if (filters.panel) query = query.eq('specs->>panel_craft', filters.panel)

  // Status Filter
  const statusMap: Record<string, string[]> = {
    available: ["available", "active"],
    pending: ["pending", "reserved", "hold", "on_request"],
    sold: ["sold", "archived", "inactive"],
    draft: ["draft"],
  }
  
  if (filters.status !== 'all' && statusMap[filters.status]) {
    query = query.in('status', statusMap[filters.status])
  }

  // Range Filters
  if (filters.lengthMin) query = query.gte('specs->>length_cm', Number(filters.lengthMin))
  if (filters.lengthMax) query = query.lte('specs->>length_cm', Number(filters.lengthMax))
  
  if (filters.widthMin) query = query.gte('specs->>width_cm', Number(filters.widthMin))
  if (filters.widthMax) query = query.lte('specs->>width_cm', Number(filters.widthMax))

  if (filters.thickMin) query = query.gte('specs->>thickness_cm', Number(filters.thickMin))
  if (filters.thickMax) query = query.lte('specs->>thickness_cm', Number(filters.thickMax))

  // Price Filter
  if (filters.priceMin) query = query.gte('price', Number(filters.priceMin))
  if (filters.priceMax) query = query.lte('price', Number(filters.priceMax))

  // Search Logic
  if (filters.q) {
    const qq = filters.q.replaceAll(",", " ")
    query = query.or(`name.ilike.%${qq}%,barcode.ilike.%${qq}%,sku.ilike.%${qq}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error("Fetch Products Error:", error)
    return []
  }
  
  return data || []
}

// 1.3 ดึง Min/Max - ✅ เพิ่ม param category
export async function getMinMax(col: string, category: 'slabs' | 'rough' = 'slabs') {
  const skuPrefix = getPrefix(category)

  // Fetch Min
  const { data: minData } = await supabaseServer
    .from(TABLE)
    .select(col)
    .ilike('sku', `${skuPrefix}%`)
    .not(col, 'is', null)
    .order(col, { ascending: true })
    .limit(1)
    .single()

  // Fetch Max
  const { data: maxData } = await supabaseServer
    .from(TABLE)
    .select(col)
    .ilike('sku', `${skuPrefix}%`)
    .not(col, 'is', null)
    .order(col, { ascending: false })
    .limit(1)
    .single()

  return { 
    min: minData ? minData[col] : null, 
    max: maxData ? maxData[col] : null 
  }
}

// 1.4 ดึงค่าสำหรับ Histogram - ✅ เพิ่ม param category
export async function getRangeValues(col: string, category: 'slabs' | 'rough' = 'slabs') {
  const skuPrefix = getPrefix(category)

  const { data } = await supabaseServer
    .from(TABLE)
    .select(col)
    .ilike('sku', `${skuPrefix}%`)
    .not(col, 'is', null)
    .limit(2000)

  if (!data) return []
  return data.map((r: any) => Number(r[col])).filter(n => Number.isFinite(n))
}

// 1.5 ดึง Distinct Options - ✅ เพิ่ม param category
export async function getDistinctOptions(category: 'slabs' | 'rough' = 'slabs') {
  const skuPrefix = getPrefix(category)

  const { data } = await supabaseServer
    .from(TABLE)
    .select('specs')
    .ilike('sku', `${skuPrefix}%`)
    .limit(3000)

  const sets = {
    type: new Set<string>(),
    material: new Set<string>(),
    panel: new Set<string>()
  }

  data?.forEach((r: any) => {
    const s = r.specs || {}
    if (s.spec_type) sets.type.add(s.spec_type)
    if (s.material) sets.material.add(s.material)
    if (s.panel_craft) sets.panel.add(s.panel_craft)
  })

  return {
    type: Array.from(sets.type).sort((a, b) => a.localeCompare(b)),
    material: Array.from(sets.material).sort((a, b) => a.localeCompare(b)),
    panel: Array.from(sets.panel).sort((a, b) => a.localeCompare(b))
  }
}

// ==========================================
// 2. ส่วน Product Detail
// ==========================================

// 2.1 ดึงรายละเอียดสินค้า 1 ชิ้น - ✅ เอา ilike ออกเพื่อให้หาได้ทั้ง 2 แบบจาก ID
export async function getProductDetail(id?: string) {
  if (!id) return null

  const { data, error } = await supabaseServer
    .from(TABLE)
    .select('*')
    .eq('id', id)
    // .ilike('sku', ...) <-- เอาออก เพื่อให้หน้า Detail ใช้ร่วมกันได้หมด
    .single()

  if (error || !data) return null
  return data
}

// 2.2 ดึงสินค้าแนะนำ - ✅ ฉลาดขึ้น เลือก prefix ตามสินค้าปัจจุบัน
export async function getRecommendProducts(currentId: number | string, specs: any) {
  const type = specs?.spec_type || ""
  const material = specs?.material || ""
  const panel = specs?.panel_craft || ""
  
  // เช็คว่าเป็น Rough หรือ Slabs
  const isRough = specs?.type === 'rough' || (specs?.sku && specs.sku.startsWith('ROUGH-'))
  const prefix = isRough ? 'ROUGH-' : 'WOODSLABS'

  const selectCols = "id,name,sku,price,image_url,status,specs,updated_at"

  // 1. Specific Query
  let q1 = supabaseServer
    .from(TABLE)
    .select(selectCols)
    .ilike("sku", `${prefix}%`) // หาพวกเดียวกัน
    .order("updated_at", { ascending: false })
    .neq("id", currentId)
    .limit(8)

  if (type) q1 = q1.eq("specs->>spec_type", type)
  if (material) q1 = q1.eq("specs->>material", material)
  if (panel) q1 = q1.eq("specs->>panel_craft", panel)

  const { data: data1 } = await q1
  if (data1 && data1.length > 0) return data1

  // 2. Fallback
  const { data: data2 } = await supabaseServer
    .from(TABLE)
    .select(selectCols)
    .ilike("sku", `${prefix}%`)
    .order("updated_at", { ascending: false })
    .neq("id", currentId)
    .limit(8)
    
  return data2 || []
}

// 2.3 สั่งซื้อสินค้า
export async function purchaseProduct(id: number) {
  const { error } = await supabaseServer
    .from(TABLE)
    .update({ 
      status: 'on_request', 
      updated_at: new Date().toISOString() 
    })
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }
  
  revalidatePath('/woodslab/product')
  return { success: true }
}