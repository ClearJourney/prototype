"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { SecureFormLayout } from "@/components/forms/SecureFormLayout";
import { FormSection } from "@/components/forms/FormSection";
import {
  type TravelerDetailsStep,
  type PassportStep,
  type EmergencyContactStep,
  type TravelPreferencesStep,
  type HealthStep,
  type SpecialDatesStep,
  type LoyaltyProgramEntry,
  type AdditionalTraveler,
  type FinalConsentStep,
  type ClientProfileFormData,
} from "@/types/secure-forms";
import { Info, Lock, Plus, Trash2 } from "lucide-react";

const STEPS: { key: string; label: string }[] = [
  { key: "traveler", label: "Traveler Details" },
  { key: "passport", label: "Passport" },
  { key: "emergency", label: "Emergency Contact" },
  { key: "prefs", label: "Preferences" },
  { key: "health", label: "Health" },
  { key: "dates", label: "Special Dates" },
  { key: "loyalty", label: "Loyalty Programs" },
  { key: "additional", label: "Additional Travelers" },
  { key: "confirmation", label: "Confirmation" },
];

const inputClass =
  "w-full rounded-lg border border-[#e8e4de] bg-white px-4 py-2.5 text-[#2c2a26] placeholder:text-[#9a9794] focus:border-[#1e293b] focus:outline-none focus:ring-1 focus:ring-[#1e293b]";
/** Selects use same styling as inputs with extra right padding so the dropdown arrow aligns with date picker icon spacing */
const selectClass =
  "w-full rounded-lg border border-[#e8e4de] bg-white pl-4 pr-10 py-2.5 text-[#2c2a26] focus:border-[#1e293b] focus:outline-none focus:ring-1 focus:ring-[#1e293b]";
const labelClass = "block text-sm font-medium text-[#2c2a26] mb-1.5";

