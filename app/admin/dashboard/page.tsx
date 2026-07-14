import { createAdminClient } from "@/lib/supabase/admin";
import { createClientServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "./logout-btn";
import AdminDashboardClient, { type AdminBooking } from "./dashboard-client";

const REFERENCE_IMAGES_BUCKET = "booking-reference-images";

type BookingRow = {
  id: number | string;
  rug_type_id: number | string | null;
  rug_size_id: number | string | null;
  rug_type_name: string | null;
  rug_size_label: string | null;
  price_cents: number | string | null;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  notes: string | null;
  booking_date: string | null;
  status: string | null;
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  expires_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  delivery_method: string | null;
  parcel_locker_code: string | null;
  delivery_address: string | null;
  reference_image_path: string | null;
};

export default async function AdminDashboardPage() {
  const serverSupabase = await createClientServer();
  const {
    data: { user },
  } = await serverSupabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const supabase = createAdminClient();
  const [{ data: bookingRows, error: bookingsError }, { data: blockedRows, error: blockedError }] =
    await Promise.all([
      supabase
        .from("bookings")
        .select(
          "id, rug_type_id, rug_size_id, rug_type_name, rug_size_label, price_cents, customer_name, customer_email, customer_phone, notes, booking_date, status, stripe_session_id, stripe_payment_intent_id, expires_at, created_at, updated_at, delivery_method, parcel_locker_code, delivery_address, reference_image_path",
        )
        .order("created_at", { ascending: false }),
      supabase.from("blocked_dates").select("date").order("date"),
    ]);

  const bookings = (bookingRows as BookingRow[] | null)?.map((booking) => ({
    id: Number(booking.id),
    rugTypeId: booking.rug_type_id == null ? null : Number(booking.rug_type_id),
    rugSizeId: booking.rug_size_id == null ? null : Number(booking.rug_size_id),
    rugTypeName: booking.rug_type_name,
    rugSizeLabel: booking.rug_size_label,
    priceCents: booking.price_cents == null ? null : Number(booking.price_cents),
    customerName: booking.customer_name,
    customerEmail: booking.customer_email,
    customerPhone: booking.customer_phone,
    notes: booking.notes,
    bookingDate: booking.booking_date,
    status: booking.status ?? "paid",
    stripeSessionId: booking.stripe_session_id,
    stripePaymentIntentId: booking.stripe_payment_intent_id,
    expiresAt: booking.expires_at,
    createdAt: booking.created_at,
    updatedAt: booking.updated_at,
    deliveryMethod: booking.delivery_method,
    parcelLockerCode: booking.parcel_locker_code,
    deliveryAddress: booking.delivery_address,
    referenceImagePath: booking.reference_image_path,
    referenceImageUrl: null as string | null,
  })) ?? [];

  await Promise.all(
    bookings.map(async (booking) => {
      if (!booking.referenceImagePath) {
        return;
      }

      const { data, error } = await supabase.storage
        .from(REFERENCE_IMAGES_BUCKET)
        .createSignedUrl(booking.referenceImagePath, 60 * 60);

      if (!error && data?.signedUrl) {
        booking.referenceImageUrl = data.signedUrl;
      }
    }),
  );

  const blockedDates =
    blockedRows?.map((row) => row.date).filter((date): date is string => Boolean(date)) ??
    [];

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-950">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex min-h-16 w-full max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
          <div>
            <p className="font-lobster text-2xl text-neutral-950">Carpetiem</p>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
              Panel administracyjny
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-neutral-500 sm:block">{user.email}</span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1440px] px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
        {bookingsError || blockedError ? (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            Nie udało się pobrać wszystkich danych panelu. Sprawdź połączenie z
            Supabase oraz czy migracje tabel zostały wykonane.
          </div>
        ) : null}

        <AdminDashboardClient
          initialBookings={bookings as AdminBooking[]}
          initialBlockedDates={blockedDates}
        />
      </main>
    </div>
  );
}
