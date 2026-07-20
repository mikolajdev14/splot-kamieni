import { DemoFooter, DemoHeader } from "@/components/demo-shell";
import { PRODUCTS, formatPrice } from "@/lib/demo-data";
import { ArrowRight, Gem, Gift, Heart, PackageCheck, Sparkles, WandSparkles } from "lucide-react";
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
    <div className="silk-page overflow-hidden">
      <DemoHeader overlay />
      <main id="main-content">
        <section className="relative flex min-h-[48rem] items-center overflow-hidden bg-cocoa text-paper sm:min-h-[54rem]">
          <Image src="/jewelry/hero-bracelet.webp" alt="Bransoletka z kwarcu różowego i kamienia księżycowego na kremowej tkaninie" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-cocoa/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-cocoa/75 via-cocoa/20 to-cocoa/80" />
          <div className="shell relative z-10 flex flex-col items-center pb-28 pt-32 text-center sm:pb-36">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sand">Ręcznie robiona biżuteria z kamieni naturalnych</p>
            <h1 className="mt-7 max-w-6xl text-5xl font-medium leading-[0.86] tracking-[-0.055em] sm:text-7xl lg:text-[7rem]">Biżuteria stworzona <em className="font-normal text-sand">specjalnie dla Ciebie</em></h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-paper/75">Wybierz kamienie, kolory i dodatki. My stworzymy biżuterię dopasowaną do Twojej historii, intencji lub wyjątkowej okazji.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="hero-button-light group" href="/zamow">Zaprojektuj swoją biżuterię <ArrowRight size={17} aria-hidden="true" /></Link>
              <Link className="hero-button-ghost" href="#kolekcja">Zobacz kolekcję</Link>
            </div>
          </div>
        </section>

        <section id="kolekcja" className="relative z-20 -mt-28 scroll-mt-20 pb-20 sm:-mt-32 sm:pb-28">
          <div className="shell">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PRODUCTS.map((product) => (
                <article key={product.id} className="product-card soft-card group overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                    <Image src={product.image} alt={product.name} fill className="object-cover transition duration-700 group-hover:scale-[1.08]" sizes="(min-width: 1024px) 25vw, 50vw" />
                    <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wider backdrop-blur">{product.tag}</span>
                  </div>
                  <div className="p-5">
                    <p className="text-[0.65rem] font-bold uppercase tracking-wider text-cocoa/40">Kategoria</p>
                    <h3 className="mt-1 text-2xl font-semibold leading-6">{product.name}</h3>
                    <p className="mt-3 min-h-12 text-sm leading-6 text-cocoa/60">{product.description}</p>
                    <div className="mt-5 flex items-center justify-between">
                      <p className="text-sm">od <strong>{formatPrice(product.price)}</strong></p>
                      <Link href="/zamow" className="card-action" aria-label={`Personalizuj: ${product.name}`}><ArrowRight size={18} aria-hidden="true" /></Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="collection-story mt-16 grid items-center gap-9 overflow-hidden p-7 sm:p-10 lg:grid-cols-[1.1fr_0.55fr_0.8fr] lg:p-14">
              <span className="collection-number" aria-hidden="true">01</span>
              <div className="relative z-10">
                <p className="eyebrow">Początek Twojej historii</p>
                <h2 className="mt-4 text-5xl font-medium leading-[0.9] sm:text-7xl">Wybierz swój <em className="font-normal text-gold">splot</em></h2>
              </div>
              <div className="jewel-orbit" aria-hidden="true"><span><Gem size={31} strokeWidth={1.25} /></span></div>
              <div className="relative z-10 lg:border-l lg:border-cocoa/15 lg:pl-9">
                <p className="text-base leading-8 text-cocoa/65">Każdy model jest punktem wyjścia. Kolor, kamień i znaczenie dobierzesz już po swojemu.</p>
                <Link className="collection-link group mt-7" href="/zamow">Stwórz własną kompozycję <ArrowRight size={18} aria-hidden="true" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section id="jak-to-dziala" className="silk-band scroll-mt-20 py-20 sm:py-28">
          <div className="shell">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="eyebrow">Od intencji do gotowej biżuterii</p><h2 className="mt-4 max-w-3xl text-4xl font-medium sm:text-6xl">Cztery spokojne kroki. <em className="font-normal text-gold">Jeden olśniewający efekt.</em></h2></div>
              <Sparkles className="hidden text-gold/70 sm:block" size={48} strokeWidth={1.2} aria-hidden="true" />
            </div>
            <ol className="mt-14 grid gap-4 lg:grid-cols-4">
              {process.map(([number, title, description]) => (
                <li key={number} className="process-card">
                  <span className="process-number">{number}</span>
                  <h3 className="mt-16 text-3xl">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-cocoa/60">{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="silk-section py-16 sm:py-24">
          <div className="shell">
            <div className="editorial-panel grid overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[29rem] overflow-hidden lg:min-h-[42rem]">
                <Image src="/jewelry/amethyst-bracelet.webp" alt="Bransoletka z ametystem i zawieszką w kształcie księżyca" fill className="object-cover transition duration-1000 hover:scale-105" sizes="(min-width: 1024px) 45vw, 100vw" />
                <div className="absolute inset-x-5 bottom-5 rounded-[1.5rem] border border-paper/50 bg-paper/80 p-5 backdrop-blur-xl sm:left-auto sm:w-64">
                  <WandSparkles className="text-gold" aria-hidden="true" />
                  <p className="mt-5 font-editorial text-3xl">Twój wybór ma znaczenie</p>
                </div>
              </div>
              <div className="relative flex flex-col justify-center bg-paper p-7 sm:p-12 lg:p-16">
                <span className="editorial-ghost" aria-hidden="true">Twój</span>
                <div className="relative">
                  <p className="eyebrow">Personalizacja bez pośpiechu</p>
                  <h2 className="mt-4 text-4xl font-medium sm:text-6xl">Każdy detal może być <em className="font-normal text-gold">Twój</em></h2>
                  <p className="mt-6 max-w-xl text-base leading-8 text-cocoa/65">Zmieniaj kamień, kolor dodatków, rozmiar, zawieszkę, intencję i opakowanie. Cena aktualizuje się od razu, a podsumowanie zawsze pozostaje pod ręką.</p>
                  <ul className="mt-8 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                    {["Kamień", "Kolor", "Rozmiar", "Zawieszka", "Intencja", "Opakowanie"].map((item) => <li key={item} className="material-chip">{item}</li>)}
                  </ul>
                  <Link className="button-primary mt-8" href="/zamow">Otwórz konfigurator <ArrowRight size={17} aria-hidden="true" /></Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="silk-band py-20 sm:py-28">
          <div className="shell">
            <div className="text-center"><p className="eyebrow">Wasze słowa</p><h2 className="mt-4 text-4xl sm:text-6xl">Małe rzeczy, dużo emocji</h2><p className="mt-3 text-xs text-cocoa/45">Przykładowe opinie w wersji demo</p></div>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {reviews.map(([name, quote], index) => (
                <figure key={name} className={`review-card soft-card p-7 ${index === 1 ? "lg:-translate-y-5" : ""}`}>
                  <div className="flex items-center justify-between"><Heart className="text-gold" aria-hidden="true" /><span className="text-xs tracking-[0.25em] text-gold">★★★★★</span></div>
                  <blockquote className="mt-8 font-editorial text-2xl leading-8">„{quote}”</blockquote>
                  <figcaption className="mt-7 text-sm font-bold">{name} · klientka demo</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-20 py-20 sm:py-28">
          <div className="shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-3 text-4xl sm:text-6xl">Warto<br /><em className="font-normal text-gold">wiedzieć</em></h2>
              <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-blush px-5 py-3 text-sm text-cocoa/70"><Gift className="text-gold" aria-hidden="true" /> Każde zamówienie może stać się prezentem.</div>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-line bg-ivory/70 px-6 shadow-sm sm:px-9">
              {faqs.map(([question, answer], index) => (
                <details key={question} className="faq-item group border-b border-line py-6 last:border-0">
                  <summary className="flex cursor-pointer list-none items-center gap-5 font-semibold"><span className="font-editorial text-2xl text-gold">0{index + 1}</span><span className="flex-1">{question}</span><span className="faq-plus" aria-hidden="true">+</span></summary>
                  <p className="ml-12 mt-3 max-w-2xl text-sm leading-7 text-cocoa/60">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="silk-section pb-16 pt-8 sm:pb-24 sm:pt-12">
          <div className="shell">
            <div className="cta-jewel grid overflow-hidden rounded-[2.75rem] bg-cocoa text-paper lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative z-10 flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-gold"><PackageCheck aria-hidden="true" /> Tworzona ręcznie dla Ciebie</div>
                <h2 className="mt-7 max-w-2xl text-5xl leading-[0.92] sm:text-7xl">Gotowa stworzyć coś <em className="font-normal text-sand">swojego?</em></h2>
                <p className="mt-6 max-w-lg text-base leading-7 text-paper/65">Połącz kamień, intencję i osobisty detal. Zobacz cenę od razu i przejdź całą drogę od pomysłu do gotowego prezentu.</p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link href="/zamow" className="hero-button-light group shrink-0">Zacznij personalizację <ArrowRight size={17} aria-hidden="true" /></Link>
                  <span className="text-xs leading-5 text-paper/50">Konfiguracja zajmuje około 2 minut</span>
                </div>
              </div>
              <div className="cta-image group relative min-h-[25rem] overflow-hidden lg:min-h-[38rem]">
                <Image src="/jewelry/gift-set.webp" alt="Personalizowany zestaw biżuterii z kamieni naturalnych w pudełku prezentowym" fill className="object-cover transition duration-1000 group-hover:scale-[1.06]" sizes="(min-width: 1024px) 45vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa/55 via-transparent to-cocoa/10" />
                <div className="cta-note absolute bottom-6 left-6 right-6 flex items-center gap-4 rounded-[1.5rem] border border-paper/40 bg-paper/85 p-4 text-cocoa shadow-xl backdrop-blur-xl sm:left-auto sm:w-72">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blush text-gold"><Sparkles aria-hidden="true" /></span>
                  <p className="text-sm leading-5"><strong className="block">Jedyny taki splot</strong><span className="text-cocoa/55">Kamienie dobrane do Twojej intencji</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <DemoFooter />
    </div>
  );
}
