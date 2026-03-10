import Link from "next/link";
import Image from "next/image";

interface LegalPageLayoutProps {
  children: React.ReactNode;
  /** Optional link text for the header (e.g. "Back to home" or "Dashboard") */
  backLabel?: string;
  backHref?: string;
}

/**
 * Shared layout for static legal pages (Privacy, Terms, etc.).
 * Provides consistent header and centered content container.
 */
export function LegalPageLayout({
  children,
  backLabel = "Back to home",
  backHref = "/",
}: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-sand-warm">
      <header className="border-b border-border-light bg-sand px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="flex items-center">
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
            href={backHref}
            className="text-sm text-charcoal-light hover:text-charcoal"
          >
            {backLabel}
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        {children}
      </article>

      <footer className="border-t border-border-light bg-sand px-6 py-6 text-center text-sm text-charcoal-light">
        © 2026 Clear Journey. All rights reserved.
      </footer>
    </div>
  );
}
