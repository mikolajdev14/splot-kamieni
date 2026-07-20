# Splot Kamieni

Klikalne demo procesu zamawiania ręcznie robionej biżuterii z kamieni naturalnych. Projekt prezentuje dwie strony biznesu: mobilną ścieżkę klientki oraz panel właścicielki pracowni.

## Uruchomienie

```bash
npm install
npm run dev
```

Aplikacja będzie dostępna pod `http://localhost:3000`.

## Główne trasy

`/` przedstawia markę, kolekcję, proces, personalizację, opinie i FAQ.

`/zamow` prowadzi przez ośmiostopniowy konfigurator bransoletki z dynamiczną ceną.

`/koszyk` pokazuje personalizację i obsługuje kod rabatowy `DEMO10`.

`/checkout` symuluje dostawę, termin i płatność.

`/zamow/sukces` oraz `/sledzenie/[id]` zamykają ścieżkę klientki.

`/admin-demo` zawiera dashboard, zamówienia, kalendarz, produkty i klientki.

## Dane i symulacje

Dane demonstracyjne znajdują się w `lib/demo-data.ts`. Konfiguracja koszyka i nowe zamówienia są zapisywane w `localStorage`, dzięki czemu świeżo utworzone zamówienie pojawia się w panelu właścicielki także po odświeżeniu strony.

Płatności, terminy, wysyłka, statusy i dane klientek są wyłącznie symulacją. Projekt nie łączy się z bramką płatności, kurierem, pocztą ani systemem magazynowym.

## Kontrola jakości

```bash
npm run typecheck
npm run lint
npm run build
```
