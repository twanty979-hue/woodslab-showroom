'use client'

import React, { useState, useEffect, useRef } from 'react';

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
const SubmitButton = () => (
    <button 
      type="button" 
      className="group relative inline-block w-full py-5 border border-zinc-200 text-zinc-800 uppercase tracking-[0.3em] text-[10px] font-bold transition-all duration-500 overflow-hidden mt-8"
    >
      <span className="absolute inset-0 bg-[#d4a373] transition-all duration-500 ease-out w-0 group-hover:w-full"></span>
      <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
        Send Message
      </span>
    </button>
);

export default function ContactPage() {
  return (
    <div className="bg-[#FAF9F6] text-[#1C1917] font-sans selection:bg-[#d4a373] selection:text-white min-h-screen flex flex-col">
      
      {/* 1. Header Section */}
      <section className="relative pt-32 pb-12 px-6 text-center">
         <FadeInSection>
            <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight text-[#1C1917] mb-4 uppercase">
              Contact Us
            </h1>
            <p className="text-zinc-500 text-[10px] md:text-xs font-light tracking-[0.2em] uppercase">
              We'd love to hear from you
            </p>
            <div className="w-16 h-[1px] bg-[#d4a373] mx-auto mt-8"></div>
         </FadeInSection>
      </section>

      {/* 2. Content Grid (Info & Form) */}
      <section className="flex-grow w-full max-w-6xl mx-auto px-6 py-12 md:py-20">
         <div className="flex flex-col md:flex-row gap-16 md:gap-24">
            
            {/* Left: Contact Info */}
            <div className="w-full md:w-5/12 space-y-12">
               <FadeInSection>
                   <div className="space-y-8">
                       <div>
                           <h3 className="text-xl font-serif text-[#1C1917] mb-4">Headquarters</h3>
                           <p className="text-zinc-500 font-light leading-relaxed">
                               123 Sukhumvit 55, Thonglor<br />
                               Watthana, Bangkok 10110<br />
                               Thailand
                           </p>
                       </div>

                       <div>
                           <h3 className="text-xl font-serif text-[#1C1917] mb-4">Contact</h3>
                           <p className="text-zinc-500 font-light leading-relaxed">
                               <span className="block mb-1">E: contact@woodslabs.com</span>
                               <span className="block">T: +66 2-123-4567</span>
                           </p>
                       </div>

                       <div>
                           <h3 className="text-xl font-serif text-[#1C1917] mb-4">Opening Hours</h3>
                           <p className="text-zinc-500 font-light leading-relaxed">
                               Mon - Fri: 10:00 - 19:00<br />
                               Sat - Sun: 10:00 - 20:00
                           </p>
                       </div>

                       {/* Social Links */}
                       <div className="pt-6 border-t border-zinc-200">
                           <div className="flex gap-6 text-xs font-bold uppercase tracking-[0.2em] text-[#d4a373]">
                               <a href="#" className="hover:text-[#1C1917] transition-colors">Instagram</a>
                               <a href="#" className="hover:text-[#1C1917] transition-colors">Facebook</a>
                               <a href="#" className="hover:text-[#1C1917] transition-colors">Line Official</a>
                           </div>
                       </div>
                   </div>
               </FadeInSection>
            </div>

            {/* Right: Contact Form (Style เดียวกับ Register) */}
            <div className="w-full md:w-7/12 bg-white p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-zinc-100">
               <FadeInSection>
                   <h3 className="text-2xl font-serif text-[#1C1917] mb-8">Send an Inquiry</h3>
                   <form className="space-y-10">
                       
                       {/* Name */}
                       <div className="relative group">
                           <input type="text" id="name" required className="block py-3 px-0 w-full text-base text-zinc-800 bg-transparent border-0 border-b border-zinc-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#d4a373] peer transition-all duration-300 placeholder-transparent" placeholder="Name" />
                           <label htmlFor="name" className="absolute text-[10px] uppercase tracking-[0.2em] text-zinc-400 duration-300 transform -translate-y-8 scale-100 top-3 -z-10 origin-[0] peer-focus:text-[#d4a373] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-8 font-bold">Name</label>
                       </div>

                       {/* Email */}
                       <div className="relative group">
                           <input type="email" id="email" required className="block py-3 px-0 w-full text-base text-zinc-800 bg-transparent border-0 border-b border-zinc-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#d4a373] peer transition-all duration-300 placeholder-transparent" placeholder="Email" />
                           <label htmlFor="email" className="absolute text-[10px] uppercase tracking-[0.2em] text-zinc-400 duration-300 transform -translate-y-8 scale-100 top-3 -z-10 origin-[0] peer-focus:text-[#d4a373] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-8 font-bold">Email</label>
                       </div>

                       {/* Message */}
                       <div className="relative group">
                           <textarea id="message" rows={4} required className="block py-3 px-0 w-full text-base text-zinc-800 bg-transparent border-0 border-b border-zinc-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#d4a373] peer transition-all duration-300 placeholder-transparent resize-none" placeholder="Message"></textarea>
                           <label htmlFor="message" className="absolute text-[10px] uppercase tracking-[0.2em] text-zinc-400 duration-300 transform -translate-y-8 scale-100 top-3 -z-10 origin-[0] peer-focus:text-[#d4a373] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-8 font-bold">Message</label>
                       </div>

                       <SubmitButton />
                   </form>
               </FadeInSection>
            </div>

         </div>
      </section>

      {/* 3. Map Section (Visual Only) */}
      <section className="w-full h-[400px] bg-zinc-200 grayscale relative">
         <iframe 
           width="100%" 
           height="100%" 
           frameBorder="0" 
           scrolling="no" 
           marginHeight={0} 
           marginWidth={0} 
           src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Thong%20Lor,%20Bangkok+(WOODSLABS)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
           className="opacity-60 hover:opacity-100 transition-opacity duration-500"
         ></iframe>
         <div className="absolute inset-0 pointer-events-none border-t border-b border-white/20"></div>
      </section>

      {/* 4. Footer */}
      <footer className="py-20 bg-[#0a0a0a] text-white border-t border-white/5 px-8 md:px-12">
        <div className="max-w-8xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-serif font-bold tracking-[0.2em] uppercase text-white opacity-50">WOODSLABS</h2>
            <div className="text-[10px] text-zinc-600 uppercase tracking-widest">
              &copy; 2026 Woodslabs Industry Co., Ltd. All Rights Reserved.
            </div>
        </div>
      </footer>

    </div>
  );
}