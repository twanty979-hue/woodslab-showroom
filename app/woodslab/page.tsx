'use client'
export const dynamic = 'force-dynamic'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation' // ✅ Import เพิ่ม
import { getProducts, getActiveDiscounts, getMinMax, getRangeValues, getDistinctOptions, type FilterState } from './actions'
import './woodslab.css'

// --- Constants & Config ---
const LIMIT = 12
const SPEC_KEYS = {
  type: "spec_type",
  material: "material",
  panel: "panel_craft",
}
const STATUS_TABS = [
  { key: "all", label: "All", values: null },
  { key: "available", label: "Available", values: ["available", "active"] },
  { key: "pending", label: "Pending", values: ["pending", "reserved", "hold", "on_request"] },
  { key: "sold", label: "Sold/Archive", values: ["sold", "archived", "inactive"] },
  { key: "draft", label: "Draft", values: ["draft"] },
]
const RANGE_COLS: Record<string, string> = {
  length: "length_cm",
  width: "width_cm",
  thickness: "thickness_cm",
}
const HEADERS = [
  { key: "type", label: "Type" },
  { key: "material", label: "Material" },
  { key: "panel", label: "Panel Craft" },
  { key: "length", label: "Length (cm)" },
  { key: "width", label: "Width (cm)" },
  { key: "thickness", label: "Thickness (cm)" },
  { key: "price", label: "Price" },
  { key: "discount", label: "Deals" },
  { key: "status", label: "State" },
]

