"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Menu, Search, Settings, LogOut } from "lucide-react";
import type { NavItem } from "@/components/layout/AppShell";
import { useAuth } from "@/lib/auth/AuthProvider";
import clsx from "clsx";

export function TopNav({
  navItems,
  activeKey,
  onToggleSidebar,
  compact,
}: {
  navItems: NavItem[];
  activeKey: string;
  onToggleSidebar: () => void;
  compact?: boolean;
}) {
  const { state, logout } = useAuth();
  const userLabel = useMemo(() => {
    if (state.status !== "authenticated") return "Guest";
    return state.session.user.name;
  }, [state]);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={clsx("px-5 py-3 flex items-center gap-3", compact ? "bg-[var(--bg)]" : "")}>
      <button
        type="button"
        onClick={onToggleSidebar}
        className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-xl border border-black/10 bg-white hover:bg-black/5"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden md:flex items-center gap-2 flex-1">
        <div className="relative flex-1 max-w-[560px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/50" />
          <input
            placeholder="Search events, users, or pages…"
            className="w-full rounded-xl border border-black/10 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
          />
        </div>
        <div className="hidden lg:flex items-center gap-1 text-sm text-black/60">
          {navItems.map((n) => (
            <Link
              key={n.key}
              href={n.href}
              className={clsx(
                "px-3 py-2 rounded-xl hover:bg-black/5",
                n.key === activeKey ? "text-[var(--primary)] font-medium" : "",
              )}
            >
              {n.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Link
          href="/settings"
          className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm hover:bg-black/5"
        >
          <Settings className="h-4 w-4 text-black/70" />
          <span>Settings</span>
        </Link>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex items-center gap-3 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm hover:bg-black/5"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            <div className="h-7 w-7 rounded-lg bg-[var(--accent)]/20 text-[var(--text)] flex items-center justify-center text-xs font-semibold border border-black/10">
              {userLabel.slice(0, 2).toUpperCase()}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-sm leading-tight font-medium">{userLabel}</div>
              <div className="text-[11px] leading-tight text-black/55">Profile</div>
            </div>
          </button>

          {menuOpen ? (
            <div
              className="absolute right-0 mt-2 w-48 rounded-xl border border-black/10 bg-white shadow-lg overflow-hidden z-30"
              role="menu"
            >
              <Link
                href="/settings"
                className="block px-4 py-3 text-sm hover:bg-black/5"
                role="menuitem"
                onClick={() => setMenuOpen(false)}
              >
                Settings
              </Link>
              <button
                type="button"
                className="w-full text-left px-4 py-3 text-sm hover:bg-black/5 flex items-center gap-2"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                }}
              >
                <LogOut className="h-4 w-4 text-black/70" />
                Log out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
