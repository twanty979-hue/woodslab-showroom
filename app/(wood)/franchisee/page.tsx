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

export default function FranchiseePage() {
  // --- Slideshow Logic ---
  const heroImages = [
    "https://zexflchjcycxrpjkuews.supabase.co/storage/v1/object/public/site-assets/general/fabad5b938cce52b88d5345aa768ecfb-nabga.webp",
    "https://zexflchjcycxrpjkuews.supabase.co/storage/v1/object/public/site-assets/general/d7d74b86ce37455e1096f2b226ed3afe-wtlxd.webp",
    "https://zexflchjcycxrpjkuews.supabase.co/storage/v1/object/public/site-assets/general/9bafb334fd20b209ade54f7ee75b489a-zd554.webp"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // เปลี่ยนรูปทุกๆ 5 วินาที
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const advantages = [
    {
      title: "Material Selection",
      desc: "We boast a high-quality procurement team that regularly visits sustainable forests worldwide for professional material selection. We prioritize century-old trees with minimal heartwood cracking and unique natural shapes. We use world-class wood to create world-class slabs.",
      img: "https://zexflchjcycxrpjkuews.supabase.co/storage/v1/object/public/site-assets/general/f473ea3dcaf601f3c6ee4b6b75e505b0-l896u.webp",
      reverse: false
    },
    {
      title: "Design Philosophy",
      desc: "Our design team deeply understands the characteristics and beauty of wood. While preserving natural traits, we incorporate modern furniture design concepts, creating 14 creative edge styles and 17 inspired surface designs. Users can freely choose and customize.",
      img: "https://zexflchjcycxrpjkuews.supabase.co/storage/v1/object/public/site-assets/general/68472cc7da4659be15da224c8a898827-7v52j.webp",
      reverse: true
    },
    {
      title: "Master Craftsmanship",
      desc: "Equipped with a professional technical team, we specialize in solid wood slab craftsmanship. We ensure that our processes do not compromise the wood's inherent stability while creating 18 surface colors and 9 surface textures.",
      img: "https://zexflchjcycxrpjkuews.supabase.co/storage/v1/object/public/site-assets/general/5d3bdeb73b39b3dd05fd75c9e80711e9-qqox1.webp",
      reverse: false
    },
    {
      title: "Advanced Technology",
      desc: "Supported by globally leading technology, we utilize imported Japanese high-frequency drying equipment and large-scale wood leveling machines. Our woodworking team with 15 years of experience safeguards every step of production.",
      img: "https://zexflchjcycxrpjkuews.supabase.co/storage/v1/object/public/site-assets/general/a8bceb7a237a54537e38cc24da55a6c4-ie2cd.webp",
      reverse: true
    },
    {
      title: "Eco-Responsibility",
      desc: "As advocates of proactive ecology, we meticulously control every detail of environmental sustainability, from raw wood selection and resin materials to adhesives and surface coatings. We ensure safety, eco-friendliness, and durability.",
      img: "https://zexflchjcycxrpjkuews.supabase.co/storage/v1/object/public/site-assets/general/e9baa1b8ae605818af42473d388bf0eb-xwcek.webp",
      reverse: false
    },
    {
      title: "Exclusive Collection",
      desc: "With a collection of over 10,000 air-dried slabs and 1,500+ premium slabs in stock, we offer more than 40 rare wood species from Europe, North America, South America, Africa, and Southeast Asia.",
      img: "https://zexflchjcycxrpjkuews.supabase.co/storage/v1/object/public/site-assets/general/8ddac0c25fa633cb6bbdfcb4a031254c-0arvm.webp",
      reverse: true
    }
  ];

  const services = [
    { title: 'Shared Product System', desc: 'Access to 10,000+ raw slabs, 1,500+ finished slabs, and handmade furniture.' },
    { title: 'Unified Pricing', desc: 'Consistent retail pricing across online and offline channels to protect dealer integrity.' },
    { title: 'Regional Protection', desc: 'Exclusive agency rights within designated areas to ensure market stability.' },
    { title: 'One-Stop Service', desc: 'From location selection and store design to product display strategies.' },
    { title: 'Custom Solutions', desc: 'Tailored store style solutions to enhance the customer shopping experience.' },
    { title: 'Expert Training', desc: 'Comprehensive training on brand knowledge, product details, and service standards.' },
    { title: 'Operational Support', desc: 'Strategic operational plans connecting online and offline ecosystems.' },
  ];

  const steps = [
    { num: '01', title: 'Consultation' },
    { num: '02', title: 'Q&A Session' },
    { num: '03', title: 'Research' },
    { num: '04', title: 'Intent' },
    { num: '05', title: 'Agreement' },
    { num: '06', title: 'Cooperation' },
  ];

  return (
    <div className="bg-[#FAF9F6] text-[#1C1917] font-sans selection:bg-[#d4a373] selection:text-white min-h-screen flex flex-col">
      
      {/* 1. Hero Image Slideshow */}
      <section className="relative w-full h-[60vh] md:h-[80vh] bg-black overflow-hidden">
        {heroImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-60' : 'opacity-0'
            }`}
          >
            <img 
              src={src} 
              alt={`Partner Slide ${index}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 flex items-center justify-center">
            <FadeInSection>
                <h1 className="text-white text-5xl md:text-7xl font-serif tracking-widest uppercase opacity-90 drop-shadow-2xl text-center px-4">
                    Partner With Us
                </h1>
                <p className="text-white/80 text-center mt-6 text-xs md:text-sm uppercase tracking-[0.3em] font-light">
                    Join the legacy of crafting nature
                </p>
            </FadeInSection>
        </div>
      </section>

      {/* 2. Brand Advantage */}
      <section className="py-24 md:py-32 bg-[#FAF9F6]">
         <div className="text-center mb-24">
             <span className="text-[#d4a373] text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">Why Choose Us</span>
             <h2 className="text-4xl md:text-5xl font-serif text-[#1C1917]">Brand Advantages</h2>
         </div>
         
         <div className="space-y-0">
            {advantages.map((item, idx) => (
               <div key={idx} className={`flex flex-col md:flex-row ${item.reverse ? 'md:flex-row-reverse' : ''} bg-white group`}>
                  <div className="w-full md:w-1/2 h-[400px] md:h-[600px] overflow-hidden relative">
                     <img 
                       src={item.img} 
                       alt={item.title} 
                       className="w-full h-full object-cover transition-transform duration-[2s] ease-in-out group-hover:scale-110" 
                     />
                     <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700"></div>
                  </div>
                  <div className={`w-full md:w-1/2 p-10 md:p-24 flex flex-col justify-center ${idx % 2 === 0 ? 'bg-[#FAF9F6]' : 'bg-white'}`}>
                     <FadeInSection>
                        <span className="text-[#d4a373] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">
                           0{idx + 1}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-serif text-[#1C1917] mb-6">{item.title}</h3>
                        <p className="text-zinc-500 font-light leading-loose text-sm md:text-base text-justify">
                           {item.desc}
                        </p>
                     </FadeInSection>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* 3. Exclusive Services */}
      <section className="py-32 px-6 bg-[#111] text-[#DCD3C8]">
         <div className="max-w-6xl mx-auto">
            <FadeInSection>
                <div className="text-center mb-24">
                    <span className="text-[#d4a373] text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">Support System</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-white">Exclusive Services</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                   {services.map((s, idx) => (
                      <div key={idx} className="group p-8 border border-white/5 hover:border-[#d4a373]/30 transition-colors duration-500 bg-white/[0.02]">
                         <h4 className="text-xl font-serif text-white mb-4 group-hover:text-[#d4a373] transition-colors">{s.title}</h4>
                         <p className="text-zinc-500 font-light text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">{s.desc}</p>
                      </div>
                   ))}
                </div>
            </FadeInSection>
         </div>
      </section>

      {/* 4. Investment & Growth */}
      <section className="relative py-40 px-6 bg-fixed bg-cover bg-center" style={{ backgroundImage: 'url("https://zexflchjcycxrpjkuews.supabase.co/storage/v1/object/public/site-assets/general/joinshop7-l6un4.webp")' }}>
         <div className="absolute inset-0 bg-black/70"></div>
         <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <FadeInSection>
                <span className="text-[#d4a373] text-[10px] font-bold uppercase tracking-[0.3em] block mb-6">Opportunity</span>
                <h2 className="text-4xl md:text-6xl font-serif mb-12 leading-tight">
                  Investment & Growth
                </h2>
                <div className="space-y-8 text-lg font-light leading-loose text-zinc-300">
                   <p>
                      Rooted in solid wood furniture and driven by inspired design, WOODSLABS has attracted significant attention. 
                      We aim to connect with brand owners, designers, and showrooms through innovative models.
                   </p>
                   <p>
                      We empower personalized franchise cooperation with tailored solutions. Join us in shaping modernist spaces that blend humanity and nature.
                   </p>
                </div>
                
                <Link 
                  href="/contact" 
                  className="inline-block mt-16 px-12 py-4 border border-white/20 text-white uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-white hover:text-black transition-all duration-500"
                >
                  Contact For Inquiry
                </Link>
            </FadeInSection>
         </div>
      </section>

      {/* 5. Process Flow */}
      <section className="py-32 px-6 bg-[#FAF9F6]">
         <div className="max-w-7xl mx-auto">
             <div className="text-center mb-20">
                 <span className="text-[#d4a373] text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">The Process</span>
                 <h2 className="text-4xl md:text-5xl font-serif text-[#1C1917]">Franchise Roadmap</h2>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {steps.map((step, idx) => (
                   <FadeInSection key={idx} className="text-center group">
                      <div className="w-full aspect-square border border-zinc-200 flex flex-col items-center justify-center p-4 group-hover:border-[#d4a373] group-hover:bg-white transition-all duration-500 relative overflow-hidden">
                          <span className="text-4xl font-serif text-zinc-200 group-hover:text-[#d4a373]/20 transition-colors absolute top-2 right-4 font-bold">
                             {step.num}
                          </span>
                          <span className="text-[#1C1917] font-serif text-lg z-10 relative mt-4">
                             {step.title}
                          </span>
                          <div className="w-8 h-[1px] bg-[#d4a373] mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                      </div>
                   </FadeInSection>
                ))}
             </div>
         </div>
      </section>

      {/* 6. Footer */}
      <footer className="py-20 bg-[#0a0a0a] text-white border-t border-white/5 px-8 md:px-12 mt-auto">
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