import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // เก็บอันนี้ไว้ถ้าอยากข้าม Error ภาษา (TypeScript)
  typescript: {
    ignoreBuildErrors: true, 
  },

  // ✅ เพิ่มส่วนนี้เข้าไปเพื่อแก้ปัญหาโหลดรูปไม่ขึ้น
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.ixiumu.cn', // อนุญาตโดเมนรูปไม้ (ixiumu)
      },
      {
        protocol: 'https',
        hostname: 'zexflchjcycxrpjkuews.supabase.co', // อนุญาตโดเมน Supabase (เผื่อไว้)
      },
    ],
  },
};

export default nextConfig;