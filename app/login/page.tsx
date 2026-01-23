"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../woodslab/components/Navbar'; // เรียกใช้ Navbar ตัวเดิม

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // จำลองการโหลด
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="bg-[#FAF9F6] text-[#1C1917] font-sans selection:bg-[#d4a373] selection:text-white min-h-screen flex flex-col">
      
      {/* Import Fonts & Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Noto+Sans+Thai:wght@300;400;600&display=swap');
        
        body { font-family: 'Noto Sans Thai', sans-serif; }
        h1, h2, h3, h4, .font-serif { font-family: 'Cormorant Garamond', serif; }
        
        /* Custom Input Autofill color fix */
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px #ffffff inset;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Main Login Section */}
      <main className="flex-grow flex items-center justify-center relative w-full px-6 py-32">
         {/* Background Texture */}
         <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

         <div className="w-full max-w-md bg-white p-10 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#e5e5e5] relative z-10">
            
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-wide text-black mb-2">
                  WELCOME BACK
                </h1>
                <p className="text-zinc-500 text-sm font-light tracking-wider uppercase">
                  Log in to access your exclusive collection
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Email Input */}
                <div className="relative">
                    <input 
                      type="email" 
                      required
                      className="peer w-full border-b border-zinc-300 py-3 text-zinc-900 bg-transparent focus:outline-none focus:border-[#d4a373] transition-colors placeholder-transparent"
                      placeholder="Email Address"
                      id="email"
                    />
                    <label 
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-xs text-zinc-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#d4a373]"
                    >
                      Email Address
                    </label>
                </div>

                {/* Password Input */}
                <div className="relative">
                    <input 
                      type="password" 
                      required
                      className="peer w-full border-b border-zinc-300 py-3 text-zinc-900 bg-transparent focus:outline-none focus:border-[#d4a373] transition-colors placeholder-transparent"
                      placeholder="Password"
                      id="password"
                    />
                    <label 
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-xs text-zinc-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#d4a373]"
                    >
                      Password
                    </label>
                </div>

                <div className="flex justify-between items-center text-xs text-zinc-500">
                    <label className="flex items-center cursor-pointer hover:text-black transition-colors">
                        <input type="checkbox" className="mr-2 accent-[#d4a373]" />
                        Remember me
                    </label>
                    <a href="#" className="hover:text-[#d4a373] transition-colors border-b border-transparent hover:border-[#d4a373]">Forgot Password?</a>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#1C1917] text-white text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#d4a373] transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>

            </form>

            {/* Register Link */}
            <div className="mt-10 text-center pt-8 border-t border-zinc-100">
                <p className="text-zinc-500 text-sm font-light">
                  Don't have an account? <br className="md:hidden" />
                  <Link href="/register" className="ml-1 text-[#1C1917] font-medium border-b border-black hover:text-[#d4a373] hover:border-[#d4a373] transition-colors">
                    Create an account
                  </Link>
                </p>
            </div>

         </div>
      </main>

      {/* 3. Footer */}
      <footer className="py-12 bg-[#0a0a0a] text-white border-t border-white/5 px-8 md:px-12 mt-auto">
        <div className="max-w-8xl mx-auto text-center">
            <h2 className="text-2xl font-serif font-bold tracking-[0.2em] uppercase text-white mb-6 opacity-50">WOODSLABS</h2>
            <div className="text-[10px] text-zinc-600 uppercase tracking-widest">
              &copy; 2026 Woodslabs Industry Co., Ltd.
            </div>
        </div>
      </footer>

    </div>
  );
}