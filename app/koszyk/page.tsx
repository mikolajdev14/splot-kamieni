"use client";

import { DemoFooter, DemoHeader } from "@/components/demo-shell";
import { CART_KEY, type JewelryConfig, formatPrice } from "@/lib/demo-data";
import { ArrowRight, BadgePercent, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type CartItem = JewelryConfig & { product: string; image: string };

export default function CartPage() {
  const [item, setItem] = useState<CartItem | null | undefined>(undefined);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = localStorage.getItem(CART_KEY);
      setItem(stored ? JSON.parse(stored) as CartItem : null);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const applyCode = () => {
    const valid = code.trim().toUpperCase() === "DEMO10";
    setDiscount(valid);
    setMessage(valid ? "Kod DEMO10 naliczony. Oszczędzasz 10%." : "Ten kod nie jest aktywny w wersji demo.");
  };
  const remove = () => { localStorage.removeItem(CART_KEY); setItem(null); };
  const subtotal = item?.price ?? 0;
  const total = discount ? subtotal * 0.9 : subtotal;

  return <div><DemoHeader compact /><main id="main-content" className="shell min-h-[70vh] py-10 sm:py-16"><p className="eyebrow">Twój projekt</p><h1 className="mt-2 text-5xl">Koszyk</h1>{item === undefined ? <div role="status" className="mt-10 soft-card p-8">Wczytuję Twój projekt…</div> : item === null ? <div className="mt-10 soft-card grid place-items-center px-6 py-16 text-center"><ShoppingBag className="text-gold" size={36} aria-hidden="true" /><h2 className="mt-5 text-3xl">Koszyk czeka na Twój splot</h2><p className="mt-2 max-w-md text-sm leading-6 text-cocoa/55">Wróć do konfiguratora i zaprojektuj bransoletkę krok po kroku.</p><Link href="/zamow" className="button-primary mt-6">Rozpocznij projekt</Link></div> : <div className="mt-10 grid items-start gap-7 lg:grid-cols-[1fr_22rem]"><section className="soft-card p-5 sm:p-7"><div className="grid gap-6 sm:grid-cols-[11rem_1fr]"><div className="relative aspect-square overflow-hidden rounded-[1.5rem]"><Image src={item.image} alt={item.product} fill className="object-cover" /></div><div><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-gold">Projekt personalizowany</p><h2 className="mt-1 text-3xl">{item.product}</h2></div><strong>{formatPrice(item.price)}</strong></div><dl className="mt-5 grid gap-x-4 gap-y-2 text-sm sm:grid-cols-2">{[["Styl", item.style], ["Kamień", item.stone], ["Dodatki", item.hardware], ["Rozmiar", item.size], ["Zawieszka", item.charm], ["Opakowanie", item.packaging]].map(([term, value]) => <div key={term} className="flex gap-2"><dt className="text-cocoa/45">{term}:</dt><dd className="font-semibold">{value}</dd></div>)}</dl><div className="mt-6 flex flex-wrap gap-3"><Link href="/zamow" className="button-secondary px-4">Edytuj projekt</Link><button type="button" onClick={remove} className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-bold text-red-800 hover:bg-red-50"><Trash2 size={16} aria-hidden="true" /> Usuń</button></div></div></div></section><aside className="soft-card p-6"><h2 className="text-3xl">Podsumowanie</h2><div className="mt-6 space-y-3 text-sm"><div className="flex justify-between"><span>Produkt</span><span>{formatPrice(subtotal)}</span></div>{discount && <div className="flex justify-between text-green-800"><span>Rabat 10%</span><span>− {formatPrice(subtotal * 0.1)}</span></div>}<div className="flex justify-between"><span>Dostawa</span><span>wybierzesz dalej</span></div><div className="flex justify-between border-t pt-4 text-lg font-bold"><span>Razem</span><span>{formatPrice(total)}</span></div></div><label className="mt-7 block text-xs font-bold uppercase tracking-wider" htmlFor="discount">Kod rabatowy</label><div className="mt-2 flex gap-2"><input id="discount" value={code} onChange={(event) => setCode(event.target.value)} className="min-h-11 min-w-0 flex-1 rounded-full border bg-ivory px-4 text-sm" placeholder="DEMO10" /><button type="button" onClick={applyCode} className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sand" aria-label="Zastosuj kod"><BadgePercent size={18} aria-hidden="true" /></button></div><p aria-live="polite" className="mt-2 min-h-5 text-xs text-cocoa/60">{message}</p><Link href={`/checkout${discount ? "?rabat=DEMO10" : ""}`} className="button-primary mt-5 w-full">Przejdź do dostawy <ArrowRight size={17} aria-hidden="true" /></Link><p className="mt-4 text-center text-[0.68rem] leading-5 text-cocoa/45">To wersja demonstracyjna. Płatność nie zostanie pobrana.</p></aside></div>}</main><DemoFooter /></div>;
}
