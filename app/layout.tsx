import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Syne_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const syneMono = Syne_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-syne-mono",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rug Studio | Portfolio demo",
  description:
    "Demonstracyjny projekt sklepu z konfiguracją ręcznie tuftowanych dywanów.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
        syneMono.variable,
      )}
    >
      <body className="min-h-full font-syne flex flex-col">{children}</body>
    </html>
  );
}
