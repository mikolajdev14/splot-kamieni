"use client";

import { DemoHeader } from "@/components/demo-shell";
import { BASE_PRICE, CART_KEY, STONES, type JewelryConfig, formatPrice } from "@/lib/demo-data";
import { ArrowLeft, ArrowRight, Check, Gift, Info, Ruler, ShoppingBag, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type ReactNode, useMemo, useState } from "react";

const stepNames = ["Styl", "Kamień", "Dodatki", "Rozmiar", "Zawieszka", "Intencja", "Opakowanie", "Podsumowanie"];
const styles = [["Delikatna", "Drobne kamienie i dużo światła"], ["Klasyczna", "Ponadczasowy, równy rytm"], ["Wyrazista", "Większe kamienie i mocny akcent"]];
const hardware = ["Złoty", "Srebrny", "Różowe złoto"];
const sizes = ["XS · 14–15 cm", "S · 15–16 cm", "M · 16–17 cm", "L · 17–18 cm", "Własny rozmiar"];
const charms = ["Bez zawieszki", "Serce", "Księżyc", "Gwiazda", "Inicjał"];
const intentions = ["Spokój", "Miłość", "Ochrona", "Energia", "Harmonia", "Własna intencja"];
const packages = [["Standardowe", "Lniany woreczek i kartka pielęgnacji"], ["Prezentowe", "Pudełko, wstążka i delikatne wypełnienie"], ["Prezentowe z dedykacją", "Pudełko, wstążka i osobista kartka"]];

