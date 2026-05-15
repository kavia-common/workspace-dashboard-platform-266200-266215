"use client";

import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TimeseriesPoint } from "@/lib/api/types";

export function EventTrendChart({
  data,
  subtitle,
}: {
  data: TimeseriesPoint[];
  subtitle?: string;
}) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold">Event trend</div>
            <div className="text-xs text-black/55 mt-1">{subtitle ?? "Daily events"}</div>
          </div>
          <div className="text-xs text-black/55">Last 14d</div>
        </div>
      </div>
      <div className="card-body">
        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid stroke="rgba(17,24,39,0.08)" vertical={false} />
              <XAxis
                dataKey="t"
                tickFormatter={(v) => String(v).slice(5)}
                tick={{ fontSize: 12, fill: "rgba(17,24,39,0.6)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "rgba(17,24,39,0.6)" }}
                axisLine={false}
                tickLine={false}
                width={36}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid rgba(17,24,39,0.12)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                }}
                labelStyle={{ fontWeight: 600 }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--primary)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
