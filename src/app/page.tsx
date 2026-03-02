"use client";

import { useState } from "react";
import Link from "next/link";

const FAQ_ITEMS = [
  { q: "What is Clear Journey?", a: "Clear Journey is a platform that helps you supercharge your business with real-time analytics and data-driven insights." },
  { q: "How does the free trial work?", a: "Start your 14-day free trial with no credit card required. Cancel anytime." },
  { q: "What kind of data can I connect?", a: "You can securely connect multiple data sources for a unified view of your business." },
  { q: "How do I get support?", a: "Pro plans include dedicated support. Reach out via the contact form or in-app chat." },
];

const TESTIMONIALS = [
  { quote: "Clear Journey has provided us with unparalleled insights into our operations.", name: "Sarah Chen", title: "Marketing Director" },
  { quote: "The dashboards and analytics have transformed how we make decisions.", name: "James Miller", title: "Operations Lead" },
  { quote: "We saw results within the first month. Highly recommend.", name: "Emma Davis", title: "CEO" },
  { quote: "Simple to set up, powerful to use. Exactly what we needed.", name: "Michael Brown", title: "Product Manager" },
  { quote: "The best investment we've made in our growth stack.", name: "Lisa Wilson", title: "Founder" },
];

const HOW_IT_WORKS = [
  { title: "Sign Up", desc: "Create your account and choose your plan in minutes.", icon: "📊" },
  { title: "Connect Data", desc: "Securely integrate your existing data sources.", icon: "🔗" },
  { title: "Analyze & Discover", desc: "Explore powerful insights and uncover trends.", icon: "💡" },
  { title: "Optimize & Grow", desc: "Implement changes and watch your business thrive.", icon: "🎯" },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-sand-warm">
      {/* Top bar - dark blue */}
      <div className="bg-navy px-4 py-2">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="text-sm font-medium text-white">Clear Journey</span>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-white hover:opacity-90">Login</Link>
            <Link href="/signup" className="rounded border border-sky-400/60 px-3 py-1 text-sm text-white hover:bg-white/10">Sign Up</Link>
          </div>
        </div>
      </div>

      {/* Main nav - light beige */}
      <header className="border-b border-border-light bg-sand px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-charcoal">Clear Journey</Link>
          <nav className="flex items-center gap-6 text-sm text-charcoal-light">
            <Link href="/" className="hover:text-charcoal">Home</Link>
            <Link href="#about" className="hover:text-charcoal">About</Link>
            <Link href="#services" className="hover:text-charcoal">Services</Link>
            <Link href="#pricing" className="hover:text-charcoal">Pricing</Link>
            <Link href="#contact" className="rounded-lg bg-navy px-4 py-2 font-medium text-white hover:bg-navy-dark">Contact Us</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-sand px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-light">From prototype to reality — Clear Journey</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-charcoal md:text-5xl">
                Supercharge your business with real-time analytics & data-driven insights.
              </h1>
              <p className="mt-6 text-lg text-charcoal-light">
                Our platform offers comprehensive tools to track performance, understand user behavior, and optimize your strategies for maximum growth.
              </p>
              <Link href="/signup" className="mt-6 inline-block rounded-lg bg-navy px-6 py-3 font-medium text-white hover:bg-navy-dark">
                Get Started Now
              </Link>
              <p className="mt-4 flex flex-wrap gap-4 text-sm text-charcoal-light">
                <span>✓ Cancellation free anytime</span>
                <span>✓ 14-day free trial</span>
              </p>
              <p className="mt-2 text-sm text-charcoal-light underline">See our product roadmap</p>
            </div>
            <div className="flex items-start justify-center lg:justify-end">
              <div className="w-full max-w-md rounded-xl border border-border-light bg-white p-6 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-charcoal-light/20" />
                  <div>
                    <p className="font-semibold text-charcoal">Maria Wilson, CEO</p>
                    <p className="text-xs text-charcoal-light">Joined 2 months ago</p>
                  </div>
                </div>
                <p className="mt-4 text-sm italic text-charcoal-light">
                  &ldquo;Clear Journey has transformed how we approach our data. The insights are invaluable!&rdquo;
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded bg-sand-warm p-2">Daily Active Users</div>
                  <div className="rounded bg-sand-warm p-2">Conversion Rates</div>
                  <div className="rounded bg-sand-warm p-2">Customer Lifetime Value</div>
                  <div className="rounded bg-sand-warm p-2">Retention Metrics</div>
                </div>
              </div>
            </div>
          </div>

          {/* Video / CTA block */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-charcoal">Unlock the true potential of your business</h2>
            <p className="mt-2 text-charcoal-light">Gain actionable insights with our intuitive platform and powerful analytics tools.</p>
            <div className="mx-auto mt-6 flex aspect-video max-w-3xl items-center justify-center rounded-xl bg-charcoal text-white/80">
              Video / Demo placeholder
            </div>
            <Link href="/signup" className="mt-6 inline-block rounded-lg bg-navy px-6 py-3 font-medium text-white hover:bg-navy-dark">
              Get Started Now
            </Link>
            <div className="mt-4 flex justify-center gap-4 text-charcoal-light">
              <span>Facebook</span><span>Twitter</span><span>LinkedIn</span><span>Instagram</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features - The tools you need */}
      <section id="services" className="border-t border-border-light bg-sand px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-charcoal">The tools you need to do your best work.</h2>
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <div className="aspect-[4/3] rounded-xl bg-charcoal/10" />
              <h3 className="mt-4 text-xl font-bold text-charcoal">The hub that&apos;s packed with powerful tools for operations.</h3>
              <p className="mt-2 text-charcoal-light">
                Optimize workflows, manage projects, and streamline communication with our integrated suite of operational tools. Boost productivity and achieve your goals faster.
              </p>
            </div>
            <div>
              <div className="aspect-[4/3] rounded-xl bg-charcoal/10" />
              <h3 className="mt-4 text-xl font-bold text-charcoal">See what&apos;s truly driving your business forward.</h3>
              <p className="mt-2 text-charcoal-light">
                Dive deep into your data with custom reports, real-time dashboards, and predictive analytics. Make informed decisions and stay ahead of the curve.
              </p>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link href="/signup" className="inline-block rounded-lg bg-navy px-6 py-3 font-medium text-white hover:bg-navy-dark">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border-light bg-sand-warm px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-charcoal">How it Works</h2>
          <p className="mt-2 text-center text-charcoal-light">A simple, intuitive process to get you started quickly.</p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-xl">{step.icon}</div>
                <h3 className="font-bold text-charcoal">{step.title}</h3>
                <p className="mt-2 text-sm text-charcoal-light">{step.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-charcoal-light">Still wondering how to get started?</p>
        </div>
      </section>

      {/* Built with real advisors */}
      <section className="border-t border-border-light bg-sand px-6 py-16">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-2xl font-bold text-charcoal">Built with real advisors. Designed around how you actually work.</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center">
              <div className="h-14 w-14 rounded-full bg-charcoal/10" />
              <p className="mt-2 text-sm font-medium text-charcoal">Analytics</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-14 w-14 rounded-full bg-charcoal/10" />
              <p className="mt-2 text-sm font-medium text-charcoal">Automation</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-14 w-14 rounded-full bg-charcoal/10" />
              <p className="mt-2 text-sm font-medium text-charcoal">Reporting</p>
            </div>
          </div>
          <Link href="/signup" className="mt-8 inline-block rounded-lg bg-navy px-6 py-3 font-medium text-white hover:bg-navy-dark">
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border-light bg-sand-warm px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-charcoal">
            See what industry professionals are saying about our platform
          </h2>
          <p className="mt-2 text-center text-charcoal-light">Real stories from real users. See how we&apos;ve helped others succeed.</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="rounded-xl border border-border-light bg-white p-6 shadow-sm">
                <p className="text-charcoal-light">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-charcoal-light/20" />
                  <div>
                    <p className="font-semibold text-charcoal">{t.name}</p>
                    <p className="text-sm text-charcoal-light">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-border-light bg-sand px-6 py-16">
        <div className="mx-auto max-w-lg">
          <div className="rounded-2xl border-2 border-amber-400/50 bg-navy p-8 text-white shadow-xl">
            <h2 className="text-xl font-bold">Clear Journey Pro</h2>
            <p className="mt-2 text-3xl font-bold">$47 / month</p>
            <ul className="mt-6 space-y-2 text-sm">
              {["All Basic Features", "Advanced Analytics", "Customizable Dashboards", "Dedicated Support", "Priority Feature Access", "Unlimited Data Sources", "Exportable Reports"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="mt-6 block w-full rounded-lg bg-sand-warm py-3 text-center font-medium text-navy hover:bg-white">
              See our full pricing details
            </Link>
            <Link href="/signup" className="mt-3 block w-full rounded-lg bg-white py-3 text-center font-medium text-navy hover:bg-sand">
              Choose this plan
            </Link>
            <p className="mt-3 text-center text-xs text-white/80">14-day free trial included. Cancel anytime.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border-light bg-sand-warm px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-charcoal">Frequently Asked Questions</h2>
          <p className="mt-2 text-center text-charcoal-light">Have more questions? Reach out to us directly.</p>
          <div className="mt-8 space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className="rounded-lg border border-border-light bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-charcoal hover:bg-sand-warm/50"
                >
                  {item.q}
                  <span className="text-charcoal-light">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="border-t border-border-light px-4 py-3 text-sm text-charcoal-light">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/signup" className="inline-block rounded-lg bg-navy px-6 py-3 font-medium text-white hover:bg-navy-dark">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy px-6 py-8 text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <span className="text-sm text-white/80">© 2023 Clear Journey. All rights reserved.</span>
          <nav className="flex gap-6 text-sm">
            <Link href="/" className="hover:opacity-90">Home</Link>
            <Link href="#about" className="hover:opacity-90">About</Link>
            <Link href="#services" className="hover:opacity-90">Services</Link>
            <Link href="#pricing" className="hover:opacity-90">Pricing</Link>
            <Link href="#contact" className="hover:opacity-90">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
