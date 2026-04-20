import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/src/components/Navbar";
import { Playfair_Display, Sarabun, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400"] });
const sarabun = Sarabun({ subsets: ["thai", "latin"], weight: ["300", "400", "500", "600"] });

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
      {/* ตั้งค่าให้ Sarabun (ฟอนต์ไทยมีหัว) เป็นฟอนต์พื้นฐานของทั้งหน้า */}
      <body className={`antialiased bg-[#FAF9F6] ${sarabun.className}`}>
        
        <style dangerouslySetInnerHTML={{ __html: `
          /* ตัวหนังสือทั่วไปใช้ Sarabun (ไทยมีหัว) และ Inter (อังกฤษไม่มีหัว) */
          body, p, span, button, input {
            font-family: ${sarabun.style.fontFamily}, ${inter.style.fontFamily}, sans-serif;
          }

          h1, h2, h3, h4, h5, h6 { font-weight: 500; }

          /* ตรงไหนที่ใส่ .font-serif จะกลายเป็น Playfair (อังกฤษหรูๆ) และ Sarabun (ไทยมีหัว) */
          .font-serif {
            font-family: ${playfair.style.fontFamily}, ${sarabun.style.fontFamily}, serif !important;
          }
        `}} />

        <Navbar />
        {children}
      </body>
    </html>
  );
}