"use client";

import { useActionState } from "react";
import { handleLogin } from "./actions";

export default function LoginPage() {
  const [data, formAction, isPending] = useActionState(handleLogin, undefined);

  return (
    <main className="min-h-screen bg-stone-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-stone-400 text-sm tracking-widest uppercase">
            Pracownia
          </p>
          <h1 className="text-3xl font-semibold text-stone-800 mt-1">
            Panel admina
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
          <form action={formAction} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-stone-600"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="admin@pracownia.pl"
                className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-stone-800 placeholder:text-stone-300 outline-none focus:border-stone-400 focus:bg-white transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-stone-600"
              >
                Hasło
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••••••"
                className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-stone-800 placeholder:text-stone-300 outline-none focus:border-stone-400 focus:bg-white transition-colors"
              />
            </div>

            {data?.error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-3.5 py-2.5">
                {data.error}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="mt-1 w-full rounded-lg bg-stone-800 py-2.5 text-sm font-medium text-white hover:bg-stone-700 disabled:opacity-50 transition-colors cursor-pointer"
            >
              {isPending ? "Logowanie..." : "Zaloguj się"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
