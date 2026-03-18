"use client";

import { useState, useEffect } from "react";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { SettingsCard } from "@/components/settings/SettingsCard";
import { Toast } from "@/components/settings/Toast";
import {
  CURRENCIES,
  DATE_FORMATS,
  getPreferences,
  savePreferences as persistPreferences,
  type Preferences,
} from "@/lib/preferences";

const COUNTRY_CODES = ["+1", "+44", "+61", "+49", "+33", "+81", "+64"];

const inputClass =
  "w-full max-w-xs rounded-button border border-border-light bg-white px-3 py-2.5 text-charcoal focus:outline-none focus:ring-2 focus:ring-navy/15";

export default function PreferencesSettingsPage() {
  const [form, setForm] = useState<Preferences>(getPreferences());
  const [saving, setSaving] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    setForm(getPreferences());
  }, []);

  const handleChange = (field: keyof Preferences) => (
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
      persistPreferences(form);
      setToastVisible(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <SettingsPanel
        title="Preferences"
        description="System defaults for currency and date display."
      >
        <form onSubmit={handleSubmit}>
          <SettingsCard
            title="Regional & format"
            description="Currency and date display."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">
                  Currency
                </label>
                <p className="mb-1.5 text-xs text-charcoal-light">
                  Choose the currency used for budgets and opportunity values.
                </p>
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
                  Date format
                </label>
                <p className="mb-1.5 text-xs text-charcoal-light">
                  Choose how dates appear across the app.
                </p>
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
