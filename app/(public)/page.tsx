import { ArrowRight, Camera, Check, PackageCheck, Ruler, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import heroImage from "@/public/porshe z tlem.png";
import rugCutout from "@/public/porshe-gradient.png";

const steps = [
  {
    number: "01",
    icon: Ruler,
    title: "Wybierasz wariant",
    description: "Wskaż typ dywanu, rozmiar i dogodny termin realizacji.",
  },
  {
    number: "02",
    icon: Camera,
    title: "Dodajesz inspirację",
    description: "Możesz przesłać zdjęcie przedmiotu, który mam odwzorować.",
  },
  {
    number: "03",
    icon: PackageCheck,
    title: "Opłacasz zamówienie",
    description: "Wybierasz dostawę przez InPost lub kuriera i płacisz online.",
  },
];

const benefits = [
  "Projekt na podstawie Twojego pomysłu",
  "Ręczne wykonanie z dbałością o szczegóły",
  "Dostawa do paczkomatu InPost albo kurierem",
];

export default function HomePage() {
  return (
    <div className="overflow-x-hidden bg-neutral-50 text-neutral-950">
      <header className="border-b border-neutral-200 bg-neutral-50">
        <nav className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="font-lobster text-3xl text-neutral-950 transition-opacity hover:opacity-70"
          >
            Carpetiem
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-neutral-600 md:flex">
            <Link className="transition-colors hover:text-neutral-950" href="#jak-to-dziala">
              Jak to działa
            </Link>
            <Link className="transition-colors hover:text-neutral-950" href="#inspiracja">
              Inspiracja
            </Link>
          </div>

          <Link
            href="/zamow"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-neutral-950 px-4 text-sm font-semibold text-[#ffe44c] transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
          >
            Zamów dywan
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </nav>
      </header>

      <main>
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-6xl items-center gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-10 lg:py-16">
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#d8a900] ring-1 ring-white/10">
                <Image
                  src={heroImage}
                  alt="Ręcznie wykonany dywan przedstawiający sportowy samochód"
                  fill
                  priority
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-md bg-neutral-950/90 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm">
                  <Sparkles size={14} className="text-[#ffe44c]" aria-hidden="true" />
                  Wykonane ręcznie
                </div>
              </div>
            </div>

            <div className="order-2 max-w-xl lg:order-1">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#ffe44c]">
                Dywany na zamówienie
              </p>
              <h1 className="mt-5 max-w-lg text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Twój pomysł. Mój warsztat.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-neutral-300 sm:text-lg">
                Tworzę ręcznie dywany inspirowane tym, co jest dla Ciebie ważne.
                Prześlij zdjęcie, wybierz wariant i zamów swój unikalny projekt
                online.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/zamow"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#ffe44c] px-5 text-sm font-bold text-neutral-950 transition-colors hover:bg-[#f5d62c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffe44c]"
                >
                  Wybierz swój dywan
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link
                  href="#jak-to-dziala"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-white/25 px-5 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Zobacz, jak to działa
                </Link>
              </div>

              <div className="mt-10 grid max-w-lg grid-cols-3 border-t border-white/15 pt-5">
                <div className="pr-3">
                  <p className="text-lg font-semibold text-white">1:1</p>
                  <p className="mt-1 text-xs leading-5 text-neutral-400">Twój projekt</p>
                </div>
                <div className="border-l border-white/15 px-3">
                  <p className="text-lg font-semibold text-white">Online</p>
                  <p className="mt-1 text-xs leading-5 text-neutral-400">Proste zamówienie</p>
                </div>
                <div className="border-l border-white/15 pl-3">
                  <p className="text-lg font-semibold text-white">InPost</p>
                  <p className="mt-1 text-xs leading-5 text-neutral-400">Wygodna dostawa</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="jak-to-dziala" className="scroll-mt-16 bg-[#ffe44c]">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-700">
                Prosty proces
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                Od inspiracji do gotowego dywanu.
              </h2>
              <p className="mt-4 text-base leading-7 text-neutral-800">
                Wszystkie najważniejsze informacje podajesz w jednym formularzu,
                a rezerwacja realizacji następuje po bezpiecznej płatności online.
              </p>
            </div>

            <div className="mt-12 grid gap-0 border-t border-neutral-950/20 md:grid-cols-3">
              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.number}
                    className="border-b border-neutral-950/20 py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                  >
                    <div className="flex items-center justify-between">
                      <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                      <span className="font-syne text-xs text-neutral-700">{step.number}</span>
                    </div>
                    <h3 className="mt-8 text-xl font-semibold text-neutral-950">{step.title}</h3>
                    <p className="mt-3 max-w-xs text-sm leading-6 text-neutral-800">
                      {step.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="inspiracja" className="scroll-mt-16 bg-neutral-50">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Zaczyna się od Ciebie
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                Wybierz temat, który chcesz mieć zawsze pod nogami.
              </h2>
              <p className="mt-5 text-base leading-7 text-neutral-600">
                Samochód, zwierzak, logo, ulubiony symbol albo prezent dla kogoś
                bliskiego. Zdjęcie referencyjne pomaga uchwycić to, co ma być
                najważniejsze w projekcie.
              </p>

              <ul className="mt-7 space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm leading-6 text-neutral-700">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-[#ffe44c]">
                      <Check size={13} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>

              <Link
                href="/zamow"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-neutral-950 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-950"
              >
                Przejdź do zamówienia
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div className="relative overflow-hidden rounded-lg bg-neutral-950 p-5 sm:p-8">
              <div className="flex min-h-[280px] items-center justify-center sm:min-h-[380px]">
                <Image
                  src={rugCutout}
                  alt="Przykład dywanu wykonanego na zamówienie"
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="h-auto w-full object-contain"
                />
              </div>
              <div className="flex items-center justify-between border-t border-white/15 pt-4 text-xs text-neutral-400">
                <span>Przykład realizacji</span>
                <span className="text-[#ffe44c]">Carpetiem</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-neutral-950 text-white">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-end lg:px-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#ffe44c]">
                Zróbmy coś Twojego
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Gotowy na własny projekt?
              </h2>
              <p className="mt-4 text-base leading-7 text-neutral-300">
                Wybierz dostępny wariant, określ szczegóły i opłać zamówienie.
                Resztą zajmę się w pracowni.
              </p>
            </div>
            <Link
              href="/zamow"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#ffe44c] px-5 text-sm font-bold text-neutral-950 transition-colors hover:bg-[#f5d62c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffe44c]"
            >
              Zamów swój dywan
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-neutral-950 px-5 pb-8 text-neutral-400 sm:px-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 border-t border-white/15 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span className="font-lobster text-xl text-white">Carpetiem</span>
          <span>Dywany tworzone z pomysłu.</span>
        </div>
      </footer>
    </div>
  );
}
