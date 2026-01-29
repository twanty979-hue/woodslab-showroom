"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// --- Icons ---
const IconArrowRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);

// --- Animation Helper ---
const FadeInSection = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    }, { threshold: 0.1 });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- Minimalist Button ---
const LinkButton = ({ href, text, dark = false }: { href: string, text: string, dark?: boolean }) => (
  <Link 
    href={href} 
    className={`group relative inline-flex items-center gap-4 px-10 py-4 border ${dark ? 'border-white/30 text-white' : 'border-zinc-200 text-zinc-800'} uppercase tracking-[0.3em] text-[10px] font-bold transition-all duration-500 overflow-hidden hover:border-[#d4a373]`}
  >
    <span className={`absolute inset-0 bg-[#d4a373] transition-all duration-500 ease-out w-0 group-hover:w-full`}></span>
    <span className={`relative z-10 transition-colors duration-500 group-hover:text-white flex items-center gap-2`}>
      {text} <IconArrowRight className="w-4 h-4" />
    </span>
  </Link>
);

export default function HomePage() {
  
  // ✅ 1. ตั้งค่ารูปภาพสำหรับ Hero Slideshow (เพิ่มกี่รูปก็ได้ที่นี่)
  const heroImages = [
    "/wood_slabs_photo/1223356.png",
    "/wood_slabs_photo/f75fe6ff-6_6852141935588899.jpg",
    "/wood_slabs_photo/lumina-studio-1767681001953.png"
  ];

  // ✅ 2. State สำหรับจัดการเปลี่ยนรูป
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // ✅ 3. Effect สำหรับวนลูปรูปภาพทุก 5 วินาที
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // เปลี่ยนทุก 5000ms (5 วินาที)

    return () => clearInterval(timer);
  }, [heroImages.length]);

  // ข้อมูลไม้ (Solid Wood)
  const solidWoods = [
    { name: "Black Walnut", img: "https://image.ixiumu.cn/images/en/index_1.png" },
    { name: "Burmese Teak", img: "https://image.ixiumu.cn/images/en/index_3.png" },
    { name: "South American Raintree", img: "https://image.ixiumu.cn/images/en/index_4.png" },
    { name: "American Ash", img: "https://image.ixiumu.cn/images/en/index_6.png" },
  ];

  // ข้อมูลไม้ (Epoxy)
  const epoxyWoods = [
    { name: "Walnut Resin", img: "https://image.ixiumu.cn/images/en/index_13.png" },
    { name: "Poplar Resin", img: "https://image.ixiumu.cn/images/en/index_14.png" },
    { name: "Olive Wood", img: "https://image.ixiumu.cn/images/en/index_15.png" },
    { name: "African Rosewood", img: "https://image.ixiumu.cn/images/en/index_20.png" },
  ];

  return (
    <div className="bg-[#FAF9F6] text-[#1C1917] font-sans selection:bg-[#d4a373] selection:text-white min-h-screen">
      
      {/* 1. Hero Slideshow Section */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        
        {/* ✅ Loop แสดงรูปภาพทั้งหมด แต่ซ้อนกันและเล่นกับ Opacity เพื่อทำ Cross-fade */}
        {heroImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Hero Background ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentHeroIndex ? 'opacity-60' : 'opacity-0'
            }`}
            style={{ zIndex: 0 }} 
          />
        ))}
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-10"></div>

        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6">
           <FadeInSection>
              
              <div className="flex flex-col md:flex-row gap-3">
                 <LinkButton href="/woodslab" text="X Wood Brand" dark />
                 <LinkButton href="/woodslab?cat=rough" text="raw wood Brand" dark />
              </div>
           </FadeInSection>
        </div>
      </section>

      {/* 2. Brand Narrative (Editorial Layout) */}
      <section className="py-32 px-6 bg-[#FAF9F6]">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center">
            <div className="w-full md:w-1/2 relative">
               <div className="aspect-[4/5] overflow-hidden relative">
                  <img 
                    src="https://i.pinimg.com/736x/cf/eb/ff/cfebff29e2180cafa2a14f48964677ff.jpg" 
                    alt="About Us" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out" 
                  />
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#d4a373] hidden md:flex items-center justify-center rounded-full text-white font-serif text-xl italic z-10">
                     Since 2016
                  </div>
               </div>
            </div>
            <div className="w-full md:w-1/2">
               <FadeInSection>
                  <span className="text-[#d4a373] text-[10px] font-bold uppercase tracking-[0.3em] mb-6 block">Who We Are</span>
                  <h2 className="text-4xl md:text-5xl font-serif text-[#1C1917] mb-8 leading-tight">
                     X Wood Slabs Company
                  </h2>
                  <div className="text-zinc-500 font-light leading-loose text-justify space-y-6 text-sm md:text-base border-l border-zinc-200 pl-8">
                     <p>
                        Founded in 2016, we have grown into a team of 256 artisans with a 26,500 sqm facility. We hold international certifications including PEFC, ISO 9001, SGS, and EPH.
                     </p>
                     <p>
                        Equipped with top-level machinery like high-frequency kiln drying, we process over 40 kinds of rare wood slabs. Our standard moisture content is below 12%—the highest standard in the industry—ensuring stability and longevity for every masterpiece.
                     </p>
                  </div>
                  <div className="mt-12">
                     <LinkButton href="/about" text="Read Full Story" />
                  </div>
               </FadeInSection>
            </div>
         </div>
      </section>

      {/* 3. The Collections (Dual Showcase) */}
      <section className="bg-white py-32 border-t border-zinc-100">
         <div className="max-w-8xl mx-auto px-6">
            <div className="text-center mb-24">
               <h2 className="text-4xl md:text-6xl font-serif text-[#1C1917] mb-4">Our Collections</h2>
               <p className="text-zinc-400 text-xs uppercase tracking-[0.3em]">Timeless Solid Wood & Modern Resin Arts</p>
            </div>

            {/* Collection 1: Solid Wood */}
            <div className="mb-32">
               <div className="flex items-end justify-between mb-12 border-b border-zinc-100 pb-4">
                  <h3 className="text-2xl md:text-3xl font-serif italic text-[#1C1917]">01. Solid Wood Tables</h3>
                  <Link href="/woodslab" className="text-xs uppercase tracking-widest text-[#d4a373] hover:text-black transition-colors">View All →</Link>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                  {solidWoods.map((wood, idx) => (
                     <Link href="/woodslab" key={idx} className="group relative aspect-[3/4] overflow-hidden bg-zinc-100 block">
                        <img src={wood.img} alt={wood.name} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-6 left-6 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                           <span className="text-[10px] uppercase tracking-widest block mb-1">Material</span>
                           <span className="text-xl font-serif italic">{wood.name}</span>
                        </div>
                     </Link>
                  ))}
               </div>
            </div>

            {/* Collection 2: Epoxy Resin */}
            <div>
               <div className="flex items-end justify-between mb-12 border-b border-zinc-100 pb-4">
                  <h3 className="text-2xl md:text-3xl font-serif italic text-[#1C1917]">02. Epoxy Resin Art</h3>
                  <Link href="/woodslab" className="text-xs uppercase tracking-widest text-[#d4a373] hover:text-black transition-colors">View All →</Link>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                  {epoxyWoods.map((wood, idx) => (
                     <Link href="/woodslab" key={idx} className="group relative aspect-[3/4] overflow-hidden bg-zinc-100 block">
                        <img src={wood.img} alt={wood.name} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-6 left-6 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                           <span className="text-[10px] uppercase tracking-widest block mb-1">Series</span>
                           <span className="text-xl font-serif italic">{wood.name}</span>
                        </div>
                     </Link>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* 4. Custom Projects (Parallax) */}
      <section className="relative py-48 px-6 bg-fixed bg-cover bg-center" style={{ backgroundImage: 'url("https://image.ixiumu.cn/images/en/icon_en_index_banner_2.png")' }}>
         <div className="absolute inset-0 bg-black/50"></div>
         <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <FadeInSection>
               <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.3em] block mb-6 animate-pulse">
                  Limitless Possibilities
               </span>
               <h2 className="text-4xl md:text-7xl font-serif mb-8 drop-shadow-lg leading-tight">
                  Application Scenarios <br/> <span className="italic text-[#d4a373]">From Clients</span>
               </h2>
               <div className="mt-12">
                  <LinkButton href="/case" text="View Custom Projects" dark />
               </div>
            </FadeInSection>
         </div>
      </section>

      {/* 5. Philosophy & Craft */}
      <section className="py-32 px-6 bg-[#FAF9F6]">
         <div className="max-w-5xl mx-auto text-center space-y-16">
            <FadeInSection>
               <h3 className="text-3xl md:text-4xl font-serif text-[#1C1917] mb-6">Timeless Craftsmanship</h3>
               <p className="text-zinc-500 font-light leading-loose text-sm md:text-lg max-w-3xl mx-auto">
                  We blend the raw elegance of natural wood with the modern artistry of resin, breathing life into each piece. Whether enhancing a home or a commercial space, we believe every table should be a work of art.
               </p>
            </FadeInSection>
            
            <div className="w-24 h-[1px] bg-[#d4a373] mx-auto opacity-50"></div>

            <FadeInSection>
               <h3 className="text-3xl md:text-4xl font-serif text-[#1C1917] mb-6">Global Vision</h3>
               <p className="text-zinc-500 font-light leading-loose text-sm md:text-lg max-w-3xl mx-auto">
                  Our tables have been showcased at international exhibitions, standing out with distinctive style and high-end craftsmanship. A must-have for luxury offices and upscale residential environments.
               </p>
            </FadeInSection>
         </div>
      </section>

      {/* 6. Partners (Clean & Grayscale) */}
      <section className="py-24 bg-white border-y border-zinc-100">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-zinc-400 text-[10px] uppercase tracking-[0.4em] mb-12">Trusted By Global Partners</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               {/* โลโก้ Partner จากต้นฉบับ */}
               <img src="/front/en/partner_1.png" className="h-8 md:h-10 w-auto object-contain" alt="Partner" />
               <img src="/front/en/partner_2.png" className="h-8 md:h-10 w-auto object-contain" alt="Partner" />
               <img src="/front/en/partner_3.png" className="h-8 md:h-10 w-auto object-contain" alt="Partner" />
               <img src="/front/en/partner_5.png" className="h-8 md:h-10 w-auto object-contain" alt="Partner" />
               <img src="/front/en/partner_6.png" className="h-12 md:h-16 w-auto object-contain" alt="Partner" />
            </div>
         </div>
      </section>

      {/* 7. CTA / Visit (Dark Mode) */}
      <section className="bg-[#111] text-[#DCD3C8] py-32 px-6">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="w-full md:w-1/2 space-y-8">
               <span className="text-[#d4a373] text-[10px] font-bold uppercase tracking-[0.3em]">Visit Us</span>
               <h2 className="text-5xl md:text-6xl font-serif text-white leading-tight">
                  Experience <br/> The <span className="italic text-[#d4a373]">Texture</span>
               </h2>
               <div className="space-y-4 text-zinc-400 font-light leading-relaxed border-l border-white/10 pl-6">
                  <p>13th Floor, WanNeng Building,<br/> No. 10 Chuangye Road,</p>
                  <p>Fuzhou High-tech Zone,<br/> China</p>
               </div>
               <div className="pt-8">
                  <LinkButton href="/contact" text="Schedule A Visit" dark />
               </div>
            </div>
            <div className="w-full md:w-1/2 h-[400px] relative overflow-hidden group">
               <img 
                 src="https://image.ixiumu.cn/images/en/icon_en_index_banner_3.png" 
                 alt="Showroom" 
                 className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-70 group-hover:opacity-100" 
               />
               <div className="absolute inset-0 border border-white/10 m-4 pointer-events-none"></div>
            </div>
         </div>
      </section>

      {/* 8. Simple Footer (Contacts) */}
      <footer className="bg-[#0a0a0a] text-zinc-500 py-12 border-t border-white/5 text-center text-xs tracking-widest uppercase">
         <div className="flex justify-center gap-8 mb-8">
            <a href="#" className="hover:text-[#d4a373] transition-colors"><img src="/front/img/ins.png" className="w-6 h-6 opacity-50 hover:opacity-100" alt="IG"/></a>
            <a href="#" className="hover:text-[#d4a373] transition-colors"><img src="/front/img/facebook.png" className="w-6 h-6 opacity-50 hover:opacity-100" alt="FB"/></a>
            <a href="#" className="hover:text-[#d4a373] transition-colors"><img src="/front/img/Whatsapp.png" className="w-6 h-6 opacity-50 hover:opacity-100" alt="WA"/></a>
         </div>
         <p>© 2026 Woodslabs Industry Co., Ltd. All Rights Reserved.</p>
         <p className="mt-2 normal-case opacity-50">Email: zuily@woodslabs.com.cn | Phone: +86 177 2080 3060</p>
      </footer>

    </div>
  );
}