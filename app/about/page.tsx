"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../woodslab/components/Navbar'; // เรียกใช้ Navbar ตัวเดิม

export default function AboutPage() {
  
  // ข้อมูลเนื้อหา (Story Sections)
  const stories = [
    {
      title: "A Long Journey to Find\nThe Perfect Slab for You",
      desc: "To fully bring out the unique character of each tree and create warm, enduring slab furniture, WOODSLABS meticulously searches for and selects the most suitable wood. We scour the world’s top forests and timber suppliers, hoping to find century-old rare logs perfect for crafting large slabs. With sincerity and patience, we carefully select from countless logs of varying shapes and forms, all to find the perfect piece of wood and to discover the ideal slab for every user’s heart.",
      img: "https://image.ixiumu.cn/front/brand/images/about_1_new.png",
      reverse: false, // รูปซ้าย ข้อความขวา
      bgColor: "bg-[#F9F6F2]"
    },
    {
      title: "Natural Materials, Natural Living\nExperience the Natural Life Through Use",
      desc: "Starting with the essence of trees, their greatest attribute is their natural origin. Trees grow naturally over long periods of time, and we aim to preserve this rare and precious sense of nature. We do not disrupt the natural shapes, textures, or marks inherent in the wood. Instead, we infuse it with the natural-inspired design language of our craftsmen, creating refreshingly natural slab furniture. This builds a harmonious space between people and nature, allowing individuals to feel the simple, natural comfort of life through wooden furniture.",
      img: "https://image.ixiumu.cn/front/brand/images/about_2_new.png",
      reverse: true, // รูปขวา ข้อความซ้าย
      bgColor: "bg-white"
    },
    {
      title: "From Material Expression to Design Language\nWe Want to Offer You the World’s Only Slab Table",
      desc: "We aim to provide users with a unique experience. From a one-of-a-kind log to a singular slab, whether in shape, texture, color, natural edge, or scent, each piece carries its own distinct personality, never identical. Our experienced craftsmen dedicate themselves day and night, preserving the tree’s natural attributes while integrating the most fitting personalized design for each slab. This results in not just a one-of-a-kind slab table, but also a unique lifestyle and aesthetic tailored to the user.",
      img: "https://image.ixiumu.cn/front/brand/images/about_3_new.png",
      reverse: false,
      bgColor: "bg-[#F9F6F2]"
    },
    {
      title: "Condensing Every Memory of Use into the Growth Rings\nThen Passing It On, Continuously...",
      desc: "If the memory of a single slab had weight, it would undoubtedly be heavy. It travels through endless time to reach everyday life, carrying the grand journey of a century-old tree. Every fleeting memory transforms into the marks of growth rings, then becomes a slab, entering people’s lives. A family dining together at the table, a child doing homework at the desk, a leisurely afternoon tea... All life scenes quietly unfold on a single slab, warmly carrying a family’s seasons, meals, and laughter.",
      img: "https://image.ixiumu.cn/front/brand/images/about_4_new.png",
      reverse: true,
      bgColor: "bg-white"
    }
  ];

  return (
    <div className="bg-[#FAF9F6] text-[#1C1917] font-sans selection:bg-[#d4a373] selection:text-white min-h-screen">
      
      {/* Import Fonts & Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Noto+Serif+Thai:wght@300;400;600&family=Noto+Sans+Thai:wght@300;400&display=swap');
        
        body { font-family: 'Noto Sans Thai', sans-serif; }
        h1, h2, h3, h4, .font-serif { font-family: 'Cormorant Garamond', 'Noto Serif Thai', serif; }
      `}</style>

      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Video Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-black">
        <video 
          className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
          poster="https://image.ixiumu.cn/front/brand/images/about_bg.png"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="https://image.ixiumu.cn/video/about.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h1 className="text-white text-5xl md:text-7xl font-serif tracking-widest uppercase opacity-90 drop-shadow-lg">
                About Us
            </h1>
        </div>
      </section>

      {/* 3. Philosophy Section (Black Background) */}
      <section className="bg-[#0a0a0a] text-[#DCD3C8] py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-12 reveal">
           <h2 className="text-3xl md:text-5xl font-serif italic leading-tight">
             Furniture That Feels Like <span className="text-[#d4a373]">Family</span><br/>
             Bringing Warmth in Every Moment
           </h2>

           <div className="space-y-8 text-base md:text-lg font-light leading-loose opacity-80">
              <p>
                The Lifespan of a Single Slab... We have not calculated it and cannot predict it.
                Creating large slab tables that customers can use indefinitely has always been the goal of WOODSLABS.
                We hope our single slab can be passed down through generations.
              </p>
              <p>
                We source legal timber from world-class suppliers, then take the slowest possible time to craft a single slab.
                Our craftsmen pour their sincerity into the process, persisting in using natural-inspired design language 
                to discover and create the beauty of wood.
              </p>
              <p>
                “Let every piece of wood warm the world.”
              </p>
           </div>
        </div>
      </section>

      {/* 4. Story Sections (Alternating Grid) */}
      <div className="flex flex-col">
        {stories.map((item, index) => (
          <section key={index} className={`flex flex-col md:flex-row ${item.reverse ? 'md:flex-row-reverse' : ''}`}>
            
            {/* Image Side */}
            <div className="w-full md:w-1/2 h-[400px] md:h-[600px] relative overflow-hidden group">
               <img 
                 src={item.img} 
                 alt={`About Story ${index+1}`} 
                 className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
            </div>

            {/* Text Side */}
            <div className={`w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center ${item.bgColor}`}>
               <div className="max-w-lg mx-auto">
                 <h3 className="text-2xl md:text-3xl font-serif text-[#1C1917] mb-8 leading-snug whitespace-pre-line">
                   {item.title}
                 </h3>
                 <p className="text-zinc-600 font-light leading-loose text-sm md:text-base">
                   {item.desc}
                 </p>
               </div>
            </div>

          </section>
        ))}
      </div>

      {/* 5. Footer (Simple Version matching Woodslabs style) */}
      <footer className="py-20 bg-[#0a0a0a] text-white border-t border-white/5 px-8 md:px-12">
        <div className="max-w-8xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-serif font-bold tracking-[0.2em] uppercase text-white">WOODSLABS</h2>
            <p className="text-zinc-500 text-xs uppercase tracking-[0.3em]">
              Crafting legacy pieces from nature's finest materials since 2016.
            </p>
            <div className="pt-8 border-t border-white/10 text-[10px] text-zinc-600 uppercase tracking-widest">
              &copy; 2026 Woodslabs Industry Co., Ltd. All Rights Reserved.
            </div>
        </div>
      </footer>

    </div>
  );
}