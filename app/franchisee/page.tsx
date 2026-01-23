"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from '../woodslab/components/Navbar';

export default function FranchiseePage() {
  
  const advantages = [
    {
      title: "Material Selection",
      desc: "We boast a high-quality procurement team that regularly visits sustainable forests worldwide for professional material selection. We prioritize century-old trees with minimal heartwood cracking and unique natural shapes. We use world-class wood to create world-class slabs.",
      img: "https://image.ixiumu.cn/front/brand/images/join/join_shop_1.png",
      reverse: false
    },
    {
      title: "Design",
      desc: "Our design team deeply understands the characteristics and beauty of wood. While preserving natural traits, we incorporate modern furniture design concepts, creating 14 creative edge styles and 17 inspired surface designs. Users can freely choose and customize.",
      img: "https://image.ixiumu.cn/front/brand/images/join/join_shop_2.png",
      reverse: true
    },
    {
      title: "Craftsmanship",
      desc: "Equipped with a professional technical team, we specialize in solid wood slab craftsmanship. We ensure that our processes do not compromise the wood's inherent stability while creating 18 surface colors and 9 surface textures.",
      img: "https://image.ixiumu.cn/front/brand/images/join/join_shop_3.png",
      reverse: false
    },
    {
      title: "Technology",
      desc: "Supported by globally leading technology, we utilize imported Japanese high-frequency drying equipment and large-scale wood leveling machines. Our woodworking team with 15 years of experience safeguards every step of production.",
      img: "https://image.ixiumu.cn/front/brand/images/join/join_shop_4.png",
      reverse: true
    },
    {
      title: "Environmental Responsibility",
      desc: "As advocates of proactive ecology, we meticulously control every detail of environmental sustainability, from raw wood selection and resin materials to adhesives and surface coatings. We ensure safety, eco-friendliness, and durability.",
      img: "https://image.ixiumu.cn/front/brand/images/join/join_shop_5.png",
      reverse: false
    },
    {
      title: "Slab Collection",
      desc: "With a collection of over 10,000 air-dried slabs and 1,500+ premium slabs in stock, we offer more than 40 rare wood species from Europe, North America, South America, Africa, and Southeast Asia.",
      img: "https://image.ixiumu.cn/front/brand/images/join/join_shop_6.png",
      reverse: true
    }
  ];

  const services = [
    { title: 'Shared Product System', desc: 'Partners share our full product system: 10,000+ raw slabs, 1,500+ finished slabs, and handmade furniture.' },
    { title: 'Unified Pricing System', desc: 'Both online and offline stores adhere to a unified retail pricing system to protect dealer rights.' },
    { title: 'Regional Protection', desc: 'We implement clear regional protection policies, granting exclusive agency rights within designated areas.' },
    { title: 'One-Stop Service', desc: 'Comprehensive services from location selection, store design, to product selection and display methods.' },
    { title: 'Personalized Solutions', desc: 'We offer various store style solutions and display combinations to enrich the shopping experience.' },
    { title: 'Professional Training', desc: 'Training covering brand knowledge, product details, and service standards to help expand the market.' },
    { title: 'Operational Support', desc: 'We offer operational plans, building a closed-loop system from online to offline to increase success rates.' },
  ];

  const steps = [
    'Consultation',
    'Q&A Session',
    'Market Research',
    'Cooperation Intent',
    'Sign Agreement',
    'Win-Win Cooperation'
  ];

  return (
    <div className="bg-[#FAF9F6] text-[#1C1917] font-sans selection:bg-[#d4a373] selection:text-white min-h-screen flex flex-col">
      
      {/* Import Fonts & Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Noto+Sans+Thai:wght@300;400;600&display=swap');
        
        body { font-family: 'Noto Sans Thai', sans-serif; }
        h1, h2, h3, h4, .font-serif { font-family: 'Cormorant Garamond', serif; }
      `}</style>

      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Video */}
      <section className="relative w-full h-[50vh] md:h-[70vh] bg-black overflow-hidden mt-20 md:mt-24">
        <video 
          className="absolute top-0 left-0 w-full h-full object-cover opacity-90"
          poster="https://image.ixiumu.cn/front/brand/images/join_dealer_bg.png"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="https://image.ixiumu.cn/video/join_dealer.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-white text-4xl md:text-6xl font-serif tracking-widest uppercase opacity-90 drop-shadow-lg text-center px-4">
                Partner With Us
            </h1>
        </div>
      </section>

      

      {/* 4. Brand Advantage (Zigzag Layout) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <h2 className="text-4xl font-serif text-center mb-20 italic">01. Brand Advantage</h2>
         
         <div className="space-y-20">
            {advantages.map((item, idx) => (
               <div key={idx} className={`flex flex-col md:flex-row gap-10 md:gap-20 items-center ${item.reverse ? 'md:flex-row-reverse' : ''}`}>
                  {/* Image */}
                  <div className="w-full md:w-1/2 overflow-hidden shadow-xl rounded-sm group">
                     <img 
                       src={item.img} 
                       alt={item.title} 
                       className="w-full h-auto object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
                     />
                  </div>
                  {/* Text */}
                  <div className="w-full md:w-1/2 space-y-6">
                     <h3 className="text-3xl font-serif text-[#1C1917]">{item.title}</h3>
                     <p className="text-zinc-600 font-light leading-relaxed text-sm md:text-base">
                       {item.desc}
                     </p>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* 5. Services Section (Dark Mode) */}
      <section className="py-24 px-6 bg-[#111] text-[#DCD3C8]">
         <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-serif text-center mb-20 italic">02. Exclusive Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
               {services.map((s, idx) => (
                  <div key={idx} className="space-y-3 hover:bg-white/5 p-6 rounded-md transition-colors border border-white/5">
                     <h4 className="text-xl font-serif text-white">◇ {s.title}</h4>
                     <p className="text-zinc-400 font-light text-sm leading-relaxed">{s.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. Investment Promotion (Parallax Style) */}
      <section className="relative py-32 px-6 bg-fixed bg-cover bg-center" style={{ backgroundImage: 'url("https://image.ixiumu.cn/front/brand/images/join/join_shop_7.png")' }}>
         <div className="absolute inset-0 bg-black/60"></div>
         <div className="relative z-10 max-w-4xl mx-auto text-center text-white space-y-10">
            <h2 className="text-4xl font-serif italic">03. Investment & Growth</h2>
            <p className="font-light leading-loose text-lg opacity-90">
               Rooted in solid wood furniture and driven by inspired design, WOODSLABS has attracted significant attention. 
               We aim to connect with brand owners, designers, and showrooms through innovative models, injecting more possibilities into diverse spaces.
            </p>
            <p className="font-light leading-loose text-lg opacity-90">
               We empower personalized franchise cooperation with tailored solutions. Join us in shaping modernist spaces that blend humanity and nature.
            </p>
         </div>
      </section>

      {/* 7. Process Flow */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <h2 className="text-4xl font-serif text-center mb-20 italic">04. Franchise Process</h2>
         
         <div className="flex flex-wrap justify-center items-center gap-6">
            {steps.map((step, idx) => (
               <React.Fragment key={idx}>
                  <div className="px-8 py-4 border border-zinc-300 text-zinc-800 text-sm uppercase tracking-widest hover:bg-[#1C1917] hover:text-white transition-all cursor-default">
                     {step}
                  </div>
                  {idx !== steps.length - 1 && (
                     <span className="text-zinc-300 text-xl">→</span>
                  )}
               </React.Fragment>
            ))}
         </div>
      </section>

      {/* 8. Footer */}
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