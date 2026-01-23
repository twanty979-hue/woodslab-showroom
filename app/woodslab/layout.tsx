import React from 'react'
import Navbar from './components/Navbar' // Import Navbar ที่สร้างตะกี้
import './woodslab.css' // ถ้าคุณมีไฟล์ css แยกก็ import ตรงนี้

export default function WoodSlabLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#FAF9F6] text-[#1C1917] font-sans selection:bg-[#d4a373] selection:text-white scroll-smooth min-h-screen">
       {/* ใส่ Font และ Style Global ที่จำเป็น */}
       <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Noto+Serif+Thai:wght@300;400;600&family=Noto+Sans+Thai:wght@300;400&display=swap');
        
        body { font-family: 'Noto Sans Thai', sans-serif; }
        h1, h2, h3, h4, .font-serif { font-family: 'Cormorant Garamond', 'Noto Serif Thai', serif; }
        
        /* Reveal Animation Classes */
        .reveal { opacity: 0; transform: translateY(50px); transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1); }
        .reveal.active { opacity: 1; transform: translateY(0); }
        .delay-100 { transition-delay: 0.1s; }
        .delay-200 { transition-delay: 0.2s; }
        .delay-300 { transition-delay: 0.3s; }
      `}</style>

      {/* เรียกใช้ Navbar ที่นี่ มันจะอยู่บนสุดของทุกหน้า */}
      <Navbar />

      {/* เนื้อหาของแต่ละหน้า (page.tsx) จะถูกแสดงตรงนี้ */}
      <main>
        {children}
      </main>
    </div>
  )
}