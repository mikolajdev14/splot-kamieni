import { createClientServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "./logout-btn";

export default async function adminDashboard() {
  const supabase = await createClientServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <>
      <span>Zalogowano jako: {user.email}</span>
      <LogoutButton />
    </>
  );
}
