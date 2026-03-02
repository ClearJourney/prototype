"use client";

import { useState } from "react";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { SettingsCard } from "@/components/settings/SettingsCard";
import { Toast } from "@/components/settings/Toast";
import { GripVertical, Plus, Trash2 } from "lucide-react";

type FormTab = "inquiry" | "profile";

type CustomQuestion = {
  id: string;
  label: string;
  type: "text" | "dropdown" | "checkbox";
  options?: string[];
  required: boolean;
};

const inputClass =
  "w-full max-w-xl rounded-button border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:ring-2 focus:ring-navy/15";

export default function IntakeFormsSettingsPage() {
  const [activeForm, setActiveForm] = useState<FormTab>("inquiry");
  const [toastVisible, setToastVisible] = useState(false);
  const [saving, setSaving] = useState(false);

  // Branding (shared)
  const [introMessage, setIntroMessage] = useState(
    "Tell us about your travel plans so we can personalize your experience."
  );
  const [thankYouMessage, setThankYouMessage] = useState(
    "Thank you for submitting your inquiry. We'll be in touch within 24 hours."
  );
  const [footerDisclosure, setFooterDisclosure] = useState(
    "Licensed travel advisor. Terms and service limitations apply. See our privacy policy."
  );

  // Inquiry: budget ranges
  const [budgetRanges, setBudgetRanges] = useState([
    "Under $3,000 per person",
    "$3,000 – $5,000 per person",
    "$5,000 – $10,000 per person",
    "$10,000 – $25,000 per person",
    "$25,000+",
  ]);
  const [inquiryToggles, setInquiryToggles] = useState({
    budget: true,
    services: true,
    referral: true,
    newsletter: true,
  });
  const [inquiryQuestions, setInquiryQuestions] = useState<CustomQuestion[]>([
    { id: "1", label: "How did you hear about us?", type: "text", required: false },
  ]);

  // Profile: section toggles
  const [profileToggles, setProfileToggles] = useState({
    passport: true,
    emergencyContact: true,
    health: true,
    specialDates: true,
    additionalTravelers: true,
  });
  const [profileQuestions, setProfileQuestions] = useState<CustomQuestion[]>([]);

  const toggleInquiry = (key: keyof typeof inquiryToggles) => {
    setInquiryToggles((p) => ({ ...p, [key]: !p[key] }));
  };
  const toggleProfile = (key: keyof typeof profileToggles) => {
    setProfileToggles((p) => ({ ...p, [key]: !p[key] }));
  };

  const addBudgetRange = () => {
    setBudgetRanges((p) => [...p, "New range"]);
  };
  const updateBudgetRange = (i: number, value: string) => {
    setBudgetRanges((p) => {
      const next = [...p];
      next[i] = value;
      return next;
    });
  };
  const removeBudgetRange = (i: number) => {
    setBudgetRanges((p) => p.filter((_, j) => j !== i));
  };

  const addQuestion = (form: FormTab) => {
    const id = String(Date.now());
    const q: CustomQuestion = { id, label: "New question", type: "text", required: false };
    if (form === "inquiry") setInquiryQuestions((p) => [...p, q]);
    else setProfileQuestions((p) => [...p, q]);
  };
  const updateQuestion = (form: FormTab, id: string, updates: Partial<CustomQuestion>) => {
    const upd = (list: CustomQuestion[]) =>
      list.map((q) => (q.id === id ? { ...q, ...updates } : q));
    if (form === "inquiry") setInquiryQuestions(upd);
    else setProfileQuestions(upd);
  };
  const removeQuestion = (form: FormTab, id: string) => {
    if (form === "inquiry")
      setInquiryQuestions((p) => p.filter((q) => q.id !== id));
    else setProfileQuestions((p) => p.filter((q) => q.id !== id));
  };
  const questions = activeForm === "inquiry" ? inquiryQuestions : profileQuestions;
  const setQuestions = activeForm === "inquiry" ? setInquiryQuestions : setProfileQuestions;

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
    setToastVisible(true);
  };

  return (
    <>
      <SettingsPanel
        title="Intake Forms"
        description="Configure the two secure client forms: Inquiry (pre-consultation) and Client Profile (traveler details)."
      >
        <div className="mb-6 flex gap-2">
          <button
            type="button"
            onClick={() => setActiveForm("inquiry")}
            className={`rounded-button px-4 py-2.5 text-sm font-medium transition-colors ${
              activeForm === "inquiry"
                ? "bg-navy text-white hover:bg-navy-dark"
                : "border border-border-light bg-white text-charcoal hover:bg-sand-warm"
            }`}
          >
            Inquiry Form
          </button>
          <button
            type="button"
            onClick={() => setActiveForm("profile")}
            className={`rounded-button px-4 py-2.5 text-sm font-medium transition-colors ${
              activeForm === "profile"
                ? "bg-navy text-white hover:bg-navy-dark"
                : "border border-border-light bg-white text-charcoal hover:bg-sand-warm"
            }`}
          >
            Client Profile Form
          </button>
        </div>

        <SettingsCard
          title="Branding & content"
          description="Logo uses your Profile logo. Edit intro, thank you, and footer text."
        >
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-charcoal">
                Intro message
              </label>
              <textarea
                value={introMessage}
                onChange={(e) => setIntroMessage(e.target.value)}
                rows={2}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-charcoal">
                Thank you message
              </label>
              <textarea
                value={thankYouMessage}
                onChange={(e) => setThankYouMessage(e.target.value)}
                rows={2}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-charcoal">
                Footer disclosure
              </label>
              <textarea
                value={footerDisclosure}
                onChange={(e) => setFooterDisclosure(e.target.value)}
                rows={2}
                className={inputClass}
                placeholder="Licensing, terms, service limitations"
              />
            </div>
          </div>
        </SettingsCard>

        {activeForm === "inquiry" && (
          <>
            <SettingsCard
              title="Inquiry Form — sections"
              description="Toggle sections on or off."
            >
              <div className="space-y-3">
                {[
                  { key: "budget" as const, label: "Budget section" },
                  { key: "services" as const, label: "Services section" },
                  { key: "referral" as const, label: "Referral tracking" },
                  { key: "newsletter" as const, label: "Newsletter opt-in" },
                ].map(({ key, label }) => (
                  <label
                    key={key}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <input
                      type="checkbox"
                      checked={inquiryToggles[key]}
                      onChange={() => toggleInquiry(key)}
                      className="h-4 w-4 rounded border-border-light text-navy focus:ring-navy/20"
                    />
                    <span className="text-sm text-charcoal">{label}</span>
                  </label>
                ))}
              </div>
            </SettingsCard>
            <SettingsCard
              title="Budget ranges"
              description="Add, edit, or remove budget brackets."
            >
              <div className="space-y-2">
                {budgetRanges.map((range, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2"
                  >
                    <span className="text-charcoal-light" aria-hidden>
                      <GripVertical className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <input
                      type="text"
                      value={range}
                      onChange={(e) => updateBudgetRange(i, e.target.value)}
                      className="flex-1 rounded-button border border-border-light bg-white px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-navy/15"
                    />
                    <button
                      type="button"
                      onClick={() => removeBudgetRange(i)}
                      className="rounded-button p-2 text-charcoal-light hover:bg-sand-warm hover:text-error-muted"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addBudgetRange}
                  className="inline-flex items-center gap-2 rounded-button border border-border-light bg-white px-3 py-2 text-sm text-charcoal hover:bg-sand-warm"
                >
                  <Plus className="h-4 w-4" strokeWidth={1.5} />
                  Add range
                </button>
              </div>
            </SettingsCard>
          </>
        )}

        {activeForm === "profile" && (
          <SettingsCard
            title="Client Profile Form — sections"
            description="Toggle sections on or off."
          >
            <div className="space-y-3">
              {[
                { key: "passport" as const, label: "Passport info" },
                { key: "emergencyContact" as const, label: "Emergency contact" },
                { key: "health" as const, label: "Health section" },
                { key: "specialDates" as const, label: "Special dates" },
                { key: "additionalTravelers" as const, label: "Additional travelers" },
              ].map(({ key, label }) => (
                <label
                  key={key}
                  className="flex cursor-pointer items-center gap-3"
                >
                  <input
                    type="checkbox"
                    checked={profileToggles[key]}
                    onChange={() => toggleProfile(key)}
                    className="h-4 w-4 rounded border-border-light text-navy focus:ring-navy/20"
                  />
                  <span className="text-sm text-charcoal">{label}</span>
                </label>
              ))}
            </div>
          </SettingsCard>
        )}

        <SettingsCard
          title="Custom questions"
          description="Add questions (Text, Dropdown, or Checkbox). Reorder and set required/optional."
        >
          <div className="space-y-4">
            {questions.map((q) => (
              <div
                key={q.id}
                className="flex items-start gap-2 rounded-button border border-border-light bg-sand-warm/30 p-3"
              >
                <span className="pt-2.5 text-charcoal-light" aria-hidden>
                  <GripVertical className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <div className="min-w-0 flex-1 space-y-2">
                  <input
                    type="text"
                    value={q.label}
                    onChange={(e) =>
                      updateQuestion(activeForm, q.id, { label: e.target.value })
                    }
                    placeholder="Question label"
                    className="w-full rounded-button border border-border-light bg-white px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-navy/15"
                  />
                  <div className="flex flex-wrap items-center gap-4">
                    <select
                      value={q.type}
                      onChange={(e) =>
                        updateQuestion(activeForm, q.id, {
                          type: e.target.value as CustomQuestion["type"],
                        })
                      }
                      className="rounded-button border border-border-light bg-white px-3 py-1.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-navy/15"
                    >
                      <option value="text">Text</option>
                      <option value="dropdown">Dropdown</option>
                      <option value="checkbox">Checkbox</option>
                    </select>
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-charcoal">
                      <input
                        type="checkbox"
                        checked={q.required}
                        onChange={(e) =>
                          updateQuestion(activeForm, q.id, {
                            required: e.target.checked,
                          })
                        }
                        className="h-4 w-4 rounded border-border-light text-navy focus:ring-navy/20"
                      />
                      Required
                    </label>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeQuestion(activeForm, q.id)}
                  className="rounded-button p-2 text-charcoal-light hover:bg-white hover:text-error-muted"
                  aria-label="Remove question"
                >
                  <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addQuestion(activeForm)}
              className="inline-flex items-center gap-2 rounded-button border border-border-light bg-white px-4 py-2.5 text-sm font-medium text-charcoal hover:bg-sand-warm"
            >
              <Plus className="h-4 w-4" strokeWidth={1.5} />
              Add question
            </button>
          </div>
        </SettingsCard>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-button bg-navy px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-dark disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save form settings"}
          </button>
        </div>
      </SettingsPanel>
      <Toast
        message="Intake form settings saved"
        visible={toastVisible}
        onDismiss={() => setToastVisible(false)}
      />
    </>
  );
}
