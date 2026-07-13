"use server";

import { bookingSchema } from "@/schema/booking";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

const REFERENCE_IMAGES_BUCKET = "booking-reference-images";
const MAX_REFERENCE_IMAGE_SIZE = 5 * 1024 * 1024;

export async function uploadReferenceImage(file: File) {
  const extensionByType: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };
  const extension = extensionByType[file?.type];

  if (!file || typeof file.arrayBuffer !== "function") {
    return { success: false, message: "Nie wybrano zdjęcia." };
  }

  if (!extension) {
    return { success: false, message: "Dozwolone są pliki JPG, PNG i WEBP." };
  }

  if (file.size > MAX_REFERENCE_IMAGE_SIZE) {
    return { success: false, message: "Zdjęcie może mieć maksymalnie 5 MB." };
  }

  const path = `bookings/${crypto.randomUUID()}.${extension}`;
  const supabase = createAdminClient();
  const { error } = await supabase.storage
    .from(REFERENCE_IMAGES_BUCKET)
    .upload(path, Buffer.from(await file.arrayBuffer()), {
      cacheControl: "3600",
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    console.error("Nie udało się przesłać zdjęcia:", error);
    return { success: false, message: "Nie udało się przesłać zdjęcia." };
  }

  return { success: true, path };
}

export async function createCheckoutSession(input: unknown) {
  const result = bookingSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message ?? "Nieprawidłowe dane.",
    };
  }

  const booking = result.data;
  const supabase = createAdminClient();

  const { data: rugType, error: rugTypeError } = await supabase
    .from("rug_types")
    .select("id, name")
    .eq("id", Number(booking.rugTypeId))
    .single();

  if (rugTypeError || !rugType) {
    return { success: false, message: "Nie znaleziono typu dywanu." };
  }

  const { data: size, error } = await supabase
    .from("rug_sizes")
    .select("id, label, price_cents")
    .eq("id", booking.pickedSize)
    .single();

  if (error || !size) {
    return { success: false, message: "Nie znaleziono rozmiaru." };
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: booking.customerEmail,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/zamow/sukces?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/zamow/anulowano`,
    line_items: [
      {
        price_data: {
          currency: "pln",
          unit_amount: Number(size.price_cents),
          product_data: {
            name: `${rugType.name} - ${size.label}`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      rugTypeId: booking.rugTypeId,
      rugTypeName: rugType.name,
      pickedSize: String(booking.pickedSize),
      rugSizeLabel: size.label,
      pickupDate: booking.pickupDate,
      customerName: booking.customerName,
      customerPhone: booking.customerPhone ?? "",
      customerNotes: booking.customerNotes ?? "",
      deliveryMethod: booking.deliveryMethod,
      parcelLockerCode: booking.parcelLockerCode ?? "",
      deliveryAddress: booking.deliveryAddress ?? "",
      referenceImagePath: booking.referenceImagePath ?? "",
    },
  });

  return {
    success: true,
    checkoutUrl: session.url,
  };
}
