import { createClientServer } from "@/lib/supabase/server";
import { RugCard } from "./rug-card";

export default async function ZamowPage() {
  const supabase = await createClientServer();
  const { data: rugTypes, error } = await supabase
    .from("rug_types")
    .select("*")
    .eq("is_active", true);

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-950">
      <section className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            Rug Studio · portfolio demo
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            Wybierz typ dywanu
          </h1>
          <p className="mt-4 text-sm leading-6 text-neutral-600">
            Przejrzyj przykładowe warianty i wybierz bazę projektu. Rozmiar,
            termin i materiał referencyjny ustawisz w kolejnym kroku demo.
          </p>
        </div>

        {error ? (
          <div className="mt-8 rounded-lg border border-neutral-200 bg-white p-6">
            <p className="text-sm font-medium text-neutral-950">
              Nie udało się pobrać typów dywanów.
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              Odśwież stronę albo spróbuj ponownie za chwilę.
            </p>
          </div>
        ) : rugTypes?.length ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rugTypes.map((rug) => (
              <RugCard
                key={rug.id}
                id={rug.id}
                name={rug.name}
                description={rug.description}
                leadDays={rug.lead_time_days}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-lg border border-neutral-200 bg-white p-6">
            <p className="text-sm font-medium text-neutral-950">
              Brak aktywnych wariantów.
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              Aktualnie nie ma dostępnych typów dywanów do zamówienia.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
