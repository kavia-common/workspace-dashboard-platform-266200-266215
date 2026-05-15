import React from "react";
import type { TopEvent } from "@/lib/api/types";

export function TopEvents({ events }: { events: TopEvent[] }) {
  const max = Math.max(1, ...events.map((e) => e.count));

  return (
    <div className="card">
      <div className="card-header">
        <div className="text-sm font-semibold">Top events</div>
        <div className="text-xs text-black/55 mt-1">Most frequent event names</div>
      </div>

      <div className="card-body">
        <ul className="grid gap-3">
          {events.map((e) => {
            const pct = Math.round((e.count / max) * 100);
            return (
              <li key={e.name} className="grid gap-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium">{e.name}</div>
                  <div className="text-xs text-black/60">{e.count.toLocaleString()}</div>
                </div>
                <div className="h-2 rounded-full bg-black/5 overflow-hidden border border-black/10">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      background: "linear-gradient(90deg, var(--primary), var(--accent))",
                    }}
                    aria-hidden="true"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
