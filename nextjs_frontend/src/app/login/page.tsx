"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Enter a valid email."),
  password: z.string().min(1, "Password is required."),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const { state, login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (state.status === "authenticated") router.replace("/");
  }, [state.status, router]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "demo@acme.com", password: "demo" },
  });

  async function onSubmit(values: FormValues) {
    setError(null);
    try {
      await login(values);
      router.replace("/");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Login failed.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--bg)] p-5">
      <div className="w-full max-w-md card">
        <div className="card-body">
          <h1 className="text-xl font-semibold">Sign in</h1>
          <p className="text-sm text-black/60 mt-1">
            Use the demo login now. Backend-auth integration will replace this.
          </p>

          <form className="mt-5 grid gap-3" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-1">
              <label className="text-xs text-black/60" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
                {...form.register("email")}
              />
              {form.formState.errors.email ? (
                <div className="text-xs text-[var(--danger)]">
                  {form.formState.errors.email.message}
                </div>
              ) : null}
            </div>

            <div className="grid gap-1">
              <label className="text-xs text-black/60" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
                {...form.register("password")}
              />
              {form.formState.errors.password ? (
                <div className="text-xs text-[var(--danger)]">
                  {form.formState.errors.password.message}
                </div>
              ) : null}
            </div>

            {error ? (
              <div className="rounded-xl border border-[var(--danger)]/30 bg-[var(--danger)]/10 px-3 py-2 text-sm text-[var(--danger)]">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              className="mt-2 rounded-xl bg-[var(--primary)] text-white px-4 py-2 text-sm font-medium hover:opacity-95 active:opacity-90"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <div className="mt-4 text-xs text-black/60">
            Tip: you can use any email/password for this MVP demo.
          </div>
        </div>
      </div>
    </main>
  );
}
