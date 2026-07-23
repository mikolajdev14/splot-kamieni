"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function DemoHeader({ compact = false, overlay = false }: { compact?: boolean; overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={overlay ? "absolute inset-x-0 top-0 z-50 text-paper" : "sticky top-0 z-50 border-b border-cocoa/10 bg-ivory/90 backdrop-blur-xl"}>
      <a href="#main-content" className="sr-only focus:not-sr-only">Przejdź do treści</a>
      <div className="shell flex min-h-20 items-center justify-between gap-4">
        <Link href="/" className="logo-link group flex items-center gap-3" aria-label="Lunaria Atelier, strona główna">
          <span className="logo-mark relative size-12 overflow-hidden rounded-full border border-paper/50 bg-paper shadow-lg"><Image src="/jewelry/lunaria-atelier-logo.svg" alt="" fill className="object-cover" sizes="48px" /></span>
          <span className="hidden sm:block"><span className="block font-editorial text-xl font-semibold leading-none">Lunaria Atelier</span><span className={`mt-1 block text-[0.58rem] font-bold uppercase tracking-[0.18em] ${overlay ? "text-paper/60" : "text-cocoa/55"}`}>Wersja demonstracyjna</span></span>
        </Link>
        {!compact && <nav aria-label="Główna" className={`hidden items-center gap-7 rounded-full px-7 py-3 text-xs font-bold shadow-xl backdrop-blur-xl lg:flex ${overlay ? "border border-paper/50 bg-paper/85 text-cocoa" : "border border-line bg-paper"}`}><Link className="nav-link" href="/#kolekcja">Kolekcja</Link><Link className="nav-link" href="/#jak-to-dziala">Jak to działa</Link><Link className="nav-link" href="/#faq">FAQ</Link></nav>}
        <div className="hidden items-center gap-2 sm:flex"><Link href="/admin-demo" className={overlay ? "hero-button-ghost min-h-11 px-4" : "button-secondary px-4"}>Panel właścicielki</Link><Link href="/zamow" className={overlay ? "hero-button-light min-h-11 px-5" : "button-primary px-4"}>Zaprojektuj</Link></div>
        <button type="button" aria-label={open ? "Zamknij menu" : "Otwórz menu"} aria-expanded={open} className={`flex size-11 items-center justify-center rounded-full border sm:hidden ${overlay ? "border-paper/40 bg-paper/10 text-paper backdrop-blur" : "border-line bg-paper"}`} onClick={() => setOpen((value) => !value)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
      </div>
      {open && <nav aria-label="Mobilna" className="mx-5 grid gap-1 rounded-[1.5rem] border border-line bg-paper p-4 text-cocoa shadow-2xl sm:hidden"><Link className="min-h-11 rounded-xl px-3 py-3 hover:bg-ivory" href="/zamow">Zaprojektuj biżuterię</Link><Link className="min-h-11 rounded-xl px-3 py-3 hover:bg-ivory" href="/admin-demo">Panel właścicielki</Link><Link className="min-h-11 rounded-xl px-3 py-3 hover:bg-ivory" href="/#faq">FAQ</Link></nav>}
    </header>
  );
}

export function DemoFooter() {
  return <footer className="border-t border-cocoa/10 bg-paper/90 backdrop-blur"><div className="shell grid gap-8 py-10 sm:grid-cols-2 sm:items-end"><div className="flex items-start gap-4"><span className="relative size-14 shrink-0 overflow-hidden rounded-full border border-line"><Image src="/jewelry/lunaria-atelier-logo.svg" alt="Logo Lunaria Atelier" fill className="object-cover" sizes="56px" /></span><div><p className="font-editorial text-3xl">Lunaria Atelier</p><p className="mt-2 max-w-md text-sm leading-6 text-cocoa/65">Ręcznie robiona biżuteria z kamieni naturalnych. To prezentacyjne demo, zamówienia i płatności są symulowane.</p></div></div><div className="flex gap-5 text-sm font-semibold sm:justify-end"><Link className="nav-link" href="/zamow">Konfigurator</Link><Link className="nav-link" href="/admin-demo">Panel demo</Link></div></div></footer>;
}
