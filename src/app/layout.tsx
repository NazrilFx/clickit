import type { Metadata } from "next";
import "./globals.css";
import localfont from "next/font/local";

const poppins = localfont({
  src: "./fonts/Poppins-Medium.ttf",
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
