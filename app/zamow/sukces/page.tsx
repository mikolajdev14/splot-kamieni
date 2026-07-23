"use client";

import { DemoFooter, DemoHeader } from "@/components/demo-shell";
import { CalendarCheck, Check, PackageCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function SuccessPage() {
  return <Suspense fallback={<div role="status" className="shell py-20">Przygotowuję potwierdzenie…</div>}><SuccessContent /></Suspense>;
}

function SuccessContent() {
  const order = useSearchParams().get("order") ?? "LA-2026-0042";
  return <div><DemoHeader compact /><main id="main-content" className="grain min-h-[75vh] py-12 sm:py-20"><div className="shell"><div className="mx-auto max-w-3xl soft-card overflow-hidden"><div className="bg-cocoa p-8 text-center text-paper sm:p-12"><span className="mx-auto flex size-16 items-center justify-center rounded-full bg-paper text-gold"><Check size={30} aria-hidden="true" /></span><p className="eyebrow mt-7">Płatność przyjęta w demo</p><h1 className="mt-3 text-5xl sm:text-6xl">Dziękujemy za zamówienie</h1><p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-paper/60">Twój projekt trafił do kolejki pracowni. Od tej chwili możesz obserwować każdy etap jego powstawania.</p></div><div className="grid gap-6 p-7 sm:grid-cols-3 sm:p-10"><Info icon={<PackageCheck />} label="Numer zamówienia" value={order} /><Info icon={<Sparkles />} label="Status" value="Opłacone" /><Info icon={<CalendarCheck />} label="Przewidywana wysyłka" value="28 lipca 2026" /></div><div className="border-t p-7 sm:p-10"><div className="rounded-2xl bg-blush p-5 text-sm"><p className="font-bold">Bransoletka z intencją</p><p className="mt-1 text-cocoa/55">Ametyst · złote dodatki · rozmiar M · opakowanie prezentowe</p></div><div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link className="button-primary flex-1" href={`/sledzenie/${order}`}>Śledź zamówienie</Link><Link className="button-secondary flex-1" href="/">Wróć na stronę główną</Link></div><Link href="/admin-demo" className="mt-5 block text-center text-xs font-bold text-gold underline underline-offset-4">Pokaż zamówienie w panelu właścicielki</Link></div></div></div></main><DemoFooter /></div>;
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div className="text-center [&>svg]:mx-auto [&>svg]:text-gold">{icon}<p className="mt-3 text-[0.65rem] font-bold uppercase tracking-wider text-cocoa/45">{label}</p><p className="mt-1 text-sm font-bold">{value}</p></div>; }
