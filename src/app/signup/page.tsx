"use client";

import Link from "next/link";
import Image from "next/image";
import { EB_Garamond } from "next/font/google";
import { Lock, Crown, Wrench } from "lucide-react";

const ebGaramond = EB_Garamond({ subsets: ["latin"], display: "swap", variable: "--font-eb-garamond" });

export default function SignUpPage() {
  return (
    <div className={`min-h-screen ${ebGaramond.variable} font-sans`}>
      {/* Header – matches homepage */}
      <header className="bg-navy px-4 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/"
            className="flex items-center border-b-2 border-transparent pb-0.5 transition-colors hover:border-gold-accent"
          >
            <Image
              src="/logo.png"
              alt="Clear Journey"
              width={140}
              height={32}
              className="h-6 w-auto invert opacity-95"
              priority
            />
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/signin"
              className="border-b-2 border-transparent pb-0.5 text-sm text-white/90 transition-colors hover:border-gold-accent hover:text-white"
            >
              Sign in
            </Link>
            <span className="rounded-full bg-sand px-4 py-2 text-sm font-medium text-navy">Unlock your 30-day trial</span>
          </div>
        </div>
      </header>

      {/* Two-column layout: hero image left, form right */}
      <main className="flex min-h-[calc(100vh-72px)]">
        {/* Left – image placeholder */}
        <div className="hidden min-h-[calc(100vh-72px)] w-1/2 items-center justify-center bg-charcoal-light/20 lg:flex">
          <span className="text-sm font-medium text-charcoal-light/60">Image placeholder</span>
        </div>

        {/* Right – form card on light background */}
        <div className="flex w-full flex-col items-center justify-center bg-sand-warm px-4 py-12 lg:w-1/2">
          <div className="w-full max-w-md">
            <div className="rounded-2xl border border-border-light bg-white p-8 shadow-soft-lg md:p-10">
              <h1 className="font-serif-display text-2xl font-medium tracking-tight text-navy">
                clear journey
              </h1>
              <h2 className="mt-2 text-xl font-semibold text-charcoal">Create your account</h2>
              <p className="mt-1 text-sm text-charcoal-light">
                Built for luxury travel advisors managing high-value client relationships.
              </p>

              <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-charcoal">
                      First name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      className="mt-2 block w-full rounded-lg border border-border-light bg-white px-4 py-3 text-charcoal shadow-sm transition-colors focus:border-gold-accent focus:outline-none focus:ring-2 focus:ring-gold-accent/30"
                      autoComplete="given-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-charcoal">
                      Last name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      className="mt-2 block w-full rounded-lg border border-border-light bg-white px-4 py-3 text-charcoal shadow-sm transition-colors focus:border-gold-accent focus:outline-none focus:ring-2 focus:ring-gold-accent/30"
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="agency" className="block text-sm font-medium text-charcoal">
                    Agency / Business name
                  </label>
                  <input
                    id="agency"
                    type="text"
                    name="agency"
                    className="mt-2 block w-full rounded-lg border border-border-light bg-white px-4 py-3 text-charcoal shadow-sm transition-colors focus:border-gold-accent focus:outline-none focus:ring-2 focus:ring-gold-accent/30"
                    autoComplete="organization"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal">
                    Work email
                  </label>
                  <div className="mt-2 flex gap-2">
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="you@agency.com"
                      className="block flex-1 rounded-lg border border-border-light bg-white px-4 py-3 text-charcoal placeholder-charcoal-light/70 shadow-sm transition-colors focus:border-gold-accent focus:outline-none focus:ring-2 focus:ring-gold-accent/30"
                      autoComplete="email"
                    />
                    <button
                      type="button"
                      className="rounded-lg border border-border-light bg-champagne px-4 py-3 text-sm font-medium text-charcoal transition-colors hover:bg-border-light/50 focus:outline-none focus:ring-2 focus:ring-gold-accent/30"
                    >
                      Verify
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-charcoal">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="mt-2 block w-full rounded-lg border border-border-light bg-white px-4 py-3 text-charcoal placeholder-charcoal-light/70 shadow-sm transition-colors focus:border-gold-accent focus:outline-none focus:ring-2 focus:ring-gold-accent/30"
                    autoComplete="new-password"
                  />
                  <p className="mt-1.5 text-xs text-charcoal-light">
                    Must be at least 8 characters with 1 number and 1 capital character.
                  </p>
                </div>

                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="terms"
                    className="mt-1 h-4 w-4 rounded border-border-light text-gold-accent focus:ring-gold-accent/30"
                  />
                  <span className="text-sm text-charcoal-light">
                    I agree to the{" "}
                    <Link href="/terms" className="font-medium text-navy hover:text-gold-accent transition-colors">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="font-medium text-navy hover:text-gold-accent transition-colors">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-navy px-6 py-3.5 text-base font-medium text-white shadow-soft transition-colors hover:bg-navy-dark focus:outline-none focus:ring-2 focus:ring-gold-accent/50 focus:ring-offset-2"
                >
                  Start Free 30-Day Trial
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-charcoal-light">
                $47/month after trial, cancel anytime.
              </p>

              <p className="mt-6 text-center text-sm text-charcoal-light">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-medium text-navy transition-colors hover:text-gold-accent"
                >
                  Sign in
                </Link>
              </p>

              {/* Footer icons */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-border-light pt-8">
                <span className="flex items-center gap-2 text-xs text-charcoal-light">
                  <Lock className="h-4 w-4 text-gold-accent" strokeWidth={1.5} />
                  Private Data
                </span>
                <span className="flex items-center gap-2 text-xs text-charcoal-light">
                  <Crown className="h-4 w-4 text-gold-accent" strokeWidth={1.5} />
                  VIP Access
                </span>
                <span className="flex items-center gap-2 text-xs text-charcoal-light">
                  <Wrench className="h-4 w-4 text-gold-accent" strokeWidth={1.5} />
                  Built for Advisors
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
