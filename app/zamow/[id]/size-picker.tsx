"use client";
import { useEffect, useState } from "react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Booking } from "./page";

type RugSize = {
  id: number;
  label: string;
  price_cents: number | string;
};

type SizePickerProps = {
  id: string;
  booking: Booking;
  setBooking: Dispatch<SetStateAction<Booking>>;
};

export const SizePicker = ({ id, booking, setBooking }: SizePickerProps) => {
  const [sizes, setSizes] = useState<{ rug_sizes: RugSize[] } | null>(null);

  useEffect(() => {
    const fetchSizes = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("rug_types")
        .select("rug_sizes(*)")
        .eq("id", id)
        .single();
      setSizes(data);
      if (error) {
        console.error("Nie udało się pobrać rozmiarów:", error);
      }
    };
    fetchSizes();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const sizeId = Number(e.target.value);
    setBooking((prev) => ({
      ...prev,
      pickedSize: sizeId,
    }));
  };

  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-neutral-950">Rozmiar</p>
        <p className="mt-1 text-sm text-neutral-500">
          Wybierz wariant najlepiej dopasowany do projektu.
        </p>
      </div>

      <select
        value={booking.pickedSize ?? ""}
        onChange={(e) => {
          handleChange(e);
        }}
        name="size"
        id="size"
        className="h-11 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm font-medium text-neutral-950 outline-none transition-colors hover:border-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/10"
      >
        <option value="" disabled>
          Wybierz rozmiar
        </option>
        {sizes?.rug_sizes.map((size) => (
          <option key={size.id} value={size.id}>
            {size.label} - {Number(size.price_cents) / 100} zł
          </option>
        ))}
      </select>
    </section>
  );
};
