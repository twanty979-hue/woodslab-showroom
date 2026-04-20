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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-[#FAF9F6]">
        <style>{`
          *, *::before, *::after, body,
          h1, h2, h3, h4, h5, h6, button, input, select, textarea {
            font-family: 'Playfair Display', 'Sarabun', sans-serif !important;
            font-variant-numeric: lining-nums tabular-nums !important;
          }
        `}</style>

        {/* ✅ 4. ใส่ Navbar ไว้ตรงนี้ */}
        <Navbar />

        {children}
      </body>
    </html>
  );
}