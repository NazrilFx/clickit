import type { Metadata } from "next";
import "./globals.css";
import localfont from "next/font/local";

const poppins = localfont({
  src: "./fonts/Poppins-Medium.ttf",
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Free Impressions | Pay Only When Clicked – YourBrand",
  description: "Dapatkan impresi gratis untuk produk Anda dan bayar hanya saat ada klik. Sistem iklan cerdas dan hemat untuk bisnis modern.",
  keywords: ["free impressions", "pay per click", "smart advertising", "affiliate marketing", "digital ads"],
  authors: [{ name: "Nazril Ramadhan", url: "https://yourwebsite.com" }],
  metadataBase: new URL("https://yourwebsite.com"),
  openGraph: {
    title: "Free Impressions & Pay Only When Clicked | YourBrand",
    description: "Tingkatkan visibilitas tanpa biaya awal. Bayar hanya saat pengguna benar-benar klik. Mulai sekarang!",
    url: "https://yourwebsite.com",
    siteName: "YourBrand",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Banner YourBrand",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Impressions & Pay Only When Clicked | YourBrand",
    description: "Smart advertising system – pay only when you get results.",
    images: ["https://yourwebsite.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} *:font-poppins antialiased dark:bg-softblack dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
