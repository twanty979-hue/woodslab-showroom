"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

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

const IconArrowDown = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
);

const IconMapPin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

const IconCheck = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
);

const IconClock = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Hero Slider Images
  const heroImages = [
    "/wood_slabs_photo/lumina-studio-1767681001953.png?q=80&w=2070",
    "/wood_slabs_photo/f75fe6ff-6_6852141935588899.jpg?q=80&w=2070",
    "/wood_slabs_photo/1223356.png?q=80&w=2070"
  ];

  const showcaseImages = [
    "https://i.pinimg.com/1200x/6c/98/dc/6c98dc1d2d3b7c9eddacf5fe92babfba.jpg",
    "https://i.pinimg.com/1200x/a2/c5/7a/a2c57ace144e6c02be0995a003d758da.jpg",
    "https://i.pinimg.com/736x/8a/bf/34/8abf34234d8f926313674c592fba3bef.jpg",
    "https://i.pinimg.com/1200x/a3/d4/bf/a3d4bfc856cf303b14325e1d8074fbf3.jpg",
    "https://i.pinimg.com/1200x/06/3f/fa/063ffa1c064971364444388704848e8a.jpg",
    "https://i.pinimg.com/736x/ff/80/06/ff8006786dfb4e2d02e99d63d87fcb68.jpg",
    "https://i.pinimg.com/736x/92/4e/22/924e22402e14b9176a0b77c5c687eaa9.jpg",
    "https://i.pinimg.com/1200x/d2/bf/f9/d2bff9b76c92d1e1a4a03bde35713161.jpg"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => observer.observe(el));

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      reveals.forEach(el => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    if(isScrolled) setIsMobileOpen(false);
  }, [isScrolled]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // --- STYLES FOR NAVBAR ---
  const navClass = isScrolled || isMobileOpen
    ? 'bg-white/95 backdrop-blur-md border-b border-[#d4a373]/10 shadow-sm py-4'
    : 'bg-transparent border-transparent py-6';

  const linkClass = `text-sm font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${isScrolled ? 'text-zinc-600 hover:text-[#d4a373]' : 'text-white hover:text-[#d4a373]'}`;
  const iconClass = isScrolled || isMobileOpen ? 'text-zinc-800' : 'text-white';

  return (
    <div className="bg-[#FAF9F6] text-[#1C1917] font-sans selection:bg-[#d4a373] selection:text-white scroll-smooth min-h-screen">
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Noto+Serif+Thai:wght@300;400;600&family=Noto+Sans+Thai:wght@300;400&display=swap');
        
        body { font-family: 'Noto Sans Thai', sans-serif; }
        h1, h2, h3, h4, .font-serif { font-family: 'Cormorant Garamond', 'Noto Serif Thai', serif; }
        
        .reveal { opacity: 0; transform: translateY(50px); transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1); }
        .reveal.active { opacity: 1; transform: translateY(0); }
        
        .delay-100 { transition-delay: 0.1s; }
        .delay-200 { transition-delay: 0.2s; }
        .delay-300 { transition-delay: 0.3s; }
        .delay-400 { transition-delay: 0.4s; }
        .delay-500 { transition-delay: 0.5s; }
        .delay-600 { transition-delay: 0.6s; }
        .delay-700 { transition-delay: 0.7s; }
        
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 1.5s forwards; }
        .animate-slide-up { animation: slide-up 1.2s cubic-bezier(0.2, 1, 0.3, 1) forwards; }

        .showcase-grid:hover .showcase-item { opacity: 0.4; filter: grayscale(80%); }
        .showcase-grid .showcase-item:hover { opacity: 1; filter: grayscale(0%); transform: scale(1.02); z-index: 10; }
        
        img { border: none !important; outline: none !important; }
      `}</style>

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
        
        {/* 2. DESKTOP MENU (Updated to match other pages) */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="/about" className={linkClass}>About</Link>
          <Link href="/woodslab" className={linkClass}>Collection</Link>
          <Link href="/franchisee" className={linkClass}>Franchisee</Link>
          <Link href="/contact" className={linkClass}>Contact</Link>
          
          {/* Vertical Divider */}
          <div className={`h-4 w-px mx-2 ${isScrolled ? 'bg-zinc-300' : 'bg-white/30'}`}></div>

          {/* Login Icon Button */}
          <Link href="/login" className={`transition-colors p-1 ${isScrolled ? 'text-zinc-600 hover:text-[#d4a373]' : 'text-white hover:text-[#d4a373]'}`} title="Login">
             <IconUser className="w-5 h-5" />
          </Link>
        </div>

        {/* 3. MOBILE HAMBURGER BUTTON */}
        <div className="md:hidden flex items-center gap-4 z-[1001]">
           {/* Mobile Login Icon */}
           <Link href="/login" className={`p-2 rounded-full hover:bg-black/5 ${iconClass}`}>
             <IconUser className="w-6 h-6" />
           </Link>

           <button 
              className={`p-2 rounded-full hover:bg-black/5 transition-colors ${iconClass}`}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle Menu"
           >
              {isMobileOpen ? (
                <IconClose className="w-6 h-6 text-zinc-800" /> /* Always dark when open */
              ) : (
                <IconMenu className="w-6 h-6" />
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
          <Link href="/franchisee" className="text-3xl font-serif italic text-zinc-800 hover:text-[#d4a373] transition-colors">Franchisee</Link>
          <Link href="/contact" className="text-3xl font-serif italic text-zinc-800 hover:text-[#d4a373] transition-colors">Contact</Link>
          
          <Link href="/login" className="text-xl font-serif text-zinc-500 hover:text-[#d4a373] transition-colors mt-6 flex items-center gap-2">
             <IconUser className="w-5 h-5" /> Login / Register
          </Link>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${index === currentHeroIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <img 
                src={img} 
                className={`w-full h-full object-cover transform transition-transform duration-[8000ms] ease-out ${index === currentHeroIndex ? 'scale-110' : 'scale-100'}`} 
                alt={`Hero Slide ${index + 1}`} 
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#FAF9F6]/10 z-10"></div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 animate-bounce">
          <div className="p-4 border border-white/40 rounded-full backdrop-blur-sm">
            <IconArrowDown className="w-4 h-4 text-white" />
          </div>
        </div>
      </section>

      {/* Philosophy / About */}
      <section id="philosophy" className="py-40 px-6 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="w-full md:w-1/2 relative reveal">
             <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#d4a373]/10 rounded-full blur-3xl"></div>
             <div className="relative overflow-hidden rounded-sm group">
               <img src="https://i.pinimg.com/736x/98/a3/cd/98a3cd1945209cf8380f9cdfe940e7d2.jpg" alt="Wood Texture Detail" className="w-full h-[700px] object-cover shadow-2xl transition-transform duration-[1.5s] group-hover:scale-105" />
             </div>
             <div className="absolute bottom-20 -right-12 bg-[#FAF9F6] p-10 shadow-2xl max-w-sm hidden md:block border-l-[6px] border-[#d4a373] reveal delay-200">
                <p className="text-[#d4a373] text-5xl font-serif italic leading-none">"Every grain <br/> tells a story."</p>
             </div>
          </div>
          <div className="w-full md:w-1/2 space-y-10 reveal delay-100">
            <div className="flex items-center gap-6">
              <span className="text-[#d4a373] text-7xl font-serif opacity-30 italic">01</span>
              <div className="h-px w-24 bg-zinc-300"></div>
              <span className="text-zinc-500 text-xs uppercase tracking-[0.4em] font-bold">The Philosophy</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-medium uppercase tracking-tight text-[#1C1917] leading-none">
              Honoring the <br /><span className="text-[#d4a373] italic font-light">Soul</span> of Wood
            </h2>
            <p className="text-zinc-600 font-light leading-loose text-base md:text-lg">
              ที่ <strong className="text-[#1C1917]">WOODSLABS</strong> เราไม่ได้แค่นำไม้มาทำเฟอร์นิเจอร์ แต่เราคือผู้ถ่ายทอดเรื่องราวจากธรรมชาติ ไม้ทุกแผ่นผ่านกาลเวลานับร้อยปี สะสมลวดลายที่เป็นเอกลักษณ์ เราเชื่อในการรักษาความงดงามดั้งเดิมไว้ให้มากที่สุด ผสานกับเทคนิคการถนอมเนื้อไม้สมัยใหม่
            </p>
            <div className="grid grid-cols-2 gap-12 pt-8 border-t border-zinc-100">
               <div>
                 <h4 className="text-[#1C1917] font-serif text-xl italic mb-3">Sustainable Source</h4>
                 <p className="text-zinc-500 text-sm font-light">คัดสรรจากป่าปลูกทดแทนอย่างยั่งยืน</p>
               </div>
               <div>
                 <h4 className="text-[#1C1917] font-serif text-xl italic mb-3">Master Craftsmanship</h4>
                 <p className="text-zinc-500 text-sm font-light">งานฝีมือประณีตโดยช่างผู้ชำนาญการ</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Gallery Section */}
      <section id="collection" className="relative py-40 bg-[#FAF9F6] px-6">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-24 reveal">
            <span className="text-zinc-400 text-xs uppercase tracking-[0.4em] block mb-4 font-bold">Selected Masterpieces</span>
            <h2 className="text-5xl md:text-7xl font-serif font-medium uppercase tracking-tight text-[#1C1917] mb-8">
              Exquisite <span className="text-[#d4a373] italic font-light">Collection</span>
            </h2>
            <div className="w-24 h-[2px] bg-[#d4a373] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-16">
            {/* Products Data is not mapped here, assuming this is static for landing page */}
          </div>
        </div>
      </section>

      {/* ✅ Process Details (แก้ไขให้เรียงลงมา 1 คอลัมน์ตามคำขอ) */}
      <section id="process" className="py-40 bg-[#151515] text-[#FAF9F6] relative">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-5 mix-blend-overlay"></div>
         <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/10 pb-12 reveal">
               <div>
                  <span className="text-[#d4a373] text-xs uppercase tracking-[0.4em] block mb-4 font-bold">Behind the Scenes</span>
                  <h2 className="text-5xl md:text-7xl font-serif font-medium uppercase tracking-tight leading-none">The Art of <br /><span className="italic text-zinc-600 font-light">Perfection</span></h2>
               </div>
               <p className="text-zinc-400 text-base font-light max-w-lg mt-8 md:mt-0 leading-loose text-right">
                  เราพิถีพิถันในทุกขั้นตอน <br/> ตั้งแต่การคัดเลือกไม้ดิบ จนถึงการเคลือบผิวขั้นสุดท้าย <br/> เพื่อให้มั่นใจว่าคุณจะได้รับงานศิลปะที่ทรงคุณค่าที่สุด
               </p>
            </div>

            {/* ✅ ใช้ Flex-col เพื่อเรียงลงมาเป็นแนวตั้ง (Stack) */}
            <div className="flex flex-col gap-24">
               {/* Item 1 */}
               <div className="group reveal delay-100 flex flex-col md:flex-row gap-12 items-center">
                  <div className="w-full md:w-1/2 h-[350px] overflow-hidden relative border-b-2 border-[#d4a373]/0 group-hover:border-[#d4a373] transition-all duration-700">
                     <img src="https://i.pinimg.com/736x/5a/79/97/5a79971d63ff65dff438250f007a1432.jpg" className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="Selection" />
                     <div className="absolute top-0 right-0 bg-[#d4a373] text-black w-16 h-16 flex items-center justify-center text-2xl font-serif font-bold italic">01</div>
                  </div>
                  <div className="w-full md:w-1/2">
                     <h3 className="text-4xl font-serif italic mb-6 text-white group-hover:text-[#d4a373] transition-colors">Sourcing</h3>
                     <p className="text-zinc-400 text-base font-light leading-loose">
                        คัดเลือกไม้ท่อนขนาดใหญ่ที่มีอายุยืนยาว ลายไม้ชัดเจน จากแหล่งป่าที่มีการจัดการอย่างยั่งยืนเท่านั้น เราเลือกเฉพาะไม้ที่มี Character โดดเด่นที่สุด เพื่อให้ได้ชิ้นงานที่ไม่เหมือนใคร
                     </p>
                  </div>
               </div>

               {/* Item 2 */}
               <div className="group reveal delay-200 flex flex-col md:flex-row-reverse gap-12 items-center">
                  <div className="w-full md:w-1/2 h-[350px] overflow-hidden relative border-b-2 border-[#d4a373]/0 group-hover:border-[#d4a373] transition-all duration-700">
                     <img src="https://i.pinimg.com/1200x/0f/63/12/0f63128215c39e7c51931b6d48c9def1.jpg" className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="Kiln Dry" />
                     <div className="absolute top-0 right-0 bg-[#2a2a2a] text-white w-16 h-16 flex items-center justify-center text-2xl font-serif font-bold italic group-hover:bg-[#d4a373] group-hover:text-black transition-colors">02</div>
                  </div>
                  <div className="w-full md:w-1/2 text-right">
                     <h3 className="text-4xl font-serif italic mb-6 text-white group-hover:text-[#d4a373] transition-colors">Kiln Drying</h3>
                     <p className="text-zinc-400 text-base font-light leading-loose">
                        อบไม้ในเตาควบคุมอุณหภูมิและความชื้นนานกว่า 45-60 วัน จนความชื้นเหลือต่ำกว่า 12% เพื่อป้องกันการบิดตัวแตกร้าว และกำจัดแมลงรบกวนถาวร มั่นใจได้ในความคงทน
                     </p>
                  </div>
               </div>
               
               {/* Item 3 */}
               <div className="group reveal delay-300 flex flex-col md:flex-row gap-12 items-center">
                  <div className="w-full md:w-1/2 h-[350px] overflow-hidden relative border-b-2 border-[#d4a373]/0 group-hover:border-[#d4a373] transition-all duration-700">
                     <img src="https://i.pinimg.com/736x/cb/1f/17/cb1f17b6497222e875f2108d91d0179b.jpg" className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="Finishing" />
                     <div className="absolute top-0 right-0 bg-[#2a2a2a] text-white w-16 h-16 flex items-center justify-center text-2xl font-serif font-bold italic group-hover:bg-[#d4a373] group-hover:text-black transition-colors">03</div>
                  </div>
                  <div className="w-full md:w-1/2">
                     <h3 className="text-4xl font-serif italic mb-6 text-white group-hover:text-[#d4a373] transition-colors">Finishing</h3>
                     <p className="text-zinc-400 text-base font-light leading-loose">
                        ขัดผิวให้เรียบเนียนระดับไมครอน และเคลือบด้วยน้ำมันธรรมชาติ หรือ Nano-Ceramic เพื่อปกป้องผิวสัมผัส แต่ยังคงความเป็นธรรมชาติของเนื้อไม้ไว้ให้มากที่สุด
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Visual Portfolio Showcase */}
      <section id="projects" className="py-40 bg-white px-6 border-b border-zinc-100 overflow-hidden">
         <div className="max-w-8xl mx-auto reveal">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24">
              <div>
                <span className="text-[#d4a373] text-xs uppercase tracking-[0.4em] font-bold mb-4 block">Visual Diary</span>
                <h2 className="text-5xl md:text-7xl font-serif font-medium uppercase tracking-tight text-[#1C1917]">
                   Curated <span className="italic text-zinc-400">Spaces</span>
                </h2>
              </div>
              <p className="text-zinc-500 text-sm font-light mt-8 md:mt-0 max-w-sm text-right">
                Discover how our masterpieces transform luxury spaces around the world.
              </p>
            </div>

            <div className="showcase-grid grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 h-auto">
               {showcaseImages.map((img, index) => (
                 <div 
                   key={index} 
                   className={`showcase-item relative overflow-hidden group cursor-pointer transition-all duration-700 ease-out h-[300px] md:h-[500px] ${index === 1 || index === 5 ? 'md:-translate-y-12' : ''}`}
                 >
                    <img 
                      src={img} 
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-110" 
                      alt={`Project ${index + 1}`} 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
                    
                    <div className="absolute bottom-0 left-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                       <span className="text-[#d4a373] text-[10px] uppercase tracking-[0.2em] block mb-2 font-bold">Project 0{index + 1}</span>
                       <h4 className="text-white font-serif text-2xl italic">Private Residence</h4>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA / Showroom */}
      <section id="showroom" className="py-40 px-6 bg-[#111]">
         <div className="max-w-6xl mx-auto reveal">
            <div className="relative border border-[#d4a373]/30 bg-[#0a0a0a] p-12 md:p-24 text-center overflow-hidden group">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20"></div>
               <div className="absolute inset-0 bg-gradient-to-tr from-[#d4a373]/5 to-transparent pointer-events-none"></div>
               
               <div className="absolute top-6 left-6 right-6 bottom-6 border border-[#d4a373]/20 pointer-events-none"></div>
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-[#d4a373] to-transparent opacity-50"></div>

               <div className="relative z-10">
                  <span className="text-[#d4a373] text-xs uppercase tracking-[0.5em] block mb-8 font-bold animate-pulse">Exclusive Access</span>
                  <h2 className="text-5xl md:text-7xl font-serif font-medium uppercase tracking-tight text-white mb-8">
                     The <span className="italic text-[#d4a373]">Private</span> Showroom
                  </h2>
                  <p className="text-zinc-400 text-sm md:text-base font-light leading-loose max-w-2xl mx-auto mb-16">
                     สัมผัสความงดงามของไม้แผ่นจริงในบรรยากาศส่วนตัว ทีมงานผู้เชี่ยวชาญพร้อมให้คำปรึกษาเจาะลึก เพื่อค้นหาชิ้นงานที่สมบูรณ์แบบที่สุดสำหรับพื้นที่ของคุณ
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto mb-16">
                     <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full border border-[#d4a373]/30 flex items-center justify-center mb-6 text-[#d4a373]">
                           <IconMapPin className="w-5 h-5" />
                        </div>
                        <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-2">Location</h4>
                        <p className="text-zinc-500 text-xs">Sukhumvit 55, Thonglor<br/>Bangkok, Thailand</p>
                     </div>
                     <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full border border-[#d4a373]/30 flex items-center justify-center mb-6 text-[#d4a373]">
                           <IconClock className="w-5 h-5" />
                        </div>
                        <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-2">Opening Hours</h4>
                        <p className="text-zinc-500 text-xs">10:00 AM - 07:00 PM<br/>Open Daily</p>
                     </div>
                     <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full border border-[#d4a373]/30 flex items-center justify-center mb-6 text-[#d4a373]">
                           <IconCheck className="w-5 h-5" />
                        </div>
                        <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-2">Reservation</h4>
                        <p className="text-zinc-500 text-xs">By Appointment Only<br/>For Exclusive Service</p>
                     </div>
                  </div>

                  <Link href="/woodslab" className="inline-block">
                    <button className="px-16 py-5 bg-[#d4a373] text-black text-xs font-bold uppercase tracking-[0.3em] hover:bg-white transition-all duration-500 shadow-[0_0_30px_rgba(212,163,115,0.2)]">
                       Make an Appointment
                    </button>
                  </Link>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-[#0a0a0a] text-white border-t border-white/5 px-8 md:px-12">
        <div className="max-w-8xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="text-center md:text-left space-y-8">
            <h2 className="text-4xl font-serif font-bold tracking-[0.2em] uppercase text-white">WOODSLABS</h2>
            <p className="text-zinc-600 text-[10px] uppercase tracking-[0.3em] max-w-xs leading-loose">
              Crafting legacy pieces from nature's finest materials since 2016.
            </p>
            <div className="flex gap-4 justify-center md:justify-start pt-4">
               <div className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-[#d4a373] hover:border-[#d4a373] hover:text-black transition-all cursor-pointer text-xs duration-300">FB</div>
               <div className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-[#d4a373] hover:border-[#d4a373] hover:text-black transition-all cursor-pointer text-xs duration-300">IG</div>
               <div className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-[#d4a373] hover:border-[#d4a373] hover:text-black transition-all cursor-pointer text-xs duration-300">LN</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-32 w-full md:w-auto">
            <div className="flex flex-col gap-6 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              <span className="text-white font-bold mb-4 border-b border-[#d4a373] pb-2 inline-block w-8">Menu</span>
              <a href="#" className="hover:text-[#d4a373] transition-colors">Dining Tables</a>
              <a href="#" className="hover:text-[#d4a373] transition-colors">Coffee Tables</a>
              <a href="#" className="hover:text-[#d4a373] transition-colors">Consoles</a>
              <a href="#" className="hover:text-[#d4a373] transition-colors">Decor Items</a>
            </div>
            <div className="flex flex-col gap-6 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              <span className="text-white font-bold mb-4 border-b border-[#d4a373] pb-2 inline-block w-8">About</span>
              <a href="#" className="hover:text-[#d4a373] transition-colors">Our Story</a>
              <a href="#" className="hover:text-[#d4a373] transition-colors">Process</a>
              <a href="#" className="hover:text-[#d4a373] transition-colors">Careers</a>
              <a href="#" className="hover:text-[#d4a373] transition-colors">Contact</a>
            </div>
            <div className="flex flex-col gap-6 text-[11px] uppercase tracking-[0.2em] text-zinc-500 col-span-2 md:col-span-1">
              <span className="text-white font-bold mb-4 border-b border-[#d4a373] pb-2 inline-block w-8">Newsletter</span>
              <p className="normal-case text-zinc-600 mb-2 leading-relaxed">Subscribe to receive updates, access to exclusive deals, and more.</p>
              <div className="flex border-b border-white/10 pb-2">
                  <input type="text" placeholder="EMAIL ADDRESS" className="bg-transparent w-full outline-none text-white text-xs placeholder-zinc-700" />
                  <button className="text-[#d4a373] font-bold hover:text-white transition-colors">→</button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-32 pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] text-zinc-700 uppercase tracking-[0.2em]">
          <span>&copy; 2026 Woodslabs Industry Co., Ltd. All Rights Reserved.</span>
          <div className="flex gap-8">
             <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}