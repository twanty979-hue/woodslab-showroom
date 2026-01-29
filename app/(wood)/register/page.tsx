'use client'

import React, { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import Navbar from '@/src/components/Navbar' // เช็ค Path ให้ถูกนะครับ
import { register } from '@/app/actions/register'

// ✅ ปุ่ม Submit แบบ Minimalist Hover (เหมือนหน้า Profile/Cart)
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="group relative inline-block w-full py-5 border border-zinc-200 text-zinc-800 uppercase tracking-[0.3em] text-[10px] font-bold transition-all duration-500 overflow-hidden mt-8"
    >
      {/* พื้นหลังสีทองวิ่งขึ้นมา */}
      <span className={`absolute inset-0 bg-[#d4a373] transition-all duration-500 ease-out ${pending ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
      
      {/* ข้อความ */}
      <span className={`relative z-10 transition-colors duration-500 ${pending ? 'text-white' : 'group-hover:text-white'}`}>
        {pending ? 'Creating Account...' : 'Create Account'}
      </span>
    </button>
  )
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(register, null)

  return (
    <div className="bg-[#FAF9F6] text-[#1C1917] font-sans selection:bg-[#d4a373] selection:text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center relative w-full px-6 py-32">
         {/* Background Texture */}
         <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

         <div className="w-full max-w-md bg-white p-10 md:p-14 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-zinc-100 relative z-10">
            
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-[#1C1917] mb-3 uppercase">
                  Join The Club
                </h1>
                <p className="text-zinc-500 text-[10px] md:text-xs font-light tracking-[0.2em] uppercase">
                  Create your exclusive account
                </p>
                <div className="w-16 h-[1px] bg-[#d4a373] mx-auto mt-6"></div>
            </div>

            {/* Error Message */}
            {state?.error && (
              <div className="mb-8 p-4 bg-red-50 text-red-800 text-xs text-center border border-red-100 tracking-wide">
                {state.error}
              </div>
            )}

            <form action={formAction} className="space-y-10">
                
                {/* Full Name */}
                <div className="relative group">
                    <input 
                      type="text" name="fullName" id="fullName" required
                      className="block py-3 px-0 w-full text-base text-zinc-800 bg-transparent border-0 border-b border-zinc-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#d4a373] peer transition-all duration-300 placeholder-transparent"
                      placeholder="Full Name"
                    />
                    <label htmlFor="fullName" className="absolute text-[10px] uppercase tracking-[0.2em] text-zinc-400 duration-300 transform -translate-y-8 scale-100 top-3 -z-10 origin-[0] peer-focus:text-[#d4a373] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-8 font-bold">
                      Full Name
                    </label>
                </div>

                {/* Email */}
                <div className="relative group">
                    <input 
                      type="email" name="email" id="email" required
                      className="block py-3 px-0 w-full text-base text-zinc-800 bg-transparent border-0 border-b border-zinc-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#d4a373] peer transition-all duration-300 placeholder-transparent"
                      placeholder="Email Address"
                    />
                    <label htmlFor="email" className="absolute text-[10px] uppercase tracking-[0.2em] text-zinc-400 duration-300 transform -translate-y-8 scale-100 top-3 -z-10 origin-[0] peer-focus:text-[#d4a373] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-8 font-bold">
                      Email Address
                    </label>
                </div>

                {/* Password */}
                <div className="relative group">
                    <input 
                      type="password" name="password" id="password" required minLength={6}
                      className="block py-3 px-0 w-full text-base text-zinc-800 bg-transparent border-0 border-b border-zinc-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#d4a373] peer transition-all duration-300 placeholder-transparent"
                      placeholder="Password"
                    />
                    <label htmlFor="password" className="absolute text-[10px] uppercase tracking-[0.2em] text-zinc-400 duration-300 transform -translate-y-8 scale-100 top-3 -z-10 origin-[0] peer-focus:text-[#d4a373] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-8 font-bold">
                      Password
                    </label>
                </div>

                {/* Confirm Password */}
                <div className="relative group">
                    <input 
                      type="password" name="confirmPassword" id="confirmPassword" required minLength={6}
                      className="block py-3 px-0 w-full text-base text-zinc-800 bg-transparent border-0 border-b border-zinc-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#d4a373] peer transition-all duration-300 placeholder-transparent"
                      placeholder="Confirm Password"
                    />
                    <label htmlFor="confirmPassword" className="absolute text-[10px] uppercase tracking-[0.2em] text-zinc-400 duration-300 transform -translate-y-8 scale-100 top-3 -z-10 origin-[0] peer-focus:text-[#d4a373] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-8 font-bold">
                      Confirm Password
                    </label>
                </div>

                <SubmitButton />
            </form>

            <div className="mt-12 text-center">
               <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-4">Already a member?</p>
               <Link href="/login" className="text-xs font-bold text-[#1C1917] border-b border-zinc-300 pb-1 hover:text-[#d4a373] hover:border-[#d4a373] transition-colors uppercase tracking-[0.2em]">
                 Sign In Here
               </Link>
            </div>

         </div>
      </main>

      <footer className="py-12 bg-[#0a0a0a] text-white border-t border-white/5 px-8 md:px-12 mt-auto">
        <div className="max-w-8xl mx-auto text-center">
            <h2 className="text-2xl font-serif font-bold tracking-[0.2em] uppercase text-white mb-6 opacity-50">WOODSLABS</h2>
            <div className="text-[10px] text-zinc-600 uppercase tracking-widest">
              &copy; 2026 Woodslabs Industry Co., Ltd.
            </div>
        </div>
      </footer>
    </div>
  )
}