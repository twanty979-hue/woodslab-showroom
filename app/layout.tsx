import type { Metadata } from "next";
import "./globals.css";
// ✅ 1. Import Navbar เข้ามา
import Navbar from "@/src/components/Navbar";

export const metadata: Metadata = {
  title: "Woodslabs | Premium Live Edge Furniture",
  description: "Crafting legacy pieces from nature's finest materials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ 2. เพิ่ม Link โหลดฟอนต์ Luxury (Cormorant Garamond) ไว้ตรงนี้ เพื่อให้โหลดติดทุกหน้า */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,700&family=Noto+Sans+Thai:wght@300;400;600&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased bg-[#FAF9F6]">
        
        {/* ✅ 3. บังคับใช้ฟอนต์ด้วย Style tag (แก้ปัญหาฟอนต์ไม่เปลี่ยน) */}
        <style>{`
          :root {
            --font-serif: 'Cormorant Garamond', serif;
            --font-sans: 'Noto Sans Thai', sans-serif;
          }
          /* ตั้งค่าฟอนต์พื้นฐาน */
          body { font-family: var(--font-sans); color: #1C1917; }
          
          /* บังคับให้หัวข้อและคลาส font-serif ใช้ฟอนต์หรู */
          h1, h2, h3, h4, h5, h6, .font-serif { 
            font-family: var(--font-serif) !important; 
          }
        `}</style>

        {/* ✅ 4. ใส่ Navbar ไว้ตรงนี้ */}
        <Navbar />

        {children}
      </body>
    </html>
  );
}