export default function ConfiguratorPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<JewelryConfig>({ style: "Klasyczna", stone: "Ametyst", hardware: "Złoty", size: "M · 16–17 cm", charm: "Bez zawieszki", intention: "Spokój", customIntention: "", dedication: "", packaging: "Standardowe", price: BASE_PRICE });

  const price = useMemo(() => {
    const stoneExtra = STONES.find((item) => item.name === config.stone)?.extra ?? 0;
    const charmExtra = config.charm === "Bez zawieszki" ? 0 : config.charm === "Inicjał" ? 15 : 10;
    const packageExtra = config.packaging === "Standardowe" ? 0 : config.packaging === "Prezentowe" ? 12 : 17;
    return BASE_PRICE + stoneExtra + charmExtra + packageExtra;
  }, [config]);

  const update = (key: keyof JewelryConfig, value: string) => setConfig((current) => ({ ...current, [key]: value }));
  const addToCart = () => {
    const cart = { ...config, price, product: "Bransoletka z intencją", image: "/jewelry/amethyst-bracelet.webp" };
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    router.push("/koszyk");
  };

  return (
    <div className="min-h-screen bg-ivory">
      <DemoHeader compact />
      <main id="main-content" className="pb-32">
        <section className="border-b border-line bg-paper"><div className="shell py-8 sm:py-10"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow">Bransoletka z intencją</p><h1 className="mt-2 text-4xl font-medium sm:text-5xl">Stwórz swój osobisty splot</h1></div><p className="rounded-full bg-blush px-4 py-2 text-xs font-bold">Krok {step + 1} z {stepNames.length}</p></div><div className="mt-8 flex gap-2 overflow-x-auto pb-2" role="progressbar" aria-valuemin={1} aria-valuemax={stepNames.length} aria-valuenow={step + 1} aria-label="Postęp konfiguracji">{stepNames.map((name, index) => <button key={name} type="button" onClick={() => index <= step && setStep(index)} className={`min-h-11 shrink-0 rounded-full px-4 text-xs font-bold ${index === step ? "bg-cocoa text-paper" : index < step ? "bg-sand text-cocoa" : "border border-line text-cocoa/40"}`} disabled={index > step}>{index < step && <Check size={13} className="mr-1 inline" aria-hidden="true" />}{name}</button>)}</div></div></section>

        <div className="shell grid items-start gap-7 py-8 lg:grid-cols-[1fr_22rem]">
          <section className="soft-card overflow-hidden p-5 sm:p-8" aria-live="polite">
            {step === 0 && <Step title="Jaki styl jest Ci najbliższy?" hint="To baza całej kompozycji. Później dobierzesz każdy detal."><ChoiceGrid>{styles.map(([name, desc], index) => <Choice key={name} selected={config.style === name} onClick={() => update("style", name)}><div className={`mb-5 h-24 rounded-2xl ${index === 0 ? "bg-blush" : index === 1 ? "bg-sand" : "bg-cocoa"}`}><div className={`mx-auto flex h-full w-3/4 items-center justify-center gap-1 ${index === 2 ? "text-gold" : "text-cocoa"}`}>{Array.from({ length: index + 6 }).map((_, dot) => <span key={dot} className="size-3 rounded-full border border-current" />)}</div></div><strong>{name}</strong><span>{desc}</span></Choice>)}</ChoiceGrid></Step>}
            {step === 1 && <Step title="Wybierz kamień główny" hint="Każdy naturalny kamień różni się lekko kolorem i strukturą."><div className="grid gap-3 sm:grid-cols-2">{STONES.map((stone) => <Choice key={stone.name} selected={config.stone === stone.name} onClick={() => update("stone", stone.name)}><div className="flex items-center gap-4"><span className={`size-12 shrink-0 rounded-full ${stone.color} ring-4 ring-ivory shadow-inner`} /><span><strong>{stone.name}</strong><span>{stone.meaning}</span></span>{stone.extra > 0 && <small className="ml-auto font-bold text-gold">+{stone.extra} zł</small>}</div></Choice>)}</div></Step>}
            {step === 2 && <Step title="Kolor dodatków" hint="Metaliczne elementy są subtelnym wykończeniem całej kompozycji."><ChoiceGrid>{hardware.map((item, index) => <Choice key={item} selected={config.hardware === item} onClick={() => update("hardware", item)}><span className={`mb-5 block size-16 rounded-full ${index === 0 ? "bg-amber-400" : index === 1 ? "bg-slate-300" : "bg-rose-300"} shadow-inner`} /><strong>{item}</strong><span>Subtelne, satynowe wykończenie</span></Choice>)}</ChoiceGrid></Step>}
            {step === 3 && <Step title="Dopasuj rozmiar" hint="Zmierz nadgarstek miękką miarką bez dodawania luzu."><div className="mb-6 flex gap-3 rounded-2xl bg-blush p-4 text-sm leading-6"><Ruler className="shrink-0 text-gold" aria-hidden="true" /><p>Owiń miarkę tuż nad kością nadgarstka. Jeśli wynik wypada na granicy, wybierz większy rozmiar.</p></div><div className="grid gap-3 sm:grid-cols-2">{sizes.map((item) => <Choice key={item} selected={config.size === item} onClick={() => update("size", item)}><strong>{item}</strong><span>Wygodne, swobodne dopasowanie</span></Choice>)}</div></Step>}
            {step === 4 && <Step title="Dodaj mały symbol" hint="Zawieszka jest opcjonalna. Może przypominać o osobie, chwili albo intencji."><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{charms.map((item) => <Choice key={item} selected={config.charm === item} onClick={() => update("charm", item)}><span className="mb-4 flex size-12 items-center justify-center rounded-full bg-blush text-gold"><Sparkles aria-hidden="true" /></span><strong>{item}</strong><span>{item === "Bez zawieszki" ? "Bez dopłaty" : item === "Inicjał" ? "+15 zł" : "+10 zł"}</span></Choice>)}</div></Step>}
            {step === 5 && <Step title="Nadaj jej intencję" hint="To myśl, z którą powstanie biżuteria. Dedykację dołączymy na osobnej kartce."><fieldset><legend className="sr-only">Wybór intencji</legend><div className="flex flex-wrap gap-2">{intentions.map((item) => <button key={item} type="button" onClick={() => update("intention", item)} className={`min-h-11 rounded-full px-4 text-sm font-semibold ${config.intention === item ? "bg-cocoa text-paper" : "border border-line bg-ivory"}`}>{item}</button>)}</div><label className="mt-7 block text-sm font-bold" htmlFor="own-intention">Własna intencja <span className="font-normal text-cocoa/45">(opcjonalnie)</span></label><input id="own-intention" value={config.customIntention} onChange={(event) => update("customIntention", event.target.value)} className="mt-2 min-h-12 w-full rounded-2xl border bg-paper px-4" placeholder="Np. odwaga w nowym rozdziale" /><label className="mt-5 block text-sm font-bold" htmlFor="dedication">Krótka dedykacja</label><textarea id="dedication" value={config.dedication} onChange={(event) => update("dedication", event.target.value)} className="mt-2 min-h-28 w-full rounded-2xl border bg-paper p-4" placeholder="Dla Ciebie, z czułością…" maxLength={120} /></fieldset></Step>}
            {step === 6 && <Step title="Jak ją zapakować?" hint="Każda opcja jest gotowa do bezpiecznej wysyłki."><div className="grid gap-3">{packages.map(([name, desc]) => <Choice key={name} selected={config.packaging === name} onClick={() => update("packaging", name)}><div className="flex items-start gap-4"><span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blush text-gold"><Gift aria-hidden="true" /></span><span><strong>{name}</strong><span>{desc}</span></span><small className="ml-auto font-bold text-gold">{name === "Standardowe" ? "0 zł" : name === "Prezentowe" ? "+12 zł" : "+17 zł"}</small></div></Choice>)}</div></Step>}
            {step === 7 && <Step title="Twój projekt jest gotowy" hint="Sprawdź szczegóły. Każdy kamień będzie miał swój naturalny, niepowtarzalny rys."><div className="grid gap-7 sm:grid-cols-[12rem_1fr]"><div className="relative aspect-square overflow-hidden rounded-[2rem]"><Image src="/jewelry/amethyst-bracelet.webp" alt="Podgląd bransoletki z ametystem" fill className="object-cover" /></div><dl className="grid content-start grid-cols-2 gap-x-5 gap-y-4 text-sm">{[["Styl", config.style], ["Kamień", config.stone], ["Dodatki", config.hardware], ["Rozmiar", config.size], ["Zawieszka", config.charm], ["Intencja", config.customIntention || config.intention], ["Opakowanie", config.packaging], ["Dedykacja", config.dedication || "Bez dedykacji"]].map(([term, value]) => <div key={term} className="border-b border-line pb-3"><dt className="text-xs text-cocoa/45">{term}</dt><dd className="mt-1 font-semibold">{value}</dd></div>)}</dl></div><div className="mt-8 rounded-2xl bg-blush p-5"><div className="flex justify-between text-sm"><span>Cena bazowa</span><span>{formatPrice(BASE_PRICE)}</span></div><div className="mt-2 flex justify-between text-sm"><span>Personalizacja</span><span>+ {formatPrice(price - BASE_PRICE)}</span></div><div className="mt-4 flex justify-between border-t border-cocoa/10 pt-4 text-lg font-bold"><span>Razem</span><span>{formatPrice(price)}</span></div></div></Step>}
          </section>

          <aside className="soft-card sticky top-24 hidden overflow-hidden lg:block"><div className="relative aspect-[4/3]"><Image src="/jewelry/amethyst-bracelet.webp" alt="Bransoletka z ametystem w trakcie personalizacji" fill className="object-cover" /></div><div className="p-6"><p className="eyebrow">Twój projekt</p><h2 className="mt-2 text-3xl">{config.stone} · {config.style}</h2><div className="mt-5 space-y-2 text-sm text-cocoa/60"><p>{config.hardware} · {config.size}</p><p>{config.charm}</p><p>Realizacja: 5–7 dni roboczych</p></div><div className="mt-6 flex items-end justify-between border-t border-line pt-5"><span className="text-xs font-bold uppercase tracking-wider text-cocoa/45">Aktualna cena</span><strong className="text-2xl">{formatPrice(price)}</strong></div></div></aside>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 shadow-2xl backdrop-blur-xl"><div className="shell flex min-h-20 items-center justify-between gap-3"><button type="button" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0} className="flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-bold disabled:opacity-30"><ArrowLeft size={17} aria-hidden="true" /> Wstecz</button><div className="text-center"><span className="block text-[0.65rem] font-bold uppercase tracking-wider text-cocoa/45">Razem</span><strong aria-live="polite">{formatPrice(price)}</strong></div>{step < 7 ? <button type="button" onClick={() => setStep((value) => Math.min(7, value + 1))} className="button-primary px-5">Dalej <ArrowRight size={17} aria-hidden="true" /></button> : <button type="button" onClick={addToCart} className="button-primary px-5"><ShoppingBag size={17} aria-hidden="true" /> Dodaj do koszyka</button>}</div></div>
    </div>
  );
}

function Step({ title, hint, children }: { title: string; hint: string; children: ReactNode }) { return <div><p className="eyebrow">Personalizacja</p><h2 className="mt-2 text-4xl font-medium">{title}</h2><p className="mt-3 flex max-w-2xl gap-2 text-sm leading-6 text-cocoa/55"><Info size={16} className="mt-1 shrink-0" aria-hidden="true" />{hint}</p><div className="mt-8">{children}</div></div>; }
function ChoiceGrid({ children }: { children: ReactNode }) { return <div className="grid gap-3 sm:grid-cols-3">{children}</div>; }
function Choice({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) { return <button type="button" onClick={onClick} aria-pressed={selected} className={`min-h-28 rounded-[1.5rem] border p-5 text-left transition hover:-translate-y-0.5 [&_strong]:block [&_span]:mt-1 [&_span]:block [&_span]:text-xs [&_span]:leading-5 [&_span]:text-cocoa/50 ${selected ? "border-gold bg-blush shadow-sm" : "border-line bg-ivory hover:border-gold/50"}`}>{children}</button>; }
