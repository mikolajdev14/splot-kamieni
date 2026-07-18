"use client";

import { ArrowRight, Camera, Check, PackageCheck, Ruler, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import heroImage from "@/public/rug-studio-hero.webp";
import rugFeature from "@/public/rug-studio-feature.webp";

const steps = [
  {
    number: "01",
    icon: Ruler,
    title: "Poznajesz kolekcję",
    description: "Wybierz kształt, rozmiar i kierunek wizualny projektu.",
  },
  {
    number: "02",
    icon: Camera,
    title: "Budujesz koncepcję",
    description: "Dodaj materiał referencyjny i opisz najważniejsze detale.",
  },
  {
    number: "03",
    icon: PackageCheck,
    title: "Finalizujesz zamówienie",
    description: "Wybierz termin, sposób dostawy i przejdź do podsumowania.",
  },
];

const benefits = [
  "Elastyczny konfigurator produktu",
  "Czytelny proces od inspiracji do płatności",
  "Kompletny scenariusz klienta i panel obsługi",
];

export default function HomePage() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="overflow-x-hidden bg-neutral-50 text-neutral-950">
      <motion.header
        initial={reducedMotion ? false : { opacity: 0, y: -12 }}
        animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="border-b border-neutral-200 bg-neutral-50"
      >
        <nav className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
          <Link href="/" className="flex items-center gap-3 text-neutral-950 transition-opacity hover:opacity-70">
            <span className="flex size-9 items-center justify-center rounded-md bg-neutral-950 text-sm font-black text-brand">
              R
            </span>
            <span className="leading-none">
              <span className="block text-base font-bold tracking-tight">Rug Studio</span>
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Portfolio demo
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-neutral-600 md:flex">
            <Link className="transition-colors hover:text-neutral-950" href="#jak-to-dziala">
              Jak to działa
            </Link>
            <Link className="transition-colors hover:text-neutral-950" href="#inspiracja">
              Kolekcja
            </Link>
          </div>

          <Link
            href="/zamow"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-neutral-950 px-4 text-sm font-semibold text-brand transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
          >
            Otwórz demo
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </nav>
      </motion.header>

      <main>
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-6xl items-center gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-10 lg:py-16">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, x: 36, scale: 0.97 }}
              animate={reducedMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.18, ease: "easeOut" }}
              className="order-1 lg:order-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-brand-strong ring-1 ring-white/10">
                <Image
                  src={heroImage}
                  alt="Kolekcja trzech ręcznie tuftowanych dywanów w geometryczne wzory"
                  fill
                  priority
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
                <motion.div
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.8, ease: "easeOut" }}
                  className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-md bg-neutral-950/90 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm"
                >
                  <Sparkles size={14} className="text-brand" aria-hidden="true" />
                  Oryginalne grafiki produktu
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, x: -28 }}
              animate={reducedMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
              className="order-2 max-w-xl lg:order-1"
            >
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-brand">
                Portfolio demo · e commerce
              </p>
              <h1 className="mt-5 max-w-lg text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Dywan zaczyna się od dobrego pomysłu.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-neutral-300 sm:text-lg">
                Koncepcyjny sklep pokazujący pełną ścieżkę zamówienia ręcznie
                tuftowanego dywanu. Od wyboru formy i terminu po materiał
                referencyjny, dostawę i płatność.
              </p>

              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.42, ease: "easeOut" }}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <motion.div whileHover={reducedMotion ? undefined : { y: -2 }} transition={{ duration: 0.18 }}>
                  <Link
                    href="/zamow"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand px-5 text-sm font-bold text-neutral-950 transition-colors hover:bg-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    Przejdź przez demo
                    <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </motion.div>
                <Link
                  href="#jak-to-dziala"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-white/25 px-5 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Zobacz, jak to działa
                </Link>
              </motion.div>

              <motion.div
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={reducedMotion ? undefined : { opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.58 }}
                className="mt-10 grid max-w-lg grid-cols-3 border-t border-white/15 pt-5"
              >
                <div className="pr-3">
                  <p className="text-lg font-semibold text-white">3 kroki</p>
                  <p className="mt-1 text-xs leading-5 text-neutral-400">Pełny konfigurator</p>
                </div>
                <div className="border-l border-white/15 px-3">
                  <p className="text-lg font-semibold text-white">100%</p>
                  <p className="mt-1 text-xs leading-5 text-neutral-400">Responsive UI</p>
                </div>
                <div className="border-l border-white/15 pl-3">
                  <p className="text-lg font-semibold text-white">Demo</p>
                  <p className="mt-1 text-xs leading-5 text-neutral-400">Fikcyjna marka</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="jak-to-dziala" className="scroll-mt-16 bg-brand">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-700">
                Prosty proces
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                Od inspiracji do gotowego dywanu.
              </h2>
              <p className="mt-4 text-base leading-7 text-neutral-800">
                Demo prowadzi przez kompletną ścieżkę produktową. Każdy krok ma
                jasny cel, podsumowanie i czytelny następny ruch.
              </p>
            </motion.div>

            <div className="mt-12 grid gap-0 border-t border-neutral-950/20 md:grid-cols-3">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.article
                    key={step.number}
                    initial={reducedMotion ? false : { opacity: 0, y: 22 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
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
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="inspiracja" className="scroll-mt-16 bg-neutral-50">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-10">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, x: -24 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Przykładowa kolekcja
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                Od szkicu do wyrazistej, miękkiej formy.
              </h2>
              <p className="mt-5 text-base leading-7 text-neutral-600">
                Abstrakcyjny znak, ilustracja, typografia albo forma organiczna.
                Materiał referencyjny pomaga przełożyć kierunek wizualny na
                konfigurację produktu.
              </p>

              <ul className="mt-7 space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm leading-6 text-neutral-700">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-brand">
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
                Otwórz konfigurator
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </motion.div>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, x: 24, scale: 0.98 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative overflow-hidden rounded-lg bg-neutral-950 p-5 sm:p-8"
            >
              <div className="flex min-h-[280px] items-center justify-center sm:min-h-[380px]">
                <Image
                  src={rugFeature}
                  alt="Kremowy dywan o organicznym kształcie z czarnym wzorem i pomarańczowym detalem"
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="h-auto w-full object-contain"
                />
              </div>
              <div className="flex items-center justify-between border-t border-white/15 pt-4 text-xs text-neutral-400">
                <span>Oryginalny asset wygenerowany do projektu</span>
                <span className="text-brand">Rug Studio</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-neutral-950 text-white">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-end lg:px-10">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
                Zobacz działający flow
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Sprawdź projekt od strony użytkownika.
              </h2>
              <p className="mt-4 text-base leading-7 text-neutral-300">
                Otwórz katalog, wybierz wariant i przejdź przez kompletny
                konfigurator przygotowany jako portfolio demo.
              </p>
            </motion.div>
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
              whileHover={reducedMotion ? undefined : { y: -2 }}
            >
              <Link
                href="/zamow"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand px-5 text-sm font-bold text-neutral-950 transition-colors hover:bg-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Otwórz demo zamówienia
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-neutral-950 px-5 pb-8 text-neutral-400 sm:px-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 border-t border-white/15 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span className="text-base font-bold text-white">Rug Studio</span>
          <span>Projekt demonstracyjny · fikcyjna marka · portfolio 2026</span>
        </div>
      </footer>
    </div>
  );
}
