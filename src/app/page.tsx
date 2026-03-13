"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { EB_Garamond } from "next/font/google";
import { Heart, Calendar, Plane, Bell, Check, Shield, User, FileText, Sparkles, Building2, Users, Star, Headphones, RefreshCw, ChevronDown, Instagram, Youtube } from "lucide-react";

const ebGaramond = EB_Garamond({ subsets: ["latin"], display: "swap", variable: "--font-eb-garamond" });

const FAQ_ITEMS = [
  { q: "How is Clear Journey different from a typical travel CRM?", a: "Most CRMs are built for sales pipelines and deal stages. Clear Journey is built for luxury travel advisors managing high-value client relationships, timing, and follow-ups." },
  { q: "Does Clear Journey replace my booking or mid-office systems?", a: "No. It sits alongside them to manage client context, follow-ups, and attention — the parts where costly mistakes happen." },
  { q: "How long does it take to set up?", a: "Most advisors are up and running in 5–10 minutes. Start with your most important clients first and build from there." },
  { q: "Do I need training to use it?", a: "No. Clear Journey works the way luxury advisors already think. Support is there if you want it." },
  { q: "What if I manage a lot of clients?", a: "That's exactly when Clear Journey matters most. The more clients you manage, the harder it is to rely on memory alone." },
  { q: "Is this overkill if I already use notes or spreadsheets?", a: "Notes store information. They don't show who needs attention, when it matters, or what's at risk." },
  { q: "I already use another system — why add this?", a: "Most systems manage data or tasks. Clear Journey manages attention and timing, where small slips become expensive." },
  { q: "Can I cancel anytime?", a: "Yes. There are no contracts or lock-ins. Cancel anytime from your account." },
  { q: "Who is Clear Journey for?", a: "Advisors managing high-value, high-touch clients. If one missed follow-up could cost thousands, this is built for you." },
  { q: "Why does this matter financially?", a: "One missed follow-up can cost $10k+. Clear Journey exists to prevent that." },
];

const INDUSTRY_TESTIMONIALS = [
  { name: "Kimberley O", role: "Independent Travel Consultant", quote: "I was losing track of follow-ups during peak season. Clear Journey saved me from missing a $15k booking—it paid for itself in the first month.", metricLabel: "Revenue Protected", metricValue: "$47,000" },
  { name: "Todd S.", role: "Luxury Travel Advisor", quote: "The context recall feature is a game-changer. I can pick up any client conversation instantly without scrambling through emails. My clients notice the difference.", metricLabel: "Time Saved Weekly", metricValue: "12 hours" },
  { name: "Kelly T", role: "Boutique Travel Agency Owner", quote: "Finally, a tool that doesn't overwhelm me with features I don't need. It's simple, elegant, and does exactly what it promises. My stress levels have dropped significantly.", metricLabel: "Client Retention", metricValue: "98%" },
  { name: "Samantha C", role: "Luxury Travel Advisor", quote: "I've tried every CRM and project management tool out there. They're all too complex for what we actually need. Clear Journey understands luxury travel advisors, it's built for our specific workflow, not generic business processes." },
  { name: "Riana W", role: "Independent Travel Specialist", quote: "When I left my corporate position to go independent, I was terrified of losing track of clients. Clear Journey gave me the confidence to make the leap. It's like having an assistant who never forgets anything." },
];

