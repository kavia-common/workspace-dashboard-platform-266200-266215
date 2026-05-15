"use client";

import React, { useMemo, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";

export type NavItem = {
  key: string;
  label: string;
  href: string;
};

export function AppShell({
  children,
  activeKey,
}: {
  children: React.ReactNode;
  activeKey: string;
}) {
  const navItems: NavItem[] = useMemo(
    () => [
      { key: "dashboard", label: "Dashboard", href: "/" },
      { key: "workspaces", label: "Workspaces", href: "/workspaces" },
      { key: "events", label: "Events", href: "/events" },
      { key: "settings", label: "Settings", href: "/settings" },
    ],
    [],
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="lg:hidden sticky top-0 z-30 bg-[var(--bg)] border-b border-black/10">
        <TopNav
          navItems={navItems}
          activeKey={activeKey}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
          compact
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block min-h-screen border-r border-black/10 bg-[var(--surface)]">
          <Sidebar navItems={navItems} activeKey={activeKey} />
        </aside>

        {sidebarOpen ? (
          <div className="lg:hidden fixed inset-0 z-40">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-[var(--surface)] shadow-xl">
              <Sidebar navItems={navItems} activeKey={activeKey} />
            </div>
          </div>
        ) : null}

        <main className="min-h-screen">
          <div className="hidden lg:block sticky top-0 z-20 bg-[var(--bg)] border-b border-black/10">
            <TopNav
              navItems={navItems}
              activeKey={activeKey}
              onToggleSidebar={() => setSidebarOpen((v) => !v)}
            />
          </div>

          <div className="container-page">{children}</div>
        </main>
      </div>
    </div>
  );
}
