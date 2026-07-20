"use client";

import { Gem, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function DemoHeader({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-cocoa/10 bg-ivory/90 backdrop-blur-xl">
      <a href="#main-content" className="sr-only focus:not-sr-only">Przejdź do treści</a>
      <div className="shell flex min-h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Splot Kamieni, strona główna">
          <span className="flex size-10 items-center justify-center rounded-full border border-gold/40 bg-paper text-gold"><Gem size={19} aria-hidden="true" /></span>
          <span><span className="block font-editorial text-xl font-semibold leading-none">Splot Kamieni</span><span className="mt-1 block text-[0.58rem] font-bold uppercase tracking-[0.18em] text-cocoa/55">Wersja demonstracyjna</span></span>
        </Link>
        {!compact && <nav aria-label="Główna" className="hidden items-center gap-7 text-sm font-semibold lg:flex"><Link href="/#kolekcja">Kolekcja</Link><Link href="/#jak-to-dziala">Jak to działa</Link><Link href="/#faq">FAQ</Link></nav>}
        <div className="hidden items-center gap-2 sm:flex"><Link href="/admin-demo" className="button-secondary px-4">Panel właścicielki</Link><Link href="/zamow" className="button-primary px-4">Zaprojektuj</Link></div>
        <button type="button" aria-label={open ? "Zamknij menu" : "Otwórz menu"} aria-expanded={open} className="flex size-11 items-center justify-center rounded-full border border-line bg-paper sm:hidden" onClick={() => setOpen((value) => !value)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
      </div>
      {open && <nav aria-label="Mobilna" className="shell grid gap-2 border-t border-line py-4 sm:hidden"><Link className="min-h-11 py-3" href="/zamow">Zaprojektuj biżuterię</Link><Link className="min-h-11 py-3" href="/admin-demo">Panel właścicielki</Link><Link className="min-h-11 py-3" href="/#faq">FAQ</Link></nav>}
    </header>
  );
}

export function DemoFooter() {
  return <footer className="border-t border-cocoa/10 bg-paper"><div className="shell grid gap-8 py-10 sm:grid-cols-2 sm:items-end"><div><p className="font-editorial text-3xl">Splot Kamieni</p><p className="mt-2 max-w-md text-sm leading-6 text-cocoa/65">Ręcznie robiona biżuteria z kamieni naturalnych. To prezentacyjne demo, zamówienia i płatności są symulowane.</p></div><div className="flex gap-5 text-sm font-semibold sm:justify-end"><Link href="/zamow">Konfigurator</Link><Link href="/admin-demo">Panel demo</Link></div></div></footer>;
}
