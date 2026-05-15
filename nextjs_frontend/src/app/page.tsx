"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AuthGate } from "@/components/auth/AuthGate";
import { AppShell } from "@/components/layout/AppShell";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { EventTrendChart } from "@/components/dashboard/EventTrendChart";
import { TopEvents } from "@/components/dashboard/TopEvents";
import { useAuth } from "@/lib/auth/AuthProvider";
import { getWorkspaceDashboard } from "@/lib/api/dashboard";
import type { TopEvent, TimeseriesPoint, WorkspaceSummary } from "@/lib/api/types";

export default function DashboardPage() {
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);
  const [summary, setSummary] = useState<WorkspaceSummary | null>(null);
  const [timeseries, setTimeseries] = useState<TimeseriesPoint[]>([]);
  const [topEvents, setTopEvents] = useState<TopEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);

    getWorkspaceDashboard()
      .then((res) => {
        if (!alive) return;
        setUsingMock(res.usingMockData);
        setSummary(res.summary);
        setTimeseries(res.timeseries);
        setTopEvents(res.topEvents);
      })
      .catch((e: unknown) => {
        if (!alive) return;
        setError(e instanceof Error ? e.message : "Failed to load dashboard.");
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [token]);

  const kpis = useMemo(() => {
    if (!summary) return null;
    return [
      {
        label: "Total events",
        value: summary.totalEvents.toLocaleString(),
        hint: summary.timeRangeLabel,
        tone: "primary" as const,
      },
      {
        label: "Active users",
        value: summary.activeUsers.toLocaleString(),
        hint: "Unique users with activity",
        tone: "secondary" as const,
      },
      {
        label: "Conversion rate",
        value: `${Math.round(summary.conversionRate * 1000) / 10}%`,
        hint: "Signup → purchase",
        tone: "accent" as const,
      },
    ];
  }, [summary]);

  return (
    <AuthGate>
      <AppShell activeKey="dashboard">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-black/60 mt-1">
              Overview of workspace activity and key outcomes.
            </p>
          </div>
          <div className="text-xs text-black/60">
            {usingMock ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2">
                Backend not fully implemented yet — showing demo data
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2">
                Live data
              </span>
            )}
          </div>
        </header>

        {error ? (
          <div className="card">
            <div className="card-body">
              <div className="text-sm font-semibold text-[var(--danger)]">Error</div>
              <div className="text-sm text-black/70 mt-1">{error}</div>
            </div>
          </div>
        ) : null}

        {loading ? (
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card">
                <div className="card-body text-sm text-black/60">Loading KPIs…</div>
              </div>
              <div className="card">
                <div className="card-body text-sm text-black/60">Loading KPIs…</div>
              </div>
              <div className="card">
                <div className="card-body text-sm text-black/60">Loading KPIs…</div>
              </div>
            </div>
            <div className="card">
              <div className="card-body text-sm text-black/60">Loading charts…</div>
            </div>
          </div>
        ) : (
          <>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {kpis?.map((k) => (
                <KpiCard
                  key={k.label}
                  label={k.label}
                  value={k.value}
                  hint={k.hint}
                  tone={k.tone}
                />
              ))}
            </section>

            <section className="mt-4 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
              <EventTrendChart data={timeseries} subtitle="Events per day" />
              <TopEvents events={topEvents} />
            </section>

            <section className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="card">
                <div className="card-header">
                  <div className="text-sm font-semibold">Workspace insights</div>
                  <div className="text-xs text-black/55 mt-1">
                    Suggested next steps based on recent activity
                  </div>
                </div>
                <div className="card-body">
                  <ul className="grid gap-2 text-sm text-black/75 list-disc pl-5">
                    <li>
                      Improve conversion by reviewing drop-off between <b>signup_start</b> and{" "}
                      <b>signup_complete</b>.
                    </li>
                    <li>
                      Create an alert when <b>purchase</b> falls below the 7-day average.
                    </li>
                    <li>Segment event trend by workspace and acquisition channel (next milestone).</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <div className="text-sm font-semibold">Widget configuration</div>
                  <div className="text-xs text-black/55 mt-1">
                    Basic MVP configuration (persisting per-user comes later)
                  </div>
                </div>
                <div className="card-body">
                  <div className="text-sm text-black/70">
                    This dashboard ships with a default widget layout. In a later backend step,
                    we’ll persist widget preferences per user/workspace.
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-2 rounded-full border border-black/10 bg-white">
                      KPIs
                    </span>
                    <span className="text-xs px-3 py-2 rounded-full border border-black/10 bg-white">
                      Trend chart
                    </span>
                    <span className="text-xs px-3 py-2 rounded-full border border-black/10 bg-white">
                      Top events
                    </span>
                    <span className="text-xs px-3 py-2 rounded-full border border-black/10 bg-white">
                      Insights
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </AppShell>
    </AuthGate>
  );
}
