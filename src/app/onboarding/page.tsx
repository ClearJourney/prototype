"use client";

import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-sand">
      <header className="border-b border-border-light px-6 py-4">
        <Link href="/dashboard" className="text-xl font-medium text-charcoal">
          clearjourney
        </Link>
      </header>

      <main className="px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-charcoal">
            Let&apos;s bring your clients into Clear Journey.
          </h1>
          <p className="mt-2 text-charcoal-light">
            Choose the fastest way to get started — you&apos;ll be set up in
            minutes.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
          {/* Card 1: Add one by one */}
          <div className="rounded-xl border border-border-light bg-white p-6 shadow-sm">
            <div className="mb-4 h-12 w-12 rounded-lg bg-sky-100" />
            <h2 className="text-lg font-bold text-charcoal">
              Add Clients One by One
            </h2>
            <p className="mt-2 text-sm text-charcoal-light">
              For testing or starting small. Perfect if you want to get a feel for
              the profile structure.
            </p>
            <Link
              href="/dashboard/clients/new"
              className="mt-4 inline-block w-full rounded-lg border border-border-light bg-white py-2.5 text-center font-medium text-charcoal hover:bg-sand-warm"
            >
              Add a Client
            </Link>
            <p className="mt-2 text-xs text-charcoal-light">
              Best if you&apos;re just exploring.
            </p>
          </div>

          {/* Card 2: Import (Recommended) */}
          <div className="relative rounded-xl border border-border-light bg-white p-6 shadow-sm">
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded bg-amber-500 px-2 py-0.5 text-xs font-bold uppercase text-white">
              Recommended
            </span>
            <div className="mb-4 h-12 w-12 rounded-lg bg-amber-100" />
            <h2 className="text-lg font-bold text-charcoal">
              Import Your Clients in Minutes
            </h2>
            <p className="mt-2 text-sm text-charcoal-light">
              Upload your full client list using our simple template. Get everyone
              onboarded instantly.
            </p>
            <Link
              href="/dashboard/clients?import=1"
              className="mt-4 inline-block w-full rounded-lg bg-navy py-2.5 text-center font-medium text-white hover:bg-navy-dark"
            >
              Upload CSV
            </Link>
            <Link
              href="/dashboard/clients?import=1&step=1"
              className="mt-2 block text-center text-sm text-charcoal underline"
            >
              Download Template
            </Link>
            <p className="mt-1 text-xs text-charcoal-light">
              No formatting headaches. We&apos;ll guide you.
            </p>
          </div>

          {/* Card 3: White-glove */}
          <div className="rounded-xl border border-border-light bg-white p-6 shadow-sm">
            <div className="mb-4 h-12 w-12 rounded-lg bg-violet-100" />
            <h2 className="text-lg font-bold text-charcoal">
              Prefer We Handle It?
            </h2>
            <p className="mt-2 text-sm text-charcoal-light">
              Send us your client list and we&apos;ll set everything up for you. A
              true concierge experience.
            </p>
            <button
              type="button"
              className="mt-4 w-full rounded-lg border border-border-light bg-white py-2.5 font-medium text-charcoal hover:bg-sand-warm"
            >
              Request White-Glove Setup
            </button>
            <p className="mt-2 text-xs text-charcoal-light">
              Because your time is better spent serving clients.
            </p>
          </div>
        </div>

        {/* What happens next */}
        <div className="mx-auto mt-20 max-w-4xl text-center">
          <h2 className="text-xl font-bold text-charcoal">
            What happens next
          </h2>
          <p className="mt-2 text-charcoal-light">
            Once your clients are in, Clear Journey works behind the scenes to keep
            you connected.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div>
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-sky-100" />
              <p className="font-medium text-charcoal">Organized Profiles</p>
              <p className="mt-1 text-sm text-charcoal-light">
                Every client gets a comprehensive profile with contact details,
                preferences, and history at your fingertips.
              </p>
            </div>
            <div>
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-sky-100" />
              <p className="font-medium text-charcoal">Timely Reminders</p>
              <p className="mt-1 text-sm text-charcoal-light">
                Never miss an important date. Get gentle nudges for birthdays,
                anniversaries, and follow-ups.
              </p>
            </div>
            <div>
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-sky-100" />
              <p className="font-medium text-charcoal">Smart Suggestions</p>
              <p className="mt-1 text-sm text-charcoal-light">
                Receive intelligent recommendations on the best times to reach out
                and deepen relationships.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-border-light px-6 py-6">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4">
          <span className="text-charcoal">clearjourney</span>
          <nav className="flex gap-6 text-sm text-charcoal-light">
            <Link href="/help">Help</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <span className="text-sm text-charcoal-light">
            © 2025 Clear Journey. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
