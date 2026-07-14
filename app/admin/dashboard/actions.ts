"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClientServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const allowedStatuses = ["paid", "in_progress", "completed", "cancelled"] as const;
type BookingStatus = (typeof allowedStatuses)[number];

const getAdminClient = async () => {
  const supabase = await createClientServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? createAdminClient() : null;
};

export async function updateBookingStatus(
  bookingId: number,
  status: BookingStatus,
) {
  if (!Number.isInteger(bookingId) || !allowedStatuses.includes(status)) {
    return { success: false, message: "Nieprawidłowe dane statusu." };
  }

  const supabase = await getAdminClient();

  if (!supabase) {
    return { success: false, message: "Sesja administratora wygasła." };
  }

  const { error } = await supabase
    .from("bookings")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", bookingId);

  if (error) {
    console.error("Nie udało się zmienić statusu zamówienia:", error);
    return { success: false, message: "Nie udało się zmienić statusu." };
  }

  revalidatePath("/admin/dashboard");
  return { success: true };
}

export async function toggleBlockedDate(date: string, shouldBlock: boolean) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { success: false, message: "Nieprawidłowa data." };
  }

  const supabase = await getAdminClient();

  if (!supabase) {
    return { success: false, message: "Sesja administratora wygasła." };
  }

  if (shouldBlock) {
    const { data: existingDate, error: existingError } = await supabase
      .from("blocked_dates")
      .select("date")
      .eq("date", date)
      .maybeSingle();

    if (existingError) {
      return { success: false, message: "Nie udało się sprawdzić terminu." };
    }

    if (!existingDate) {
      const { error } = await supabase.from("blocked_dates").insert({ date });

      if (error) {
        console.error("Nie udało się zablokować dnia:", error);
        return { success: false, message: "Nie udało się zablokować dnia." };
      }
    }
  } else {
    const { error } = await supabase.from("blocked_dates").delete().eq("date", date);

    if (error) {
      console.error("Nie udało się odblokować dnia:", error);
      return { success: false, message: "Nie udało się odblokować dnia." };
    }
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/zamow/[id]", "page");
  return { success: true };
}
