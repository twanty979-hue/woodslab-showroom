'use client'

import React, { startTransition, useOptimistic } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { removeFromCart, updateQuantity } from '@/app/actions/cart'

export default function CartList({ items }: { items: any[] }) {
  
  // 1. สร้าง State จำลอง (Optimistic State) เพื่อให้หน้าจอเปลี่ยนทันทีที่กด
  const [optimisticItems, addOptimisticItem] = useOptimistic(
    items,
    (state: any[], action: { type: 'UPDATE' | 'DELETE'; id: string; qty?: number }) => {
      switch (action.type) {
        case 'UPDATE':
          return state.map((item) =>
            item.id === action.id ? { ...item, quantity: action.qty! } : item
          )
        case 'DELETE':
          return state.filter((item) => item.id !== action.id)
        default:
          return state
      }
    }
  )

  // 2. คำนวณราคาจาก State จำลอง (ตัวเลขราคาจะเปลี่ยนทันทีที่กดปุ่ม)
  const subtotal = optimisticItems.reduce((sum, item) => {
     // กันเหนียวเผื่อ product หาย
     const price = item.products?.price || 0; 
     return sum + (price * item.quantity)
  }, 0)
  
  const shipping = 500
  const total = subtotal + shipping

  // 3. ฟังก์ชันปรับจำนวน (Logic: เปลี่ยนหน้าจอ -> ส่ง Server -> อัปเดต Navbar)
  const handleUpdateQty = async (itemId: string, newQty: number) => {
    // A. สั่งหน้าจอเปลี่ยนทันที
    startTransition(() => {
      if (newQty < 1) {
         addOptimisticItem({ type: 'DELETE', id: itemId })
      } else {
         addOptimisticItem({ type: 'UPDATE', id: itemId, qty: newQty })
      }
    })

    // B. ส่งคำสั่งไป Server (ทำงานเบื้องหลัง)
    await updateQuantity(itemId, newQty)
    
    // C. กระตุ้นให้ Navbar อัปเดตตัวเลข (ไม่ต้อง Refresh หน้า)
    window.dispatchEvent(new Event('cart-updated'))
  }

  // 4. ฟังก์ชันลบสินค้า
  const handleRemove = async (itemId: string) => {
    startTransition(() => {
      addOptimisticItem({ type: 'DELETE', id: itemId })
    })
    
    await removeFromCart(itemId)
    window.dispatchEvent(new Event('cart-updated'))
  }

  // --- UI RENDER ---

  if (optimisticItems.length === 0) {
    return (
      <div className="text-center py-20 bg-white border border-zinc-100 shadow-sm rounded-lg mx-6 mt-10">
        <h2 className="text-2xl font-serif text-zinc-400 mb-6">Your cart is empty</h2>
        <Link 
          href="/woodslab" 
          className="inline-block px-8 py-3 bg-[#1C1917] text-white uppercase tracking-widest text-sm hover:bg-[#d4a373] transition-colors"
        >
          Go Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      
      {/* LEFT: Cart Items */}
      <div className="flex-grow space-y-6">
        {optimisticItems.map((item) => (
          <div key={item.id} className="flex gap-4 md:gap-6 p-4 bg-white border border-zinc-100 shadow-sm relative group transition-all hover:border-[#d4a373]/30">
            
            {/* Image */}
            <div className="w-24 h-24 md:w-32 md:h-32 bg-zinc-100 relative flex-shrink-0 overflow-hidden">
               {item.products?.image_url ? (
                 <img src={item.products.image_url} alt={item.products.name} className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-zinc-300 text-xs">No Image</div>
               )}
            </div>

            {/* Details */}
            <div className="flex-grow flex flex-col justify-between py-1">
               <div>
                  <h3 className="font-serif text-lg md:text-xl text-[#1C1917]">{item.products?.name}</h3>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider mt-1">
                    {item.products?.category || 'Premium Wood'}
                  </p>
               </div>
               
               <div className="flex items-center justify-between mt-4">
                  {/* Quantity Control */}
                  <div className="flex items-center border border-zinc-200">
                    <button 
                      onClick={() => handleUpdateQty(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:bg-zinc-100 active:bg-zinc-200 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-[#1C1917]">
                        {item.quantity}
                    </span>
                    <button 
                      onClick={() => handleUpdateQty(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:bg-zinc-100 active:bg-zinc-200 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#1C1917]">
                      THB {((item.products?.price || 0) * item.quantity).toLocaleString()}
                    </p>
                  </div>
               </div>
            </div>

            {/* Remove Button (X) */}
            <button 
              onClick={() => handleRemove(item.id)}
              className="absolute top-2 right-2 p-2 text-zinc-300 hover:text-red-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        ))}
      </div>

      {/* RIGHT: Order Summary */}
      <div className="w-full lg:w-96 flex-shrink-0">
        <div className="bg-white p-8 border border-zinc-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] sticky top-32">
          <h3 className="text-xl font-serif font-bold uppercase tracking-wider mb-6 pb-4 border-b border-zinc-100">
            Order Summary
          </h3>
          
          <div className="space-y-4 text-sm text-zinc-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>THB {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Estimate</span>
              <span>THB {shipping.toLocaleString()}</span>
            </div>
            
            <div className="pt-4 mt-4 border-t border-zinc-100 flex justify-between items-center text-base font-bold text-[#1C1917]">
              <span>Total</span>
              <span>THB {total.toLocaleString()}</span>
            </div>
          </div>

          <button className="w-full mt-8 py-4 bg-[#1C1917] text-white text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#d4a373] transition-all duration-500 shadow-lg">
            Checkout
          </button>
          
          <div className="mt-4 text-center">
             <span className="text-[10px] text-zinc-400 uppercase tracking-wide">Secure Checkout</span>
          </div>
        </div>
      </div>

    </div>
  )
}