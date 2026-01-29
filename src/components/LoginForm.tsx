'use client'

import React, { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { login } from '@/app/actions/auth' // ⚠️ ตรวจสอบว่าคุณมี action นี้ หรือเปลี่ยนไปใช้อันที่คุณมี

// ปุ่ม Submit สไตล์ Minimalist Hover
function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="group relative inline-block w-full py-5 border border-zinc-200 text-zinc-800 uppercase tracking-[0.3em] text-[10px] font-bold transition-all duration-500 overflow-hidden mt-8"
    >
      <span className={`absolute inset-0 bg-[#d4a373] transition-all duration-500 ease-out ${pending ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
      <span className={`relative z-10 transition-colors duration-500 ${pending ? 'text-white' : 'group-hover:text-white'}`}>
        {pending ? 'Authenticating...' : 'Sign In'}
      </span>
    </button>
  )
}

export default function LoginForm() {
  // สมมติว่าใช้ Server Action ชื่อ login
  const [state, formAction] = useActionState(login, null)

  return (
    <>
      {/* Error Message */}
      {state?.error && (
        <div className="mb-8 p-4 bg-red-50 text-red-800 text-xs text-center border border-red-100 tracking-wide">
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-10">
          
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
                type="password" name="password" id="password" required
                className="block py-3 px-0 w-full text-base text-zinc-800 bg-transparent border-0 border-b border-zinc-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#d4a373] peer transition-all duration-300 placeholder-transparent"
                placeholder="Password"
              />
              <label htmlFor="password" className="absolute text-[10px] uppercase tracking-[0.2em] text-zinc-400 duration-300 transform -translate-y-8 scale-100 top-3 -z-10 origin-[0] peer-focus:text-[#d4a373] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-8 font-bold">
                Password
              </label>
          </div>

          <SubmitButton />
      </form>

      <div className="mt-12 text-center">
         <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-4">Not a member yet?</p>
         <Link href="/register" className="text-xs font-bold text-[#1C1917] border-b border-zinc-300 pb-1 hover:text-[#d4a373] hover:border-[#d4a373] transition-colors uppercase tracking-[0.2em]">
           Create Account
         </Link>
      </div>
    </>
  )
}