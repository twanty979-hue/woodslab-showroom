'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

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

export default function AboutPage() {
  // --- Slideshow Logic ---
  const heroImages = [
    "https://i.pinimg.com/1200x/49/1c/63/491c6398d55fbfbcaea1f72c28476fbb.jpg",
    "https://i.pinimg.com/736x/d0/00/db/d000dbd3b5ba2ef378a758bf3616a69f.jpg",
    "https://i.pinimg.com/1200x/62/47/fa/6247fa479cb8f3687125c5516e59daed.jpg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // เปลี่ยนรูปทุกๆ 5 วินาที
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const stories = [
    {
      subtitle: "The Journey",
      title: "Finding The Perfect Slab",
      desc: "To fully bring out the unique character of each tree and create warm, enduring slab furniture, WOODSLABS meticulously searches for and selects the most suitable wood. We scour the world’s top forests and timber suppliers, hoping to find century-old rare logs perfect for crafting large slabs. With sincerity and patience, we carefully select from countless logs of varying shapes and forms, all to find the perfect piece of wood and to discover the ideal slab for every user’s heart.",
      img: "https://image.ixiumu.cn/front/brand/images/about_1_new.png",
      reverse: false,
    },
    {
      subtitle: "Philosophy",
      title: "Natural Living",
      desc: "Starting with the essence of trees, their greatest attribute is their natural origin. Trees grow naturally over long periods of time, and we aim to preserve this rare and precious sense of nature. We do not disrupt the natural shapes, textures, or marks inherent in the wood. Instead, we infuse it with the natural-inspired design language of our craftsmen, creating refreshingly natural slab furniture. This builds a harmonious space between people and nature.",
      img: "https://image.ixiumu.cn/front/brand/images/about_2_new.png",
      reverse: true,
    },
    {
      subtitle: "Craftsmanship",
      title: "Unique Design Language",
      desc: "We aim to provide users with a unique experience. From a one-of-a-kind log to a singular slab, whether in shape, texture, color, natural edge, or scent, each piece carries its own distinct personality, never identical. Our experienced craftsmen dedicate themselves day and night, preserving the tree’s natural attributes while integrating the most fitting personalized design for each slab.",
      img: "https://image.ixiumu.cn/front/brand/images/about_3_new.png",
      reverse: false,
    },
    {
      subtitle: "Legacy",
      title: "Passing It On",
      desc: "If the memory of a single slab had weight, it would undoubtedly be heavy. It travels through endless time to reach everyday life, carrying the grand journey of a century-old tree. Every fleeting memory transforms into the marks of growth rings, then becomes a slab, entering people’s lives. A family dining together at the table, a child doing homework at the desk, a leisurely afternoon tea... All life scenes quietly unfold on a single slab.",
      img: "https://image.ixiumu.cn/front/brand/images/about_4_new.png",
      reverse: true,
    }
  ];

  return (
    <div className="bg-[#FAF9F6] text-[#1C1917] font-sans selection:bg-[#d4a373] selection:text-white min-h-screen">
      
      {/* 1. Hero Image Slideshow Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-black">
        {heroImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-60' : 'opacity-0'
            }`}
          >
            <img 
              src={src} 
              alt={`Slide ${index}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 flex items-center justify-center">
          <FadeInSection>
            <h1 className="text-white text-5xl md:text-8xl font-serif tracking-widest uppercase opacity-90 drop-shadow-2xl text-center">
              Our Story
            </h1>
            <p className="text-white/80 text-center mt-4 text-xs md:text-sm uppercase tracking-[0.3em] font-light">
              Crafting nature's legacy since 2016
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* 2. Intro Text */}
      <section className="py-24 md:py-32 px-6 bg-[#FAF9F6]">
        <FadeInSection className="max-w-4xl mx-auto text-center">
           <p className="text-[#d4a373] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-6">
             The Philosophy
           </p>
           <h2 className="text-3xl md:text-5xl font-serif text-[#1C1917] leading-tight mb-8">
             "Furniture That Feels Like Family,<br className="hidden md:block" />
             Bringing Warmth in Every Moment"
           </h2>
           <p className="text-zinc-500 font-light leading-loose text-sm md:text-lg max-w-2xl mx-auto">
             The lifespan of a single slab... We have not calculated it and cannot predict it. 
             Creating large slab tables that customers can use indefinitely has always been our goal. 
             We hope our single slab can be passed down through generations.
           </p>
           <div className="w-20 h-[1px] bg-[#d4a373] mx-auto mt-12"></div>
        </FadeInSection>
      </section>

      {/* 3. Story Sections (Zig-Zag Layout) */}
      <div className="space-y-0">
        {stories.map((item, index) => (
          <section key={index} className={`flex flex-col md:flex-row ${item.reverse ? 'md:flex-row-reverse' : ''} bg-white`}>
            <div className="w-full md:w-1/2 h-[400px] md:h-[700px] relative overflow-hidden group">
               <img 
                 src={item.img} 
                 alt={item.title} 
                 className="w-full h-full object-cover transition-transform duration-[2s] ease-in-out group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700"></div>
            </div>
            <div className={`w-full md:w-1/2 p-10 md:p-24 flex flex-col justify-center ${index % 2 === 0 ? 'bg-[#FAF9F6]' : 'bg-white'}`}>
               <FadeInSection>
                 <span className="text-[#d4a373] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">
                   0{index + 1} — {item.subtitle}
                 </span>
                 <h3 className="text-3xl md:text-4xl font-serif text-[#1C1917] mb-8 leading-tight">
                   {item.title}
                 </h3>
                 <p className="text-zinc-500 font-light leading-loose text-sm md:text-base text-justify">
                   {item.desc}
                 </p>
               </FadeInSection>
            </div>
          </section>
        ))}
      </div>

      {/* 4. Call to Action (CTA) */}
      <section className="py-32 px-6 bg-[#FAF9F6] text-center">
        <FadeInSection>
           <h2 className="text-3xl md:text-5xl font-serif text-[#1C1917] mb-6">
             Ready to Find Your Piece?
           </h2>
           <p className="text-zinc-500 mb-12 max-w-lg mx-auto font-light leading-relaxed">
             Explore our curated collection of rare wood slabs, each waiting to tell its own story in your home.
           </p>
           <Link 
             href="/woodslab" 
             className="group relative inline-block px-12 py-4 border border-zinc-200 text-zinc-800 uppercase tracking-[0.3em] text-[10px] font-bold transition-all duration-500 overflow-hidden"
           >
             <span className="absolute inset-0 w-0 bg-[#d4a373] transition-all duration-500 ease-out group-hover:w-full"></span>
             <span className="relative z-10 group-hover:text-white transition-colors duration-500">
               Explore Collection
             </span>
           </Link>
        </FadeInSection>
      </section>

      {/* 5. Footer */}
      <footer className="py-20 bg-[#0a0a0a] text-white border-t border-white/5 px-8 md:px-12">
        <div className="max-w-8xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-serif font-bold tracking-[0.2em] uppercase text-white opacity-50">WOODSLABS</h2>
            <div className="text-[10px] text-zinc-600 uppercase tracking-widest">
              &copy; 2026 Woodslabs Industry Co., Ltd.
            </div>
        </div>
      </footer>
    </div>
  );
}