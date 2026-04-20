import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/src/components/Navbar";
import { Playfair_Display, Prompt, Inter, Sarabun } from "next/font/google";

// ✅ 1. ประกาศใช้ variable เพื่อป้องกันบั๊กฟอนต์ระบบมาคั่น
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"], variable: '--font-playfair' });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400"], variable: '--font-inter' });
const prompt = Prompt({ subsets: ["thai", "latin"], weight: ["300", "400", "500", "600"], variable: '--font-prompt' });
const sarabun = Sarabun({ subsets: ["thai"], weight: ["300", "400", "500", "600"], variable: '--font-sarabun' });

export const metadata: Metadata = {
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
      {/* ✅ 2. โหลดตัวแปรฟอนต์ทั้งหมดเข้าไปฝังไว้ในหน้าเว็บ */}
      <body className={`antialiased bg-[#FAF9F6] ${prompt.variable} ${inter.variable} ${playfair.variable} ${sarabun.variable}`}>
        
        <style dangerouslySetInnerHTML={{ __html: `
          /* ✅ 3. ฟอนต์หลัก (ไม่มีหัว) เรียกใช้ผ่าน var() */
          body, p, span, button, input, h1, h2, h3, h4, h5, h6 {
            font-family: var(--font-inter), var(--font-prompt), sans-serif;
          }

          h1, h2, h3, h4, h5, h6 { font-weight: 500; }

          /* ✅ 4. ฟอนต์หรู (มีหัว) เรียกใช้ผ่าน var() บั๊กฟอนต์ไทยทื่อๆ จะหายไป 100% จ้ะ! */
          .font-serif {
            font-family: var(--font-playfair), var(--font-sarabun), serif !important;
          }
        `}} />

        <Navbar />
        {children}
      </body>
    </html>
  );
}