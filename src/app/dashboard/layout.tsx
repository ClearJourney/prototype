import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-sand">
      <aside className="w-56 flex-shrink-0 border-r border-border-light bg-white">
        <div className="flex h-full flex-col p-4">
          <Link
            href="/dashboard"
            className="mb-8 text-lg font-medium text-charcoal"
          >
            Clear Journey
          </Link>
          <nav className="flex flex-col gap-1">
            <Link
              href="/dashboard"
              className="rounded-lg px-3 py-2 text-charcoal-light hover:bg-sand-warm hover:text-charcoal"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/clients"
              className="rounded-lg bg-sand-warm px-3 py-2 font-medium text-charcoal"
            >
              Clients
            </Link>
            <Link
              href="/dashboard/itineraries"
              className="rounded-lg px-3 py-2 text-charcoal-light hover:bg-sand-warm hover:text-charcoal"
            >
              Itineraries
            </Link>
            <Link
              href="/dashboard/communications"
              className="rounded-lg px-3 py-2 text-charcoal-light hover:bg-sand-warm hover:text-charcoal"
            >
              Communications
            </Link>
            <Link
              href="/dashboard/payments"
              className="rounded-lg px-3 py-2 text-charcoal-light hover:bg-sand-warm hover:text-charcoal"
            >
              Payments
            </Link>
          </nav>
          <div className="mt-auto border-t border-border-light pt-4">
            <Link
              href="/dashboard/settings"
              className="rounded-lg px-3 py-2 text-charcoal-light hover:bg-sand-warm hover:text-charcoal"
            >
              Settings
            </Link>
            <div className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2">
              <div className="h-8 w-8 rounded-full bg-charcoal-light/30" />
              <div>
                <p className="text-sm font-medium text-charcoal">Eleanor R.</p>
                <p className="text-xs text-charcoal-light">Luxury Advisor</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
