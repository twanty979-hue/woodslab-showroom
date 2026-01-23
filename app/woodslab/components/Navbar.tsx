'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// --- ICONS ---
const IconMenu = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);

const IconClose = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const IconUser = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // --- STYLES ---
  const navClass = isScrolled || isMobileOpen
    ? 'bg-white/95 backdrop-blur-md border-b border-[#d4a373]/10 shadow-sm py-4'
    : 'bg-transparent border-transparent py-6';

  const linkClass = 'text-sm font-medium uppercase tracking-[0.15em] text-zinc-600 hover:text-[#d4a373] transition-colors duration-300';

  return (
    <>
      {/* ================= NAVBAR (Fixed Top) ================= */}
      <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 px-6 md:px-12 flex justify-between items-center ${navClass}`}>
          
          {/* 1. LOGO */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer z-[1001] group">
            <img 
              src="/wood_slabs_photo/Woodslabs Logo@3x-8.png" 
              alt="Woodden Logo" 
              className={`object-contain transition-all duration-500 ${isScrolled ? 'h-10 md:h-12' : 'h-12 md:h-16'}`}
            />
          </Link>
          
          {/* 2. DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-10">
            <Link href="/about" className={linkClass}>About</Link>
            <Link href="/woodslab" className={linkClass}>Collection</Link>
            {/* ✅ เพิ่ม Franchisee */}
            <Link href="/franchisee" className={linkClass}>Franchisee</Link>
            <Link href="/contact" className={linkClass}>Contact</Link>
            
            {/* Vertical Divider */}
            <div className="h-4 w-px bg-zinc-300"></div>

            {/* Login Icon Button */}
            <Link href="/login" className="text-zinc-600 hover:text-[#d4a373] transition-colors p-1" title="Login">
               <IconUser className="w-5 h-5" />
            </Link>
          </div>

          {/* 3. MOBILE HAMBURGER BUTTON */}
          <div className="md:hidden flex items-center gap-4 z-[1001]">
             {/* Mobile Login Icon */}
             <Link href="/login" className="p-2 rounded-full hover:bg-black/5 text-zinc-800">
               <IconUser className="w-6 h-6" />
             </Link>

             <button 
                className="p-2 rounded-full hover:bg-black/5 transition-colors"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label="Toggle Menu"
             >
                {isMobileOpen ? (
                  <IconClose className="w-6 h-6 text-zinc-800" />
                ) : (
                  <IconMenu className="w-6 h-6 text-zinc-800" />
                )}
             </button>
          </div>
      </nav>

      {/* ================= MOBILE MENU OVERLAY ================= */}
      <div 
        className={`fixed inset-0 bg-[#FAF9F6] z-[999] flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-in-out ${
          isMobileOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-10'
        }`}
      >
          <div className="absolute bottom-10 text-[10vw] font-serif font-bold text-black/5 pointer-events-none uppercase tracking-widest">
            Woodslabs
          </div>

          <Link href="/" className="text-3xl font-serif italic text-zinc-800 hover:text-[#d4a373] transition-colors">Home</Link>
          <Link href="/about" className="text-3xl font-serif italic text-zinc-800 hover:text-[#d4a373] transition-colors">About</Link>
          <Link href="/woodslab" className="text-3xl font-serif italic text-zinc-800 hover:text-[#d4a373] transition-colors">Collection</Link>
          {/* ✅ เพิ่ม Franchisee ใน Mobile Menu */}
          <Link href="/franchisee" className="text-3xl font-serif italic text-zinc-800 hover:text-[#d4a373] transition-colors">Franchisee</Link>
          <Link href="/contact" className="text-3xl font-serif italic text-zinc-800 hover:text-[#d4a373] transition-colors">Contact</Link>
          
          <Link href="/login" className="text-xl font-serif text-zinc-500 hover:text-[#d4a373] transition-colors mt-6 flex items-center gap-2">
             <IconUser className="w-5 h-5" /> Login / Register
          </Link>
      </div>

      {/* ================= SPACER ================= */}
      <div className="w-full h-[100px] md:h-[120px]"></div>
    </>
  )
}