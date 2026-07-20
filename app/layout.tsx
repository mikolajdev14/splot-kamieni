import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import { MotionEffects } from "@/components/motion-effects";
import "./globals.css";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const serif = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
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
