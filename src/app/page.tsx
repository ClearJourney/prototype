import Link from "next/link";
import { LogoLight } from "@/components/Logo";
import { Button } from "@/components/Button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-sand">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-navy px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <LogoLight className="text-lg" />
          <nav className="flex items-center gap-8 text-sm text-white">
            <Link href="#about" className="hover:opacity-80">About</Link>
            <Link href="#features" className="hover:opacity-80">Features</Link>
            <Link href="#pricing" className="hover:opacity-80">Pricing</Link>
            <Link href="#blog" className="hover:opacity-80">Blog</Link>
            <Link href="#contact" className="hover:opacity-80">Contact Us</Link>
            <Link
              href="/login"
              className="rounded-lg border border-white/30 px-4 py-2 text-white hover:bg-white/10"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-sand text-navy px-4 py-2 font-medium hover:bg-white"
            >
              Sign up
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-charcoal md:text-5xl">
              Streamline your client management and follow-up process.
            </h1>
            <p className="mt-4 text-lg text-charcoal-light">
              Clear Journey helps luxury travel advisors store client details and
              preferences in one place, track follow-ups, and stay organised—without
              spreadsheets or complex CRMs.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/signup" className="px-6 py-3 text-base">
                Get Started for Free
              </Button>
              <Link
                href="#demo"
                className="text-charcoal-light underline hover:text-charcoal"
              >
                See it in action
              </Link>
            </div>
            <p className="mt-8 text-sm text-charcoal-light">
              Featured in Forbes · Entrepreneur · Travel Weekly
            </p>
          </div>
          <div className="flex aspect-video items-center justify-center rounded-xl bg-charcoal/90 text-white/60">
            Video Placeholder
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border-light bg-sand-warm px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-charcoal">
            The laborious art of being productive.
          </h2>
          <p className="mt-2 text-charcoal-light">
            One place for clients, follow-ups, and peace of mind.
          </p>
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:items-center">
            <div className="aspect-[4/3] rounded-xl bg-charcoal/10" />
            <div>
              <h3 className="text-xl font-bold text-charcoal">
                The only tool built for luxury travel advisors.
              </h3>
              <p className="mt-3 text-charcoal-light">
                Store client details, preferences, and key dates. Track follow-ups
                and never miss a birthday or anniversary.
              </p>
              <Button href="/signup" className="mt-6">
                Get Started for Free
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border-light px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-charcoal">
            See what you&apos;re currently missing.
          </h2>
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-xl font-bold text-charcoal">
                Track client details & preferences
              </h3>
              <p className="mt-3 text-charcoal-light">
                Everything in one place: contact info, travel preferences, loyalty
                programs, and important dates.
              </p>
              <Button href="/signup" className="mt-6">
                Get Started for Free
              </Button>
            </div>
            <div className="aspect-[4/3] rounded-xl bg-charcoal/10" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border-light bg-sand-warm px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-2xl font-bold text-charcoal">How it works.</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "Organize clients", label: "Organize clients" },
              { icon: "Track follow-ups", label: "Track follow-ups" },
              { icon: "Personalize journeys", label: "Personalize journeys" },
              { icon: "Streamline tasks", label: "Streamline tasks" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-charcoal/10" />
                <p className="font-medium text-charcoal">{item.label}</p>
              </div>
            ))}
          </div>
          <Button href="/signup" className="mt-10">
            Get Started for Free
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border-light px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-2xl font-bold text-charcoal">
            See what industry professionals are saying about our platform.
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-border-light bg-white p-6"
              >
                <p className="text-charcoal-light">
                  &ldquo;Clear Journey has transformed how I manage my clients. Simple
                  and elegant.&rdquo;
                </p>
                <p className="mt-3 font-medium text-charcoal">Advisor name</p>
                <p className="text-sm text-charcoal-light">Company</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-charcoal-light underline">
            Read more testimonials
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-border-light bg-sand-warm px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-md rounded-2xl bg-navy p-8 text-white">
            <h3 className="text-xl font-bold">Clear Journey Pro</h3>
            <p className="mt-2 text-3xl font-bold">$47 / month</p>
            <ul className="mt-6 space-y-2 text-sm">
              {[
                "Client & Trip Management",
                "Follow-Up Tracking",
                "Customizable Fields",
                "Template Library",
                "Secure Data Storage",
                "Priority Support",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-success">✓</span> {item}
                </li>
              ))}
            </ul>
            <Button href="/signup" variant="secondary" className="mt-6 w-full border-white/30 bg-white/10 text-white hover:bg-white/20">
              Get 14-day free trial
            </Button>
            <button
              type="button"
              className="mt-3 w-full rounded-lg bg-white py-2.5 font-medium text-navy hover:bg-sand"
            >
              Upgrade Your Journey
            </button>
            <p className="mt-3 text-center text-xs text-white/80">
              No credit card required for trial
            </p>
            <p className="mt-1 text-center text-xs text-white/80 underline">
              See full pricing details
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border-light px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-charcoal">
            Frequently Asked Questions
          </h2>
          <ul className="mt-8 space-y-4">
            {[
              "What is Clear Journey Pro?",
              "Is Clear Journey for me?",
              "What client details can I store?",
              "How does follow-up tracking work?",
              "Can I integrate with other tools?",
              "What if I need support?",
              "Do you offer custom pricing for teams?",
              "What's your refund policy?",
              "How secure is my data?",
            ].map((q) => (
              <li
                key={q}
                className="flex cursor-pointer items-center justify-between rounded-lg border border-border-light bg-white py-3 px-4 hover:bg-sand-warm"
              >
                <span className="text-charcoal">{q}</span>
                <span className="text-charcoal-light">→</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Button href="/signup">Get Started for Free</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy px-6 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <span className="text-sm text-white/80">© 2026 Clear Journey. All rights reserved.</span>
          <nav className="flex gap-6 text-sm">
            <Link href="#features" className="hover:opacity-80">Features</Link>
            <Link href="#pricing" className="hover:opacity-80">Pricing</Link>
            <Link href="/privacy" className="hover:opacity-80">Privacy Policy</Link>
            <Link href="/terms" className="hover:opacity-80">Terms of Service</Link>
          </nav>
          <div className="flex gap-4">Social</div>
        </div>
      </footer>
    </div>
  );
}
