"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  CreditCard,
  FileText,
  Sliders,
  AlertTriangle,
} from "lucide-react";

const navItems = [
  { href: "/dashboard/settings/profile", label: "Profile", icon: User },
  { href: "/dashboard/settings/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/settings/intake-forms", label: "Intake Forms", icon: FileText },
  { href: "/dashboard/settings/preferences", label: "Preferences", icon: Sliders },
  { href: "/dashboard/settings/account", label: "Account", icon: AlertTriangle },
];

export function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-full w-56 flex-shrink-0 flex-col border-r border-border-light/80 bg-white">
      <div className="p-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-charcoal-light">
          Settings
        </h2>
        <nav className="mt-4 flex flex-col gap-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
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
      </div>
    </aside>
  );
}
