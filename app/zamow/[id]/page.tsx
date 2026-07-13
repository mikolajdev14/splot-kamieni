"use client";

import { FormEvent, use, useEffect, useState } from "react";
import { SizePicker } from "./size-picker";
import { DatePicker } from "./date-picker";
import { DeliveryPicker } from "./delivery-picker";
import { ReferenceImageUpload } from "./reference-image-upload";
import { CustomerForm } from "./customer-form";
import { createClient } from "@/lib/supabase/client";
import { bookingSchema } from "@/schema/booking";
import { createCheckoutSession, uploadReferenceImage } from "./actions";

export type DeliveryMethod = "parcel_locker" | "courier";

export type Booking = {
  rugTypeId: string;
  pickedSize: number | null;
  pickupDate: Date | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerNotes: string;
  deliveryMethod: DeliveryMethod | "";
  parcelLockerCode: string;
  deliveryAddress: string;
};

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [blockedDays, setBlockedDays] = useState<Date[]>([]);
  const [submitMessage, setSubmitMessage] = useState<string | undefined>(
    undefined,
  );
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [booking, setBooking] = useState<Booking>({
    rugTypeId: id,
    pickedSize: null,
    pickupDate: null,
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerNotes: "",
    deliveryMethod: "",
    parcelLockerCode: "",
    deliveryAddress: "",
  });

  useEffect(() => {
    let isMounted = true;
    const supabase = createClient();

    supabase
      .from("blocked_dates")
      .select("date")
      .then(({ data: blockedDates }) => {
        if (!isMounted) {
          return;
        }

        setBlockedDays(blockedDates?.map((item) => new Date(item.date)) ?? []);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const bookingInput = {
      ...booking,
      pickupDate: booking.pickupDate?.toISOString() ?? "",
      referenceImagePath: undefined,
    };

    const validation = bookingSchema.safeParse(bookingInput);

    if (!validation.success) {
      setSubmitMessage(
        validation.error.issues[0]?.message ?? "Nieprawidłowe dane.",
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(
      referenceImage ? "Przygotowuję zdjęcie i płatność..." : "Przygotowuję płatność...",
    );

    try {
      let referenceImagePath: string | undefined;

      if (referenceImage) {
        const uploadResponse = await uploadReferenceImage(referenceImage);

        if (!uploadResponse.success) {
          setSubmitMessage(uploadResponse.message);
          setIsSubmitting(false);
          return;
        }

        referenceImagePath = uploadResponse.path;
      }

      const response = await createCheckoutSession({
        ...bookingInput,
        referenceImagePath,
      });

      if (!response.success) {
        setSubmitMessage(response.message);
        setIsSubmitting(false);
        return;
      }

      window.location.href = response.checkoutUrl!;
    } catch (error) {
      console.error("Nie udało się przygotować zamówienia:", error);
      setSubmitMessage("Nie udało się przygotować zamówienia. Spróbuj ponownie.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-950">
      <section className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10 lg:py-12">
        <aside className="h-fit rounded-lg border border-neutral-200 bg-white p-6 lg:sticky lg:top-8">
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            Zamówienie
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            Skonfiguruj swój dywan
          </h1>
          <p className="mt-4 text-sm leading-6 text-neutral-600">
            Wybierz rozmiar, dogodny termin realizacji i zostaw dane kontaktowe.
            Następnie wybierzesz sposób dostawy i opłacisz zamówienie.
          </p>

          <div className="mt-8 space-y-4 border-t border-neutral-200 pt-6">
            <div>
              <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                Wybrany wariant
              </span>
              <p className="mt-1 text-base font-medium text-neutral-950">
                ID produktu: {id}
              </p>
            </div>
            <div>
              <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                Następny krok
              </span>
              <p className="mt-1 text-sm text-neutral-600">
                Uzupełnij dane, wybierz dostawę i przejdź do płatności.
              </p>
            </div>
          </div>
        </aside>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-neutral-200 bg-white p-5 sm:p-7"
        >
          <div className="grid gap-8">
            <SizePicker id={id} booking={booking} setBooking={setBooking} />
            <DatePicker blockedDates={blockedDays} setBooking={setBooking} />
            <DeliveryPicker booking={booking} setBooking={setBooking} />
            <ReferenceImageUpload
              file={referenceImage}
              setFile={setReferenceImage}
            />
            <CustomerForm booking={booking} setBooking={setBooking} />
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            {submitMessage ? (
              <p className="text-sm font-medium text-neutral-700">
                {submitMessage}
              </p>
            ) : (
              <p className="text-sm text-neutral-500">
                Pola z gwiazdką są wymagane.
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-11 items-center justify-center rounded-md bg-neutral-950 px-6 text-sm font-semibold text-[#ffe44c] transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
            >
              {isSubmitting ? "Przygotowywanie..." : "Zapłać i zarezerwuj"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
