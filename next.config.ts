import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // เก็บอันนี้ไว้ถ้าอยากข้าม Error ภาษา (TypeScript)
  // แต่ถ้าอยากให้ตรวจภาษาด้วย ก็ลบก้อนนี้ออกได้เลยครับ
  typescript: {
    ignoreBuildErrors: true, 
  },

  // ❌ ลบก้อน eslint ออกไปเลยครับ (ห้ามใส่)
};

export default nextConfig;