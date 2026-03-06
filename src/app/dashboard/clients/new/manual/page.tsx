"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  UserCircle,
  Send,
  Plus,
  Trash2,
  Lock,
  Check,
  X,
} from "lucide-react";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { SecureClientFormsSection } from "@/components/SecureClientFormsSection";
import type {
  QuickCreateData,
  ManualTraveller,
  ManualClientProfile,
  SpecialDateEntry,
  LoyaltyProgramEntry,
  PaymentMethodEntry,
} from "@/types/client-manual";
import type { TravelerDetailsStep, EmergencyContactStep, HealthStep } from "@/types/client-manual";
import type { ManualTravelPreferences } from "@/types/client-manual";

const SUGGESTED_TAGS = ["VIP", "Returning Client", "Honeymoon", "Family", "Corporate", "Group"];
/** Relationship options for additional travellers only (no Self). */
const ADDITIONAL_RELATIONSHIP_OPTIONS: {
  value: Exclude<ManualTraveller["relationship"], "self">;
  label: string;
}[] = [
  { value: "spouse", label: "Spouse" },
  { value: "partner", label: "Partner" },
  { value: "child", label: "Child" },
  { value: "parent", label: "Parent" },
  { value: "friend", label: "Friend" },
  { value: "other", label: "Other" },
];
const GENDER_OPTIONS = ["", "Female", "Male", "Non-binary", "Prefer not to say"];
const PASSPORT_TYPES = ["", "Regular", "Official", "Diplomatic"];
const LOYALTY_PROGRAM_TYPES: { value: LoyaltyProgramEntry["programType"]; label: string }[] = [
  { value: "airline", label: "Airline" },
  { value: "hotel", label: "Hotel" },
  { value: "car", label: "Car" },
  { value: "cruise", label: "Cruise" },
  { value: "other", label: "Other" },
];

const inputClass =
  "w-full rounded-button border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder:text-charcoal-light focus:outline-none focus:ring-2 focus:ring-navy/15";
const labelClass = "mb-1.5 block text-sm font-medium text-charcoal";

function emptyQuickCreate(): QuickCreateData {
  return {
    legalFirstName: "",
    legalLastName: "",
    middleName: "",
    email: "",
    phone: "",
    tags: [],
  };
}

function emptyCoreIdentity(clientName: { first: string; last: string; middle: string }): TravelerDetailsStep & { tags: string[] } {
  return {
    legalFirstName: clientName.first,
    legalLastName: clientName.last,
    middleName: clientName.middle,
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    dateOfBirth: "",
    gender: "",
    tags: [],
  };
}

