"use client";

import React from "react";
import { AuthGate } from "@/components/auth/AuthGate";
import { AppShell } from "@/components/layout/AppShell";

export default function WorkspacesPage() {
  return (
    <AuthGate>
      <AppShell activeKey="workspaces">
        <h1 className="text-2xl font-semibold">Workspaces</h1>
        <p className="text-sm text-black/60 mt-1">
          Workspace management will be backed by the FastAPI container once org/workspace endpoints are implemented.
        </p>

        <div className="mt-4 card">
          <div className="card-body text-sm text-black/70">
            Placeholder page: list workspaces, create workspace, and manage members (next backend step).
          </div>
        </div>
      </AppShell>
    </AuthGate>
  );
}
