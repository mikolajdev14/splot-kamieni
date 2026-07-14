"use client";

import {
  CalendarDays,
  Camera,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Mail,
  MapPin,
  Package,
  Phone,
  Search,
  Truck,
  UserRound,
} from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { toggleBlockedDate, updateBookingStatus } from "./actions";

export type AdminBooking = {
  id: number;
  rugTypeId: number | null;
  rugSizeId: number | null;
  rugTypeName: string | null;
  rugSizeLabel: string | null;
  priceCents: number | null;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  notes: string | null;
  bookingDate: string | null;
  status: string;
  stripeSessionId: string | null;
  stripePaymentIntentId: string | null;
  expiresAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  deliveryMethod: string | null;
  parcelLockerCode: string | null;
  deliveryAddress: string | null;
  referenceImagePath: string | null;
  referenceImageUrl: string | null;
};

type StatusFilter = "all" | BookingStatus;
type BookingStatus = "paid" | "in_progress" | "completed" | "cancelled";

const statusOptions: Array<{ value: BookingStatus; label: string }> = [
  { value: "paid", label: "Opłacone" },
  { value: "in_progress", label: "W realizacji" },
  { value: "completed", label: "Zakończone" },
  { value: "cancelled", label: "Anulowane" },
];

const statusLabels: Record<string, string> = Object.fromEntries(
  statusOptions.map((option) => [option.value, option.label]),
);

const statusClasses: Record<string, string> = {
  paid: "bg-amber-100 text-amber-800",
  in_progress: "bg-sky-100 text-sky-800",
  completed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-neutral-200 text-neutral-600",
};

const formatDate = (value: string | null) => {
  if (!value) {
    return "Brak terminu";
  }

  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value.slice(0, 10)}T12:00:00`));
};

const formatShortDate = (value: string | null) => {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${value.slice(0, 10)}T12:00:00`));
};

const formatPrice = (priceCents: number | null) => {
  if (priceCents == null) {
    return "Brak ceny";
  }

  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(priceCents / 100);
};

const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseDateKey = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const getStatusLabel = (status: string) => statusLabels[status] ?? status;

const getDeliveryLabel = (method: string | null) => {
  if (method === "parcel_locker") {
    return "Paczkomat InPost";
  }

  if (method === "courier") {
    return "Kurier";
  }

  return "Brak danych";
};

