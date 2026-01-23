import { createClient } from '@supabase/supabase-js'

// ใช้ process.env ธรรมดา เพราะรันบน Server เท่านั้น
// ตรวจสอบให้แน่ใจว่าใน .env ของคุณตั้งชื่อว่า SUPABASE_URL และ SUPABASE_ANON_KEY (หรือ SERVICE_ROLE_KEY)
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or Key is missing in Server Environment')
}

// สร้าง Client สำหรับ Server Actions
// Note: การใช้ createClient แบบนี้ใน Server Actions จะสร้าง instance ใหม่ทุกครั้งที่เรียก
// ซึ่งปลอดภัยและแยก context กัน
export const supabaseServer = createClient(supabaseUrl, supabaseKey)