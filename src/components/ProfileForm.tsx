'use client'

import React, { useActionState, useState, useRef, useEffect, startTransition } from 'react'
import { useFormStatus } from 'react-dom'
import { updateProfile } from '@/app/actions/profile'
import imageCompression from 'browser-image-compression' // ✅ อย่าลืม npm install browser-image-compression

// --- Helper: แปลง Path เป็น Full URL ---
const getImageUrl = (path: string | null) => {
  if (!path) return null;
  if (path.startsWith('http') || path.startsWith('https') || path.startsWith('blob:')) return path;
  
  const baseUrl = "https://zexflchjcycxrpjkuews.supabase.co/storage/v1/object/public/customers"; // ⚠️ เช็ค URL ให้ตรงกับของพี่นะ
  const cleanPath = path.replace(/^\/+/, "");
  return `${baseUrl}/${cleanPath}`;
}

const IconCamera = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    <circle cx="12" cy="13" r="4"></circle>
  </svg>
)

// ปุ่ม Submit สไตล์ Minimalist Hover (รับ prop isCompressing เพิ่ม)
function SubmitButton({ isCompressing }: { isCompressing: boolean }) {
  const { pending } = useFormStatus()
  
  // สถานะทำงานคือ: กำลังบีบอัด (Client) หรือ กำลังส่งข้อมูล (Server)
  const isBusy = pending || isCompressing

  return (
    <button 
      type="submit" 
      disabled={isBusy}
      suppressHydrationWarning
      className="group relative inline-block w-full py-5 border border-zinc-200 text-zinc-800 uppercase tracking-[0.3em] text-[10px] font-bold transition-all duration-500 overflow-hidden mt-10 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      <span className={`absolute inset-0 bg-[#d4a373] transition-all duration-500 ease-out ${isBusy ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
      <span className={`relative z-10 transition-colors duration-500 ${isBusy ? 'text-white' : 'group-hover:text-white'}`}>
        {isCompressing ? 'Compressing Image...' : pending ? 'Saving Details...' : 'Save Profile Changes'}
      </span>
    </button>
  )
}

export default function ProfileForm({ customer }: { customer: any }) {
  const [state, formAction] = useActionState(updateProfile, null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isCompressing, setIsCompressing] = useState(false) // ✅ State สำหรับ WebP
  const fileInputRef = useRef<HTMLInputElement>(null)

  const displayImage = previewUrl || getImageUrl(customer?.avatar_url)
  const imageVersion = customer?.updated_at ? new Date(customer.updated_at).getTime() : '1';

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)
    }
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  // ✅ ฟังก์ชันดักจับ Submit เพื่อบีบอัดรูป
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsCompressing(true) // เริ่มโหลด

    const formData = new FormData(event.currentTarget)
    const file = formData.get('avatar') as File

    // ถ้ามีไฟล์รูป ให้บีบอัด
    if (file && file.size > 0) {
      try {
        const options = {
          maxSizeMB: 0.5,         // ไม่เกิน 0.5MB
          maxWidthOrHeight: 800,  // ไม่เกิน 800px
          useWebWorker: true,
          fileType: 'image/webp'  // แปลงเป็น WebP
        }
        
        const compressedFile = await imageCompression(file, options)
        
        // สร้างไฟล์ใหม่ใส่กลับเข้าไป
        const newFileName = "avatar.webp"
        const finalFile = new File([compressedFile], newFileName, { type: 'image/webp' })
        formData.set('avatar', finalFile)
        
      } catch (error) {
        console.error("Compression failed:", error)
      }
    }

    setIsCompressing(false) // จบบีบอัด

    // ส่งต่อให้ Server Action
    startTransition(() => {
      formAction(formData)
    })
  }

  return (
    // ✅ เปลี่ยนจาก action={formAction} เป็น onSubmit={handleSubmit}
    <form onSubmit={handleSubmit} className="w-full">
      
      {/* ส่วนรูปภาพ Avatar */}
      <div className="flex justify-center mb-16">
        <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-[1px] border-zinc-100 shadow-[0_10px_30px_rgba(0,0,0,0.08)] bg-zinc-50 relative z-10">
                {displayImage ? (
                    <img 
                      src={`${displayImage}${!previewUrl && !displayImage.startsWith('blob:') ? `?v=${imageVersion}` : ''}`} 
                      alt="Profile" 
                      suppressHydrationWarning
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl text-zinc-200 font-serif">
                        {customer?.full_name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                )}
            </div>

            <div className="absolute bottom-2 right-2 z-20 bg-white text-zinc-400 p-3 rounded-full shadow-md border border-zinc-50 group-hover:bg-[#d4a373] group-hover:text-white group-hover:border-[#d4a373] transition-all duration-500">
                <IconCamera />
            </div>

            <input 
                type="file" 
                name="avatar" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden" 
            />
        </div>
      </div>

      {/* ข้อความแจ้งสถานะ */}
      {state?.success && (
        <div className="mb-8 p-4 bg-zinc-50 text-[#d4a373] text-[10px] uppercase tracking-widest text-center font-bold border-y border-zinc-100 animate-fade-in">
          {state.message}
        </div>
      )}
      {state?.error && (
        <div className="mb-8 p-4 bg-red-50 text-red-500 text-[10px] uppercase tracking-widest text-center font-bold border-y border-red-100 animate-fade-in">
          {state.error}
        </div>
      )}

      {/* Input Fields */}
      <div className="space-y-12 px-2 md:px-4">
        
        {/* Full Name */}
        <div className="relative group">
            <input 
                type="text" 
                name="fullName" 
                id="fullName"
                defaultValue={customer?.full_name || ''}
                required
                suppressHydrationWarning
                className="block py-3 px-0 w-full text-base text-zinc-800 bg-transparent border-0 border-b border-zinc-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#d4a373] peer transition-all duration-300 placeholder-transparent"
                placeholder="Full Name" 
            />
            <label htmlFor="fullName" className="absolute text-[10px] uppercase tracking-[0.2em] text-zinc-400 duration-300 transform -translate-y-8 scale-100 top-3 -z-10 origin-[0] peer-focus:text-[#d4a373] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-8 font-bold">
                Full Name
            </label>
        </div>

        {/* Phone Number */}
        <div className="relative group">
            <input 
                type="tel" 
                name="phone" 
                id="phone"
                defaultValue={customer?.phone || ''}
                suppressHydrationWarning
                className="block py-3 px-0 w-full text-base text-zinc-800 bg-transparent border-0 border-b border-zinc-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#d4a373] peer transition-all duration-300 placeholder-transparent"
                placeholder="Phone Number" 
            />
            <label htmlFor="phone" className="absolute text-[10px] uppercase tracking-[0.2em] text-zinc-400 duration-300 transform -translate-y-8 scale-100 top-3 -z-10 origin-[0] peer-focus:text-[#d4a373] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-8 font-bold">
                Phone Number
            </label>
        </div>

        {/* Email Address (Read Only) */}
        <div className="relative group opacity-40">
            <input 
                type="email" 
                defaultValue={customer?.email || ''}
                disabled
                suppressHydrationWarning
                className="block py-3 px-0 w-full text-base text-zinc-400 bg-transparent border-0 border-b border-zinc-100 cursor-not-allowed"
            />
            <label className="absolute text-[10px] uppercase tracking-[0.2em] text-zinc-300 transform -translate-y-8 scale-100 top-3 -z-10 origin-[0] font-bold">
                Email Address
            </label>
        </div>
      </div>

      {/* ปุ่มกด (ส่งสถานะ isCompressing เข้าไปด้วย) */}
      <SubmitButton isCompressing={isCompressing} />
    </form>
  )
}