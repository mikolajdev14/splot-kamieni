import { fulfillCheckout } from "@/lib/fulfill-checkout";
import { CheckCircle2, Clock3, TriangleAlert } from "lucide-react";
import Link from "next/link";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string | string[] }>;
}) {
  const params = await searchParams;
  const sessionId = Array.isArray(params.session_id)
    ? params.session_id[0]
    : params.session_id;
  const result = sessionId
    ? await fulfillCheckout(sessionId)
    : {
        success: false as const,
        reason: "invalid_session" as const,
        message: "Brak identyfikatora płatności.",
      };

  const isPending = !result.success && result.reason === "not_paid";
  const Icon = result.success
    ? CheckCircle2
    : isPending
      ? Clock3
      : TriangleAlert;

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-5 py-12 text-neutral-950">
      <section className="w-full max-w-lg rounded-lg border border-neutral-200 bg-white p-6 sm:p-8">
        <span
          className={`flex size-12 items-center justify-center rounded-md ${
            result.success
              ? "bg-emerald-100 text-emerald-700"
              : isPending
                ? "bg-amber-100 text-amber-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          <Icon size={24} aria-hidden="true" />
        </span>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight">
          {result.success
            ? "Zamówienie zostało przyjęte"
            : isPending
              ? "Płatność jest przetwarzana"
              : "Nie udało się zapisać zamówienia"}
        </h1>
        <p className="mt-4 text-sm leading-6 text-neutral-600">
          {result.success
            ? "Płatność została potwierdzona, a zamówienie zapisane. Szczegóły realizacji są już dostępne w panelu administracyjnym."
            : isPending
              ? "Stripe nie potwierdził jeszcze płatności. Zamówienie zostanie zapisane automatycznie po otrzymaniu potwierdzenia."
              : "Płatność mogła zostać przyjęta, ale zapis zamówienia wymaga sprawdzenia. Zachowaj identyfikator sesji widoczny poniżej."}
        </p>

        {sessionId ? (
          <p className="mt-5 break-all rounded-md bg-neutral-100 px-3 py-2 font-mono text-xs text-neutral-600">
            {sessionId}
          </p>
        ) : null}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-md bg-neutral-950 px-5 text-sm font-semibold text-[#ffe44c] transition-colors hover:bg-neutral-800"
          >
            Wróć na stronę główną
          </Link>
          <Link
            href="/zamow"
            className="inline-flex h-11 items-center justify-center rounded-md border border-neutral-300 px-5 text-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-950 hover:text-neutral-950"
          >
            Zobacz warianty
          </Link>
        </div>
      </section>
    </main>
  );
}
