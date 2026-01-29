'use server'

import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

// ---------------------------------------------------------
// 1. LOGIN ACTION (สำหรับ LoginForm)
// ---------------------------------------------------------
export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // สร้าง Client ชั่วคราวเพื่อคุยกับ Supabase
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )

  // สั่ง Login
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  // ถ้า Login ไม่ผ่าน
  if (error) {
    console.error("Login Error:", error.message)
    return { error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }
  }

  // ถ้า Login สำเร็จ -> ฝัง Cookie เอง (เหมือนหน้า Register)
  if (data.session) {
    const cookieStore = await cookies()

    // Access Token
    cookieStore.set('sb-access-token', data.session.access_token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 วัน
    })

    // Refresh Token
    cookieStore.set('sb-refresh-token', data.session.refresh_token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    })

    // ดีดไปหน้า Woodslab
    redirect('/woodslab')
  }

  // กรณีแปลกๆ ที่ไม่มี Error แต่ไม่มี Session
  return { error: 'เกิดข้อผิดพลาด กรุณาลองใหม่' }
}

// ---------------------------------------------------------
// 2. LOGOUT ACTION (ตัวเดิมที่แก้แล้ว)
// ---------------------------------------------------------
export async function signOutAction() {
  const cookieStore = await cookies()
  const token = cookieStore.get('sb-access-token')?.value

  if (token) {
    try {
      const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
          global: { headers: { Authorization: `Bearer ${token}` } },
        }
      )
      await supabase.auth.signOut()
    } catch (error) {
      console.error("SignOut Error:", error)
    }
  }

  // ลบ Cookie
  cookieStore.delete('sb-access-token')
  cookieStore.delete('sb-refresh-token')

  // ✅ ไม่ Redirect (ให้ Client จัดการ router.push)
}