"use client";

import { useState, useEffect } from "react";
import {
  CURRENCIES,
  DATE_FORMATS,
  getSuggestedRegionalPreferences,
  getPreferences,
  savePreferences,
  type Preferences,
} from "@/lib/preferences";

const inputClass =
  "w-full rounded-button border border-border-light bg-white px-3 py-2.5 text-charcoal focus:outline-none focus:ring-2 focus:ring-navy/15";

type Props = {
  onComplete: () => void;
};

export function RegionalPreferencesOnboarding({ onComplete }: Props) {
  const [currency, setCurrency] = useState("USD");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");

  useEffect(() => {
    const suggested = getSuggestedRegionalPreferences();
    setCurrency(suggested.currency);
    setDateFormat(suggested.dateFormat);
  }, []);

  const handleSave = () => {
    const existing = getPreferences();
    const suggested = getSuggestedRegionalPreferences();
    const prefs: Preferences = {
      ...existing,
      currency,
      dateFormat,
      timezone: suggested.timezone,
      defaultReminderTime: existing.defaultReminderTime,
    };
    savePreferences(prefs);
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/20 p-4 backdrop-blur-[2px]">
      <div
        className="w-full max-w-md rounded-card bg-white p-6 shadow-soft-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-charcoal">Regional Preferences</h2>
        <p className="mt-1 text-sm text-charcoal-light">
          Set your preferred currency and date format. You can change these anytime in Settings →
          Preferences.
        </p>

        <div className="mt-6 space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal">
              Preferred Currency
            </label>
            <p className="mb-1.5 text-xs text-charcoal-light">
              Choose the currency used for budgets and opportunity values.
            </p>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
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
              Date Format
            </label>
            <p className="mb-1.5 text-xs text-charcoal-light">
              Choose how dates appear across the app.
            </p>
            <select
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className={inputClass}
            >
              {DATE_FORMATS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-button bg-navy px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-dark"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
