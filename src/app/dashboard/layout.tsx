import Link from "next/link";
import Image from "next/image";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardUserSync } from "@/components/DashboardUserSync";
import { OnboardingGate } from "@/components/OnboardingGate";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingGate>
    <DashboardUserSync />
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
      </header>

      <div className="flex flex-1">
        <DashboardSidebar />

        <main className="flex flex-1 flex-col min-w-0">
          <div className="flex-1 p-8">{children}</div>

          <footer className="flex flex-wrap items-center gap-6 border-t border-border-light/80 bg-white px-8 py-4 text-sm text-charcoal-light">
            <Link href="/contact" className="hover:text-charcoal">
              Contact &amp; Feedback
            </Link>
            <Link href="/privacy" className="hover:text-charcoal">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-charcoal">
              Terms
            </Link>
            <span className="ml-auto">© 2026 Clear Journey. All rights reserved.</span>
          </footer>
        </main>
      </div>
    </div>
    </OnboardingGate>
  );
}
