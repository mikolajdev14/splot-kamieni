"use client";
import type { Dispatch, SetStateAction } from "react";
import { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { Booking } from "./page";

type SizePickerProps = {
  id: string;
  booking: Booking;
  setBooking: Dispatch<SetStateAction<Booking>>;
};

export const SizePicker = ({ id, booking, setBooking }: SizePickerProps) => {
  const [sizes, setSizes] = useState<{ rug_sizes: any[] } | null>(null);
  const [pickedSize, setPickedSize] = useState<number | null>(null);

  useEffect(() => {
    const fetchSizes = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("rug_types")
        .select("rug_sizes(*)")
        .eq("id", id)
        .single();
      setSizes(data);
      console.log("data: ", data?.rug_sizes, "error: ", error);
    };
    fetchSizes();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const sizeId = Number(e.target.value);
    setPickedSize(sizeId);
    setBooking((prev) => ({
      ...prev,
      pickedSize: sizeId,
    }));
  };

  console.log(sizes);
  return (
    <div>
      <select
        onChange={(e) => {
          handleChange(e);
        }}
        name="size"
        id=""
      >
        {sizes?.rug_sizes.map((size) => (
          <option key={size.id} value={size.id}>
            {size.label} - {Number(size.price_cents) / 100}zł
          </option>
        ))}
      </select>
    </div>
  );
};
