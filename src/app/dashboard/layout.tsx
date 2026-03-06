import Link from "next/link";
import Image from "next/image";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { OnboardingGate } from "@/components/OnboardingGate";
import { Bell } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingGate>
    <div className="flex min-h-screen flex-col bg-sand">
      <header className="flex items-center justify-between bg-white px-6 py-4 shadow-soft">
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Clear Journey"
            width={140}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <Link
          href="/dashboard/notifications"
          className="relative rounded-button p-2 text-charcoal-light transition-colors hover:bg-sand-warm hover:text-charcoal"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" strokeWidth={1.5} />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-error-muted/90 text-[10px] font-medium text-white">
            3
          </span>
        </Link>
      </header>

      <div className="flex flex-1">
        <DashboardSidebar />

        <main className="flex flex-1 flex-col min-w-0">
          <div className="flex-1 p-8">{children}</div>

          <footer className="flex flex-wrap items-center gap-6 border-t border-border-light/80 bg-white px-8 py-4 text-sm text-charcoal-light">
            <Link href="/help" className="hover:text-charcoal">
              Help
            </Link>
            <Link href="/contact" className="hover:text-charcoal">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-charcoal">
              Privacy
            </Link>
            <span>© 2025 Clear Journey. All rights reserved.</span>
          </footer>
        </main>
      </div>
    </div>
    </OnboardingGate>
  );
}
