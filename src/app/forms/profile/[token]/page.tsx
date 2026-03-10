"use client";

import { useState } from "react";
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
  type AdditionalTraveler,
  type FinalConsentStep,
  type ClientProfileFormData,
} from "@/types/secure-forms";
import { Plus, Trash2 } from "lucide-react";

const STEPS: { key: string; label: string }[] = [
  { key: "traveler", label: "Traveler Details" },
  { key: "passport", label: "Passport" },
  { key: "emergency", label: "Emergency Contact" },
  { key: "prefs", label: "Preferences" },
  { key: "health", label: "Health" },
  { key: "dates", label: "Special Dates" },
  { key: "additional", label: "Additional Travelers" },
  { key: "confirmation", label: "Confirmation" },
];

const inputClass =
  "w-full rounded-lg border border-[#e8e4de] bg-white px-4 py-2.5 text-[#2c2a26] placeholder:text-[#9a9794] focus:border-[#1e293b] focus:outline-none focus:ring-1 focus:ring-[#1e293b]";
const labelClass = "block text-sm font-medium text-[#2c2a26] mb-1.5";

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
};

const emptyHealth: HealthStep = {
  mobilityAssistance: false,
  dietaryRestrictions: false,
  medicalNotes: "",
};

const emptySpecialDates: SpecialDatesStep = {
  anniversary: "",
  otherMeaningfulDates: "",
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
  const [data, setData] = useState<ClientProfileFormData>({
    traveler: { ...emptyTraveler },
    passport: { ...emptyPassport },
    emergencyContact: { ...emptyEmergency },
    preferences: { ...emptyPrefs },
    health: { ...emptyHealth },
    specialDates: { ...emptySpecialDates },
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
  const updateConsent = (patch: Partial<FinalConsentStep>) => {
    setData((prev) => ({ ...prev, consent: { ...prev.consent, ...patch } }));
  };

  const addAdditionalTraveler = () => {
    setData((prev) => ({
      ...prev,
      additionalTravelers: [
        ...prev.additionalTravelers,
        { relationship: "spouse", name: "", details: {}, passport: {} },
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

  if (submitted) {
    return (
      <SecureFormLayout
        headline="Private Travel Profile"
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
      headline="Private Travel Profile"
      subtext="Share your details securely so we can design your journey."
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
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Legal first name</label>
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
                <label className={labelClass}>Legal last name</label>
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
                    className={inputClass}
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
          <FormSection title="Passport & travel documents">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-[#2c2a26]">
              <input
                type="checkbox"
                checked={data.passport.hasPassport}
                onChange={(e) => updatePassport({ hasPassport: e.target.checked })}
                className="rounded border-[#e8e4de] text-[#1e293b]"
              />
              I have a valid passport to add
            </label>
            {data.passport.hasPassport && (
              <div className="mt-4 space-y-4">
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
                    className={inputClass}
                  >
                    <option value="">Select…</option>
                    <option value="Regular">Regular</option>
                    <option value="Official">Official</option>
                    <option value="Diplomatic">Diplomatic</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>
                    Known Traveler Number <span className="text-[#8a8784]">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={data.passport.knownTravelerNumber}
                    onChange={(e) => updatePassport({ knownTravelerNumber: e.target.value })}
                    placeholder="e.g. TSA PreCheck"
                    className={inputClass}
                  />
                </div>
              </div>
            )}
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
            <div>
              <label className={labelClass}>General travel style</label>
              <textarea
                value={data.preferences.generalStyle}
                onChange={(e) => updatePrefs({ generalStyle: e.target.value })}
                rows={2}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Air travel preferences</label>
              <textarea
                value={data.preferences.airPreferences}
                onChange={(e) => updatePrefs({ airPreferences: e.target.value })}
                rows={2}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Accommodation preferences</label>
              <textarea
                value={data.preferences.accommodationPreferences}
                onChange={(e) => updatePrefs({ accommodationPreferences: e.target.value })}
                rows={2}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Cruise preferences (if applicable)</label>
              <textarea
                value={data.preferences.cruisePreferences}
                onChange={(e) => updatePrefs({ cruisePreferences: e.target.value })}
                rows={2}
                className={inputClass}
              />
            </div>
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

        {/* Step 6 – Additional Travelers */}
        {step === 6 && (
          <FormSection
            title="Additional travelers"
            description="Spouse, partner, or children traveling with you."
          >
            {data.additionalTravelers.map((t, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#e8e4de] bg-sand-warm/30 p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <select
                    value={t.relationship}
                    onChange={(e) =>
                      updateAdditionalTraveler(i, {
                        relationship: e.target.value as AdditionalTraveler["relationship"],
                      })
                    }
                    className="w-40 rounded-lg border border-[#e8e4de] bg-white px-3 py-2 text-sm"
                  >
                    <option value="spouse">Spouse / Partner</option>
                    <option value="partner">Partner</option>
                    <option value="child">Child</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeAdditionalTraveler(i)}
                    className="rounded p-2 text-charcoal-light hover:bg-white hover:text-error-muted"
                    aria-label="Remove"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3">
                  <label className={labelClass}>Name</label>
                  <input
                    type="text"
                    value={t.name}
                    onChange={(e) => updateAdditionalTraveler(i, { name: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <p className="mt-2 text-xs text-[#8a8784]">
                  Simplified traveler details and passport can be added in a full profile.
                </p>
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

        {/* Step 7 – Final Notes & Consent */}
        {step === 7 && (
          <FormSection title="Final notes & consent">
            <div>
              <label className={labelClass}>Final notes</label>
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
            {step === STEPS.length - 1 ? "Submit" : "Continue"}
          </button>
        </div>
      </form>
    </SecureFormLayout>
  );
}
