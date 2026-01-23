'use client'

import { useState, useEffect, useCallback } from 'react'
import { getProducts, type ProductFilters } from './actions'
import './woodslab.css'

export default function WoodSlabGallery({ initialData }: { initialData: any }) {
  const [products, setProducts] = useState(initialData.data || [])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<ProductFilters>({ status: 'all', search: '' })
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const t = setTimeout(() => setFilters(prev => ({...prev, search: debouncedSearch})), 500)
    return () => clearTimeout(t)
  }, [debouncedSearch])

  const fetchData = useCallback(async () => {
    setLoading(true)
    const res = await getProducts(filters)
    setProducts(res.data || [])
    setLoading(false)
  }, [filters])

  useEffect(() => { fetchData() }, [fetchData])

  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value === 'all' || value === '' ? undefined : value }))
  }

  // Helper: แสดงสถานะ Sold Out / Pending / On Request
  const renderStatus = (status: string) => {
    const s = (status || "").toLowerCase().trim();
    
    if (s === 'sold' || s === 'archived') {
      return (
        <div className="status-overlay">
          <div className="status-circle sold">
            <div className="status-th">ขายแล้ว</div>
            <div className="status-en">SOLD OUT</div>
          </div>
        </div>
      )
    }
    if (s === 'pending' || s === 'reserved') {
      return (
        <div className="status-overlay">
          <div className="status-circle pending">
            <div className="status-th">ติดจอง</div>
            <div className="status-en">RESERVED</div>
          </div>
        </div>
      )
    }
    if (s === 'on_request') {
      return <div className="badge-on_request">มีคนกำลังสนใจ</div>
    }
    return null;
  }

  return (
    <div className="wrap">
      <header>
        <h1>Wood <span>Slabs</span></h1>
      </header>

      <div className="controls">
        <div className="top-row">
           <div className="tabs">
             {['all', 'available', 'pending', 'sold'].map((s) => (
               <button 
                 key={s} 
                 className={`tab-btn ${filters.status === s ? 'active' : ''}`}
                 onClick={() => handleFilterChange('status', s)}
                 suppressHydrationWarning={true}
               >
                 {s.toUpperCase()}
               </button>
             ))}
           </div>

           <div className="search-wrap">
             <div className="search-box">
               <input 
                 onChange={(e) => setDebouncedSearch(e.target.value)}
                 placeholder="Search SKU..." 
                 suppressHydrationWarning={true}
               />
             </div>
           </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
          <select className="filter-select" onChange={(e) => handleFilterChange('type', e.target.value)} suppressHydrationWarning={true}>
            <option value="">All Types</option>
            <option value="Table">Table</option>
            <option value="Coffee Table">Coffee Table</option>
            <option value="Bench">Bench</option>
            <option value="Counter">Counter</option>
          </select>

          <select className="filter-select" onChange={(e) => handleFilterChange('material', e.target.value)} suppressHydrationWarning={true}>
            <option value="">All Materials</option>
            <option value="Afzelia">Afzelia (ไม้มะค่า)</option>
            <option value="Teak">Teak (ไม้สัก)</option>
            <option value="Monkey Pod">Monkey Pod (จามจุรี)</option>
            <option value="Rosewood">Rosewood (ประดู่)</option>
          </select>

          <div style={{display:'flex', alignItems:'center', gap:'5px'}}>
            <input type="number" placeholder="Min" className="filter-input" onBlur={(e) => handleFilterChange('priceMin', e.target.value)} suppressHydrationWarning={true}/>
            <span>-</span>
            <input type="number" placeholder="Max" className="filter-input" onBlur={(e) => handleFilterChange('priceMax', e.target.value)} suppressHydrationWarning={true}/>
          </div>
        </div>
      </div>

      <div className="grid-container">
        {loading ? (
          <div style={{gridColumn:'1/-1', textAlign:'center'}}>Loading...</div>
        ) : products.length === 0 ? (
          <div style={{gridColumn:'1/-1', textAlign:'center'}}>No items found</div>
        ) : (
          products.map((item: any) => (
            <div key={item.id} className="card">
              <div className="img-wrap">
                <img 
                  src={item.display_image} 
                  alt={item.name} 
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400/e0e0e0/333333?text=Error" }}
                />
                
                {/* แสดงสถานะ Sold / Pending / On Request */}
                {renderStatus(item.status)}
              </div>

              <div className="card-info">
                <div className="card-name">{item.name || "Untitled"}</div>
                <div className="card-price">
                  {item.pricing?.is_discounted ? (
                    // กรณีมีส่วนลด
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'6px'}}>
                      <span className="price-old">฿{item.pricing.original.toLocaleString()}</span>
                      <span className="price-new">฿{item.pricing.final.toLocaleString()}</span>
                      <span className="badge-discount">{item.pricing.badge}</span>
                    </div>
                  ) : (
                    // กรณีราคาปกติ
                    <span>
                      {item.pricing?.original > 0 
                        ? `฿${item.pricing.original.toLocaleString()}` 
                        : "Contact Us"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}