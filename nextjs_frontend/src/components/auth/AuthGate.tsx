"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthProvider";

export function AuthGate({
  children,
  redirectTo = "/login",
}: {
  children: React.ReactNode;
  redirectTo?: string;
}) {
  const { state } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (state.status === "anonymous") router.replace(redirectTo);
  }, [state.status, router, redirectTo]);

  if (state.status === "loading") {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-sm text-black/60">
        Loading…
      </div>
    );
  }

  if (state.status === "anonymous") return null;

  return <>{children}</>;
}
