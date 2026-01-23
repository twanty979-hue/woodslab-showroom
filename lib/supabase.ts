import { createClient } from '@supabase/supabase-js'

// ดึงค่าจาก .env โดยตรง (Server Environment)
const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase Server Keys are missing!')
}

export const supabaseServer = createClient(supabaseUrl, supabaseKey)