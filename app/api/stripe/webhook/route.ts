import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const supabase = createAdminClient();

    const { error } = await supabase.from("bookings").insert({
      rug_type_id: Number(session.metadata?.rugTypeId),
      rug_size_id: Number(session.metadata?.pickedSize),
      rug_type_name: session.metadata?.rugTypeName,
      rug_size_label: session.metadata?.rugSizeLabel,
      price_cents: session.amount_total,
      customer_name: session.metadata?.customerName,
      customer_email: session.customer_email,
      customer_phone: session.metadata?.customerPhone,
      notes: session.metadata?.customerNotes,
      delivery_method: session.metadata?.deliveryMethod,
      parcel_locker_code: session.metadata?.parcelLockerCode,
      delivery_address: session.metadata?.deliveryAddress,
      reference_image_path: session.metadata?.referenceImagePath || null,
      booking_date: session.metadata?.pickupDate?.slice(0, 10),
      status: "paid",
      stripe_session_id: session.id,
      stripe_payment_intent_id:
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id,
      expires_at: new Date(session.expires_at * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Nie udało się zapisać rezerwacji:", error);
      return NextResponse.json(
        { error: "Failed to create booking" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ received: true });
}
