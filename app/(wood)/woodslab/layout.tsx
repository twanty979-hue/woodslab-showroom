import React from 'react'
// import Navbar from '@/components/Navbar' // ❌ ปิดไว้ก่อนเพราะ Layout ใหญ่มีแล้ว
import './woodslab.css' // อย่าลืมไฟล์ css นี้นะครับ

export default function WoodSlabLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#FAF9F6] text-[#1C1917] font-sans selection:bg-[#d4a373] selection:text-white scroll-smooth min-h-screen">
       {/* Styles & Fonts เฉพาะหน้านี้ */}
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

      {/* ⚠️ ถ้าเปิดบรรทัดล่างนี้ Navbar จะซ้อนกัน 2 อันครับ 
         เพราะ RootLayout (app/layout.tsx) มี Navbar ครอบให้อยู่แล้ว
      */}
      {/* <Navbar /> */}

      <main>
        {children}
      </main>
    </div>
  )
}