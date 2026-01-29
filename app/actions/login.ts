'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase-server'

export async function login(prevState: any, formData: FormData) {
  const cookieStore = await cookies()

  // ✅ เช็คจุดที่ 0: ตรวจสอบก่อนเลยว่าล็อกอินอยู่แล้วหรือเปล่า?
  const token = cookieStore.get('sb-access-token')?.value
  
  if (token) {
     // ลองเช็คกับ Supabase ว่า Token ยังดีอยู่ไหม
     const { data: { user } } = await supabaseServer.auth.getUser(token)
     
     // ถ้ามี User จริงๆ -> ดีดไปหน้า woodslab เลย
     if (user) {
        redirect('/woodslab')
     }
  }

  // --- จบส่วนเช็ค ถ้าไม่มี User ก็ทำงานต่อด้านล่างตามปกติ ---

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { data, error } = await supabaseServer.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }
  }

  if (data.session) {
    // ไม่ต้องประกาศ cookieStore ใหม่แล้ว เพราะประกาศไว้ข้างบนแล้ว
    
    cookieStore.set('sb-access-token', data.session.access_token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    })
    
    cookieStore.set('sb-refresh-token', data.session.refresh_token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    })
  }

  redirect('/profile')
}