import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/src/components/Navbar";
// ✅ 1. เปลี่ยน Sarabun เป็น Prompt
import { Playfair_Display, Prompt, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400"] });

// ✅ 2. ตั้งค่า Prompt (ฟอนต์ไทยไม่มีหัว ยอดฮิต)
const prompt = Prompt({ 
  subsets: ["thai", "latin"], 
  weight: ["300", "400", "500", "600"] 
});

// 📍 ไฟล์ src/app/layout.tsx

export const metadata: Metadata = {
  // แก้ชื่อเว็บตรงนี้เลยจ้ะหลานชาย
  title: "ZENSLABS | Premium Live Edge Furniture", 
  description: "Crafting legacy pieces from nature's finest materials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-[#FAF9F6] ${prompt.className}`}>
        
        <style dangerouslySetInnerHTML={{ __html: `
  /* ✅ ยายแก้ให้ ทุกอย่าง (ทั้งหัวข้อและตัวหนังสือธรรมดา) ใช้ Inter กับ Prompt ทั้งหมดเลยจ้ะ */
  *, *::before, *::after, body,
  h1, h2, h3, h4, h5, h6, p, span, button, input, .font-serif {
    font-family: ${inter.style.fontFamily}, ${prompt.style.fontFamily}, sans-serif !important;
  }

  /* ปรับความหนาฟอนต์ไทยให้ดูแพง */
  h2, h3 { font-weight: 500; letter-spacing: -0.02em; }
`}} />

        <Navbar />
        {children}
      </body>
    </html>
  );
}