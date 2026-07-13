"use client";

import type { Dispatch, SetStateAction } from "react";
import type { Booking, DeliveryMethod } from "./page";

type DeliveryPickerProps = {
  booking: Booking;
  setBooking: Dispatch<SetStateAction<Booking>>;
};

const options: Array<{
  value: DeliveryMethod;
  title: string;
  description: string;
}> = [
  {
    value: "parcel_locker",
    title: "Paczkomat InPost",
    description: "Odbiór w wybranym paczkomacie InPost",
  },
  {
    value: "courier",
    title: "Wysyłka kurierem",
    description: "Dostawa pod wskazany adres",
  },
];

export const DeliveryPicker = ({
  booking,
  setBooking,
}: DeliveryPickerProps) => {
  const selectMethod = (deliveryMethod: DeliveryMethod) => {
    setBooking((previous) => ({
      ...previous,
      deliveryMethod,
      parcelLockerCode:
        deliveryMethod === "parcel_locker" ? previous.parcelLockerCode : "",
      deliveryAddress:
        deliveryMethod === "courier" ? previous.deliveryAddress : "",
    }));
  };

  const inputClassName =
    "h-11 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 hover:border-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/10";

  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-neutral-950">Metoda wysyłki</p>
        <p className="mt-1 text-sm text-neutral-500">
          Wybierz, gdzie mamy wysłać gotowy dywan.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = booking.deliveryMethod === option.value;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => selectMethod(option.value)}
              className={`rounded-md border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 ${
                isSelected
                  ? "border-neutral-950 bg-neutral-950 text-white"
                  : "border-neutral-300 bg-white text-neutral-950 hover:border-neutral-500"
              }`}
            >
              <span className="block text-sm font-semibold">{option.title}</span>
              <span
                className={`mt-1 block text-xs ${
                  isSelected ? "text-neutral-300" : "text-neutral-500"
                }`}
              >
                {option.description}
              </span>
            </button>
          );
        })}
      </div>

      {booking.deliveryMethod === "parcel_locker" ? (
        <label className="block space-y-2">
          <span className="text-sm font-medium text-neutral-700">
            Kod paczkomatu InPost *
          </span>
          <input
            value={booking.parcelLockerCode}
            onChange={(event) =>
              setBooking((previous) => ({
                ...previous,
                parcelLockerCode: event.target.value,
              }))
            }
            className={inputClassName}
            type="text"
            name="parcelLockerCode"
            placeholder="np. WAW01A"
            maxLength={100}
            required
          />
        </label>
      ) : null}

      {booking.deliveryMethod === "courier" ? (
        <label className="block space-y-2">
          <span className="text-sm font-medium text-neutral-700">
            Adres dostawy *
          </span>
          <textarea
            value={booking.deliveryAddress}
            onChange={(event) =>
              setBooking((previous) => ({
                ...previous,
                deliveryAddress: event.target.value,
              }))
            }
            className="min-h-28 w-full resize-y rounded-md border border-neutral-300 bg-white px-3 py-3 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 hover:border-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/10"
            name="deliveryAddress"
            placeholder="Ulica i numer, kod pocztowy, miejscowość"
            maxLength={500}
            required
          />
        </label>
      ) : null}
    </section>
  );
};
