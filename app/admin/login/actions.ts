"use server";

import { createClientServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const handleLogin = async (
  previousState: unknown,
  formData: FormData,
) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Uzupełnij email i hasło" };
  }

  const supabase = await createClientServer();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Nieprawidlowy email lub haslo" };
  }

  redirect("/admin/dashboard");
};
