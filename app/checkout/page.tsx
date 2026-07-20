"use client";

import { DemoHeader } from "@/components/demo-shell";
import { CART_KEY, ORDERS_KEY, type DemoOrder, type JewelryConfig, formatPrice } from "@/lib/demo-data";
import { Check, CreditCard, LockKeyhole, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, type FormEvent, useEffect, useMemo, useState } from "react";

type CartItem = JewelryConfig & { product: string; image: string };

export default function CheckoutPage() {
  return <Suspense fallback={<div role="status" className="shell py-20">Przygotowuję checkout…</div>}><CheckoutContent /></Suspense>;
}

function CheckoutContent() {
  const router = useRouter();
  const params = useSearchParams();
  const [item, setItem] = useState<CartItem | null>(null);
  const [delivery, setDelivery] = useState("Paczkomat");
  const [speed, setSpeed] = useState("Standardowy");
  const [payment, setPayment] = useState("BLIK");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("Anna Kowalska");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = localStorage.getItem(CART_KEY);
      if (stored) setItem(JSON.parse(stored) as CartItem);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  const deliveryCost = delivery === "Paczkomat" ? 14.99 : delivery === "Kurier" ? 17.99 : 0;
  const discount = params.get("rabat") === "DEMO10" ? (item?.price ?? 0) * 0.1 : 0;
  const total = useMemo(() => (item?.price ?? 0) - discount + deliveryCost + (speed === "Ekspresowy" ? 25 : 0), [item, discount, deliveryCost, speed]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); if (!item || loading) return; setLoading(true);
    const id = `SK-2026-${String(Math.floor(42 + Math.random() * 50)).padStart(4, "0")}`;
    const order: DemoOrder = { ...item, id, customer: name, email: "anna@example.pl", phone: "+48 500 200 300", address: "ul. Kwiatowa 8, 00-001 Warszawa", delivery, payment, dueDate: speed === "Ekspresowy" ? "23 lip 2026" : "28 lip 2026", createdAt: "20 lip 2026", status: "Opłacone", total };
    window.setTimeout(() => { const current = JSON.parse(localStorage.getItem(ORDERS_KEY) ?? "[]") as DemoOrder[]; localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...current])); router.push(`/zamow/sukces?order=${id}`); }, 900);
  };

  if (!item) return <div><DemoHeader compact /><main id="main-content" className="shell min-h-[70vh] py-16"><div className="soft-card p-8"><h1 className="text-4xl">Brakuje projektu w koszyku</h1><p className="mt-3 text-sm text-cocoa/55">Wróć do konfiguratora, aby dodać bransoletkę.</p><Link href="/zamow" className="button-primary mt-6">Otwórz konfigurator</Link></div></main></div>;

  return <div className="min-h-screen"><DemoHeader compact /><main id="main-content" className="shell py-9 sm:py-14"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Ostatni krok</p><h1 className="mt-2 text-5xl">Dostawa i płatność</h1></div><p className="flex items-center gap-2 text-xs font-bold text-cocoa/50"><LockKeyhole size={15} aria-hidden="true" /> Bezpieczna symulacja demo</p></div><form onSubmit={submit} className="mt-9 grid items-start gap-7 lg:grid-cols-[1fr_23rem]"><div className="space-y-5"><Panel title="Dane zamawiającej"><div className="grid gap-4 sm:grid-cols-2"><Field label="Imię i nazwisko" value={name} onChange={setName} /><Field label="E-mail" value="anna@example.pl" /><Field label="Telefon" value="+48 500 200 300" /><Field label="Ulica i numer" value="ul. Kwiatowa 8" /><Field label="Kod pocztowy" value="00-001" /><Field label="Miasto" value="Warszawa" /></div></Panel><Panel title="Sposób dostawy"><ChoiceRow options={["Paczkomat", "Kurier", "Odbiór osobisty"]} value={delivery} setValue={setDelivery} labels={["14,99 zł", "17,99 zł", "bezpłatnie"]} />{delivery === "Paczkomat" && <label className="mt-4 block text-sm font-bold" htmlFor="locker">Punkt odbioru<select id="locker" className="mt-2 min-h-12 w-full rounded-2xl border bg-ivory px-4 font-normal"><option>WAW01N · Kwiatowa 12</option><option>WAW27M · Parkowa 4</option></select></label>}</Panel><Panel title="Termin realizacji"><ChoiceRow options={["Standardowy", "Ekspresowy"]} value={speed} setValue={setSpeed} labels={["5–7 dni roboczych", "2–3 dni · +25 zł"]} /></Panel><Panel title="Płatność demo"><ChoiceRow options={["BLIK", "Karta", "Szybki przelew"]} value={payment} setValue={setPayment} labels={["symulacja", "symulacja", "symulacja"]} /></Panel></div><aside className="soft-card sticky top-24 overflow-hidden"><div className="flex gap-4 border-b p-5"><div className="relative size-20 shrink-0 overflow-hidden rounded-2xl"><Image src={item.image} alt={item.product} fill className="object-cover" /></div><div><p className="text-xs font-bold uppercase text-gold">Twój projekt</p><h2 className="mt-1 text-2xl leading-6">{item.product}</h2><p className="mt-1 text-xs text-cocoa/50">{item.stone} · {item.hardware}</p></div></div><div className="p-6"><div className="space-y-3 text-sm"><PriceRow label="Produkt" value={item.price} />{discount > 0 && <PriceRow label="Rabat DEMO10" value={-discount} />}<PriceRow label={delivery} value={deliveryCost} />{speed === "Ekspresowy" && <PriceRow label="Realizacja ekspresowa" value={25} />}<div className="flex justify-between border-t pt-4 text-lg font-bold"><span>Do zapłaty</span><span>{formatPrice(total)}</span></div></div><button type="submit" disabled={loading} className="button-primary mt-6 w-full disabled:cursor-wait disabled:opacity-60">{loading ? "Symuluję płatność…" : <><CreditCard size={17} aria-hidden="true" /> Zapłać i zamawiam</>}</button><ul className="mt-5 space-y-2 text-xs text-cocoa/50"><li className="flex gap-2"><Check size={14} className="text-gold" aria-hidden="true" /> Brak prawdziwego obciążenia</li><li className="flex gap-2"><Package size={14} className="text-gold" aria-hidden="true" /> Zamówienie pojawi się w panelu</li></ul></div></aside></form></main></div>;
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) { return <section className="soft-card p-5 sm:p-7"><h2 className="mb-6 text-3xl">{title}</h2>{children}</section>; }
function Field({ label, value, onChange }: { label: string; value: string; onChange?: (value: string) => void }) { const id = label.toLowerCase().replaceAll(" ", "-"); return <label htmlFor={id} className="text-sm font-bold">{label}<input id={id} required value={value} onChange={(event) => onChange?.(event.target.value)} className="mt-2 min-h-12 w-full rounded-2xl border bg-ivory px-4 font-normal" /></label>; }
function ChoiceRow({ options, value, setValue, labels }: { options: string[]; value: string; setValue: (value: string) => void; labels: string[] }) { return <fieldset><legend className="sr-only">Wybierz opcję</legend><div className="grid gap-3 sm:grid-cols-3">{options.map((item, index) => <button type="button" key={item} aria-pressed={value === item} onClick={() => setValue(item)} className={`min-h-20 rounded-2xl border p-4 text-left ${value === item ? "border-gold bg-blush" : "bg-ivory"}`}><strong className="block text-sm">{item}</strong><span className="mt-1 block text-xs text-cocoa/50">{labels[index]}</span></button>)}</div></fieldset>; }
function PriceRow({ label, value }: { label: string; value: number }) { return <div className="flex justify-between"><span>{label}</span><span>{formatPrice(value)}</span></div>; }
