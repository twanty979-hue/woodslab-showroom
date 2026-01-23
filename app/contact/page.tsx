"use client";

import React from 'react';
import Navbar from '../woodslab/components/Navbar'; // เรียกใช้ Navbar ตัวเดิม

export default function ContactPage() {
  return (
    <div className="bg-white text-[#1C1917] font-sans selection:bg-[#d4a373] selection:text-white min-h-screen flex flex-col">
      
      {/* Import Fonts & Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,700&family=Noto+Sans+Thai:wght@300;400;600&display=swap');
        
        body { font-family: 'Noto Sans Thai', sans-serif; }
        h1, h2, h3, h4, .font-serif { font-family: 'Cormorant Garamond', serif; }
      `}</style>

      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Main Content (Center Aligned) */}
      <main className="flex-grow flex items-center justify-center relative w-full px-6 py-32">
         {/* Background Decor (Optional: Subtle Texture) */}
         <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

         <div className="text-center max-w-3xl mx-auto z-10 space-y-8 animate-fade-in-up">
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-serif font-bold italic tracking-wide text-black mb-10">
              CONTACT
            </h1>

            {/* Brand Name */}
            <h2 className="text-5xl md:text-7xl font-serif text-black leading-tight">
               WOODSLABS
            </h2>

            {/* Contact Details */}
            <div className="space-y-4 pt-8 pb-10">
               <p className="text-lg md:text-xl text-[#646464] font-light">
                  <span className="font-medium text-black">Phone / WhatsApp:</span> +66 8x-xxx-xxxx (Support)
               </p>
               <p className="text-lg md:text-xl text-[#646464] font-light leading-relaxed max-w-xl mx-auto">
                  <span className="font-medium text-black">Address:</span> 123 Sukhumvit 55, Thonglor, Bangkok, Thailand 10110
               </p>
               <p className="text-lg md:text-xl text-[#646464] font-light">
                  <span className="font-medium text-black">Email:</span> contact@woodslabs.com
               </p>
            </div>

            {/* Action Button */}
            <div>
               <a 
                 href="mailto:contact@woodslabs.com" 
                 className="inline-block px-12 py-5 border border-[#C3A99A] text-[#C3A99A] text-xl md:text-2xl font-serif hover:bg-[#C3A99A] hover:text-white transition-all duration-300 rounded-md cursor-pointer shadow-sm hover:shadow-md"
               >
                 Schedule A Visit
               </a>
            </div>

         </div>
      </main>

      {/* 3. Footer (Simple Version) */}
      <footer className="py-12 bg-[#0a0a0a] text-white border-t border-white/5 px-8 md:px-12 mt-auto">
        <div className="max-w-8xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-serif font-bold tracking-[0.2em] uppercase text-white">WOODSLABS</h2>
            <div className="pt-6 border-t border-white/10 text-[10px] text-zinc-600 uppercase tracking-widest">
              &copy; 2026 Woodslabs Industry Co., Ltd. All Rights Reserved.
            </div>
        </div>
      </footer>

    </div>
  );
}