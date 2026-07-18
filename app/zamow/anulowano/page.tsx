import { ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-5 py-12 text-neutral-950">
      <section className="w-full max-w-lg rounded-lg border border-neutral-200 bg-white p-6 sm:p-8">
        <span className="flex size-12 items-center justify-center rounded-md bg-brand text-neutral-950">
          <RotateCcw size={24} aria-hidden="true" />
        </span>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
          Rug Studio · portfolio demo
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Płatność została anulowana
        </h1>
        <p className="mt-4 text-base leading-7 text-neutral-600">
          Dane konfiguracji nie zostały zapisane. Możesz wrócić do katalogu i
          rozpocząć demonstracyjny proces jeszcze raz.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/zamow"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-neutral-950 px-5 text-sm font-semibold text-brand transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Wróć do katalogu
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-md border border-neutral-300 px-5 text-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-950 hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
          >
            Strona główna
          </Link>
        </div>
      </section>
    </main>
  );
}
