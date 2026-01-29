import { createClient } from '@supabase/supabase-js'

// ใส่ ! เพื่อบอก TS ว่ามีค่าแน่ๆ
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabaseClient = createClient(supabaseUrl, supabaseKey)