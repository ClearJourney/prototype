"use client";

import Link from "next/link";
import Image from "next/image";
import { EB_Garamond } from "next/font/google";

const ebGaramond = EB_Garamond({ subsets: ["latin"], display: "swap", variable: "--font-eb-garamond" });

export default function SignInPage() {
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
            <span className="border-b border-gold-accent pb-0.5 text-sm text-white/90">Sign in</span>
            <Link
              href="/signup"
              className="rounded-full bg-sand px-4 py-2 text-sm font-medium text-navy transition-colors hover:bg-gold-accent hover:text-navy"
            >
              Unlock your 30-day trial
            </Link>
          </div>
        </div>
      </header>

      {/* Two-column layout: image left, login form right */}
      <main className="flex min-h-[calc(100vh-72px)]">
        {/* Left – image placeholder */}
        <div className="hidden min-h-[calc(100vh-72px)] w-1/2 items-center justify-center bg-charcoal-light/20 lg:flex">
          <span className="text-sm font-medium text-charcoal-light/60">Image placeholder</span>
        </div>

        {/* Right – login card */}
        <div className="flex w-full flex-col items-center justify-center bg-sand px-4 py-12 lg:w-1/2">
          <div className="w-full max-w-md">
            <div className="rounded-2xl border border-border-light bg-white p-8 shadow-soft-lg md:p-10">
              <h1 className="font-serif-display text-2xl font-medium tracking-tight text-navy">
                clear journey
              </h1>
              <p className="mt-2 text-lg font-semibold text-charcoal">Welcome back</p>

              <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    className="mt-2 block w-full rounded-lg border border-border-light bg-white px-4 py-3 text-charcoal placeholder-charcoal-light/70 shadow-sm transition-colors focus:border-gold-accent focus:outline-none focus:ring-2 focus:ring-gold-accent/30"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium text-charcoal">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-navy transition-colors hover:text-gold-accent"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="mt-2 block w-full rounded-lg border border-border-light bg-white px-4 py-3 text-charcoal placeholder-charcoal-light/70 shadow-sm transition-colors focus:border-gold-accent focus:outline-none focus:ring-2 focus:ring-gold-accent/30"
                    autoComplete="current-password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-navy px-6 py-3.5 text-base font-medium text-white shadow-soft transition-colors hover:bg-navy-dark focus:outline-none focus:ring-2 focus:ring-gold-accent/50 focus:ring-offset-2"
                >
                  Login
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-charcoal-light">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-navy transition-colors hover:text-gold-accent"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
