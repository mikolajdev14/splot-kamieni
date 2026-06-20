"use client";

import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

export default function LogoutButton() {
  const handleLogOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect("/admin/login");
  };

  return <button onClick={handleLogOut}>Wyloguj się</button>;
}
