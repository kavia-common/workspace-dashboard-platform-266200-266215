"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Building2, ChevronDown, LayoutGrid, Settings, Shapes, Zap } from "lucide-react";
import type { NavItem } from "@/components/layout/AppShell";
import clsx from "clsx";

function iconFor(key: string) {
  switch (key) {
    case "dashboard":
      return LayoutGrid;
    case "workspaces":
      return Shapes;
    case "events":
      return Zap;
    case "settings":
      return Settings;
    default:
      return LayoutGrid;
  }
}

export function Sidebar({ navItems, activeKey }: { navItems: NavItem[]; activeKey: string }) {
  const orgs = useMemo(() => ["Acme, Inc.", "Blue Sky Labs"], []);
  const workspaces = useMemo(() => ["Marketing", "Product", "Growth"], []);
  const [org, setOrg] = useState(orgs[0]);
  const [ws, setWs] = useState(workspaces[0]);

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-4 border-b border-black/10">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center shadow">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold leading-tight">Workspace Dashboard</div>
            <div className="text-xs text-black/60 leading-tight">Analytics console</div>
          </div>
        </div>

        <div className="mt-4 grid gap-2">
          <label className="text-xs text-black/60">Organization</label>
          <div className="relative">
            <select
              className="w-full text-sm rounded-xl border border-black/10 bg-white px-3 py-2 pr-9 outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
              value={org}
              onChange={(e) => setOrg(e.target.value)}
            >
              {orgs.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/60 pointer-events-none" />
          </div>

          <label className="text-xs text-black/60 mt-1">Workspace</label>
          <div className="relative">
            <select
              className="w-full text-sm rounded-xl border border-black/10 bg-white px-3 py-2 pr-9 outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
              value={ws}
              onChange={(e) => setWs(e.target.value)}
            >
              {workspaces.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/60 pointer-events-none" />
          </div>
        </div>
      </div>

      <nav className="px-3 py-3 flex-1">
        <div className="text-[11px] uppercase tracking-wide text-black/45 px-2 pb-2">
          Navigation
        </div>
        <ul className="grid gap-1">
          {navItems.map((item) => {
            const Icon = iconFor(item.key);
            const active = item.key === activeKey;
            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-2 rounded-xl px-3 py-2 text-sm border",
                    active
                      ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow"
                      : "bg-transparent text-[var(--text)] border-transparent hover:bg-black/5",
                  )}
                >
                  <Icon className={clsx("h-4 w-4", active ? "text-white" : "text-black/70")} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-4 py-4 border-t border-black/10 text-xs text-black/60">
        <div>
          Signed in state is client-side demo until backend auth is implemented.
        </div>
      </div>
    </div>
  );
}
