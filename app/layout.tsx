import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/src/components/Navbar";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"], variable: '--font-playfair' });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400"], variable: '--font-inter' });

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
      <body className={`antialiased bg-[#FAF9F6] ${inter.variable} ${playfair.variable}`}>

        <style dangerouslySetInnerHTML={{ __html: `
          /* Inter = English, DBHeavent = Thai (via unicode-range in globals.css) */
          body, p, span, button, input, h1, h2, h3, h4, h5, h6 {
            font-family: var(--font-inter), 'DBHeavent', sans-serif;
          }

          h1, h2, h3, h4, h5, h6 { font-weight: 500; }

          /* Playfair = English serif, DBHeavent = Thai */
          .font-serif {
            font-family: var(--font-playfair), 'DBHeavent', serif !important;
          }
        `}} />

        <Navbar />
        {children}
      </body>
    </html>
  );
}