export default function WoodSlabPage() {
  // --- Hooks ---
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // ✅ อ่าน Category จาก URL (Default = slabs)
  const currentCategory = (searchParams.get('cat') as 'slabs' | 'rough') || 'slabs'

  // --- State ---
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false) 
  
  const [products, setProducts] = useState<any[]>([])
  const [activeDiscounts, setActiveDiscounts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [pageInfo, setPageInfo] = useState("—")
  const [statusText, setStatusText] = useState("")
  
  const [openKey, setOpenKey] = useState("")
  const [options, setOptions] = useState({ type: [] as string[], material: [] as string[], panel: [] as string[] })
  
  const [rangeStats, setRangeStats] = useState<any>({ length: null, width: null, thickness: null })
  const [rangePresets, setRangePresets] = useState<any>({ length: null, width: null, thickness: null })

  const [filters, setFilters] = useState<FilterState>({
    type: "",
    material: "",
    panel: "",
    status: "all",
    lengthMin: "",
    lengthMax: "",
    widthMin: "",
    widthMax: "",
    thickMin: "",
    thickMax: "",
    priceMin: "",
    priceMax: "",
    q: "",
    discount: "all",
  })

  const searchTimeout = useRef<NodeJS.Timeout | null>(null)

  // --- Helpers ---
  const escClass = (v: string) => String(v || "").toLowerCase().replace(/[^a-z0-9_-]/g, "")
  
  const currency = (n: any) =>
    n ? new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB", minimumFractionDigits: 0 }).format(n) : "ติดต่อสอบถาม"

  const normalizeImg = (u: string) => {
    const s = String(u || "").trim()
    if (!s) return ""
    if (/^https?:\/\//i.test(s)) return s
    const PROJECT_URL = "https://zexflchjcycxrpjkuews.supabase.co" 
    const BUCKET = "product-images"
    return `${PROJECT_URL}/storage/v1/object/public/${BUCKET}/${s.replace(/^\/+/, "")}`
  }

  const getSizeText = (specs: any) => {
    if (!specs || typeof specs !== "object") return ""
    // ถ้าเป็น Rough Wood อาจจะมี size_raw
    if (specs.size_raw) return specs.size_raw
    return specs.size_text || specs.size || specs.dimension || specs.dimensions || specs.Size || ""
  }

  const normalizeStatus = (raw: string) => {
    const s = String(raw || "").toLowerCase().trim()
    if (s === "active") return "available"
    if (s === "inactive") return "archived"
    return s
  }

  const getEffectiveStatus = (row: any) => {
    const st = normalizeStatus(row?.status)
    if (st === "draft") return "draft"
    if (st === "on_request") return "on_request"
    const p = row?.specs?.pending
    if (p === true || p === "true") return "pending"
    if (st) return st
    return "available"
  }

  const getProductDiscount = useCallback((product: any) => {
    if (!product.price || activeDiscounts.length === 0) return null
    const productPrice = parseFloat(product.price)
    
    const matchingDiscounts = activeDiscounts.filter(d => {
      const now = new Date()
      if (d.start_date && new Date(d.start_date) > now) return false
      if (d.end_date && new Date(d.end_date) < now) return false

      const rules = d.discount_rules || []
      if (rules.length === 0) return true

      return rules.some((r: any) => {
        const rulePid = r.product_id
        const isSpecificProduct = rulePid !== null && rulePid !== undefined && rulePid !== "" && String(rulePid) !== "null"
        if (isSpecificProduct && String(rulePid) !== String(product.id)) return false
        
        const minSubtotal = parseFloat(r.min_subtotal || 0)
        if (productPrice < minSubtotal) return false
        return true
      })
    })

    if (matchingDiscounts.length === 0) return null

    let bestDiscount = null
    let maxSaving = 0

    matchingDiscounts.forEach(d => {
      let saving = 0
      const discountValue = parseFloat(d.value)
      if (d.discount_type === 'PERCENT') {
        saving = productPrice * (discountValue / 100)
      } else {
        saving = discountValue
      }
      if (saving > productPrice) saving = productPrice

      if (saving > maxSaving) {
        maxSaving = saving
        bestDiscount = { ...d, saving, newPrice: Math.max(0, productPrice - saving) }
      }
    })
    return bestDiscount
  }, [activeDiscounts])

  const niceStep = (raw: number, key: string) => {
    if (!Number.isFinite(raw) || raw <= 0) return key === "thickness" ? 0.5 : 10
    const base = Math.pow(10, Math.floor(Math.log10(raw)))
    const n = raw / base
    let step
    if (n <= 1) step = 1
    else if (n <= 2) step = 2
    else if (n <= 5) step = 5
    else step = 10
    step *= base
    if (key === "thickness") {
      step = Math.min(step, 2)
      step = Math.max(step, 0.2)
      step = Math.round(step * 10) / 10
    } else {
      step = Math.max(5, Math.round(step / 5) * 5)
    }
    return step
  }

  const buildPresetsFromValues = (key: string, values: number[]) => {
    if (!values?.length) return []
    const v = values.slice().sort((a, b) => a - b)
    const n = v.length
    const min = v[0]
    const max = v[n - 1]
    const fmtNum = (num: number) => String(Math.round(num * 100) / 100).replace(/\.0+$/, "")

    if (min === max) return [{ label: `${fmtNum(min)}`, min, max }]
    
    const targetBins = 7
    let h = (max - min) / targetBins
    h = niceStep(h, key)
    
    const start = Math.floor(min / h) * h
    const end = Math.ceil(max / h) * h
    const bins = []
    let i = 0
    for (let a = start; a < end; a += h) {
      const b = a + h
      while (i < n && v[i] < a) i++
      let j = i
      while (j < n && v[j] <= b) j++
      if (j > i) {
        bins.push({ label: `${fmtNum(a)}–${fmtNum(b)}`, min: a, max: b })
      }
      i = j
    }
    return bins.slice(0, 12)
  }

  // --- Event Handlers ---
  
  // ✅ เปลี่ยนหมวดหมู่ (เปลี่ยน URL)
  const handleCategoryChange = (cat: 'slabs' | 'rough') => {
    router.push(`/woodslab?cat=${cat}`)
    setPage(0)
    // Reset Filters when switching categories might be good UX
    setFilters(prev => ({ ...prev, type: "", material: "", panel: "" }))
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (searchTimeout.current) clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(() => {
      setFilters(prev => ({ ...prev, q: val }))
      setPage(0)
    }, 300)
  }

  const handleFilterChange = (key: keyof FilterState, val: string) => {
    setFilters(prev => ({ ...prev, [key]: val }))
    setPage(0)
  }

  const handleRangeApply = (minKey: string, maxKey: string, minVal: string, maxVal: string) => {
    setFilters(prev => ({ ...prev, [minKey]: minVal, [maxKey]: maxVal }))
    setPage(0)
  }

  // --- Effects ---

  useEffect(() => {
    setMounted(true)
  }, [])

  // ✅ Reload Options when Category Changes
  useEffect(() => {
    const init = async () => {
      const discs = await getActiveDiscounts()
      setActiveDiscounts(discs)
      // ส่ง category ไปเพื่อให้ได้ options ที่ถูกต้อง
      const opts = await getDistinctOptions(currentCategory)
      setOptions(opts)
      
      // Reset Range Stats on category change
      setRangeStats({ length: null, width: null, thickness: null })
      setRangePresets({ length: null, width: null, thickness: null })
    }
    init()
  }, [currentCategory]) // Re-run when category changes

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // ✅ ส่ง currentCategory ไปให้ getProducts
        let rows = await getProducts(page, LIMIT, filters, currentCategory)
        
        if (filters.discount === 'yes') {
          rows = rows.filter((r: any) => getProductDiscount(r) !== null)
        }

        setProducts(rows)

        const from = rows?.length ? (page * LIMIT) + 1 : 0
        const to = (page * LIMIT) + (rows?.length || 0)
        const countLabel = filters.discount === 'yes' ? `${rows.length} (On Sale)` : rows.length
        
        setPageInfo(`${from} — ${to}`)
        setStatusText(`Displaying ${countLabel} items`)

      } catch (err) {
        console.error(err)
        setStatusText("Error fetching data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [page, filters, activeDiscounts, getProductDiscount, currentCategory]) // ✅ Dependency เพิ่ม currentCategory

  useEffect(() => {
    const key = openKey as keyof typeof RANGE_COLS
    if (!key || !RANGE_COLS[key]) return

    if (!rangeStats[key]) {
       setRangeStats((prev: any) => ({ ...prev, [key]: { loading: true } }))
       // ✅ ส่ง currentCategory ไปหา MinMax
       getMinMax(RANGE_COLS[key], currentCategory).then(res => {
         setRangeStats((prev: any) => ({ ...prev, [key]: res }))
       })
    }

    if (!rangePresets[key]) {
      setRangePresets((prev: any) => ({ ...prev, [key]: { loading: true } }))
      // ✅ ส่ง currentCategory ไปหา Range
      getRangeValues(RANGE_COLS[key], currentCategory).then(vals => {
        const presets = buildPresetsFromValues(key, vals)
        setRangePresets((prev: any) => ({ ...prev, [key]: presets.length ? presets : false }))
      })
    }
  }, [openKey, currentCategory])


  // --- Render ---
  
  const themeIcon = mounted && isDark ? "☾" : "☀" 

  const renderBadge = (status: string) => {
    const s = normalizeStatus(status)
    if (!s || s === "available") return null
    
    const STATUS_BADGE: Record<string, any> = {
       on_request: { text: "มีคนกำลังสนใจ", style: "pill" }, 
       pending:    { text: "BOOKED", jp: "Reserved", style: "circle" },
       sold:       { text: "BOOKED", jp: "SOLD OUT", style: "circle" },
       reserved:   { text: "RESERVED", style: "pill" },
       archived:   { text: "ARCHIVE", style: "pill" },
       draft:      { text: "DRAFT", style: "pill" },
    }
    const meta = STATUS_BADGE[s] || { text: s.toUpperCase(), style: "pill" }
    const cls = escClass(s)

    if (meta.style === "circle") {
      return (
        <div className="status-overlay">
          <div className={`status-circle ${cls}`}>
            {meta.jp && <div className="jp">{meta.jp}</div>}
            <div className="en">{meta.text}</div>
          </div>
        </div>
      )
    }
    return <div className={`badge-status badge-${cls}`}>{meta.text}</div>
  }

  return (
    <div 
      data-theme={isDark ? "dark" : "light"} 
      className="min-h-screen transition-colors duration-300"
      suppressHydrationWarning={true}
    >
      <style jsx global>{`
        .badge-on_request { background: linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c) !important; color: #1a1a1a !important; font-weight: 700 !important; text-shadow: 0 0.5px 1px rgba(255,255,255,0.5); border: 1px solid #96701c !important; padding: 3px 10px !important; border-radius: 4px !important; display: inline-block; font-size: 11px !important; }
        .badge-discount { background: linear-gradient(135deg, #ff416c, #ff4b2b); color: white; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; margin-left: 6px; box-shadow: 0 2px 5px rgba(255, 65, 108, 0.4); display: inline-block; vertical-align: middle; }
        .price-old { text-decoration: line-through; color: #9ca3af; font-size: 0.9em; margin-right: 6px; font-weight: 400; }
        .price-new { color: #e11d48; font-weight: 700; font-size: 1.1em; }
        [data-theme="dark"] .price-new { color: #fb7185; }
        
        /* CSS for Category Tabs */
        .cat-switcher { display: flex; justify-content: center; margin-bottom: 20px; gap: 10px; }
        .cat-btn { background: transparent; border: 2px solid #ddd; padding: 8px 20px; border-radius: 30px; font-weight: 600; color: #666; cursor: pointer; transition: all 0.2s; }
        .cat-btn:hover { border-color: #999; color: #333; }
        .cat-btn.active { background: #1a1a1a; color: white; border-color: #1a1a1a; }
        [data-theme="dark"] .cat-btn { border-color: #444; color: #aaa; }
        [data-theme="dark"] .cat-btn.active { background: #fff; color: #000; border-color: #fff; }
      `}</style>

      <div className="wrap">
        <button 
          className="theme-toggle" 
          onClick={() => setIsDark(!isDark)} 
          title="Switch Theme"
          suppressHydrationWarning={true}
        >
           {themeIcon}
        </button>

        <header>
          <h1>The Best <span>Wood</span></h1>
          <div className="subtitle">
             {currentCategory === 'slabs' ? 'Premium Live Edge Slabs' : 'High Quality Rough Wood'}
          </div>
        </header>

        {/* ✅ CATEGORY SWITCHER */}
        <div className="cat-switcher">
           <button 
             className={`cat-btn ${currentCategory === 'slabs' ? 'active' : ''}`}
             onClick={() => handleCategoryChange('slabs')}
           >
             Wood Slabs
           </button>
           <button 
             className={`cat-btn ${currentCategory === 'rough' ? 'active' : ''}`}
             onClick={() => handleCategoryChange('rough')}
           >
             Rough Wood
           </button>
        </div>

        <div className="controls">
          <div className="top-row">
            <div className="tabs">
              {STATUS_TABS.map(t => (
                <button 
                  key={t.key} 
                  className={`tab-btn ${filters.status === t.key ? "active" : ""}`}
                  onClick={() => handleFilterChange("status", t.key)}
                  suppressHydrationWarning={true}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="search-wrap">
              <div className="search-box">
                <input 
                  placeholder="Search..." 
                  onChange={handleSearch} 
                  suppressHydrationWarning={true}
                />
                <span className="search-icon">⚲</span>
              </div>
            </div>
          </div>

          <div className="mega-filter">
              <div className="mf-head">
                {HEADERS.map(h => {
                  let chip = ""
                  if (h.key === "type") chip = filters.type
                  if (h.key === "material") chip = filters.material
                  if (h.key === "panel") chip = filters.panel
                  if (h.key === "status") chip = STATUS_TABS.find(t=>t.key === filters.status)?.label || ""
                  if (h.key === "discount") chip = filters.discount === "yes" ? "On Sale" : ""
                  
                  if (["length","width","thickness"].includes(h.key)) {
                    // @ts-ignore
                    const min = filters[`${h.key === "thickness" ? "thick" : h.key}Min`]
                    // @ts-ignore
                    const max = filters[`${h.key === "thickness" ? "thick" : h.key}Max`]
                    if(min || max) chip = `${min}-${max}`
                  }

                  return (
                    <button 
                      key={h.key} 
                      className={`mf-h ${openKey === h.key ? "active" : ""}`}
                      onClick={() => setOpenKey(openKey === h.key ? "" : h.key)}
                    >
                      {h.label} {chip && <span className="mf-chip">{chip}</span>}
                    </button>
                  )
                })}
              </div>

              {openKey && (
                <div className="mf-body open">
                  <div className="mf-row">
                    <div className="mf-title">{HEADERS.find(x=>x.key === openKey)?.label}</div>
                    <div className="mf-options">
                      {/* --- Options Rendering Logic --- */}
                      {["type", "material", "panel"].includes(openKey) && (
                        <>
                          <button className={`mf-opt ${filters[openKey as keyof FilterState] === "" ? "active" : ""}`} onClick={() => handleFilterChange(openKey as keyof FilterState, "")}>All</button>
                          {/* @ts-ignore */}
                          {options[openKey]?.map((opt: string) => (
                            <button 
                              key={opt} 
                              className={`mf-opt ${filters[openKey as keyof FilterState] === opt ? "active" : ""}`}
                              onClick={() => handleFilterChange(openKey as keyof FilterState, opt)}
                            >
                              {opt}
                            </button>
                          ))}
                        </>
                      )}

                      {openKey === "discount" && (
                         <>
                           <button className={`mf-opt ${filters.discount === "all" ? "active" : ""}`} onClick={() => handleFilterChange("discount", "all")}>All</button>
                           <button className={`mf-opt ${filters.discount === "yes" ? "active" : ""}`} onClick={() => handleFilterChange("discount", "yes")}>On Sale</button>
                         </>
                      )}
                      
                      {openKey === "status" && STATUS_TABS.map(t => (
                         <button key={t.key} className={`mf-opt ${filters.status === t.key ? "active" : ""}`} onClick={() => handleFilterChange("status", t.key)}>{t.label}</button>
                      ))}

                      {/* Range Rendering */}
                      {["length", "width", "thickness"].includes(openKey) && (() => {
                         const mapKey = openKey === "thickness" ? "thick" : openKey
                         // @ts-ignore
                         const minKey = `${mapKey}Min`; const maxKey = `${mapKey}Max`
                         // @ts-ignore
                         const stats = rangeStats[openKey]; const presets = rangePresets[openKey]
                         
                         return (
                           <div style={{display:'flex', flexDirection:'column', gap:12}}>
                              <div style={{display:'flex', flexWrap:'wrap', gap:10}}>
                                 {Array.isArray(presets) && presets.map((p: any, idx: number) => (
                                    <button key={idx} className="mf-opt" onClick={() => handleRangeApply(minKey, maxKey, p.min, p.max)}>
                                      {p.label}
                                    </button>
                                 ))}
                              </div>
                              <div className="mf-range">
                                {/* @ts-ignore */}
                                <input type="number" placeholder="min" value={filters[minKey]} onChange={e => handleFilterChange(minKey, e.target.value)} />
                                <span>–</span>
                                {/* @ts-ignore */}
                                <input type="number" placeholder="max" value={filters[maxKey]} onChange={e => handleFilterChange(maxKey, e.target.value)} />
                              </div>
                              <div style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>
                                 {stats?.min !== undefined && `Data: ${stats.min} – ${stats.max}`}
                              </div>
                           </div>
                         )
                      })()}

                      {/* Price Rendering */}
                      {openKey === "price" && (
                         <div className="mf-range">
                            <input type="number" placeholder="$" value={filters.priceMin} onChange={e => handleFilterChange("priceMin", e.target.value)} />
                            <span>–</span>
                            <input type="number" placeholder="$" value={filters.priceMax} onChange={e => handleFilterChange("priceMax", e.target.value)} />
                         </div>
                      )}

                    </div>
                  </div>
                  <div className="mf-tools">
                    <button className="mf-clear" onClick={() => setOpenKey("")}>Close</button>
                  </div>
                </div>
              )}
          </div>
        </div>

        <div className="grid">
           {loading ? (
             Array.from({length: LIMIT}).map((_, i) => (
               <div key={i} className="card">
                 <div className="img-wrap skeleton-box"></div>
                 <div className="card-info"><div className="skeleton-box" style={{height:14, width:'70%'}}></div></div>
               </div>
             ))
           ) : products.length === 0 ? (
             <div style={{gridColumn:'1/-1', textAlign:'center', padding:'80px 0'}}>No items found.</div>
           ) : (
             products.map(r => {
               const discountInfo = getProductDiscount(r)
               const imgPath = r.image_url || r.specs?.main_image?.path || r.specs?.main_image?.url
               const img = normalizeImg(imgPath)
               const st = getEffectiveStatus(r)
               const displayName = (r.name && r.name !== "-") ? r.name : "ติดต่อสอบถาม"

               return (
                 <a key={r.id} className="card" href={`/woodslab/product?id=${r.id}`}>
                    <div className="img-wrap">
                       {img ? <img loading="lazy" src={img} alt={displayName} /> : <div style={{display:'grid', placeItems:'center', height:'100%'}}>No Image</div>}
                       {renderBadge(st)}
                    </div>
                    <div className="card-info">
                       <div className="card-name">{displayName}</div>
                       <div className="card-meta">{getSizeText(r.specs)}</div>
                       {discountInfo ? (
                         <div className="card-price" style={{display:'flex', alignItems:'center', gap:6, flexWrap:'wrap'}}>
                           <span className="price-old">{currency(r.price)}</span>
                           <span className="price-new">{currency(discountInfo.newPrice)}</span>
                           <span className="badge-discount">
                             {discountInfo.discount_type === 'PERCENT' ? `-${parseFloat(discountInfo.value)}%` : `-${discountInfo.value}`}
                           </span>
                         </div>
                       ) : (
                         <div className="card-price">{r.price ? currency(r.price) : "ติดต่อสอบถาม"}</div>
                       )}
                    </div>
                 </a>
               )
             })
           )}
        </div>

        <div className="footer-bar">
          <button className="btn-page" disabled={page <= 0} onClick={() => setPage(page - 1)}>Previous</button>
          <div style={{fontSize:'0.9rem', letterSpacing:'0.1em'}}>{pageInfo}</div>
          <button className="btn-page" disabled={products.length < LIMIT} onClick={() => setPage(page + 1)}>Next</button>
        </div>
        <div style={{textAlign:'center', marginTop:10, fontSize:'0.8rem', color:'var(--text-muted)'}}>{statusText}</div>
        <div className="hint">
           Category: <b>{currentCategory === 'slabs' ? 'WOODSLABS' : 'ROUGH WOOD'}</b>
        </div>
      </div>
    </div>
  )
}