const HOW_IT_WORKS_STEPS = [
  { num: 1, icon: User, text: "Capture client details and\npreferences once" },
  { num: 2, icon: FileText, text: "See conversations, notes, and\nhistory in context" },
  { num: 3, icon: Bell, text: "Get surfaced reminders when\naction actually matters" },
  { num: 4, icon: Sparkles, text: "No setup chaos. No feature\noverload. Just clarity." },
];

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="mt-12 space-y-3">
      {FAQ_ITEMS.map((item, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-[0_2px_8px_rgba(30,41,59,0.04)] hover:border-l-[#C8A96A]/60 border-l-2 border-l-transparent"
        >
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setOpenIndex((prev) => (prev === i ? null : i));
            }}
            aria-expanded={openIndex === i}
            aria-controls={`faq-answer-${i}`}
            id={`faq-question-${i}`}
            className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-4 text-left font-medium text-[#374151] transition-colors hover:bg-[#f4efe8]/50"
          >
            <span>{item.q}</span>
            <ChevronDown
              className={`h-5 w-5 flex-shrink-0 text-[#C8A96A] transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
              strokeWidth={1.5}
              aria-hidden
            />
          </button>
          {openIndex === i && (
            <div
              id={`faq-answer-${i}`}
              role="region"
              aria-labelledby={`faq-question-${i}`}
              className="border-t border-[#e5e7eb] px-6 py-4 text-sm leading-relaxed text-[#6b7280]"
            >
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {

  return (
    <div className={`min-h-screen ${ebGaramond.variable} font-sans`}>
      {/* Top bar – premium refined header */}
      <header className="bg-[#1e293b] px-4 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="flex items-center border-b-2 border-transparent hover:border-[#C8A96A] transition-colors pb-0.5">
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
            <Link href="/signin" className="text-sm text-white/90 hover:text-white border-b border-transparent hover:border-[#C8A96A] transition-colors pb-0.5">Sign in</Link>
            <Link href="/signup" className="rounded-full bg-[#faf8f5] px-4 py-2 text-sm font-medium text-[#1e293b] hover:bg-[#C8A96A] hover:text-[#1e293b] transition-colors">
              Unlock your 30-day trial
            </Link>
          </div>
        </div>
      </header>

      {/* Hero – luxury editorial */}
      <section className="bg-[#faf8f5] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 rounded-full border bg-[#f4efe8] px-3.5 py-1.5 text-xs font-medium text-[#374151]" style={{ borderColor: 'rgba(200, 169, 106, 0.6)' }}>
                <Shield className="h-3.5 w-3.5 shrink-0" strokeWidth={2} style={{ color: 'var(--gold-accent)' }} />
                Trusted by luxury travel advisors worldwide
              </div>
              <h1 className="mt-8 font-serif-display text-xl font-medium leading-tight text-[#1e293b] md:text-2xl lg:text-3xl tracking-tight">
                Never miss a $10k follow-up
              </h1>
              <div className="mt-6 h-px w-16 bg-[var(--gold-accent)] opacity-90" aria-hidden />
              <p className="mt-4 text-2xl leading-relaxed text-[#374151] md:text-3xl lg:text-4xl">
                Built for luxury travel advisors
                <br />
                who can&apos;t afford mistakes.
              </p>
              <p className="mt-6 text-base text-[#6b7280]">
                Disorganisation isn&apos;t stressful – it&apos;s expensive.
              </p>
              <p className="mt-2 text-base font-medium text-[#374151]">
                $47/month, lifetime price lock.
              </p>
              <Link
                href="/signup"
                className="mt-10 inline-block rounded-lg bg-[#1e293b] px-6 py-3.5 text-base font-medium text-white shadow-[0_2px_8px_rgba(15,23,42,0.12)] hover:bg-[#0f172a] hover:ring-2 hover:ring-[#C8A96A]/50 transition-colors"
              >
                Unlock your 30-day trial
              </Link>
              <div className="mt-8 flex flex-wrap gap-8 text-sm text-[#6b7280]">
                <span className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 flex-shrink-0 text-[#22c55e]" strokeWidth={2.5} />
                  Cancel anytime
                </span>
                <span className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 flex-shrink-0 text-[#22c55e]" strokeWidth={2.5} />
                  Setup in 5 minutes
                </span>
              </div>
              <p className="mt-5 text-sm text-[#b91c1c]">
                Only 9 spots left
              </p>
            </div>

            {/* Right: Client Intelligence card – premium concierge preview */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="w-full max-w-md rounded-2xl border border-[#e5e7eb] bg-white p-8 shadow-[0_4px_24px_rgba(30,41,59,0.06)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#1e293b] text-lg font-semibold text-white">
                      SJ
                    </span>
                    <div>
                      <p className="font-semibold text-[#374151]">Sarah Johnson</p>
                      <p className="text-xs text-[#6b7280]">VIP Client • Since 2019</p>
                    </div>
                  </div>
                  <span className="rounded-full border px-3 py-1 text-xs font-medium text-[#6b7280]" style={{ borderColor: 'rgba(200, 169, 106, 0.4)', backgroundColor: 'rgba(200, 169, 106, 0.1)' }}>
                    Upcoming Trip
                  </span>
                </div>

                <div className="mt-6 space-y-5 border-t border-[#e5e7eb] pt-6">
                  <div className="flex gap-3">
                    <Heart className="h-5 w-5 flex-shrink-0 text-[#C8A96A]" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-medium text-[#374151]">Preferences</p>
                      <p className="mt-0.5 text-sm text-[#6b7280] leading-relaxed">
                        Window seat, allergic to shellfish, prefers boutique hotels
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Calendar className="h-5 w-5 flex-shrink-0 text-[#C8A96A]" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-medium text-[#374151]">Important Dates</p>
                      <p className="mt-0.5 text-sm text-[#6b7280] leading-relaxed">
                        Anniversary: June 15, Birthday: November 22
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Plane className="h-5 w-5 flex-shrink-0 text-[#C8A96A]" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-medium text-[#374151]">Next Trip</p>
                      <p className="mt-0.5 text-sm text-[#6b7280] leading-relaxed">
                        Amalfi Coast, Italy • May 10–20, 2026
                      </p>
                    </div>
                  </div>
                  <div className="rounded-xl border-l-2 border-l-[#C8A96A]/80 border border-[#e5e7eb] bg-[#C8A96A]/10 p-4">
                    <div className="flex gap-3">
                      <Bell className="h-5 w-5 flex-shrink-0 text-[#C8A96A]" strokeWidth={1.5} />
                      <div>
                        <p className="text-sm font-semibold text-[#374151]">Smart Reminder</p>
                        <p className="mt-0.5 text-sm text-[#6b7280] leading-relaxed">
                          Send anniversary gift recommendations 3 weeks before June 15
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden cost of disorganisation + Loom – editorial */}
      <section id="services" className="border-t border-[#e5e7eb] bg-[#f4efe8] px-6 py-20 md:py-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="font-serif-display text-3xl font-medium leading-tight text-[#1e293b] md:text-4xl">
            The hidden cost of disorganisation
          </h2>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#6b7280] md:text-lg">
            Luxury travel advisors don&apos;t lose clients because they&apos;re bad at their job.
            They lose them because things slip through the cracks.
          </p>

          <div className="mt-14 w-full max-w-4xl">
            <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_4px_24px_rgba(30,41,59,0.06)]">
              <div className="relative aspect-video w-full">
                <iframe
                  src="https://www.loom.com/embed/dff3b34cf8344dec83b816f11a224aba"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                  title="Clear Journey walkthrough"
                />
              </div>
            </div>
          </div>

          <ul className="mt-14 max-w-xl space-y-4 text-left text-base text-[#6b7280] leading-relaxed">
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C8A96A]" aria-hidden />
              One missed follow-up can cost a $10,000 booking
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C8A96A]" aria-hidden />
              Lost context damages trust and reputation
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C8A96A]" aria-hidden />
              Mental overload leads to avoidable mistakes
            </li>
          </ul>

          <div className="mt-14 h-px w-24 mx-auto bg-[#C8A96A]/60" aria-hidden />
          <p className="mt-8 font-serif-display text-xl font-medium text-[#374151] md:text-2xl">
            Clear Journey exists to stop that from happening.
          </p>
        </div>
      </section>

      {/* Testimonial / proof – premium quote block */}
      <section className="border-t border-[#e5e7eb] bg-[#faf8f5] px-6 py-20 md:py-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <blockquote className="text-center">
            <span className="font-serif-display text-5xl font-medium leading-none text-[#C8A96A] md:text-6xl" aria-hidden>&ldquo;</span>
            <p className="mt-4 font-serif-display text-xl font-medium leading-relaxed text-[#374151] md:text-2xl md:leading-relaxed">
              I was losing track of follow-ups during peak season.
              <br />
              Clear Journey saved me from missing a $15k booking – it paid for itself in the first month.
            </p>
          </blockquote>

          <div className="mt-14 flex w-full max-w-2xl flex-col items-center gap-10 border-t border-[#e5e7eb] pt-12 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-5 sm:text-left">
              <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#1e293b] text-lg font-semibold text-white">
                KO
              </span>
              <div className="text-center sm:text-left">
                <p className="font-semibold text-[#374151]">Kimberley O&apos;Sullivan</p>
                <p className="text-sm text-[#C8A96A]">Travel Advisor at Montecito Village Travel</p>
                <p className="mt-0.5 text-xs text-[#6b7280]">(Founding User)</p>
              </div>
            </div>
            <div className="flex flex-shrink-0 flex-col items-center">
              <div className="flex h-12 w-28 items-center justify-center rounded-lg border border-[#e5e7eb] bg-[#f4efe8] text-xs text-[#6b7280]">
                Partner logo
              </div>
            </div>
          </div>

          <div className="mt-14 w-full max-w-xs h-px bg-[#C8A96A]/60" aria-hidden />
          <Link
            href="/signup"
            className="mt-10 inline-block rounded-lg bg-[#1e293b] px-6 py-3.5 text-base font-medium text-white shadow-[0_2px_8px_rgba(15,23,42,0.12)] hover:bg-[#0f172a] transition-colors"
          >
            Unlock your 30-day trial →
          </Link>
        </div>
      </section>

      {/* Benefits – problem vs solution – composed editorial */}
      <section className="border-t border-[#e5e7eb] bg-[#f4efe8] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl space-y-24 md:space-y-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#e5e7eb] bg-[#f4efe8] shadow-[0_4px_24px_rgba(30,41,59,0.06)]">
                <div className="flex h-full w-full items-center justify-center text-sm text-[#6b7280]">
                  Image: stressed advisor at desk
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex flex-col justify-center">
              <div className="h-px w-12 bg-[#C8A96A]/70 mb-4" aria-hidden />
              <h2 className="font-serif-display text-2xl font-medium leading-tight text-[#1e293b] md:text-3xl lg:text-4xl">
                The risk isn&apos;t workload — it&apos;s what gets forgotten
              </h2>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-[#6b7280] md:text-lg">
                Client preferences, past conversations, timing-sensitive follow-ups — when these live across emails, notes, and memory, mistakes are inevitable.
              </p>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div className="flex flex-col justify-center">
              <h2 className="font-serif-display text-2xl font-medium leading-tight text-[#1e293b] md:text-3xl lg:text-4xl">
                See what needs attention — before it becomes a problem
              </h2>
              <ul className="mt-8 max-w-xl space-y-4 text-base text-[#6b7280] leading-relaxed">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C8A96A]" aria-hidden />
                  Know exactly which clients need follow-up
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C8A96A]" aria-hidden />
                  Instantly recall preferences and context
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C8A96A]" aria-hidden />
                  Reduce mental load during busy periods
                </li>
              </ul>
              <p className="mt-10 text-base font-medium text-[#374151] md:text-lg">
                Clear Journey doesn&apos;t help you do more. It helps you avoid expensive mistakes.
              </p>
            </div>
            <div>
              <div className="h-px w-12 bg-[#C8A96A]/70 mb-4" aria-hidden />
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#e5e7eb] bg-[#f4efe8] shadow-[0_4px_24px_rgba(30,41,59,0.06)]">
                <div className="flex h-full w-full items-center justify-center text-sm text-[#6b7280]">
                  Image: Clear Journey dashboard
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-20 flex justify-center md:mt-24">
          <Link
            href="/signup"
            className="inline-block rounded-lg bg-[#1e293b] px-6 py-3.5 text-base font-medium text-white shadow-[0_2px_8px_rgba(15,23,42,0.12)] hover:bg-[#0f172a] transition-colors"
          >
            Unlock your 30-day trial
          </Link>
        </div>
      </section>

      {/* How It Works – premium minimal cards */}
      <section className="border-t border-[#e5e7eb] bg-[#faf8f5] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif-display text-2xl font-medium text-[#1e293b] md:text-3xl lg:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-[#6b7280] md:text-lg">
            Designed to fit seamlessly into your workflow, with no complicated onboarding.
          </p>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="flex flex-col items-center rounded-2xl border border-[#e5e7eb] bg-white p-8 shadow-[0_2px_12px_rgba(30,41,59,0.04)]"
                >
                  <span className="-mt-12 mb-5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#C8A96A]/70 bg-[#C8A96A]/10 text-sm font-semibold text-[#1e293b]">
                    {step.num}
                  </span>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#C8A96A]/15 text-[#C8A96A]">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <p className="text-center text-sm leading-relaxed text-[#6b7280]">
                    {step.text.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < step.text.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="mt-14 text-center text-base font-medium text-[#374151] md:text-lg">
            No training. No setup fees. No overwhelm.
          </p>
        </div>
      </section>

      {/* Built with real advisors – premium metrics */}
      <section className="border-t border-[#e5e7eb] bg-[#f4efe8] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif-display text-2xl font-medium leading-tight text-[#1e293b] md:text-3xl lg:text-4xl">
            Built with real advisors. Designed around how you actually work.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-[#6b7280] md:text-lg">
            They&apos;ve stopped relying on memory and messy inboxes — and now show up fully prepared for every call, every time.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-3 sm:gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C8A96A]/50 bg-white px-4 py-2.5 text-sm font-medium text-[#374151] shadow-[0_2px_8px_rgba(30,41,59,0.04)]">
              <Building2 className="h-4 w-4 flex-shrink-0 text-[#1e293b]" strokeWidth={1.5} />
              Boutique travel planners
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C8A96A]/50 bg-white px-4 py-2.5 text-sm font-medium text-[#374151] shadow-[0_2px_8px_rgba(30,41,59,0.04)]">
              <Users className="h-4 w-4 flex-shrink-0 text-[#1e293b]" strokeWidth={1.5} />
              Luxury agents working solo or with a small team
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C8A96A]/50 bg-white px-4 py-2.5 text-sm font-medium text-[#374151] shadow-[0_2px_8px_rgba(30,41,59,0.04)]">
              <Star className="h-4 w-4 flex-shrink-0 text-[#1e293b]" strokeWidth={1.5} />
              Anyone who manages high-value clients by hand
            </span>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
            <div>
              <p className="font-serif-display text-3xl font-medium text-[#C8A96A] md:text-4xl">$2.4M</p>
              <p className="mt-2 text-sm font-medium text-[#6b7280]">Revenue Protected</p>
            </div>
            <div>
              <p className="font-serif-display text-3xl font-medium text-[#C8A96A] md:text-4xl">98%</p>
              <p className="mt-2 text-sm font-medium text-[#6b7280]">Follow-up Rate</p>
            </div>
            <div>
              <p className="font-serif-display text-3xl font-medium text-[#C8A96A] md:text-4xl">15hrs</p>
              <p className="mt-2 text-sm font-medium text-[#6b7280]">Saved Per Week</p>
            </div>
          </div>

          <Link
            href="/signup"
            className="mt-14 inline-block rounded-lg bg-[#1e293b] px-6 py-3.5 text-base font-medium text-white shadow-[0_2px_8px_rgba(15,23,42,0.12)] hover:bg-[#0f172a] transition-colors"
          >
            Unlock your 30-day trial
          </Link>
        </div>
      </section>

      {/* Industry Professional Testimonials – premium grid */}
      <section className="border-t border-[#e5e7eb] bg-[#faf8f5] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif-display text-2xl font-medium leading-tight text-[#1e293b] md:text-3xl lg:text-4xl">
            See what industry professionals are saying about our platform
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-center text-base text-[#6b7280]">
            Trusted feedback from real luxury travel advisors.
          </p>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRY_TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="flex flex-col rounded-2xl border border-[#e5e7eb] bg-white p-8 shadow-[0_2px_12px_rgba(30,41,59,0.04)] hover:border-[#C8A96A]/50 transition-colors"
              >
                <span className="font-serif-display text-2xl leading-none text-[#C8A96A]/80" aria-hidden>&ldquo;</span>
                <p className="font-semibold text-[#374151]">{t.name}</p>
                <p className="text-sm text-[#6b7280]">{t.role}</p>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-[#6b7280]">
                  {t.quote}
                </p>
                {"metricLabel" in t && t.metricLabel && (
                  <div className="mt-6 flex items-center justify-between gap-2 border-t border-[#e5e7eb] pt-5">
                    <span className="text-xs font-medium text-[#6b7280]">{t.metricLabel}</span>
                    <span className="text-sm font-semibold text-[#1e293b]">{t.metricValue}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Conversion – navy highlight card on white */}
      <section id="pricing" className="border-t border-[#e5e7eb] bg-white px-6 py-20 md:py-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center">
          {/* Main pricing card – navy with gold border */}
          <div
            className="w-full overflow-hidden rounded-[16px] border border-[#C8A96A] p-14 md:p-[56px]"
            style={{ backgroundColor: "#1e293b", boxShadow: "0 10px 40px rgba(30,41,59,0.15)" }}
          >
            <h2 className="text-center text-sm font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.7)" }}>
              Clear Journey Pro
            </h2>
            <p className="mt-3 text-center font-serif-display text-5xl font-semibold text-[#C8A96A] md:text-6xl lg:text-7xl">
              $47 / month
            </p>

            {/* Feature box – glass-style on navy */}
            <div
              className="mt-10 rounded-xl border p-6"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.12)" }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.85)" }}>
                What this gives you
              </h3>
              <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
                What you need to stay on top of high-value clients:
              </p>
              <ul className="mt-5 space-y-4">
                {[
                  "Client profiles with preferences, notes, and history",
                  "Clear visibility on who needs follow-up",
                  "Reminders so nothing slips during busy periods",
                  "Instant context before replying or calling",
                  "A calm workspace that reduces mistakes",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#C8A96A]" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Value statement block – gold tint */}
            <div
              className="mt-8 rounded-xl border px-6 py-5 text-center"
              style={{ backgroundColor: "rgba(200,169,106,0.15)", borderColor: "rgba(200,169,106,0.4)" }}
            >
              <p className="text-base font-medium text-white md:text-lg">One missed follow-up can cost $10k+.</p>
              <p className="mt-1.5 text-sm text-white/90">Clear Journey exists to prevent that.</p>
            </div>

            {/* Primary CTA – white button */}
            <Link
              href="/signup"
              className="mt-10 flex w-full min-h-[56px] items-center justify-center rounded-lg bg-white px-10 py-5 text-lg font-semibold text-[#1e293b] transition-colors hover:bg-[#f4efe8]"
            >
              Unlock your 30-day trial →
            </Link>

            <p className="mt-6 text-center text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
              Cancel anytime • No lock-in
            </p>
            <p className="mt-1 text-center text-sm text-[#b91c1c]">Only 9 spots remaining</p>
            <p className="mt-5 text-center text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
              The cost of waiting is usually higher than the cost of starting.
            </p>
          </div>

          {/* Support cards – secondary */}
          <div className="mt-14 grid w-full max-w-2xl gap-6 sm:grid-cols-2">
            <div className="flex flex-col items-center rounded-xl border border-[#e5e7eb] bg-white p-6 text-center shadow-[0_1px_4px_rgba(30,41,59,0.04)]">
              <Headphones className="h-9 w-9 flex-shrink-0 text-[#1e293b]" strokeWidth={1.5} />
              <h3 className="mt-3 text-sm font-semibold text-[#374151]">Priority Support</h3>
              <p className="mt-1.5 text-xs text-[#6b7280]">Direct access to our team when you need help</p>
            </div>
            <div className="flex flex-col items-center rounded-xl border border-[#e5e7eb] bg-white p-6 text-center shadow-[0_1px_4px_rgba(30,41,59,0.04)]">
              <RefreshCw className="h-9 w-9 flex-shrink-0 text-[#1e293b]" strokeWidth={1.5} />
              <h3 className="mt-3 text-sm font-semibold text-[#374151]">Free Updates</h3>
              <p className="mt-1.5 text-xs text-[#6b7280]">All new features included at no extra cost</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Final conversion – premium accordion */}
      <section className="border-t border-[#e5e7eb] bg-[#faf8f5] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-serif-display text-2xl font-medium leading-tight text-[#1e293b] md:text-3xl lg:text-4xl">
            Here&apos;s What Most Advisors Ask
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-center text-base text-[#6b7280]">
            Everything you need to know about becoming a Founding Member
          </p>

          <FaqAccordion />

          <p className="mt-14 text-center font-serif-display text-base font-medium text-[#374151] md:text-lg">
            &ldquo;The cost of waiting is usually higher than the cost of starting.&rdquo;
          </p>

          <div className="mt-12 flex justify-center">
            <Link
              href="/signup"
              className="inline-block rounded-lg bg-[#1e293b] px-6 py-3.5 text-base font-medium text-white shadow-[0_2px_8px_rgba(15,23,42,0.12)] hover:bg-[#0f172a] transition-colors"
            >
              Unlock your 30-day trial
            </Link>
          </div>

          <p className="mt-8 text-center text-sm text-[#b91c1c]">
            Only 9 spots remaining • 30-day free trial
          </p>
        </div>
      </section>

      {/* Footer – refined premium close */}
      <footer className="border-t-2 border-[var(--gold-accent)] bg-[#1e293b] px-6 py-10 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6">
          <nav className="flex flex-wrap justify-center gap-6 text-sm sm:gap-8">
            <Link href="/" className="text-white/85 hover:text-[#C8A96A] transition-colors">Home</Link>
            <Link href="#about" className="text-white/85 hover:text-[#C8A96A] transition-colors">About</Link>
            <Link href="#services" className="text-white/85 hover:text-[#C8A96A] transition-colors">Services</Link>
            <Link href="#pricing" className="text-white/85 hover:text-[#C8A96A] transition-colors">Pricing</Link>
            <Link href="/contact" className="text-white/85 hover:text-[#C8A96A] transition-colors">Contact &amp; Feedback</Link>
            <Link href="/privacy" className="text-white/85 hover:text-[#C8A96A] transition-colors">Privacy</Link>
            <Link href="/terms" className="text-white/85 hover:text-[#C8A96A] transition-colors">Terms</Link>
          </nav>
          <div className="flex items-center justify-center gap-3">
            <a href="https://www.instagram.com/withclearjourney" target="_blank" rel="noopener noreferrer" className="text-white/85 hover:text-[#C8A96A] transition-colors" aria-label="Instagram">
              <Instagram className="h-5 w-5" strokeWidth={1.5} />
            </a>
            <a href="https://www.youtube.com/@withclearjourney" target="_blank" rel="noopener noreferrer" className="text-white/85 hover:text-[#C8A96A] transition-colors" aria-label="YouTube">
              <Youtube className="h-5 w-5" strokeWidth={1.5} />
            </a>
          </div>
          <span className="text-sm text-white/70">© 2026 Clear Journey. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