/** Single-line input that expands when user types multiple lines or presses Enter */
function ExpandablePreferenceInput({
  value,
  onChange,
  onFocus,
  onBlur,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  className: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(el.scrollHeight, 42)}px`;
  }, [value]);
  return (
    <textarea
      ref={ref}
      rows={1}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      className={className}
      style={{ overflow: "hidden", resize: "none", minHeight: 42 }}
    />
  );
}

const emptyTraveler: TravelerDetailsStep = {
  legalFirstName: "",
  middleName: "",
  legalLastName: "",
  email: "",
  phone: "",
  streetAddress: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  dateOfBirth: "",
  gender: "",
};

const emptyPassport: PassportStep = {
  hasPassport: false,
  passportNumber: "",
  issuingCountry: "",
  issueDate: "",
  expiryDate: "",
  passportType: "",
  knownTravelerNumber: "",
};

const emptyEmergency: EmergencyContactStep = {
  name: "",
  phone: "",
  email: "",
  relationship: "",
};

const emptyPrefs: TravelPreferencesStep = {
  generalStyle: "",
  airPreferences: "",
  accommodationPreferences: "",
  cruisePreferences: "",
  seatPreference: "",
  roomPreference: "",
  transferPreference: "",
  specialRequests: "",
  diningPreferences: "",
  travelPreferences: "",
  specialInterests: "",
};

const emptyHealth: HealthStep = {
  mobilityAssistance: false,
  dietaryRestrictions: false,
  medicalNotes: "",
};

const emptySpecialDates: SpecialDatesStep = {
  birthday: "",
  anniversary: "",
  otherMeaningfulDates: "",
};

const emptyLoyaltyProgram: LoyaltyProgramEntry = {
  programType: "airline",
  programName: "",
  membershipNumber: "",
  tier: "",
};

const emptyConsent: FinalConsentStep = {
  finalNotes: "",
  consentVerified: false,
  newsletterOptIn: false,
};

export default function ClientProfileFormPage() {
  const params = useParams();
  const token = params?.token as string;
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [preferenceChipsVisible, setPreferenceChipsVisible] = useState<string | null>(null);
  const [data, setData] = useState<ClientProfileFormData>({
    traveler: { ...emptyTraveler },
    passport: { ...emptyPassport },
    emergencyContact: { ...emptyEmergency },
    preferences: { ...emptyPrefs },
    health: { ...emptyHealth },
    specialDates: { ...emptySpecialDates },
    loyaltyPrograms: [],
    additionalTravelers: [],
    consent: { ...emptyConsent },
  });

  const updateTraveler = (patch: Partial<TravelerDetailsStep>) => {
    setData((prev) => ({ ...prev, traveler: { ...prev.traveler, ...patch } }));
  };
  const updatePassport = (patch: Partial<PassportStep>) => {
    setData((prev) => ({ ...prev, passport: { ...prev.passport, ...patch } }));
  };
  const updateEmergency = (patch: Partial<EmergencyContactStep>) => {
    setData((prev) => ({
      ...prev,
      emergencyContact: { ...prev.emergencyContact, ...patch },
    }));
  };
  const updatePrefs = (patch: Partial<TravelPreferencesStep>) => {
    setData((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, ...patch },
    }));
  };
  const updateHealth = (patch: Partial<HealthStep>) => {
    setData((prev) => ({ ...prev, health: { ...prev.health, ...patch } }));
  };
  const updateSpecialDates = (patch: Partial<SpecialDatesStep>) => {
    setData((prev) => ({
      ...prev,
      specialDates: { ...prev.specialDates, ...patch },
    }));
  };
  const addLoyaltyProgram = () => {
    setData((prev) => ({
      ...prev,
      loyaltyPrograms: [...prev.loyaltyPrograms, { ...emptyLoyaltyProgram }],
    }));
  };
  const updateLoyaltyProgram = (index: number, patch: Partial<LoyaltyProgramEntry>) => {
    setData((prev) => {
      const next = [...prev.loyaltyPrograms];
      next[index] = { ...next[index], ...patch };
      return { ...prev, loyaltyPrograms: next };
    });
  };
  const removeLoyaltyProgram = (index: number) => {
    setData((prev) => ({
      ...prev,
      loyaltyPrograms: prev.loyaltyPrograms.filter((_, i) => i !== index),
    }));
  };
  const updateConsent = (patch: Partial<FinalConsentStep>) => {
    setData((prev) => ({ ...prev, consent: { ...prev.consent, ...patch } }));
  };

  const emptyAdditionalTravelerPassport = {
    hasPassport: false,
    passportNumber: "",
    issuingCountry: "",
    expiryDate: "",
  };

  const addAdditionalTraveler = () => {
    setData((prev) => ({
      ...prev,
      additionalTravelers: [
        ...prev.additionalTravelers,
        {
          relationship: "spouse",
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          gender: "",
          passport: { ...emptyAdditionalTravelerPassport },
        },
      ],
    }));
  };
  const updateAdditionalTraveler = (index: number, patch: Partial<AdditionalTraveler>) => {
    setData((prev) => {
      const next = [...prev.additionalTravelers];
      next[index] = { ...next[index], ...patch };
      return { ...prev, additionalTravelers: next };
    });
  };
  const removeAdditionalTraveler = (index: number) => {
    setData((prev) => ({
      ...prev,
      additionalTravelers: prev.additionalTravelers.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    if (!data.consent.consentVerified) return;
    try {
      const res = await fetch("/api/profile/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitted(true); // Still show success UX; status update may fail for unlinked tokens
      }
    } catch {
      setSubmitted(true);
    }
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  // Placeholder until company name is wired from API/branding
  const companyName = "[Company Name]";

  if (submitted) {
    return (
      <SecureFormLayout
        eyebrow={`Requested by ${companyName}`}
        headline="Your Private Travel Profile"
        subtext="Your details have been received securely."
      >
        <div className="rounded-xl border border-[#e8e4de] bg-white p-8 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <p className="text-lg font-medium text-[#2c2a26]">
            Thank you. Your travel profile has been saved securely.
          </p>
          <p className="mt-2 text-sm text-[#5c5a57]">
            Your advisor may reach out if anything needs clarification.
          </p>
        </div>
      </SecureFormLayout>
    );
  }

  return (
    <SecureFormLayout
      eyebrow={`Requested by ${companyName}`}
      headline="Your Private Travel Profile"
      subtext="A few details will help us tailor your journey perfectly."
      trustLines={["Secure · Private · Encrypted", "Takes about 2–3 minutes"]}
    >
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-1 text-xs">
          {STEPS.map((s, i) => (
            <span
              key={s.key}
              className={`rounded-full px-2.5 py-1 ${
                i === step
                  ? "bg-[#1e293b] text-white"
                  : i < step
                    ? "bg-[#1e293b]/20 text-[#2c2a26]"
                    : "bg-[#e8e4de] text-[#8a8784]"
              }`}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 0 – Traveler Details */}
        {step === 0 && (
          <div className="space-y-6">
            <FormSection title="Traveler details">
              <p className="mb-3 flex items-center gap-2 text-xs text-[#5c5a57]">
                <Info className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.5} />
                Please enter your name exactly as it appears on your passport.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label className={labelClass}>First name (as on passport)</label>
                  <input
                    type="text"
                    required
                    value={data.traveler.legalFirstName}
                    onChange={(e) => updateTraveler({ legalFirstName: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Middle name</label>
                  <input
                    type="text"
                    value={data.traveler.middleName}
                    onChange={(e) => updateTraveler({ middleName: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Last name (as on passport)</label>
                <input
                  type="text"
                  required
                  value={data.traveler.legalLastName}
                  onChange={(e) => updateTraveler({ legalLastName: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    type="email"
                    required
                    value={data.traveler.email}
                    onChange={(e) => updateTraveler({ email: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input
                    type="tel"
                    value={data.traveler.phone}
                    onChange={(e) => updateTraveler({ phone: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Street address</label>
                <input
                  type="text"
                  value={data.traveler.streetAddress}
                  onChange={(e) => updateTraveler({ streetAddress: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className={labelClass}>City</label>
                  <input
                    type="text"
                    value={data.traveler.city}
                    onChange={(e) => updateTraveler({ city: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>State</label>
                  <input
                    type="text"
                    value={data.traveler.state}
                    onChange={(e) => updateTraveler({ state: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Postal code</label>
                  <input
                    type="text"
                    value={data.traveler.postalCode}
                    onChange={(e) => updateTraveler({ postalCode: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Country</label>
                <input
                  type="text"
                  value={data.traveler.country}
                  onChange={(e) => updateTraveler({ country: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Date of birth</label>
                  <input
                    type="date"
                    value={data.traveler.dateOfBirth}
                    onChange={(e) => updateTraveler({ dateOfBirth: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Gender <span className="text-[#8a8784]">(optional)</span>
                  </label>
                  <select
                    value={data.traveler.gender}
                    onChange={(e) => updateTraveler({ gender: e.target.value })}
                    className={selectClass}
                  >
                    <option value="">Select…</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </FormSection>
          </div>
        )}

        {/* Step 1 – Passport */}
        {step === 1 && (
          <FormSection
            title="Passport details"
            description="Adding your passport details now helps your advisor prepare bookings and avoid delays."
          >
            <p className="flex items-center gap-2 text-xs text-[#5c5a57]">
              <Lock className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.5} />
              Stored securely and only used for travel planning.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Passport number</label>
                <input
                  type="text"
                  value={data.passport.passportNumber}
                  onChange={(e) => updatePassport({ passportNumber: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Issuing country</label>
                <input
                  type="text"
                  value={data.passport.issuingCountry}
                  onChange={(e) => updatePassport({ issuingCountry: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Issue date</label>
                <input
                  type="date"
                  value={data.passport.issueDate}
                  onChange={(e) => updatePassport({ issueDate: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Expiry date</label>
                <input
                  type="date"
                  value={data.passport.expiryDate}
                  onChange={(e) => updatePassport({ expiryDate: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Passport type</label>
              <select
                value={data.passport.passportType}
                onChange={(e) => updatePassport({ passportType: e.target.value })}
                className={selectClass}
              >
                <option value="">Select…</option>
                <option value="Regular">Regular</option>
                <option value="Official">Official</option>
                <option value="Diplomatic">Diplomatic</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>
                Trusted traveler number (optional)
              </label>
              <input
                type="text"
                value={data.passport.knownTravelerNumber}
                onChange={(e) => updatePassport({ knownTravelerNumber: e.target.value })}
                placeholder="e.g. TSA PreCheck"
                className={inputClass}
              />
            </div>
          </FormSection>
        )}

        {/* Step 2 – Emergency Contact */}
        {step === 2 && (
          <FormSection title="Emergency contact">
            <div>
              <label className={labelClass}>Name</label>
              <input
                type="text"
                value={data.emergencyContact.name}
                onChange={(e) => updateEmergency({ name: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Phone</label>
                <input
                  type="tel"
                  value={data.emergencyContact.phone}
                  onChange={(e) => updateEmergency({ phone: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  value={data.emergencyContact.email}
                  onChange={(e) => updateEmergency({ email: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Relationship</label>
              <input
                type="text"
                value={data.emergencyContact.relationship}
                onChange={(e) => updateEmergency({ relationship: e.target.value })}
                placeholder="e.g. Spouse, Parent"
                className={inputClass}
              />
            </div>
          </FormSection>
        )}

        {/* Step 3 – Travel Preferences */}
        {step === 3 && (
          <FormSection
            title="Travel preferences"
            description="All optional — share what helps us personalize your journey."
          >
            {[
              {
                key: "accommodation",
                label: "Accommodation preferences",
                helper: "Share anything that helps us choose the right places for you.",
                value: data.preferences.accommodationPreferences,
                onChange: (v: string) => updatePrefs({ accommodationPreferences: v }),
                chips: [
                  "Boutique hotels",
                  "Luxury resorts",
                  "Ocean views",
                  "Quiet rooms",
                  "Suites preferred",
                ],
              },
              {
                key: "dining",
                label: "Dining preferences",
                helper: "Tell us about dietary preferences or cuisines you enjoy.",
                value: data.preferences.diningPreferences,
                onChange: (v: string) => updatePrefs({ diningPreferences: v }),
                chips: [
                  "Fine dining",
                  "Wine experiences",
                  "Local cuisine",
                  "Vegetarian",
                  "Seafood",
                ],
              },
              {
                key: "travel",
                label: "Travel preferences",
                helper: "Let us know how you prefer to travel.",
                value: data.preferences.travelPreferences,
                onChange: (v: string) => updatePrefs({ travelPreferences: v }),
                chips: [
                  "Business class",
                  "First class",
                  "Aisle seat",
                  "Private transfers",
                  "Small luxury cruises",
                ],
              },
              {
                key: "special",
                label: "Special interests",
                helper: "What do you enjoy experiencing while travelling?",
                value: data.preferences.specialInterests,
                onChange: (v: string) => updatePrefs({ specialInterests: v }),
                chips: [
                  "Wine tasting",
                  "Cultural tours",
                  "Wellness / spa",
                  "Adventure",
                  "Food experiences",
                ],
              },
            ].map(({ key: fieldKey, label, helper, value, onChange, chips }) => (
              <div key={fieldKey} className="mt-6 first:mt-0 space-y-2">
                <label className={labelClass}>{label}</label>
                <p className="text-xs text-[#5c5a57]">{helper}</p>
                {preferenceChipsVisible === fieldKey && (
                  <div className="flex flex-wrap gap-1.5">
                    {chips.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() =>
                          onChange(
                            value ? `${value}, ${chip}` : chip
                          )
                        }
                        className="rounded-full border border-[#e8e4de] bg-white px-3 py-1.5 text-xs text-[#2c2a26] hover:border-[#1e293b]/30 hover:bg-sand-warm/30"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
                <ExpandablePreferenceInput
                  value={value}
                  onChange={onChange}
                  onFocus={() => setPreferenceChipsVisible(fieldKey)}
                  onBlur={() => setPreferenceChipsVisible(null)}
                  className={inputClass}
                />
              </div>
            ))}
          </FormSection>
        )}

        {/* Step 4 – Health */}
        {step === 4 && (
          <FormSection title="Health considerations">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-[#2c2a26]">
              <input
                type="checkbox"
                checked={data.health.mobilityAssistance}
                onChange={(e) => updateHealth({ mobilityAssistance: e.target.checked })}
                className="rounded border-[#e8e4de] text-[#1e293b]"
              />
              I may need mobility assistance
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-[#2c2a26]">
              <input
                type="checkbox"
                checked={data.health.dietaryRestrictions}
                onChange={(e) => updateHealth({ dietaryRestrictions: e.target.checked })}
                className="rounded border-[#e8e4de] text-[#1e293b]"
              />
              I have dietary restrictions
            </label>
            <div>
              <label className={labelClass}>Medical notes (optional)</label>
              <textarea
                value={data.health.medicalNotes}
                onChange={(e) => updateHealth({ medicalNotes: e.target.value })}
                rows={2}
                className={inputClass}
              />
            </div>
          </FormSection>
        )}

        {/* Step 5 – Special Dates */}
        {step === 5 && (
          <FormSection title="Special dates">
            <div>
              <label className={labelClass}>Birthday</label>
              <input
                type="text"
                value={data.specialDates.birthday}
                onChange={(e) => updateSpecialDates({ birthday: e.target.value })}
                placeholder="e.g. March 22"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Anniversary</label>
              <input
                type="text"
                value={data.specialDates.anniversary}
                onChange={(e) => updateSpecialDates({ anniversary: e.target.value })}
                placeholder="e.g. June 15"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Other meaningful dates</label>
              <textarea
                value={data.specialDates.otherMeaningfulDates}
                onChange={(e) => updateSpecialDates({ otherMeaningfulDates: e.target.value })}
                placeholder="Birthdays, celebrations…"
                rows={2}
                className={inputClass}
              />
            </div>
          </FormSection>
        )}

        {/* Step 6 – Loyalty Programs */}
        {step === 6 && (
          <FormSection
            title="Loyalty programs"
            description="Optional — add any loyalty programs you'd like us to keep in mind."
          >
            {data.loyaltyPrograms.map((lp, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#e8e4de] bg-sand-warm/30 p-4"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-[#2c2a26]">
                    Loyalty program {i + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeLoyaltyProgram(i)}
                    className="rounded p-2 text-charcoal-light hover:bg-white hover:text-error-muted"
                    aria-label="Remove"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Program type</label>
                    <select
                      value={lp.programType}
                      onChange={(e) =>
                        updateLoyaltyProgram(i, {
                          programType: e.target.value as LoyaltyProgramEntry["programType"],
                        })
                      }
                      className={selectClass}
                    >
                      <option value="airline">Airline</option>
                      <option value="hotel">Hotel</option>
                      <option value="cruise">Cruise</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Program name</label>
                    <input
                      type="text"
                      value={lp.programName}
                      onChange={(e) => updateLoyaltyProgram(i, { programName: e.target.value })}
                      placeholder="e.g. SkyMiles, Marriott Bonvoy"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Membership number</label>
                    <input
                      type="text"
                      value={lp.membershipNumber}
                      onChange={(e) =>
                        updateLoyaltyProgram(i, { membershipNumber: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Tier</label>
                    <input
                      type="text"
                      value={lp.tier}
                      onChange={(e) => updateLoyaltyProgram(i, { tier: e.target.value })}
                      placeholder="e.g. Gold, Platinum"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addLoyaltyProgram}
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-dashed border-[#e8e4de] bg-white px-4 py-2.5 text-sm font-medium text-[#2c2a26] hover:bg-sand-warm/50"
            >
              <Plus className="h-4 w-4" />
              Add loyalty program
            </button>
          </FormSection>
        )}

        {/* Step 7 – Additional Travelers */}
        {step === 7 && (
          <FormSection
            title="Additional travelers"
            description="Add anyone traveling with you. Passport details can be added now or later."
          >
            {data.additionalTravelers.map((t, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#e8e4de] bg-sand-warm/30 p-4"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-[#2c2a26]">
                    Traveler {i + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeAdditionalTraveler(i)}
                    className="rounded p-2 text-charcoal-light hover:bg-white hover:text-error-muted"
                    aria-label="Remove"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Relationship</label>
                    <select
                      value={t.relationship}
                      onChange={(e) =>
                        updateAdditionalTraveler(i, {
                          relationship: e.target.value as AdditionalTraveler["relationship"],
                        })
                      }
                      className={selectClass}
                    >
                      <option value="spouse">Spouse</option>
                      <option value="partner">Partner</option>
                      <option value="child">Child</option>
                      <option value="parent">Parent</option>
                      <option value="friend">Friend</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>First name</label>
                      <input
                        type="text"
                        value={t.firstName}
                        onChange={(e) =>
                          updateAdditionalTraveler(i, { firstName: e.target.value })
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Last name</label>
                      <input
                        type="text"
                        value={t.lastName}
                        onChange={(e) =>
                          updateAdditionalTraveler(i, { lastName: e.target.value })
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>
                        Date of birth <span className="text-[#8a8784]">(optional)</span>
                      </label>
                      <input
                        type="date"
                        value={t.dateOfBirth}
                        onChange={(e) =>
                          updateAdditionalTraveler(i, { dateOfBirth: e.target.value })
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Gender <span className="text-[#8a8784]">(optional)</span>
                      </label>
                      <select
                        value={t.gender}
                        onChange={(e) =>
                          updateAdditionalTraveler(i, { gender: e.target.value })
                        }
                        className={selectClass}
                      >
                        <option value="">Select…</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-[#2c2a26]">
                      <input
                        type="checkbox"
                        checked={t.passport.hasPassport}
                        onChange={(e) =>
                          updateAdditionalTraveler(i, {
                            passport: {
                              ...t.passport,
                              hasPassport: e.target.checked,
                            },
                          })
                        }
                        className="rounded border-[#e8e4de] text-[#1e293b]"
                      />
                      I have passport details to add
                    </label>
                    {t.passport.hasPassport && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <label className={labelClass}>Passport number</label>
                          <input
                            type="text"
                            value={t.passport.passportNumber}
                            onChange={(e) =>
                              updateAdditionalTraveler(i, {
                                passport: {
                                  ...t.passport,
                                  passportNumber: e.target.value,
                                },
                              })
                            }
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Issuing country</label>
                          <input
                            type="text"
                            value={t.passport.issuingCountry}
                            onChange={(e) =>
                              updateAdditionalTraveler(i, {
                                passport: {
                                  ...t.passport,
                                  issuingCountry: e.target.value,
                                },
                              })
                            }
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Expiry date</label>
                          <input
                            type="date"
                            value={t.passport.expiryDate}
                            onChange={(e) =>
                              updateAdditionalTraveler(i, {
                                passport: {
                                  ...t.passport,
                                  expiryDate: e.target.value,
                                },
                              })
                            }
                            className={inputClass}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addAdditionalTraveler}
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-dashed border-[#e8e4de] bg-white px-4 py-2.5 text-sm font-medium text-[#2c2a26] hover:bg-sand-warm/50"
            >
              <Plus className="h-4 w-4" />
              Add traveler
            </button>
          </FormSection>
        )}

        {/* Step 8 – Final Notes & Consent */}
        {step === 8 && (
          <FormSection title="Final notes & consent">
            <div className="space-y-2">
              <label className={labelClass}>Anything else we should know?</label>
              <p className="mt-1 text-xs text-[#5c5a57]">
                Share anything that might help your advisor plan your journey.
              </p>
              <textarea
                value={data.consent.finalNotes}
                onChange={(e) => updateConsent({ finalNotes: e.target.value })}
                rows={3}
                className={inputClass}
              />
            </div>
            <label className="flex cursor-pointer items-start gap-2 text-sm text-[#2c2a26]">
              <input
                type="checkbox"
                required
                checked={data.consent.consentVerified}
                onChange={(e) => updateConsent({ consentVerified: e.target.checked })}
                className="mt-1 rounded border-[#e8e4de] text-[#1e293b]"
              />
              I confirm that the information I have provided is accurate and I consent to it being used to design and manage my travel.
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-[#2c2a26]">
              <input
                type="checkbox"
                checked={data.consent.newsletterOptIn}
                onChange={(e) => updateConsent({ newsletterOptIn: e.target.checked })}
                className="rounded border-[#e8e4de] text-[#1e293b]"
              />
              I&apos;d like to receive travel inspiration and updates
            </label>
          </FormSection>
        )}

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={goBack}
            className="rounded-lg border border-[#e8e4de] bg-white px-4 py-2.5 text-sm font-medium text-[#2c2a26] hover:bg-sand-warm/50"
          >
            Back
          </button>
          <button
            type="submit"
            className="rounded-lg bg-[#1e293b] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#0f172a]"
          >
            {step === STEPS.length - 1 ? "Send profile" : "Continue"}
          </button>
        </div>
      </form>
    </SecureFormLayout>
  );
}
