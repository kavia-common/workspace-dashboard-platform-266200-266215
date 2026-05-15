"use client";

import React from "react";
import { AuthGate } from "@/components/auth/AuthGate";
import { AppShell } from "@/components/layout/AppShell";

export default function EventsPage() {
  return (
    <AuthGate>
      <AppShell activeKey="events">
        <h1 className="text-2xl font-semibold">Events</h1>
        <p className="text-sm text-black/60 mt-1">
          Explore ingested analytics events and filters (workspace, time range, event name).
        </p>

        <div className="mt-4 card">
          <div className="card-body text-sm text-black/70">
            Placeholder page: connect to backend analytics ingestion + query endpoints in later steps.
          </div>
        </div>
      </AppShell>
    </AuthGate>
  );
}
