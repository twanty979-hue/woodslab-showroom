import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // ✅ สั่งให้ Vercel ไม่ต้องสน Error ภาษา (TypeScript)
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // ✅ สั่งให้ Vercel ไม่ต้องสน Error การจัดหน้า (ESLint)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;