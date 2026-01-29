'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { supabaseServer } from '@/lib/supabase-server'

export async function register(prevState: any, formData: FormData) {
  const fullName = formData.get('fullName') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' }
  }

  // สมัครสมาชิกกับ Supabase
  const { data, error } = await supabaseServer.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        is_wood_member: true, 
      }
    }
  })

  if (error) {
    return { error: error.message }
  }

  // ✅ ถ้าได้ Session (ไม่ต้องยืนยัน Email) -> Login ให้อัตโนมัติ
  if (data.session) {
    const cookieStore = await cookies()
    
    // ตั้งค่า Cookie Access Token
    cookieStore.set('sb-access-token', data.session.access_token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 สัปดาห์
    })
    
    // ตั้งค่า Cookie Refresh Token
    cookieStore.set('sb-refresh-token', data.session.refresh_token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    })

    // ไปหน้า Collection เลย
    redirect('/woodslab')
  }

  // กรณียืนยัน Email
  redirect('/login?registered=true')
}