export default function AdminDashboardClient({
  initialBookings,
  initialBlockedDates,
}: {
  initialBookings: AdminBooking[];
  initialBlockedDates: string[];
}) {
  const [bookings, setBookings] = useState(initialBookings);
  const [blockedDates, setBlockedDates] = useState(initialBlockedDates);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    initialBookings[0]?.id ?? null,
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [actionMessage, setActionMessage] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const filteredBookings = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("pl-PL");

    return bookings.filter((booking) => {
      const matchesStatus =
        statusFilter === "all" || booking.status === statusFilter;
      const searchableText = [
        booking.customerName,
        booking.customerEmail,
        booking.rugTypeName,
        booking.rugSizeLabel,
        String(booking.id),
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("pl-PL");

      return matchesStatus && searchableText.includes(normalizedSearch);
    });
  }, [bookings, search, statusFilter]);

  const selectedBooking =
    bookings.find((booking) => booking.id === selectedBookingId) ?? null;

  const stats = useMemo(
    () => ({
      total: bookings.length,
      active: bookings.filter((booking) =>
        ["paid", "in_progress"].includes(booking.status),
      ).length,
      completed: bookings.filter((booking) => booking.status === "completed")
        .length,
      revenue: bookings
        .filter((booking) => booking.status !== "cancelled")
        .reduce((total, booking) => total + (booking.priceCents ?? 0), 0),
    }),
    [bookings],
  );

  const bookedDateKeys = useMemo(
    () =>
      Array.from(
        new Set(
          bookings
            .filter(
              (booking) =>
                booking.bookingDate && booking.status !== "cancelled",
            )
            .map((booking) => booking.bookingDate as string),
        ),
      ),
    [bookings],
  );

  const handleStatusChange = (bookingId: number, status: BookingStatus) => {
    setActionMessage(undefined);

    startTransition(async () => {
      const result = await updateBookingStatus(bookingId, status);

      if (!result.success) {
        setActionMessage(result.message);
        return;
      }

      setBookings((current) =>
        current.map((booking) =>
          booking.id === bookingId ? { ...booking, status } : booking,
        ),
      );
      setActionMessage("Status zamówienia został zaktualizowany.");
    });
  };

  const handleToggleBlockedDate = (date: Date) => {
    const dateKey = toDateKey(date);
    const shouldBlock = !blockedDates.includes(dateKey);
    setActionMessage(undefined);

    startTransition(async () => {
      const result = await toggleBlockedDate(dateKey, shouldBlock);

      if (!result.success) {
        setActionMessage(result.message);
        return;
      }

      setBlockedDates((current) =>
        shouldBlock
          ? [...current, dateKey].sort()
          : current.filter((blockedDate) => blockedDate !== dateKey),
      );
      setActionMessage(
        shouldBlock ? "Dzień został zablokowany." : "Dzień został odblokowany.",
      );
    });
  };

  const blockedDateObjects = blockedDates.map(parseDateKey);
  const bookedDateObjects = bookedDateKeys.map(parseDateKey);

  return (
    <>
      <style>{`
        .admin-calendar {
          --rdp-accent-color: #171717;
          --rdp-today-color: #171717;
          width: 100%;
        }

        .admin-calendar .rdp-months,
        .admin-calendar .rdp-month,
        .admin-calendar .rdp-month_grid {
          width: 100%;
          max-width: 100%;
        }

        .admin-calendar .rdp-caption_label {
          font-size: 0.95rem;
          font-weight: 700;
        }

        .admin-calendar .rdp-weekday {
          color: #737373;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .admin-calendar .rdp-day_button {
          border-radius: 0.375rem;
        }

        .admin-calendar .blocked .rdp-day_button {
          background: #171717;
          color: #ffe44c;
        }

        .admin-calendar .booked .rdp-day_button {
          box-shadow: inset 0 0 0 2px #38bdf8;
        }
      `}</style>

      <div className="flex flex-col gap-7">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-500">
              Centrum zarządzania
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Zamówienia i terminy
            </h1>
          </div>
          <p className="text-sm text-neutral-500">
            Ostatnia aktualizacja: teraz
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Wszystkie zamówienia"
            value={String(stats.total)}
            icon={Package}
          />
          <StatCard
            label="Do realizacji"
            value={String(stats.active)}
            icon={Clock3}
            tone="yellow"
          />
          <StatCard
            label="Zakończone"
            value={String(stats.completed)}
            icon={Check}
            tone="green"
          />
          <StatCard
            label="Wartość zamówień"
            value={formatPrice(stats.revenue)}
            icon={CircleDollarSign}
          />
        </div>

        <section className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
          <div className="flex flex-col gap-4 border-b border-neutral-200 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-neutral-950">Zamówienia</h2>
              <p className="mt-1 text-sm text-neutral-500">
                {filteredBookings.length} z {bookings.length} rekordów
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative block sm:min-w-64">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                  aria-hidden="true"
                />
                <span className="sr-only">Szukaj zamówień</span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Szukaj klienta lub ID"
                  className="h-10 w-full rounded-md border border-neutral-300 bg-white pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/10"
                />
              </label>
              <label>
                <span className="sr-only">Filtruj status</span>
                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value as StatusFilter)
                  }
                  className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/10 sm:w-44"
                >
                  <option value="all">Wszystkie statusy</option>
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="min-w-0 border-b border-neutral-200 lg:border-b-0 lg:border-r">
              {filteredBookings.length ? (
                <div className="divide-y divide-neutral-200">
                  {filteredBookings.map((booking) => (
                    <button
                      key={booking.id}
                      type="button"
                      onClick={() => setSelectedBookingId(booking.id)}
                      className={`flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-neutral-50 sm:px-6 ${
                        selectedBookingId === booking.id ? "bg-neutral-50" : "bg-white"
                      }`}
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-xs font-semibold text-neutral-500">
                        {booking.referenceImageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={booking.referenceImageUrl}
                            alt=""
                            className="size-full object-cover"
                          />
                        ) : (
                          `#${booking.id}`
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="truncate text-sm font-semibold text-neutral-950">
                            {booking.customerName || "Klient bez nazwy"}
                          </p>
                          <StatusBadge status={booking.status} />
                        </div>
                        <p className="mt-1 truncate text-xs text-neutral-500">
                          #{booking.id} · {booking.rugTypeName || "Dywan"} · {formatShortDate(booking.bookingDate)}
                        </p>
                      </div>
                      <div className="hidden text-right sm:block">
                        <p className="text-sm font-semibold text-neutral-950">
                          {formatPrice(booking.priceCents)}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          {getDeliveryLabel(booking.deliveryMethod)}
                        </p>
                      </div>
                      <ChevronRight size={17} className="shrink-0 text-neutral-400" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex min-h-60 flex-col items-center justify-center px-6 text-center">
                  <Package size={28} className="text-neutral-300" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold text-neutral-950">Brak zamówień</p>
                  <p className="mt-1 text-sm text-neutral-500">Zmień filtr albo poczekaj na nowe zamówienie.</p>
                </div>
              )}
            </div>

            <BookingDetails
              booking={selectedBooking}
              isPending={isPending}
              onStatusChange={handleStatusChange}
            />
          </div>
        </section>

        <section className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
          <div className="border-b border-neutral-200 p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-950">
                  <CalendarDays size={20} aria-hidden="true" />
                  Kalendarz terminów
                </h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Kliknij dzień, aby go zablokować albo odblokować.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-neutral-500">
                <span className="inline-flex items-center gap-2">
                  <span className="size-2 rounded-full bg-sky-400" /> Zamówienie
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="size-2 rounded-full bg-neutral-950" /> Dzień wolny
                </span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="p-4 sm:p-6 lg:border-r lg:border-neutral-200">
              <DayPicker
                className="admin-calendar"
                mode="multiple"
                selected={blockedDateObjects}
                onDayClick={handleToggleBlockedDate}
                modifiers={{
                  blocked: blockedDateObjects,
                  booked: bookedDateObjects,
                }}
                modifiersClassNames={{ blocked: "blocked", booked: "booked" }}
              />
            </div>

            <div className="border-t border-neutral-200 p-5 sm:p-6 lg:border-t-0">
              <p className="text-sm font-semibold text-neutral-950">Zablokowane dni</p>
              {blockedDates.length ? (
                <div className="mt-4 space-y-2">
                  {blockedDates.slice(0, 8).map((date) => (
                    <div key={date} className="flex items-center justify-between gap-3 rounded-md bg-neutral-100 px-3 py-2">
                      <span className="text-sm text-neutral-700">{formatDate(date)}</span>
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => handleToggleBlockedDate(parseDateKey(date))}
                        className="text-xs font-semibold text-neutral-500 underline underline-offset-2 hover:text-neutral-950 disabled:opacity-50"
                      >
                        Odblokuj
                      </button>
                    </div>
                  ))}
                  {blockedDates.length > 8 ? (
                    <p className="pt-1 text-xs text-neutral-500">
                      + {blockedDates.length - 8} kolejnych dni w kalendarzu
                    </p>
                  ) : null}
                </div>
              ) : (
                <p className="mt-3 text-sm leading-6 text-neutral-500">Nie ma jeszcze zablokowanych dni.</p>
              )}

              {actionMessage ? (
                <p className="mt-5 border-t border-neutral-200 pt-4 text-sm font-medium text-neutral-700">
                  {actionMessage}
                </p>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  tone = "neutral",
}: {
  label: string;
  value: string;
  icon: typeof Package;
  tone?: "neutral" | "yellow" | "green";
}) {
  const iconClass = {
    neutral: "bg-neutral-100 text-neutral-700",
    yellow: "bg-[#fff3a8] text-neutral-900",
    green: "bg-emerald-100 text-emerald-700",
  }[tone];

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm text-neutral-500">{label}</p>
        <span className={`flex size-9 items-center justify-center rounded-md ${iconClass}`}>
          <Icon size={18} aria-hidden="true" />
        </span>
      </div>
      <p className="mt-5 text-2xl font-semibold tracking-tight text-neutral-950">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusClasses[status] ?? "bg-neutral-100 text-neutral-600"}`}>
      {getStatusLabel(status)}
    </span>
  );
}

function BookingDetails({
  booking,
  isPending,
  onStatusChange,
}: {
  booking: AdminBooking | null;
  isPending: boolean;
  onStatusChange: (bookingId: number, status: BookingStatus) => void;
}) {
  if (!booking) {
    return (
      <aside className="flex min-h-80 items-center justify-center p-6 text-center">
        <div>
          <Package size={28} className="mx-auto text-neutral-300" aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold text-neutral-950">Wybierz zamówienie</p>
          <p className="mt-1 text-sm text-neutral-500">Szczegóły pojawią się tutaj.</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="min-w-0 bg-neutral-50 p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
            Zamówienie #{booking.id}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-neutral-950">{booking.customerName || "Brak danych klienta"}</h3>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <label className="mt-5 block">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Status realizacji
        </span>
        <select
          value={statusOptions.some((option) => option.value === booking.status) ? booking.status : "paid"}
          disabled={isPending}
          onChange={(event) => onStatusChange(booking.id, event.target.value as BookingStatus)}
          className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/10 disabled:opacity-50"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>

      {booking.referenceImageUrl ? (
        <a
          href={booking.referenceImageUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 block overflow-hidden rounded-md bg-neutral-950"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={booking.referenceImageUrl} alt="Zdjęcie referencyjne klienta" className="max-h-56 w-full object-contain" />
          <span className="flex items-center gap-2 border-t border-white/10 px-3 py-2 text-xs font-medium text-neutral-300">
            <Camera size={14} aria-hidden="true" /> Otwórz zdjęcie referencyjne
          </span>
        </a>
      ) : null}

      <div className="mt-5 grid gap-3 border-y border-neutral-200 py-4 text-sm">
        <DetailRow icon={Package} label="Wariant" value={`${booking.rugTypeName || "Dywan"}${booking.rugSizeLabel ? ` · ${booking.rugSizeLabel}` : ""}`} />
        <DetailRow icon={CalendarDays} label="Termin" value={formatDate(booking.bookingDate)} />
        <DetailRow icon={CircleDollarSign} label="Kwota" value={formatPrice(booking.priceCents)} />
        <DetailRow icon={Truck} label="Dostawa" value={getDeliveryLabel(booking.deliveryMethod)} />
        {booking.parcelLockerCode ? <DetailRow icon={MapPin} label="Paczkomat" value={booking.parcelLockerCode} /> : null}
      </div>

      <div className="space-y-3 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Kontakt</p>
        {booking.customerEmail ? (
          <a href={`mailto:${booking.customerEmail}`} className="flex items-center gap-3 text-sm text-neutral-700 hover:text-neutral-950">
            <Mail size={16} className="text-neutral-400" aria-hidden="true" />
            <span className="truncate">{booking.customerEmail}</span>
          </a>
        ) : null}
        {booking.customerPhone ? (
          <a href={`tel:${booking.customerPhone}`} className="flex items-center gap-3 text-sm text-neutral-700 hover:text-neutral-950">
            <Phone size={16} className="text-neutral-400" aria-hidden="true" />
            {booking.customerPhone}
          </a>
        ) : null}
        {booking.deliveryAddress ? (
          <div className="flex items-start gap-3 text-sm leading-6 text-neutral-700">
            <MapPin size={16} className="mt-1 shrink-0 text-neutral-400" aria-hidden="true" />
            <span>{booking.deliveryAddress}</span>
          </div>
        ) : null}
        {booking.customerName ? (
          <div className="flex items-center gap-3 text-sm text-neutral-700">
            <UserRound size={16} className="text-neutral-400" aria-hidden="true" />
            {booking.customerName}
          </div>
        ) : null}
      </div>

      {booking.notes ? (
        <div className="mt-5 rounded-md border border-neutral-200 bg-white p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Uwagi klienta</p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-neutral-700">{booking.notes}</p>
        </div>
      ) : null}
    </aside>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Package;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon size={16} className="shrink-0 text-neutral-400" aria-hidden="true" />
      <span className="text-neutral-500">{label}</span>
      <span className="ml-auto max-w-[58%] truncate text-right font-medium text-neutral-800">{value}</span>
    </div>
  );
}
