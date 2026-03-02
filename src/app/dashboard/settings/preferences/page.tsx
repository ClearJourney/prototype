"use client";

import { useState } from "react";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { SettingsCard } from "@/components/settings/SettingsCard";
import { Toast } from "@/components/settings/Toast";

const CURRENCIES = ["USD", "AUD", "GBP", "EUR", "CAD", "NZD"];

const TIMEZONES = [
  "America/New_York",
  "America/Los_Angeles",
  "America/Chicago",
  "America/Denver",
  "Europe/London",
  "Europe/Paris",
  "Australia/Sydney",
  "Australia/Melbourne",
  "Asia/Tokyo",
  "UTC",
];

const DATE_FORMATS = [
  { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
  { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
];

const COUNTRY_CODES = ["+1", "+44", "+61", "+49", "+33", "+81", "+64"];

// Stub: replace with API when ready
async function savePreferences(_data: PreferencesFormData): Promise<void> {
  await new Promise((r) => setTimeout(r, 500));
}

type PreferencesFormData = {
  currency: string;
  timezone: string;
  dateFormat: string;
  defaultCountryCode: string;
  defaultReminderTime: string;
  emailNewInquiry: boolean;
  emailReminders: boolean;
  emailMarketing: boolean;
};

const defaultPrefs: PreferencesFormData = {
  currency: "USD",
  timezone: "America/New_York",
  dateFormat: "MM/DD/YYYY",
  defaultCountryCode: "+1",
  defaultReminderTime: "09:00",
  emailNewInquiry: true,
  emailReminders: true,
  emailMarketing: false,
};

const inputClass =
  "w-full max-w-xs rounded-button border border-border-light bg-white px-3 py-2.5 text-charcoal focus:outline-none focus:ring-2 focus:ring-navy/15";

export default function PreferencesSettingsPage() {
  const [form, setForm] = useState<PreferencesFormData>(defaultPrefs);
  const [saving, setSaving] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleChange = (field: keyof PreferencesFormData) => (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const value =
      e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await savePreferences(form);
      setToastVisible(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <SettingsPanel
        title="Preferences"
        description="System defaults and notification preferences."
      >
        <form onSubmit={handleSubmit}>
          <SettingsCard
            title="Regional & format"
            description="Currency, timezone, and date display."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">
                  Currency
                </label>
                <select
                  value={form.currency}
                  onChange={handleChange("currency")}
                  className={inputClass}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">
                  Timezone
                </label>
                <select
                  value={form.timezone}
                  onChange={handleChange("timezone")}
                  className={inputClass}
                >
                  {TIMEZONES.map((t) => (
                    <option key={t} value={t}>
                      {t.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">
                  Date format
                </label>
                <select
                  value={form.dateFormat}
                  onChange={handleChange("dateFormat")}
                  className={inputClass}
                >
                  {DATE_FORMATS.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">
                  Default country code
                </label>
                <select
                  value={form.defaultCountryCode}
                  onChange={handleChange("defaultCountryCode")}
                  className={inputClass}
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">
                  Default reminder time
                </label>
                <input
                  type="time"
                  value={form.defaultReminderTime}
                  onChange={handleChange("defaultReminderTime")}
                  className={inputClass}
                />
              </div>
            </div>
          </SettingsCard>

          <SettingsCard
            title="Email notifications"
            description="Choose which emails you receive."
          >
            <div className="space-y-3">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.emailNewInquiry}
                  onChange={handleChange("emailNewInquiry")}
                  className="h-4 w-4 rounded border-border-light text-navy focus:ring-navy/20"
                />
                <span className="text-sm text-charcoal">New inquiry submitted</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.emailReminders}
                  onChange={handleChange("emailReminders")}
                  className="h-4 w-4 rounded border-border-light text-navy focus:ring-navy/20"
                />
                <span className="text-sm text-charcoal">Reminders</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.emailMarketing}
                  onChange={handleChange("emailMarketing")}
                  className="h-4 w-4 rounded border-border-light text-navy focus:ring-navy/20"
                />
                <span className="text-sm text-charcoal">Product updates & tips</span>
              </label>
            </div>
          </SettingsCard>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-button bg-navy px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-dark disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save Preferences"}
            </button>
          </div>
        </form>
      </SettingsPanel>
      <Toast
        message="Preferences saved"
        visible={toastVisible}
        onDismiss={() => setToastVisible(false)}
      />
    </>
  );
}
