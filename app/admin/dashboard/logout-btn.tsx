"use client";

import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

export default function LogoutButton() {
  const handleLogOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect("/admin/login");
  };

  return (
    <button
      type="button"
      onClick={handleLogOut}
      className="inline-flex h-9 items-center justify-center rounded-md border border-neutral-300 bg-white px-3 text-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-950 hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
    >
      Wyloguj się
    </button>
  );
}
