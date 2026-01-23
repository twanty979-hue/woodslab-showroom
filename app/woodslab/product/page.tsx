'use client'
import { Suspense } from 'react' // ✅ 1. เพิ่มบรรทัดนี้
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getProductDetail, getActiveDiscounts, getRecommendProducts, purchaseProduct } from '../actions'
import '../woodslab.css'

// --- CONFIG ---
const BUCKET = "product-images"
// Replace with your actual Supabase URL
const PROJECT_URL = "https://zexflchjcycxrpjkuews.supabase.co"

// --- UTILS ---
const normalizeImg = (u: any) => {
  const s = String(u || "").trim()
  if (!s) return ""
  if (/^https?:\/\//i.test(s)) return s
  const cleanPath = s.replace(/^\/+/, "")
  return `${PROJECT_URL}/storage/v1/object/public/${BUCKET}/${cleanPath}`
}

const currency = (n: any) =>
  n ? new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB", minimumFractionDigits: 0 }).format(n) : "ติดต่อสอบถาม"

const getSizeText = (specs: any) => {
  if (!specs || typeof specs !== "object") return ""
  return specs.size_text || specs.size || specs.dimension || specs.dimensions || specs.Size || ""
}

const escClass = (v: string) => String(v || "").toLowerCase().replace(/[^a-z0-9_-]/g, "")

// --- CONSTANTS ---
const STATUS_META: any = {
  available:  { label: "Available", canBuy: true, overlay: false },
  on_request: { label: "มีคนกำลังสนใจ", canBuy: true, overlay: true, en: "INTERESTED", jp: "Interested" }, 
  pending:    { label: "Booked",   canBuy: false, overlay: true, jp: "Reserved", en: "BOOKED" },
  reserved:   { label: "Booked",   canBuy: false, overlay: true, jp: "Reserved", en: "BOOKED" },
  hold:       { label: "Booked",   canBuy: false, overlay: true, jp: "Reserved", en: "BOOKED" },
  sold:       { label: "Sold Out", canBuy: false, overlay: true, jp: "SOLD OUT", en: "SOLD OUT" },
  archived:   { label: "Archive",  canBuy: false, overlay: false },
  inactive:   { label: "Archive",  canBuy: false, overlay: false },
  draft:      { label: "Draft",    canBuy: false, overlay: false },
}

function ProductContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const idParam = searchParams.get('id')

  // --- STATE ---
  const [product, setProduct] = useState<any>(null)
  const [discounts, setDiscounts] = useState<any[]>([])
  const [recommendations, setRecommendations] = useState<any[]>([])
  
  const [activeImage, setActiveImage] = useState("")
  const [dedupImages, setDedupImages] = useState<string[]>([])
  
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState("")
  
  const [qty, setQty] = useState(1)
  const [buying, setBuying] = useState(false)
  const [statusMsg, setStatusMsg] = useState<{text: string, color: string} | null>(null)

  // Refs for Zoom & Animation
  const zoomContainerRef = useRef<HTMLDivElement>(null)
  const mainImageRef = useRef<HTMLImageElement>(null)
  const detailRefs = useRef<(HTMLDivElement | null)[]>([])

  // --- LOGIC 1: Fetch Data ---
  useEffect(() => {
    const init = async () => {
      setLoading(true)
      try {
        const activeDiscounts = await getActiveDiscounts()
        setDiscounts(activeDiscounts)

        if (!idParam) { setErrorMsg("Product ID required"); return }
        const prod = await getProductDetail(idParam)
        if (!prod) { setErrorMsg("Product not found"); return }
        setProduct(prod)

        const s = prod.specs || {}
        const main = normalizeImg(prod.image_url) || normalizeImg(s.main_image?.url)
        const rawExtras = Array.isArray(s.images) ? s.images : Array.isArray(s.gallery) ? s.gallery : []
        const extras = rawExtras.map((it: any) => 
          typeof it === "string" ? normalizeImg(it) : normalizeImg(it.url || it.path)
        ).filter(Boolean)
        
        const allImgs = [main, ...extras].filter(Boolean)
        const uniqueImgs = [...new Set(allImgs)] as string[]
        
        setDedupImages(uniqueImgs)
        if (uniqueImgs.length > 0) setActiveImage(uniqueImgs[0])

        const recs = await getRecommendProducts(prod.id, prod.specs)
        setRecommendations(recs)

      } catch (e) {
        console.error(e)
        setErrorMsg("Connection Error")
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [idParam])

  // --- LOGIC 2: Intersection Observer ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15 })

    detailRefs.current.forEach(el => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [dedupImages])

  // --- LOGIC 3: Status & Discount Helpers ---
  const getEffectiveStatus = useCallback((row: any) => {
    const st = String(row?.status || "").toLowerCase().trim()
    if (st === "active") return "available"
    if (st === "on_request") return "on_request"
    if (row?.specs?.pending === true || row?.specs?.pending === "true") return "pending"
    if (st === "inactive") return "archived"
    return st || "available"
  }, [])

  const getStatusMeta = useCallback((row: any) => {
    const key = getEffectiveStatus(row)
    return { key, ...(STATUS_META[key] || { label: key, canBuy: false, overlay: false }) }
  }, [getEffectiveStatus])

  const getDiscountInfo = useCallback((prod: any) => {
    if (!prod?.price || discounts.length === 0) return null
    const price = parseFloat(prod.price)
    
    const matching = discounts.filter(d => {
       const rules = d.discount_rules || []
       if (rules.length === 0) return true
       return rules.some((r: any) => {
          if (r.product_id && String(r.product_id) !== String(prod.id)) return false
          if (price < parseFloat(r.min_subtotal || 0)) return false
          return true
       })
    })

    if (matching.length === 0) return null

    let best = null, maxSave = 0
    matching.forEach(d => {
      let save = 0
      const val = parseFloat(d.value)
      if (d.discount_type === 'PERCENT') save = price * (val / 100)
      else save = val
      
      if (save > price) save = price
      if (save > maxSave) {
        maxSave = save
        best = { ...d, saving: save, newPrice: Math.max(0, price - save) }
      }
    })
    return best
  }, [discounts])

  // --- LOGIC 4: Spec Table ---
  const getSpecRows = () => {
    if (!product) return []
    const s = product.specs || {}
    const rows: any[] = []
    const HIDE = ["images", "gallery", "main_image", "description", "pending"]
    const LABELS: any = { size:"Size", size_text:"Size", dimensions:"Dimensions", material:"Material", wood_type:"Material", finish:"Finish", grade:"Grade", origin:"Origin", panel_design:"Panel Design", panel_craft:"Panel Craft", edge_design:"Edge Design", color_craft:"Color Craft", texture_craft:"Texture Craft", brightness:"Brightness", weight:"Weight", spec_type:"Type", type:"Type" }

    Object.entries(s).forEach(([k, v]) => {
      if (HIDE.includes(k) || v === null || v === "") return
      const label = LABELS[k] || k.replace(/_/g, " ").replace(/\b\w/g, m => m.toUpperCase())
      const valDisplay = Array.isArray(v) ? v.join(", ") : String(v)
      rows.push({ label, value: valDisplay })
    })

    const meta = getStatusMeta(product)
    if (meta.key !== "available" && meta.key !== "on_request") {
      rows.push({ label: "Status", value: meta.label, color: "#e74c3c" })
    }
    return rows
  }

  // --- EVENTS ---
  const handleZoom = (e: React.MouseEvent) => {
    const container = zoomContainerRef.current
    const img = mainImageRef.current
    if (!container || !img) return
    const { left, top, width, height } = container.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    img.style.transformOrigin = `${x}% ${y}%`
    container.classList.add("zoomed")
  }

  const handleLeaveZoom = () => {
    const container = zoomContainerRef.current
    const img = mainImageRef.current
    container?.classList.remove("zoomed")
    setTimeout(() => { if (img && !container?.classList.contains("zoomed")) img.style.transformOrigin = "center center" }, 250)
  }

  const handleBuy = async () => {
    if (!product) return
    const meta = getStatusMeta(product)
    if (!meta.canBuy) return
    setBuying(true)
    setStatusMsg({ text: "กำลังส่งคำขอสั่งซื้อ (ตามลำดับคิว)...", color: "#3498db" })
    try {
      await purchaseProduct(product.id)
      setStatusMsg({ text: "ส่งคำขอจองสำเร็จ! เจ้าหน้าที่จะตรวจสอบคิวและติดต่อกลับโดยเร็วที่สุด", color: "#27ae60" })
      setProduct((prev: any) => ({ ...prev, status: 'on_request' }))
    } catch (err) {
      console.error(err)
      setStatusMsg({ text: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง", color: "#e74c3c" })
    } finally {
      setBuying(false)
    }
  }

  // --- RENDER HELPERS ---
  const renderStatusOverlay = (meta: any) => {
    if (!meta.overlay) return null
    if (meta.key === 'on_request') {
      return <div className="status-label-wrap"><div className={`status-label ${meta.key}`}>{meta.label}</div></div>
    }
    return (
      <div className="status-overlay">
        <div className={`status-circle ${meta.key}`}>
          {meta.jp && <div className="jp">{meta.jp}</div>}
          <div className="en">{meta.en || meta.label}</div>
        </div>
      </div>
    )
  }

  const normalizeStatus = (raw: string) => {
    const s = String(raw || "").toLowerCase().trim()
    if (s === "active") return "available"
    if (s === "inactive") return "archived"
    return s
  }

  const renderRecBadge = (status: string) => {
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

    // Case 1: Gold Pill (On Request)
    if (s === 'on_request') {
        return (
            <div className={`rec-badge on_request`}>
               {meta.text}
            </div>
        )
    }

    // Case 2: Circle Overlay (Sold / Pending)
    if (meta.style === 'circle') {
       return (
         <div className="status-overlay">
            <div className={`status-circle ${cls}`}>
                {meta.jp && <div className="jp">{meta.jp}</div>}
                <div className="en">{meta.text}</div>
            </div>
         </div>
       )
    }

    return null
  }

  // --- MAIN RENDER ---
  if (loading) return <div className="wrap"><div style={{textAlign:'center',padding:60,color:'#666'}}>Loading Product...</div></div>
  if (errorMsg || !product) return <div className="wrap"><div style={{textAlign:'center',padding:40,border:'1px solid #e5e5e5'}}>{errorMsg}</div></div>

  const meta = getStatusMeta(product)
  const discountInfo = getDiscountInfo(product)
  const specList = getSpecRows()

  return (
    <div className="wrap">
      {/* 1. Top Bar */}
      <div className="topbar">
         <div className="back-link" onClick={() => router.push('/woodslab')}>← Back to Collection</div>
      </div>

      {/* 2. Main Product Container */}
      <div className="product-container">
        
        {/* Left: Gallery */}
        <div className="gallery">
          <div 
            className="main-image-frame" 
            id="zoomContainer" 
            ref={zoomContainerRef}
            onMouseMove={handleZoom}
            onMouseLeave={handleLeaveZoom}
          >
            {activeImage ? (
               <img src={activeImage} alt={product.name} id="mainImage" ref={mainImageRef} />
            ) : (
               <div style={{display:'grid',placeItems:'center',height:'100%',color:'#666'}}>No Image</div>
            )}
            
            {renderStatusOverlay(meta)}
            <div className="zoom-hint">HOVER TO ZOOM</div>
          </div>

          <div className="thumbnails">
            {dedupImages.map((u, i) => (
              <div 
                key={i} 
                className={`thumb ${activeImage === u ? "active" : ""}`}
                onClick={() => setActiveImage(u)}
              >
                <img src={u} alt="thumb" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="details">
          <div className="p-sku">SKU: {product.sku || "N/A"}</div>
          <h1 className="p-title">{product.name || "ติดต่อสอบถาม"}</h1>

          <table className="spec-table">
            <tbody>
              {specList.map((r: any, idx: number) => (
                <tr key={idx}>
                  <td className="spec-label">{r.label}</td>
                  <td className="spec-value" style={{color: r.color || 'inherit'}}>{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="price-block">
            <div className="price">
              {discountInfo ? (
                <>
                   <span className="price-old">{currency(product.price)}</span>
                   <span className="price-new">{currency(discountInfo.newPrice)}</span>
                   <span className="badge-discount" style={{fontSize:'0.6em', verticalAlign:'middle'}}>
                     -{discountInfo.discount_type === 'PERCENT' ? parseFloat(discountInfo.value)+'%' : discountInfo.value}
                   </span>
                </>
              ) : currency(product.price)}
            </div>
            <div className="vat-note">Tax included. Shipping calculated at checkout.</div>
          </div>

          <div className="qty-row">
            <div className="qty-control">
              <button 
                className="qty-btn" 
                onClick={() => setQty(Math.max(1, qty - 1))}
                disabled={!meta.canBuy}
              > − </button>
              <input className="qty-input" value={qty} readOnly />
              <button 
                className="qty-btn" 
                onClick={() => setQty(Math.min(99, qty + 1))}
                disabled={!meta.canBuy}
              > + </button>
            </div>
            <span style={{fontSize:'0.9rem', color:'var(--text-muted)'}}>Unit(s)</span>
          </div>

          <div className="actions">
            <button 
              className="btn btn-primary" 
              onClick={handleBuy} 
              disabled={!meta.canBuy || buying}
            >
              {buying ? "Processing..." : "Add to Cart"}
            </button>
            <button 
              className="btn" 
              onClick={handleBuy}
              disabled={!meta.canBuy || buying}
            >
              Buy Now
            </button>
          </div>

          <div className="status-msg">
            {statusMsg ? (
               <span style={{color: statusMsg.color}}>{statusMsg.text}</span>
            ) : (
               <>
                 {meta.key === 'on_request' && <span style={{color:'#f39c12'}}>● {meta.label}. You can still request to join the queue.</span>}
                 {(meta.key === 'pending' || meta.key === 'sold') && <span>This item is {meta.label}. Purchase is disabled.</span>}
               </>
            )}
          </div>

          {product.specs?.description && (
            <div style={{marginTop:24, fontSize:'0.9rem', lineHeight:1.6, color:'var(--text-muted)'}}>
              {product.specs.description}
            </div>
          )}
        </div>
      </div>

      {/* 3. Detail Images Section */}
      {dedupImages.length > 0 && (
         <section className="detail-section">
            <div className="detail-title">Product Detail</div>
            <div className="detail-images">
               {dedupImages.map((u, i) => (
                  <div 
                    key={i} 
                    className="detail-shot" 
                    ref={(el) => { detailRefs.current[i] = el }}
                  >
                    <img loading="lazy" src={u} alt="detail" />
                  </div>
               ))}
            </div>
         </section>
      )}

      {/* 4. Recommendations Section */}
      <section className="rec-section">
        <div className="rec-title">RECOMMENDED PRODUCTS</div>
        <div className="rec-grid">
           {recommendations.length === 0 ? (
             <div className="rec-empty" style={{gridColumn:'1/-1', textAlign:'center', color:'#666'}}>No recommended products.</div>
           ) : (
             recommendations.map((rec) => {
               const recImg = normalizeImg(rec.image_url) || normalizeImg(rec.specs?.main_image?.url)
               const recDiscount = getDiscountInfo(rec)
               const effectiveStatus = getEffectiveStatus(rec)

               return (
                 <a key={rec.id} className="rec-card" href={`/woodslab/product?id=${rec.id}`}>
                   <div className="rec-img">
                     {recImg ? <img src={recImg} alt={rec.name} /> : <div className="rec-noimg">No Image</div>}
                     
                     {/* ✅ Correctly using renderRecBadge for Gold Pill or Circle */}
                     {renderRecBadge(effectiveStatus)}
                   </div>
                   <div className="rec-body">
                     <div className="rec-name">{rec.name || "ติดต่อสอบถาม"}</div>
                     <div className="rec-size">{getSizeText(rec.specs)}</div>
                     <div className="rec-price">
                        {recDiscount ? (
                          <>
                            <span className="price-old" style={{fontSize:'0.8em'}}>{currency(rec.price)}</span>
                            <span className="price-new" style={{fontSize:'1em'}}>{currency(recDiscount.newPrice)}</span>
                            <span className="badge-discount">-{recDiscount.discount_type === 'PERCENT' ? parseFloat(recDiscount.value)+'%' : recDiscount.value}</span>
                          </>
                        ) : currency(rec.price)}
                     </div>
                   </div>
                 </a>
               )
             })
           )}
        </div>
      </section>
    </div>
  )
}
export default function ProductPageWrapper() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading Product...</div>}>
      <ProductContent />
    </Suspense>
  )
}