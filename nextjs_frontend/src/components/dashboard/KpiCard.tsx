import React from "react";

export function KpiCard({
  label,
  value,
  hint,
  tone = "primary",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "primary" | "secondary" | "accent";
}) {
  const toneColor =
    tone === "secondary"
      ? "var(--secondary)"
      : tone === "accent"
        ? "var(--accent)"
        : "var(--primary)";

  return (
    <div className="card">
      <div className="card-body">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="kpi-label">{label}</div>
            <div className="kpi-value mt-1">{value}</div>
            {hint ? <div className="text-xs text-black/55 mt-1">{hint}</div> : null}
          </div>

          <div
            className="h-10 w-10 rounded-2xl border border-black/10"
            style={{ background: `${toneColor}1A` }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
