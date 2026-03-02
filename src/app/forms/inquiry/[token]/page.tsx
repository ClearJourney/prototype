"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { SecureFormLayout } from "@/components/forms/SecureFormLayout";
import { FormSection } from "@/components/forms/FormSection";
import {
  DEFAULT_BUDGET_RANGES,
  type InquiryFormData,
} from "@/types/secure-forms";

const PLANNING_STAGES = [
  "Exploring ideas",
  "Have general plan, want guidance",
  "Ready to move forward and book",
];

const JOURNEY_TYPES = [
  "Independent journey",
  "Cruise",
  "Hosted group",
  "Blended travel",
];

const SERVICES_OPTIONS = [
  "Accommodations",
  "Flights",
  "Transfers",
  "Experiences",
  "Dining",
  "Full itinerary management",
];

const REFERRAL_SOURCES = [
  "Friend or family",
  "Social media",
  "Web search",
  "Repeat client",
  "Other",
];

const inputClass =
  "w-full rounded-lg border border-[#e8e4de] bg-white px-4 py-2.5 text-[#2c2a26] placeholder:text-[#9a9794] focus:border-[#1e293b] focus:outline-none focus:ring-1 focus:ring-[#1e293b]";
const labelClass = "block text-sm font-medium text-[#2c2a26] mb-1.5";

export default function InquiryFormPage() {
  const params = useParams();
  const token = params?.token as string;
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<InquiryFormData>({
    planningStage: "",
    destination: "",
    numberOfTravelers: 1,
    desiredDates: "",
    investmentRange: "",
    journeyType: "",
    servicesRequested: [],
    whatMattersMost: "",
    additionalConsiderations: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryState: "",
    referralSource: "",
    newsletterOptIn: false,
  });

  const update = (patch: Partial<InquiryFormData>) => {
    setForm((prev) => ({ ...prev, ...patch }));
  };

  const toggleService = (s: string) => {
    setForm((prev) => ({
      ...prev,
      servicesRequested: prev.servicesRequested.includes(s)
        ? prev.servicesRequested.filter((x) => x !== s)
        : [...prev.servicesRequested, s],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: POST to API with token, validate, create/update lead
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SecureFormLayout
        headline="Begin Your Travel Design"
        subtext="Share a few details so we can thoughtfully prepare for your journey."
      >
        <div className="rounded-xl border border-[#e8e4de] bg-white p-8 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <p className="text-lg font-medium text-[#2c2a26]">
            Thank you. We&apos;ll be in touch within two business days.
          </p>
          <p className="mt-2 text-sm text-[#5c5a57]">
            Your details have been received securely.
          </p>
        </div>
      </SecureFormLayout>
    );
  }

  return (
    <SecureFormLayout
      headline="Begin Your Travel Design"
      subtext="Share a few details so we can thoughtfully prepare for your journey."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1 – Planning Readiness */}
        <FormSection
          title="Planning readiness"
          description="Where are you in the planning process?"
        >
          <select
            required
            value={form.planningStage}
            onChange={(e) => update({ planningStage: e.target.value })}
            className={inputClass}
          >
            <option value="">Select…</option>
            {PLANNING_STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </FormSection>

        {/* Section 2 – Journey Overview */}
        <FormSection title="Journey overview">
          <div>
            <label className={labelClass}>Where would you like to travel?</label>
            <input
              type="text"
              required
              value={form.destination}
              onChange={(e) => update({ destination: e.target.value })}
              placeholder="e.g. Japan, Mediterranean, Iceland"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Number of travelers?</label>
            <input
              type="number"
              min={1}
              required
              value={form.numberOfTravelers}
              onChange={(e) =>
                update({ numberOfTravelers: parseInt(e.target.value, 10) || 1 })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Desired travel dates <span className="text-[#8a8784]">(optional)</span>
            </label>
            <input
              type="text"
              value={form.desiredDates}
              onChange={(e) => update({ desiredDates: e.target.value })}
              placeholder="e.g. Summer 2025, or specific dates"
              className={inputClass}
            />
          </div>
        </FormSection>

        {/* Section 3 – Investment & Scope */}
        <FormSection
          title="Investment & scope"
          description="Estimated investment range per traveler (advisors can customize these ranges)"
        >
          <div>
            <label className={labelClass}>Estimated investment range per traveler</label>
            <select
              required
              value={form.investmentRange}
              onChange={(e) => update({ investmentRange: e.target.value })}
              className={inputClass}
            >
              <option value="">Select…</option>
              {DEFAULT_BUDGET_RANGES.map((r) => (
                <option key={r.label} value={r.label}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Journey type</label>
            <select
              required
              value={form.journeyType}
              onChange={(e) => update({ journeyType: e.target.value })}
              className={inputClass}
            >
              <option value="">Select…</option>
              {JOURNEY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span className={labelClass}>Services requested</span>
            <div className="mt-2 flex flex-wrap gap-3">
              {SERVICES_OPTIONS.map((s) => (
                <label
                  key={s}
                  className="flex cursor-pointer items-center gap-2 text-sm text-[#2c2a26]"
                >
                  <input
                    type="checkbox"
                    checked={form.servicesRequested.includes(s)}
                    onChange={() => toggleService(s)}
                    className="rounded border-[#e8e4de] text-[#1e293b]"
                  />
                  {s}
                </label>
              ))}
            </div>
          </div>
        </FormSection>

        {/* Section 4 – Travel Style & Intent */}
        <FormSection
          title="Travel style & intent"
          description="What matters most about how this journey feels?"
        >
          <div>
            <label className={labelClass}>What matters most about how this journey feels?</label>
            <textarea
              value={form.whatMattersMost}
              onChange={(e) => update({ whatMattersMost: e.target.value })}
              placeholder="Pacing, celebration, wellness, cultural immersion, accessibility…"
              rows={3}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Additional considerations</label>
            <textarea
              value={form.additionalConsiderations}
              onChange={(e) => update({ additionalConsiderations: e.target.value })}
              placeholder="Anything else we should know"
              rows={2}
              className={inputClass}
            />
          </div>
        </FormSection>

        {/* Section 5 – Contact Details */}
        <FormSection title="Contact details">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>First name</label>
              <input
                type="text"
                required
                value={form.firstName}
                onChange={(e) => update({ firstName: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Last name</label>
              <input
                type="text"
                required
                value={form.lastName}
                onChange={(e) => update({ lastName: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update({ email: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update({ phone: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Country / State of residence</label>
            <input
              type="text"
              value={form.countryState}
              onChange={(e) => update({ countryState: e.target.value })}
              placeholder="e.g. United States, California"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Referral source <span className="text-[#8a8784]">(optional)</span>
            </label>
            <select
              value={form.referralSource}
              onChange={(e) => update({ referralSource: e.target.value })}
              className={inputClass}
            >
              <option value="">Select…</option>
              {REFERRAL_SOURCES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-[#2c2a26]">
            <input
              type="checkbox"
              checked={form.newsletterOptIn}
              onChange={(e) => update({ newsletterOptIn: e.target.checked })}
              className="rounded border-[#e8e4de] text-[#1e293b]"
            />
            I&apos;d like to receive travel inspiration and updates
          </label>
        </FormSection>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="rounded-lg bg-[#1e293b] px-6 py-3 font-medium text-white transition-colors hover:bg-[#0f172a]"
          >
            Request Travel Design
          </button>
        </div>
      </form>
    </SecureFormLayout>
  );
}
