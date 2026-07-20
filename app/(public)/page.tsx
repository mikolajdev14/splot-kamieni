import { DemoFooter, DemoHeader } from "@/components/demo-shell";
import { PRODUCTS, formatPrice } from "@/lib/demo-data";
import { ArrowRight, Gift, Heart, PackageCheck, Sparkles, WandSparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const process = [
  ["01", "Wybierz rodzaj", "Bransoletka, naszyjnik albo zestaw gotowy na prezent."],
  ["02", "Dopasuj detale", "Kamień, kolor dodatków, rozmiar, zawieszka i intencja."],
  ["03", "Wybierz termin", "Standardowo lub ekspresowo, z wygodną dostawą."],
  ["04", "Odbierz swój splot", "Tworzony ręcznie i zapakowany z uważnością."],
];

const reviews = [
  ["Anna", "Bransoletka była dokładnie taka, jak ją sobie wyobrażałam. Delikatna i naprawdę moja."],
  ["Kasia", "Najpiękniejszy prezent dla siostry. Dedykacja i opakowanie zrobiły ogromne wrażenie."],
  ["Marta", "Proces wyboru kamienia był prosty, a efekt wygląda jeszcze lepiej niż na zdjęciach."],
];

const faqs = [
  ["Jak dobrać rozmiar bransoletki?", "Zmierz nadgarstek miękką miarką bez luzu. W konfiguratorze podpowiemy, jaki rozmiar wybrać."],
  ["Ile trwa realizacja?", "Standardowo od 5 do 7 dni roboczych. W demo możesz też wybrać realizację ekspresową."],
  ["Czy mogę wybrać własne kamienie?", "Tak. W konfiguratorze wybierzesz kamień główny, a w notatce możesz opisać własny pomysł."],
  ["Czy biżuteria może być zapakowana na prezent?", "Tak, dostępne jest pudełko prezentowe oraz wariant z osobistą dedykacją."],
  ["Czy mogę wysłać zamówienie bezpośrednio do obdarowanej osoby?", "Tak. W checkout wpisz adres osoby, do której ma trafić paczka."],
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <DemoHeader />
      <main id="main-content">
        <section className="grain relative">
          <div className="shell grid min-h-[42rem] items-center gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
            <div className="relative z-10 max-w-2xl">
              <p className="eyebrow">Biżuteria, która mówi o Tobie</p>
              <h1 className="mt-5 text-5xl font-medium leading-[0.9] tracking-[-0.04em] sm:text-7xl lg:text-[5.5rem]">Biżuteria stworzona <em className="font-normal text-gold">specjalnie</em> dla Ciebie</h1>
              <p className="mt-7 max-w-xl text-base leading-8 text-cocoa/70 sm:text-lg">Wybierz kamienie, kolory i dodatki, a my stworzymy unikalną biżuterię dopasowaną do Twojej historii, intencji lub wyjątkowej okazji.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link className="button-primary" href="/zamow">Zaprojektuj swoją biżuterię <ArrowRight size={17} aria-hidden="true" /></Link><Link className="button-secondary" href="#kolekcja">Zobacz kolekcję</Link></div>
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs font-bold uppercase tracking-[0.12em] text-cocoa/55"><span>Naturalne kamienie</span><span>Ręczne wykonanie</span><span>Osobista intencja</span></div>
            </div>
            <div className="relative min-h-[29rem] sm:min-h-[36rem]">
              <div className="absolute inset-x-6 top-0 aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-sand shadow-2xl sm:inset-x-0"><Image src="/jewelry/hero-bracelet.webp" alt="Bransoletka z kwarcu różowego i kamienia księżycowego na kremowej tkaninie" fill priority className="object-cover" sizes="(min-width: 1024px) 52vw, 100vw" /></div>
              <div className="soft-card absolute bottom-3 left-0 w-56 p-5 sm:-left-8 sm:bottom-0"><div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-widest text-cocoa/50">Kamień miesiąca</span><Sparkles size={17} className="text-gold" aria-hidden="true" /></div><p className="mt-8 font-editorial text-3xl">Kwarc różowy</p><p className="mt-1 text-xs leading-5 text-cocoa/60">Bliskość, czułość i łagodność</p></div>
              <div className="absolute bottom-12 right-0 rounded-full border border-paper/70 bg-cocoa px-5 py-3 text-xs font-bold text-paper shadow-xl sm:-right-5">Tworzona ręcznie</div>
            </div>
          </div>
        </section>

        <section id="kolekcja" className="scroll-mt-20 bg-paper py-20 sm:py-28">
          <div className="shell"><div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Początek Twojej historii</p><h2 className="mt-3 text-4xl font-medium sm:text-6xl">Wybierz swój <em className="font-normal text-gold">splot</em></h2></div><p className="max-w-md text-sm leading-7 text-cocoa/60">Każdy model jest punktem wyjścia. Kolor, kamień i znaczenie dobierzesz już po swojemu.</p></div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{PRODUCTS.map((product, index) => <article key={product.id} className={`soft-card group overflow-hidden ${index % 2 ? "lg:translate-y-8" : ""}`}><div className="relative aspect-[4/5] overflow-hidden bg-sand"><Image src={product.image} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 25vw, 50vw" /><span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wider backdrop-blur">{product.tag}</span></div><div className="p-5"><h3 className="text-2xl font-semibold leading-6">{product.name}</h3><p className="mt-3 min-h-12 text-sm leading-6 text-cocoa/60">{product.description}</p><div className="mt-5 flex items-center justify-between"><p className="text-sm">od <strong>{formatPrice(product.price)}</strong></p><Link href="/zamow" className="flex size-11 items-center justify-center rounded-full bg-cocoa text-paper" aria-label={`Personalizuj: ${product.name}`}><ArrowRight size={18} aria-hidden="true" /></Link></div></div></article>)}</div>
          </div>
        </section>

        <section id="jak-to-dziala" className="scroll-mt-20 bg-cocoa py-20 text-paper sm:py-28"><div className="shell"><p className="eyebrow">Od intencji do gotowej biżuterii</p><h2 className="mt-4 max-w-3xl text-4xl font-medium sm:text-6xl">Cztery spokojne kroki. <em className="font-normal text-sand">Jeden wyjątkowy efekt.</em></h2><ol className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-paper/15 lg:grid-cols-4">{process.map(([number, title, description]) => <li key={number} className="bg-cocoa p-7"><span className="text-xs font-bold tracking-[0.2em] text-gold">{number}</span><h3 className="mt-12 text-3xl">{title}</h3><p className="mt-3 text-sm leading-6 text-paper/60">{description}</p></li>)}</ol></div></section>

        <section className="bg-blush py-20 sm:py-28"><div className="shell grid items-center gap-10 lg:grid-cols-2"><div className="relative min-h-[32rem]"><div className="absolute inset-y-0 left-0 w-[72%] overflow-hidden rounded-[2.5rem]"><Image src="/jewelry/amethyst-bracelet.webp" alt="Bransoletka z ametystem i zawieszką w kształcie księżyca" fill className="object-cover" /></div><div className="soft-card absolute bottom-6 right-0 w-56 p-6"><WandSparkles className="text-gold" aria-hidden="true" /><p className="mt-8 font-editorial text-3xl">Twój wybór ma znaczenie</p></div></div><div><p className="eyebrow">Personalizacja bez pośpiechu</p><h2 className="mt-4 text-4xl font-medium sm:text-6xl">Każdy detal może być <em className="font-normal text-gold">Twój</em></h2><p className="mt-6 max-w-xl text-base leading-8 text-cocoa/65">Zmieniaj kamień, kolor dodatków, rozmiar, zawieszkę, intencję i opakowanie. Cena aktualizuje się od razu, a podsumowanie zawsze pozostaje pod ręką.</p><ul className="mt-8 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">{["Kamień", "Kolor", "Rozmiar", "Zawieszka", "Intencja", "Opakowanie"].map((item) => <li key={item} className="rounded-full border border-cocoa/15 bg-paper/60 px-4 py-3 text-center font-semibold">{item}</li>)}</ul><Link className="button-primary mt-8" href="/zamow">Otwórz konfigurator <ArrowRight size={17} aria-hidden="true" /></Link></div></div></section>

        <section className="bg-paper py-20 sm:py-28"><div className="shell"><div className="text-center"><p className="eyebrow">Wasze słowa</p><h2 className="mt-4 text-4xl sm:text-6xl">Małe rzeczy, dużo emocji</h2><p className="mt-3 text-xs text-cocoa/45">Przykładowe opinie w wersji demo</p></div><div className="mt-12 grid gap-5 lg:grid-cols-3">{reviews.map(([name, quote]) => <figure key={name} className="soft-card p-7"><Heart className="text-gold" aria-hidden="true" /><blockquote className="mt-8 font-editorial text-2xl leading-8">„{quote}”</blockquote><figcaption className="mt-7 text-sm font-bold">{name} · klientka demo</figcaption></figure>)}</div></div></section>

        <section id="faq" className="scroll-mt-20 border-t border-line bg-ivory py-20"><div className="shell grid gap-10 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="eyebrow">FAQ</p><h2 className="mt-3 text-4xl sm:text-5xl">Warto wiedzieć</h2><div className="mt-6 flex items-center gap-3 text-sm text-cocoa/60"><Gift className="text-gold" aria-hidden="true" /> Każde zamówienie może stać się prezentem.</div></div><div>{faqs.map(([question, answer]) => <details key={question} className="group border-b border-line py-5"><summary className="cursor-pointer list-none pr-8 font-semibold">{question}</summary><p className="mt-3 max-w-2xl text-sm leading-7 text-cocoa/60">{answer}</p></details>)}</div></div></section>

        <section className="bg-sand py-14"><div className="shell flex flex-col gap-6 rounded-[2.5rem] bg-cocoa p-8 text-paper sm:flex-row sm:items-center sm:justify-between sm:p-12"><div><PackageCheck className="text-gold" aria-hidden="true" /><h2 className="mt-6 text-4xl">Gotowa stworzyć coś swojego?</h2><p className="mt-2 text-sm text-paper/60">Przejdź pełną demonstracyjną ścieżkę zamówienia.</p></div><Link href="/zamow" className="inline-flex min-h-12 items-center justify-center rounded-full bg-paper px-6 text-sm font-bold text-cocoa">Zacznij personalizację <ArrowRight className="ml-2" size={17} aria-hidden="true" /></Link></div></section>
      </main>
      <DemoFooter />
    </div>
  );
}
