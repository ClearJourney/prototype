"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Kanban,
  LogOut,
  Settings,
} from "lucide-react";

const RECENT_CLIENTS = [
  { initials: "WF", name: "Warren Foster" },
  { initials: "LS", name: "Liang Smith" },
  { initials: "LS", name: "Liang Smith" },
];

const navItems = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/dashboard/clients", label: "Clients", icon: Users },
  { href: "/dashboard/pipeline", label: "Pipeline", icon: Kanban },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 flex-shrink-0 flex-col bg-white shadow-soft">
      <nav className="flex flex-col gap-0.5 p-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-button px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-navy/8 font-medium text-navy"
                  : "text-charcoal-light hover:bg-sand-warm hover:text-charcoal"
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" strokeWidth={1.5} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 border-t border-border-light/80 px-4 pt-6">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-charcoal-light">
          Recent Clients
        </h3>
        <ul className="space-y-0.5">
          {RECENT_CLIENTS.map((c, i) => (
            <li key={`${c.initials}-${i}`}>
              <Link
                href={`/dashboard/clients/${c.initials.toLowerCase()}`}
                className="flex items-center gap-3 rounded-button px-2 py-2 text-sm text-charcoal hover:bg-sand-warm"
              >
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-navy text-xs font-medium text-white">
                  {c.initials}
                </span>
                <span className="truncate">{c.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto border-t border-border-light/80 p-4">
        <Link
          href="/login"
          className="mb-3 flex items-center gap-2 text-sm text-charcoal-light hover:text-error-muted"
          aria-label="Sign out"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.5} />
          Sign Out
        </Link>
        <div className="flex items-center gap-3 rounded-button px-2 py-2">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-charcoal-light/20 text-sm font-medium text-charcoal">
            LM
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-charcoal">
              Liam Mistry
            </p>
            <p className="text-xs text-charcoal-light">Founding Member</p>
          </div>
          <Link
            href="/dashboard/settings"
            className="rounded-button p-2 text-charcoal-light hover:bg-sand-warm hover:text-charcoal"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