function emptyTraveller(
  options: true | { relationship: Exclude<ManualTraveller["relationship"], "self"> } = { relationship: "spouse" }
): ManualTraveller {
  const isPrimary = options === true;
  const relationship = isPrimary ? "self" : options.relationship;
  return {
    id: crypto.randomUUID?.() ?? `t-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    firstName: "",
    middleName: "",
    lastName: "",
    relationship,
    dateOfBirth: "",
    gender: "",
    passport: {
      hasPassport: false,
      passportNumber: "",
      issuingCountry: "",
      issueDate: "",
      expiryDate: "",
      passportType: "",
      knownTravelerNumber: "",
    },
  };
}

function emptyProfile(createdName: { first: string; last: string; middle: string }): ManualClientProfile {
  return {
    coreIdentity: emptyCoreIdentity(createdName),
    travellers: [emptyTraveller(true)],
    emergencyContact: { name: "", phone: "", email: "", relationship: "" },
    travelPreferences: {
      generalStyle: "",
      airPreferences: "",
      accommodationPreferences: "",
      cruisePreferences: "",
      seatPreference: "",
      roomPreference: "",
      transferPreference: "",
      specialRequests: "",
    },
    health: { mobilityAssistance: false, dietaryRestrictions: false, medicalNotes: "" },
    specialDates: {
      birthday: "",
      anniversary: "",
      customDates: [],
      passportExpiryReminderActive: false,
    },
    loyaltyPrograms: [],
    paymentMethods: [],
    advisorNotes: "",
    consent: {
      consentGiven: false,
      consentTimestamp: "",
      marketingOptIn: false,
      profileCompletedDate: "",
    },
  };
}

export default function AddClientManualPage() {
  const [stage, setStage] = useState<1 | 2>(1);
  const [createdClientName, setCreatedClientName] = useState<string | null>(null);
  const [quickCreate, setQuickCreate] = useState<QuickCreateData>(emptyQuickCreate());
  const [profile, setProfile] = useState<ManualClientProfile | null>(null);
  const [profileFormModalOpen, setProfileFormModalOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    core: true,
    travellers: true,
    passport: false,
    emergency: false,
    preferences: false,
    health: false,
    specialDates: false,
    loyalty: false,
    payment: false,
    advisorNotes: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleQuickCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const first = quickCreate.legalFirstName.trim();
    const last = quickCreate.legalLastName.trim();
    if (!first || !last) return;
    const middle = quickCreate.middleName.trim();
    const name = [first, middle, last].filter(Boolean).join(" ");
    setCreatedClientName(name);
    const initial = emptyProfile({ first, last, middle });
    initial.coreIdentity.email = quickCreate.email.trim();
    initial.coreIdentity.phone = quickCreate.phone.trim();
    initial.coreIdentity.tags = [...quickCreate.tags];
    setProfile(initial);
    setStage(2);
  };

  const goToCompleteProfile = () => {
    setOpenSections((prev) => ({ ...prev, core: true }));
    setTimeout(() => {
      document.getElementById("complete-profile-address")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  };

  const updateQuickCreate = (patch: Partial<QuickCreateData>) => {
    setQuickCreate((prev) => ({ ...prev, ...patch }));
  };

  const addTag = (tag: string) => {
    if (!tag.trim() || quickCreate.tags.includes(tag.trim())) return;
    setQuickCreate((prev) => ({ ...prev, tags: [...prev.tags, tag.trim()] }));
  };

  const removeTag = (tag: string) => {
    setQuickCreate((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const updateProfile = useCallback(
    (patch: Partial<ManualClientProfile>) => {
      setProfile((prev) => (prev ? { ...prev, ...patch } : null));
    },
    []
  );

  const updateCore = (patch: Partial<ManualClientProfile["coreIdentity"]>) => {
    setProfile((prev) =>
      prev ? { ...prev, coreIdentity: { ...prev.coreIdentity, ...patch } } : null
    );
  };

  const updateTraveller = (index: number, patch: Partial<ManualTraveller>) => {
    setProfile((prev) => {
      if (!prev) return prev;
      const next = [...prev.travellers];
      next[index] = { ...next[index], ...patch };
      return { ...prev, travellers: next };
    });
  };

  const updateTravellerPassport = (travellerIndex: number, patch: Partial<ManualTraveller["passport"]>) => {
    setProfile((prev) => {
      if (!prev) return prev;
      const next = [...prev.travellers];
      next[travellerIndex] = {
        ...next[travellerIndex],
        passport: { ...next[travellerIndex].passport, ...patch },
      };
      return { ...prev, travellers: next };
    });
  };

  const addAdditionalTraveller = (
    relationship: Exclude<ManualTraveller["relationship"], "self">
  ) => {
    setProfile((prev) =>
      prev
        ? { ...prev, travellers: [...prev.travellers, emptyTraveller({ relationship })] }
        : null
    );
  };

  const removeTraveller = (index: number) => {
    if (index === 0) return; // cannot remove main traveller
    setProfile((prev) =>
      prev ? { ...prev, travellers: prev.travellers.filter((_, i) => i !== index) } : null
    );
  };

  const addSpecialDate = () => {
    setProfile((prev) => {
      if (!prev) return prev;
      const newEntry: SpecialDateEntry = {
        id: crypto.randomUUID?.() ?? `d-${Date.now()}`,
        label: "",
        value: "",
        createReminder: true,
      };
      return {
        ...prev,
        specialDates: {
          ...prev.specialDates,
          customDates: [...prev.specialDates.customDates, newEntry],
        },
      };
    });
  };

  const updateSpecialDate = (index: number, patch: Partial<SpecialDateEntry>) => {
    setProfile((prev) => {
      if (!prev) return prev;
      const next = [...prev.specialDates.customDates];
      next[index] = { ...next[index], ...patch };
      return { ...prev, specialDates: { ...prev.specialDates, customDates: next } };
    });
  };

  const removeSpecialDate = (index: number) => {
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            specialDates: {
              ...prev.specialDates,
              customDates: prev.specialDates.customDates.filter((_, i) => i !== index),
            },
          }
        : null
    );
  };

  const addLoyaltyProgram = () => {
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            loyaltyPrograms: [
              ...prev.loyaltyPrograms,
              {
                id: crypto.randomUUID?.() ?? `l-${Date.now()}`,
                programType: "airline",
                programName: "",
                membershipNumber: "",
                tier: "",
              },
            ],
          }
        : null
    );
  };

  const updateLoyaltyProgram = (index: number, patch: Partial<LoyaltyProgramEntry>) => {
    setProfile((prev) => {
      if (!prev) return prev;
      const next = [...prev.loyaltyPrograms];
      next[index] = { ...next[index], ...patch };
      return { ...prev, loyaltyPrograms: next };
    });
  };

  const removeLoyaltyProgram = (index: number) => {
    setProfile((prev) =>
      prev ? { ...prev, loyaltyPrograms: prev.loyaltyPrograms.filter((_, i) => i !== index) } : null
    );
  };

  const addPaymentMethod = () => {
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            paymentMethods: [
              ...prev.paymentMethods,
              {
                id: crypto.randomUUID?.() ?? `p-${Date.now()}`,
                cardNickname: "",
                cardholderName: "",
                last4: "",
                expiryDate: "",
                notes: "",
                storedSecurelyWithAdvisor: false,
              },
            ],
          }
        : null
    );
  };

  const updatePaymentMethod = (index: number, patch: Partial<PaymentMethodEntry>) => {
    setProfile((prev) => {
      if (!prev) return prev;
      const next = [...prev.paymentMethods];
      next[index] = { ...next[index], ...patch };
      return { ...prev, paymentMethods: next };
    });
  };

  const removePaymentMethod = (index: number) => {
    setProfile((prev) =>
      prev ? { ...prev, paymentMethods: prev.paymentMethods.filter((_, i) => i !== index) } : null
    );
  };

  const handleSaveProfile = () => {
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            consent: {
              ...prev.consent,
              consentTimestamp: prev.consent.consentTimestamp || new Date().toISOString(),
              profileCompletedDate: new Date().toISOString().slice(0, 10),
            },
          }
        : null
    );
    // TODO: POST to API; then redirect or show toast
  };

  const handleSaveAndExit = () => {
    handleSaveProfile();
    // TODO: redirect to /dashboard/clients
  };

  if (stage === 1) {
    return (
      <div className="mx-auto max-w-2xl">
        <Link
          href="/dashboard/clients/new"
          className="mb-6 inline-flex items-center gap-2 text-sm text-charcoal-light transition-colors hover:text-charcoal"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          Back to options
        </Link>

        <h1 className="text-2xl font-semibold tracking-tight text-charcoal">Add Client</h1>

        <form onSubmit={handleQuickCreate} className="mt-8">
          <div className="rounded-card border border-border-light bg-white p-6 shadow-soft">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Legal First Name *</label>
                <input
                  type="text"
                  required
                  value={quickCreate.legalFirstName}
                  onChange={(e) => updateQuickCreate({ legalFirstName: e.target.value })}
                  className={inputClass}
                  placeholder="e.g. Emma"
                />
              </div>
              <div>
                <label className={labelClass}>Legal Last Name *</label>
                <input
                  type="text"
                  required
                  value={quickCreate.legalLastName}
                  onChange={(e) => updateQuickCreate({ legalLastName: e.target.value })}
                  className={inputClass}
                  placeholder="e.g. Johnson"
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Middle Name</label>
                <input
                  type="text"
                  value={quickCreate.middleName}
                  onChange={(e) => updateQuickCreate({ middleName: e.target.value })}
                  className={inputClass}
                  placeholder="Optional"
                />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  value={quickCreate.email}
                  onChange={(e) => updateQuickCreate({ email: e.target.value })}
                  className={inputClass}
                  placeholder="client@example.com"
                />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input
                  type="tel"
                  value={quickCreate.phone}
                  onChange={(e) => updateQuickCreate({ phone: e.target.value })}
                  className={inputClass}
                  placeholder="+1 555 000 0000"
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Client Tags</label>
                <div className="flex flex-wrap gap-2 rounded-button border border-border-light bg-white p-2.5">
                  {quickCreate.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full bg-charcoal-light/10 px-3 py-1 text-sm text-charcoal"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="rounded-full p-0.5 hover:bg-charcoal-light/20"
                        aria-label={`Remove ${tag}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    className="min-w-[120px] flex-1 border-0 bg-transparent px-1 py-0.5 text-sm focus:ring-0"
                    placeholder="Add or select…"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = "";
                      }
                    }}
                  />
                </div>
                <p className="mt-1.5 text-xs text-charcoal-light">Suggested:</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {SUGGESTED_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => addTag(tag)}
                      className="rounded-full border border-border-light bg-white px-2.5 py-1 text-xs text-charcoal-light transition-colors hover:border-charcoal-light hover:text-charcoal"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-button bg-navy px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-dark"
              >
                Create Client
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  // Stage 2 – Complete Profile
  if (!profile || !createdClientName) return null;

  return (
    <div className="mx-auto max-w-3xl pb-24">
      <Link
        href="/dashboard/clients/new"
        className="mb-6 inline-flex items-center gap-2 text-sm text-charcoal-light transition-colors hover:text-charcoal"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
        Back to options
      </Link>

      <div className="mb-2 flex items-center gap-2 rounded-lg border border-success/20 bg-success/5 px-4 py-3 text-success-muted">
        <Check className="h-5 w-5 flex-shrink-0" strokeWidth={1.5} />
        <span className="font-medium">{createdClientName} created successfully.</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={goToCompleteProfile}
          className="inline-flex items-center gap-2 rounded-button border border-border-light bg-white px-4 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-sand-warm"
        >
          <UserCircle className="h-4 w-4" strokeWidth={1.5} />
          Complete Profile Manually
        </button>
        <button
          type="button"
          onClick={() => setProfileFormModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-button border border-border-light bg-white px-4 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-sand-warm"
        >
          <Send className="h-4 w-4" strokeWidth={1.5} />
          Send Secure Client Profile Form
        </button>
      </div>

      {/* Same modal as client page: Send Intake > Generate Client Profile Link */}
      {profileFormModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="send-intake-modal-title"
        >
          <div
            className="absolute inset-0 bg-charcoal/40"
            onClick={() => setProfileFormModalOpen(false)}
            aria-hidden="true"
          />
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-border-light bg-sand p-6 shadow-soft-xl">
            <div className="absolute right-4 top-4">
              <button
                type="button"
                onClick={() => setProfileFormModalOpen(false)}
                className="rounded-button p-2 text-charcoal-light hover:bg-sand-warm hover:text-charcoal"
                aria-label="Close"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <div id="send-intake-modal-title" className="sr-only">
              Secure Client Forms
            </div>
            <SecureClientFormsSection
              clientId={createdClientName.toLowerCase().replace(/\s+/g, "-")}
            />
          </div>
        </div>
      )}

      <h1 className="mt-10 text-2xl font-semibold tracking-tight text-charcoal">
        Complete {createdClientName}&apos;s Profile
      </h1>
      <p className="mt-1.5 text-charcoal-light">
        Add preferences, memberships, and documents to personalise future trips.
      </p>

      <div className="mt-8 space-y-4">
        {/* 1. Core Identity */}
        <CollapsibleSection
          title="Core Identity"
          open={openSections.core}
          onToggle={() => toggleSection("core")}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Legal First Name</label>
              <input
                type="text"
                value={profile.coreIdentity.legalFirstName}
                onChange={(e) => updateCore({ legalFirstName: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Middle Name</label>
              <input
                type="text"
                value={profile.coreIdentity.middleName}
                onChange={(e) => updateCore({ middleName: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Legal Last Name</label>
              <input
                type="text"
                value={profile.coreIdentity.legalLastName}
                onChange={(e) => updateCore({ legalLastName: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                value={profile.coreIdentity.email}
                onChange={(e) => updateCore({ email: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input
                type="tel"
                value={profile.coreIdentity.phone}
                onChange={(e) => updateCore({ phone: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Date of Birth</label>
              <input
                type="date"
                value={profile.coreIdentity.dateOfBirth}
                onChange={(e) => updateCore({ dateOfBirth: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Gender</label>
              <select
                value={profile.coreIdentity.gender}
                onChange={(e) => updateCore({ gender: e.target.value })}
                className={inputClass}
              >
                {GENDER_OPTIONS.map((g) => (
                  <option key={g || "blank"} value={g}>
                    {g || "Select…"}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 space-y-4">
            <div id="complete-profile-address">
              <label className={labelClass}>Street Address</label>
              <input
                type="text"
                value={profile.coreIdentity.streetAddress}
                onChange={(e) => updateCore({ streetAddress: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className={labelClass}>City</label>
                <input
                  type="text"
                  value={profile.coreIdentity.city}
                  onChange={(e) => updateCore({ city: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>State</label>
                <input
                  type="text"
                  value={profile.coreIdentity.state}
                  onChange={(e) => updateCore({ state: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Postal Code</label>
                <input
                  type="text"
                  value={profile.coreIdentity.postalCode}
                  onChange={(e) => updateCore({ postalCode: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Country</label>
              <input
                type="text"
                value={profile.coreIdentity.country}
                onChange={(e) => updateCore({ country: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Client Tags</label>
              <div className="flex flex-wrap gap-2 rounded-button border border-border-light bg-white p-2.5">
                {profile.coreIdentity.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-charcoal-light/10 px-3 py-1 text-sm text-charcoal"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() =>
                        updateCore({ tags: profile.coreIdentity.tags.filter((t) => t !== tag) })
                      }
                      className="rounded-full p-0.5 hover:bg-charcoal-light/20"
                      aria-label={`Remove ${tag}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  className="min-w-[120px] flex-1 border-0 bg-transparent px-1 py-0.5 text-sm focus:ring-0"
                  placeholder="Add or select…"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const val = (e.target as HTMLInputElement).value.trim();
                      if (val && !profile.coreIdentity.tags.includes(val)) {
                        updateCore({ tags: [...profile.coreIdentity.tags, val] });
                        (e.target as HTMLInputElement).value = "";
                      }
                    }
                  }}
                />
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {SUGGESTED_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      if (!profile.coreIdentity.tags.includes(tag)) {
                        updateCore({ tags: [...profile.coreIdentity.tags, tag] });
                      }
                    }}
                    className="rounded-full border border-border-light bg-white px-2.5 py-1 text-xs text-charcoal-light hover:border-charcoal-light hover:text-charcoal"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* 2. Travellers */}
        <CollapsibleSection
          title="Travellers"
          subtext={`${profile.coreIdentity.legalFirstName || "The client"} is the main traveller. Add anyone else who may travel with them.`}
          open={openSections.travellers}
          onToggle={() => toggleSection("travellers")}
        >
          <div className="space-y-6">
            {/* Main Traveller – name from client, only DOB / Gender / Passport */}
            {profile.travellers[0] && (
              <div className="rounded-lg border-2 border-navy/15 bg-sand-warm/50 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-full bg-navy/10 px-2.5 py-0.5 text-xs font-semibold text-navy">
                    Main Traveller
                  </span>
                </div>
                <p className="mb-4 text-base font-medium text-charcoal">
                  {[profile.coreIdentity.legalFirstName, profile.coreIdentity.middleName, profile.coreIdentity.legalLastName]
                    .filter(Boolean)
                    .join(" ") || "—"}
                </p>
                <p className="mb-4 text-xs text-charcoal-light">
                  Name is from Client Details. Update it in Core Identity above if needed.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Date of Birth</label>
                    <input
                      type="date"
                      value={profile.travellers[0].dateOfBirth}
                      onChange={(e) => updateTraveller(0, { dateOfBirth: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Gender</label>
                    <select
                      value={profile.travellers[0].gender}
                      onChange={(e) => updateTraveller(0, { gender: e.target.value })}
                      className={inputClass}
                    >
                      {GENDER_OPTIONS.map((g) => (
                        <option key={g || "blank"} value={g}>
                          {g || "Select…"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-4 border-t border-border-light/60 pt-4">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-charcoal">
                    <input
                      type="checkbox"
                      checked={profile.travellers[0].passport.hasPassport}
                      onChange={(e) =>
                        updateTravellerPassport(0, { hasPassport: e.target.checked })
                      }
                      className="rounded border-border-light text-navy"
                    />
                    I have passport details to add
                  </label>
                  {profile.travellers[0].passport.hasPassport && (
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className={labelClass}>Passport Number</label>
                        <input
                          type="text"
                          value={profile.travellers[0].passport.passportNumber}
                          onChange={(e) =>
                            updateTravellerPassport(0, { passportNumber: e.target.value })
                          }
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Issuing Country</label>
                        <input
                          type="text"
                          value={profile.travellers[0].passport.issuingCountry}
                          onChange={(e) =>
                            updateTravellerPassport(0, { issuingCountry: e.target.value })
                          }
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Issue Date</label>
                        <input
                          type="date"
                          value={profile.travellers[0].passport.issueDate}
                          onChange={(e) =>
                            updateTravellerPassport(0, { issueDate: e.target.value })
                          }
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Expiry Date</label>
                        <input
                          type="date"
                          value={profile.travellers[0].passport.expiryDate}
                          onChange={(e) =>
                            updateTravellerPassport(0, { expiryDate: e.target.value })
                          }
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Passport Type</label>
                        <select
                          value={profile.travellers[0].passport.passportType}
                          onChange={(e) =>
                            updateTravellerPassport(0, { passportType: e.target.value })
                          }
                          className={inputClass}
                        >
                          {PASSPORT_TYPES.map((p) => (
                            <option key={p || "blank"} value={p}>
                              {p || "Select…"}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Known Traveler Number (optional)</label>
                        <input
                          type="text"
                          value={profile.travellers[0].passport.knownTravelerNumber}
                          onChange={(e) =>
                            updateTravellerPassport(0, { knownTravelerNumber: e.target.value })
                          }
                          className={inputClass}
                          placeholder="e.g. TSA PreCheck"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className={labelClass}>Upload Passport Scan (optional)</label>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          className={inputClass}
                          onChange={() => {}}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Additional Travellers */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-charcoal">Additional Travellers</h3>
              <div className="mb-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => addAdditionalTraveller("spouse")}
                  className="inline-flex items-center gap-2 rounded-button border border-dashed border-border-light bg-white px-3 py-2 text-sm font-medium text-charcoal hover:bg-sand-warm/50"
                >
                  <Plus className="h-4 w-4" />
                  Add Spouse/Partner
                </button>
                <button
                  type="button"
                  onClick={() => addAdditionalTraveller("child")}
                  className="inline-flex items-center gap-2 rounded-button border border-dashed border-border-light bg-white px-3 py-2 text-sm font-medium text-charcoal hover:bg-sand-warm/50"
                >
                  <Plus className="h-4 w-4" />
                  Add Child
                </button>
                <button
                  type="button"
                  onClick={() => addAdditionalTraveller("other")}
                  className="inline-flex items-center gap-2 rounded-button border border-dashed border-border-light bg-white px-3 py-2 text-sm font-medium text-charcoal hover:bg-sand-warm/50"
                >
                  <Plus className="h-4 w-4" />
                  Add Traveller
                </button>
              </div>
              {profile.travellers.slice(1).map((t, idx) => {
                const i = idx + 1;
                return (
                  <div
                    key={t.id}
                    className="mb-4 rounded-lg border border-border-light bg-sand-warm/30 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-medium text-charcoal">
                        Additional traveller
                      </span>
                      <button
                        type="button"
                        onClick={() => removeTraveller(i)}
                        className="rounded p-1.5 text-charcoal-light hover:bg-white hover:text-error-muted"
                        aria-label="Remove traveller"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className={labelClass}>First Name</label>
                        <input
                          type="text"
                          value={t.firstName}
                          onChange={(e) => updateTraveller(i, { firstName: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>
                          Middle Name <span className="text-charcoal-light">(optional)</span>
                        </label>
                        <input
                          type="text"
                          value={t.middleName}
                          onChange={(e) => updateTraveller(i, { middleName: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Last Name</label>
                        <input
                          type="text"
                          value={t.lastName}
                          onChange={(e) => updateTraveller(i, { lastName: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Relationship</label>
                        <select
                          value={t.relationship}
                          onChange={(e) =>
                            updateTraveller(i, {
                              relationship: e.target.value as ManualTraveller["relationship"],
                            })
                          }
                          className={inputClass}
                        >
                          {ADDITIONAL_RELATIONSHIP_OPTIONS.map((r) => (
                            <option key={r.value} value={r.value}>
                              {r.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>
                          Date of Birth <span className="text-charcoal-light">(optional)</span>
                        </label>
                        <input
                          type="date"
                          value={t.dateOfBirth}
                          onChange={(e) => updateTraveller(i, { dateOfBirth: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>
                          Gender <span className="text-charcoal-light">(optional)</span>
                        </label>
                        <select
                          value={t.gender}
                          onChange={(e) => updateTraveller(i, { gender: e.target.value })}
                          className={inputClass}
                        >
                          {GENDER_OPTIONS.map((g) => (
                            <option key={g || "blank"} value={g}>
                              {g || "Select…"}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="mt-4 border-t border-border-light/60 pt-4">
                      <label className="flex cursor-pointer items-center gap-2 text-sm text-charcoal">
                        <input
                          type="checkbox"
                          checked={t.passport.hasPassport}
                          onChange={(e) =>
                            updateTravellerPassport(i, { hasPassport: e.target.checked })
                          }
                          className="rounded border-border-light text-navy"
                        />
                        I have passport details to add
                      </label>
                      {t.passport.hasPassport && (
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className={labelClass}>Passport Number</label>
                            <input
                              type="text"
                              value={t.passport.passportNumber}
                              onChange={(e) =>
                                updateTravellerPassport(i, { passportNumber: e.target.value })
                              }
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Issuing Country</label>
                            <input
                              type="text"
                              value={t.passport.issuingCountry}
                              onChange={(e) =>
                                updateTravellerPassport(i, { issuingCountry: e.target.value })
                              }
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Issue Date</label>
                            <input
                              type="date"
                              value={t.passport.issueDate}
                              onChange={(e) =>
                                updateTravellerPassport(i, { issueDate: e.target.value })
                              }
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Expiry Date</label>
                            <input
                              type="date"
                              value={t.passport.expiryDate}
                              onChange={(e) =>
                                updateTravellerPassport(i, { expiryDate: e.target.value })
                              }
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Passport Type</label>
                            <select
                              value={t.passport.passportType}
                              onChange={(e) =>
                                updateTravellerPassport(i, { passportType: e.target.value })
                              }
                              className={inputClass}
                            >
                              {PASSPORT_TYPES.map((p) => (
                                <option key={p || "blank"} value={p}>
                                  {p || "Select…"}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className={labelClass}>Known Traveler Number (optional)</label>
                            <input
                              type="text"
                              value={t.passport.knownTravelerNumber}
                              onChange={(e) =>
                                updateTravellerPassport(i, { knownTravelerNumber: e.target.value })
                              }
                              className={inputClass}
                              placeholder="e.g. TSA PreCheck"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className={labelClass}>Upload Passport Scan (optional)</label>
                            <input
                              type="file"
                              accept="image/*,.pdf"
                              className={inputClass}
                              onChange={() => {}}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CollapsibleSection>

        {/* 3. Passport - already inside travellers; this section can show "Passport expiry reminder active" if any traveller has expiry */}
        {profile.travellers.some((t) => t.passport.hasPassport && t.passport.expiryDate) && (
          <div className="rounded-card border border-border-light bg-white px-5 py-3 shadow-soft text-sm text-charcoal-light">
            Passport expiry reminder active for traveller(s) with expiry date set.
          </div>
        )}

        {/* 4. Emergency Contact */}
        <CollapsibleSection
          title="Emergency Contact"
          open={openSections.emergency}
          onToggle={() => toggleSection("emergency")}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass}>Full Name</label>
              <input
                type="text"
                value={profile.emergencyContact.name}
                onChange={(e) =>
                  updateProfile({
                    emergencyContact: { ...profile.emergencyContact, name: e.target.value },
                  })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Relationship</label>
              <input
                type="text"
                value={profile.emergencyContact.relationship}
                onChange={(e) =>
                  updateProfile({
                    emergencyContact: { ...profile.emergencyContact, relationship: e.target.value },
                  })
                }
                className={inputClass}
                placeholder="e.g. Spouse, Parent"
              />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input
                type="tel"
                value={profile.emergencyContact.phone}
                onChange={(e) =>
                  updateProfile({
                    emergencyContact: { ...profile.emergencyContact, phone: e.target.value },
                  })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                value={profile.emergencyContact.email}
                onChange={(e) =>
                  updateProfile({
                    emergencyContact: { ...profile.emergencyContact, email: e.target.value },
                  })
                }
                className={inputClass}
              />
            </div>
          </div>
        </CollapsibleSection>

        {/* 5. Travel Preferences */}
        <CollapsibleSection
          title="Travel Preferences"
          subtext="Structured and free text. All optional."
          open={openSections.preferences}
          onToggle={() => toggleSection("preferences")}
        >
          <div className="space-y-4">
            <div>
              <label className={labelClass}>General Travel Style</label>
              <textarea
                value={profile.travelPreferences.generalStyle}
                onChange={(e) =>
                  updateProfile({
                    travelPreferences: { ...profile.travelPreferences, generalStyle: e.target.value },
                  })
                }
                rows={2}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Air Travel Preferences</label>
              <textarea
                value={profile.travelPreferences.airPreferences}
                onChange={(e) =>
                  updateProfile({
                    travelPreferences: { ...profile.travelPreferences, airPreferences: e.target.value },
                  })
                }
                rows={2}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Accommodation Preferences</label>
              <textarea
                value={profile.travelPreferences.accommodationPreferences}
                onChange={(e) =>
                  updateProfile({
                    travelPreferences: {
                      ...profile.travelPreferences,
                      accommodationPreferences: e.target.value,
                    },
                  })
                }
                rows={2}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Cruise Preferences</label>
              <textarea
                value={profile.travelPreferences.cruisePreferences}
                onChange={(e) =>
                  updateProfile({
                    travelPreferences: {
                      ...profile.travelPreferences,
                      cruisePreferences: e.target.value,
                    },
                  })
                }
                rows={2}
                className={inputClass}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Seat Preference</label>
                <input
                  type="text"
                  value={profile.travelPreferences.seatPreference ?? ""}
                  onChange={(e) =>
                    updateProfile({
                      travelPreferences: {
                        ...profile.travelPreferences,
                        seatPreference: e.target.value,
                      },
                    })
                  }
                  className={inputClass}
                  placeholder="e.g. Aisle, window"
                />
              </div>
              <div>
                <label className={labelClass}>Room Preference</label>
                <input
                  type="text"
                  value={profile.travelPreferences.roomPreference ?? ""}
                  onChange={(e) =>
                    updateProfile({
                      travelPreferences: {
                        ...profile.travelPreferences,
                        roomPreference: e.target.value,
                      },
                    })
                  }
                  className={inputClass}
                  placeholder="e.g. High floor, quiet"
                />
              </div>
              <div>
                <label className={labelClass}>Transfer Preference</label>
                <input
                  type="text"
                  value={profile.travelPreferences.transferPreference ?? ""}
                  onChange={(e) =>
                    updateProfile({
                      travelPreferences: {
                        ...profile.travelPreferences,
                        transferPreference: e.target.value,
                      },
                    })
                  }
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Special Requests</label>
              <textarea
                value={profile.travelPreferences.specialRequests ?? ""}
                onChange={(e) =>
                  updateProfile({
                    travelPreferences: {
                      ...profile.travelPreferences,
                      specialRequests: e.target.value,
                    },
                  })
                }
                rows={2}
                className={inputClass}
              />
            </div>
          </div>
        </CollapsibleSection>

        {/* 6. Health & Assistance */}
        <CollapsibleSection
          title="Health & Assistance"
          open={openSections.health}
          onToggle={() => toggleSection("health")}
        >
          <div className="space-y-4">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-charcoal">
              <input
                type="checkbox"
                checked={profile.health.mobilityAssistance}
                onChange={(e) =>
                  updateProfile({
                    health: { ...profile.health, mobilityAssistance: e.target.checked },
                  })
                }
                className="rounded border-border-light text-navy"
              />
              Requires mobility assistance
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-charcoal">
              <input
                type="checkbox"
                checked={profile.health.dietaryRestrictions}
                onChange={(e) =>
                  updateProfile({
                    health: { ...profile.health, dietaryRestrictions: e.target.checked },
                  })
                }
                className="rounded border-border-light text-navy"
              />
              Has dietary restrictions
            </label>
            <div>
              <label className={labelClass}>Medical Notes</label>
              <textarea
                value={profile.health.medicalNotes}
                onChange={(e) =>
                  updateProfile({
                    health: { ...profile.health, medicalNotes: e.target.value },
                  })
                }
                rows={2}
                className={inputClass}
              />
            </div>
          </div>
        </CollapsibleSection>

        {/* 7. Special Dates */}
        <CollapsibleSection
          title="Special Dates"
          subtext="Birthday, anniversary, and custom dates. Toggle reminder per date."
          open={openSections.specialDates}
          onToggle={() => toggleSection("specialDates")}
        >
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Birthday</label>
                <input
                  type="text"
                  value={profile.specialDates.birthday}
                  onChange={(e) =>
                    updateProfile({
                      specialDates: { ...profile.specialDates, birthday: e.target.value },
                    })
                  }
                  className={inputClass}
                  placeholder="e.g. June 15"
                />
              </div>
              <div>
                <label className={labelClass}>Anniversary</label>
                <input
                  type="text"
                  value={profile.specialDates.anniversary}
                  onChange={(e) =>
                    updateProfile({
                      specialDates: { ...profile.specialDates, anniversary: e.target.value },
                    })
                  }
                  className={inputClass}
                  placeholder="e.g. June 15"
                />
              </div>
            </div>
            {profile.specialDates.customDates.map((d, i) => (
              <div
                key={d.id}
                className="flex flex-wrap items-end gap-3 rounded-lg border border-border-light bg-sand-warm/30 p-3"
              >
                <input
                  type="text"
                  value={d.label}
                  onChange={(e) => updateSpecialDate(i, { label: e.target.value })}
                  className="w-32 rounded-button border border-border-light bg-white px-3 py-2 text-sm"
                  placeholder="Label"
                />
                <input
                  type="text"
                  value={d.value}
                  onChange={(e) => updateSpecialDate(i, { value: e.target.value })}
                  className="w-36 rounded-button border border-border-light bg-white px-3 py-2 text-sm"
                  placeholder="Date"
                />
                <label className="flex items-center gap-2 text-sm text-charcoal">
                  <input
                    type="checkbox"
                    checked={d.createReminder}
                    onChange={(e) => updateSpecialDate(i, { createReminder: e.target.checked })}
                    className="rounded border-border-light text-navy"
                  />
                  Create Reminder
                </label>
                <button
                  type="button"
                  onClick={() => removeSpecialDate(i)}
                  className="rounded p-2 text-charcoal-light hover:bg-white hover:text-error-muted"
                  aria-label="Remove date"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSpecialDate}
              className="inline-flex items-center gap-2 rounded-button border border-dashed border-border-light bg-white px-3 py-2 text-sm text-charcoal hover:bg-sand-warm/50"
            >
              <Plus className="h-4 w-4" />
              Add Custom Date
            </button>
            {profile.travellers.some((t) => t.passport.hasPassport && t.passport.expiryDate) && (
              <p className="text-sm text-charcoal-light">Passport expiry reminder active.</p>
            )}
          </div>
        </CollapsibleSection>

        {/* 8. Loyalty Programs */}
        <CollapsibleSection
          title="Loyalty Programs"
          open={openSections.loyalty}
          onToggle={() => toggleSection("loyalty")}
        >
          <div className="space-y-4">
            {profile.loyaltyPrograms.map((prog, i) => (
              <div
                key={prog.id}
                className="flex flex-col gap-3 rounded-lg border border-border-light bg-sand-warm/30 p-4"
              >
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeLoyaltyProgram(i)}
                    className="rounded p-1.5 text-charcoal-light hover:text-error-muted"
                    aria-label="Remove program"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Program Type</label>
                    <select
                      value={prog.programType}
                      onChange={(e) =>
                        updateLoyaltyProgram(i, {
                          programType: e.target.value as LoyaltyProgramEntry["programType"],
                        })
                      }
                      className={inputClass}
                    >
                      {LOYALTY_PROGRAM_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Program Name</label>
                    <input
                      type="text"
                      value={prog.programName}
                      onChange={(e) => updateLoyaltyProgram(i, { programName: e.target.value })}
                      className={inputClass}
                      placeholder="e.g. United MileagePlus"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Membership Number</label>
                    <input
                      type="text"
                      value={prog.membershipNumber}
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
                      value={prog.tier}
                      onChange={(e) => updateLoyaltyProgram(i, { tier: e.target.value })}
                      className={inputClass}
                      placeholder="e.g. Platinum"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addLoyaltyProgram}
              className="inline-flex items-center gap-2 rounded-button border border-dashed border-border-light bg-white px-4 py-2.5 text-sm font-medium text-charcoal hover:bg-sand-warm/50"
            >
              <Plus className="h-4 w-4" />
              Add Loyalty Program
            </button>
          </div>
        </CollapsibleSection>

        {/* 9. Payment Methods – Sensitive */}
        <CollapsibleSection
          title="Sensitive Information"
          subtext="Payment method references only. No full card number or CVV stored."
          open={openSections.payment}
          onToggle={() => toggleSection("payment")}
        >
          <div className="rounded-lg border border-amber-200/60 bg-amber-50/30 p-4">
            <div className="flex items-center gap-2 text-amber-800">
              <Lock className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-sm font-medium">PCI-safe. Card stored securely with advisor.</span>
            </div>
          </div>
          <div className="mt-4 space-y-4">
            {profile.paymentMethods.map((pm, i) => (
              <div
                key={pm.id}
                className="rounded-lg border border-border-light bg-sand-warm/30 p-4"
              >
                <div className="mb-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removePaymentMethod(i)}
                    className="rounded p-1.5 text-charcoal-light hover:text-error-muted"
                    aria-label="Remove payment method"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Card Nickname</label>
                    <input
                      type="text"
                      value={pm.cardNickname}
                      onChange={(e) => updatePaymentMethod(i, { cardNickname: e.target.value })}
                      className={inputClass}
                      placeholder="e.g. Amex Platinum"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Cardholder Name</label>
                    <input
                      type="text"
                      value={pm.cardholderName}
                      onChange={(e) => updatePaymentMethod(i, { cardholderName: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Last 4 Digits</label>
                    <input
                      type="text"
                      maxLength={4}
                      value={pm.last4}
                      onChange={(e) =>
                        updatePaymentMethod(i, {
                          last4: e.target.value.replace(/\D/g, "").slice(0, 4),
                        })
                      }
                      className={inputClass}
                      placeholder="1234"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Expiry Date</label>
                    <input
                      type="text"
                      value={pm.expiryDate}
                      onChange={(e) => updatePaymentMethod(i, { expiryDate: e.target.value })}
                      className={inputClass}
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Notes</label>
                    <input
                      type="text"
                      value={pm.notes}
                      onChange={(e) => updatePaymentMethod(i, { notes: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-charcoal">
                      <input
                        type="checkbox"
                        checked={pm.storedSecurelyWithAdvisor}
                        onChange={(e) =>
                          updatePaymentMethod(i, {
                            storedSecurelyWithAdvisor: e.target.checked,
                          })
                        }
                        className="rounded border-border-light text-navy"
                      />
                      Card stored securely with advisor
                    </label>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addPaymentMethod}
              className="inline-flex items-center gap-2 rounded-button border border-dashed border-border-light bg-white px-4 py-2.5 text-sm font-medium text-charcoal hover:bg-sand-warm/50"
            >
              <Plus className="h-4 w-4" />
              Add Payment Method
            </button>
          </div>
        </CollapsibleSection>

        {/* 10. Advisor Notes */}
        <CollapsibleSection
          title="Advisor Notes (Private)"
          subtext="Add insights about this client. AI will summarise key preferences."
          open={openSections.advisorNotes}
          onToggle={() => toggleSection("advisorNotes")}
        >
          <textarea
            value={profile.advisorNotes}
            onChange={(e) => updateProfile({ advisorNotes: e.target.value })}
            rows={5}
            className={inputClass}
            placeholder="Notes append to intake form data and are not overwritten."
          />
        </CollapsibleSection>

        {/* Communication Preferences – optional; consent/timestamps handled by system */}
        <div className="rounded-card border border-border-light bg-white p-5 shadow-soft">
          <h2 className="text-base font-semibold text-charcoal">Communication Preferences</h2>
          <div className="mt-4">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-charcoal">
              <input
                type="checkbox"
                checked={profile.consent.marketingOptIn}
                onChange={(e) =>
                  updateProfile({
                    consent: { ...profile.consent, marketingOptIn: e.target.checked },
                  })
                }
                className="rounded border-border-light text-navy"
              />
              Client agreed to receive travel inspiration emails
            </label>
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border-light bg-white/95 py-4 shadow-soft backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleSaveProfile}
              className="inline-flex items-center justify-center rounded-button bg-navy px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-dark"
            >
              Save Profile
            </button>
            <button
              type="button"
              onClick={handleSaveAndExit}
              className="inline-flex items-center justify-center rounded-button border border-border-light bg-white px-5 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-sand-warm"
            >
              Save & Exit
            </button>
            <Link
              href="/dashboard/clients"
              className="inline-flex items-center justify-center rounded-button border border-border-light bg-white px-5 py-2.5 text-sm font-medium text-charcoal-light transition-colors hover:bg-sand-warm hover:text-charcoal"
            >
              Skip for Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
