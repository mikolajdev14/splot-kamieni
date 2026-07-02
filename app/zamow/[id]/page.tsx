"use client";

import { useState } from "react";
import { use } from "react";
import { SizePicker } from "./size-picker";

export type Booking = {
  rugTypeId: string;
  pickedSize: number | null;
  pickupDate: Date | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerNotes: string;
};

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [booking, setBooking] = useState<Booking>({
    rugTypeId: id,
    pickedSize: 1,
    pickupDate: null,
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerNotes: "",
  });
  console.log(id);

  return (
    <div>
      <SizePicker id={id} booking={booking} setBooking={setBooking} />
    </div>
  );
}
