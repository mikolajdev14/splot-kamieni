import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { MotionEffects } from "@/components/motion-effects";
import "./globals.css";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Splot Kamieni | Biżuteria z kamieni naturalnych",
  description: "Klikalne demo zamawiania personalizowanej biżuterii z kamieni naturalnych.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`${sans.variable} ${serif.variable}`}>
      <body>
        {children}
        <MotionEffects />
      </body>
    </html>
  );
}
