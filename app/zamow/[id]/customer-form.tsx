"use client";

import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { Booking } from "./page";

type CustomerFormProps = {
  booking: Booking;
  setBooking: Dispatch<SetStateAction<Booking>>;
};

export const CustomerForm = ({ booking, setBooking }: CustomerFormProps) => {
  const updateField =
    (field: keyof Booking) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setBooking((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const inputClassName =
    "h-11 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 hover:border-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/10";

  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-neutral-950">
          Dane kontaktowe
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Podaj dane potrzebne do potwierdzenia zamówienia.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 sm:col-span-2">
          <span className="text-sm font-medium text-neutral-700">
            Imię i nazwisko *
          </span>
          <input
            value={booking.customerName}
            onChange={updateField("customerName")}
            className={inputClassName}
            type="text"
            name="customerName"
            placeholder="Jan Kowalski"
            required
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-neutral-700">Email *</span>
          <input
            value={booking.customerEmail}
            onChange={updateField("customerEmail")}
            className={inputClassName}
            type="email"
            name="customerEmail"
            placeholder="jan@example.com"
            required
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-neutral-700">Telefon</span>
          <input
            value={booking.customerPhone}
            onChange={updateField("customerPhone")}
            className={inputClassName}
            type="tel"
            name="customerPhone"
            placeholder="+48 000 000 000"
          />
        </label>

        <label className="space-y-2 sm:col-span-2">
          <span className="text-sm font-medium text-neutral-700">
            Uwagi do zamówienia
          </span>
          <textarea
            value={booking.customerNotes}
            onChange={updateField("customerNotes")}
            className="min-h-28 w-full resize-y rounded-md border border-neutral-300 bg-white px-3 py-3 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 hover:border-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/10"
            name="customerNotes"
            placeholder="Kolor, inspiracje, preferowany kontakt lub inne szczegóły"
            maxLength={500}
          />
        </label>
      </div>
    </section>
  );
};
