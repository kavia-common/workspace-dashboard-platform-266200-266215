"use client";

import React from "react";
import { AuthGate } from "@/components/auth/AuthGate";
import { AppShell } from "@/components/layout/AppShell";
import { useAuth } from "@/lib/auth/AuthProvider";

export default function SettingsPage() {
  const { state, logout } = useAuth();

  return (
    <AuthGate>
      <AppShell activeKey="settings">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-black/60 mt-1">
          Profile and preferences (will be persisted once backend settings APIs exist).
        </p>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card">
            <div className="card-header">
              <div className="text-sm font-semibold">Profile</div>
              <div className="text-xs text-black/55 mt-1">Current session</div>
            </div>
            <div className="card-body text-sm text-black/75">
              {state.status === "authenticated" ? (
                <dl className="grid gap-2">
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <dt className="text-black/60">Name</dt>
                    <dd className="font-medium">{state.session.user.name}</dd>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <dt className="text-black/60">Email</dt>
                    <dd className="font-medium">{state.session.user.email}</dd>
                  </div>
                </dl>
              ) : null}

              <button
                type="button"
                onClick={logout}
                className="mt-4 rounded-xl border border-black/10 bg-white px-4 py-2 text-sm hover:bg-black/5"
              >
                Sign out
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="text-sm font-semibold">Theme</div>
              <div className="text-xs text-black/55 mt-1">
                Retro variant can be added later as a toggle.
              </div>
            </div>
            <div className="card-body text-sm text-black/70">
              Current UI uses the light theme tokens from the work item style guide.
            </div>
          </div>
        </div>
      </AppShell>
    </AuthGate>
  );
}
