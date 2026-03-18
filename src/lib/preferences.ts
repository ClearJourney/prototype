/**
 * User preferences – single source of truth for regional & format settings.
 * Persisted in localStorage; used by Settings → Preferences and across the app.
 */

const STORAGE_KEY = "clear-journey-preferences";

export const CURRENCIES = ["USD", "AUD", "GBP", "EUR", "CAD", "NZD"] as const;
export type Currency = (typeof CURRENCIES)[number];

export const TIMEZONES = [
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
] as const;

export const DATE_FORMATS = [
  { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
  { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
] as const;
export type DateFormat = "DD/MM/YYYY" | "MM/DD/YYYY";

export type RegionalPreferences = {
  currency: string;
  timezone: string;
  dateFormat: string;
  defaultReminderTime: string;
};

const DEFAULT_REGIONAL: RegionalPreferences = {
  currency: "USD",
  timezone: "America/New_York",
  dateFormat: "MM/DD/YYYY",
  defaultReminderTime: "09:00",
};

export type Preferences = RegionalPreferences & {
  defaultCountryCode: string;
  emailNewInquiry: boolean;
  emailReminders: boolean;
  emailMarketing: boolean;
};

const DEFAULT_PREFERENCES: Preferences = {
  ...DEFAULT_REGIONAL,
  defaultCountryCode: "+1",
  emailNewInquiry: true,
  emailReminders: true,
  emailMarketing: false,
};

function parseStored(data: string | null): Preferences | null {
  if (!data) return null;
  try {
    const parsed = JSON.parse(data) as Partial<Preferences>;
    if (!parsed || typeof parsed !== "object") return null;
    return { ...DEFAULT_PREFERENCES, ...parsed };
  } catch {
    return null;
  }
}

/** True if the user has ever saved preferences (e.g. from onboarding or Settings). */
export function hasSavedPreferences(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(STORAGE_KEY) !== null;
}

/** Load preferences from storage. Returns defaults if none saved; uses browser-detected timezone (and suggested regional prefs) when no storage. */
export function getPreferences(): Preferences {
  if (typeof window === "undefined") return DEFAULT_PREFERENCES;
  const stored = localStorage.getItem(STORAGE_KEY);
  const parsed = parseStored(stored);
  if (parsed) return parsed;
  return { ...DEFAULT_PREFERENCES, ...getSuggestedRegionalPreferences() };
}

/** Load only regional preferences (for components that don't need email/country). */
export function getRegionalPreferences(): RegionalPreferences {
  const prefs = getPreferences();
  return {
    currency: prefs.currency,
    timezone: prefs.timezone,
    dateFormat: prefs.dateFormat,
    defaultReminderTime: prefs.defaultReminderTime,
  };
}

/** Persist full preferences to storage. */
export function savePreferences(data: Preferences): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/** Return date placeholder string based on date format preference. */
export function getDatePlaceholder(dateFormat: string): string {
  return dateFormat === "DD/MM/YYYY" ? "dd/mm/yyyy" : "mm/dd/yyyy";
}

/** Suggest initial regional preferences from browser (for onboarding). */
export function getSuggestedRegionalPreferences(): RegionalPreferences {
  if (typeof window === "undefined") return DEFAULT_REGIONAL;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? DEFAULT_REGIONAL.timezone;
  const locale = navigator.language ?? "en-US";
  const isDDMM = /^en-GB|^de|^fr|^es|^it|^au/i.test(locale) || locale.includes("GB");
  return {
    currency: inferCurrencyFromLocale(locale),
    timezone: (TIMEZONES as readonly string[]).includes(tz) ? tz : DEFAULT_REGIONAL.timezone,
    dateFormat: isDDMM ? "DD/MM/YYYY" : "MM/DD/YYYY",
    defaultReminderTime: DEFAULT_REGIONAL.defaultReminderTime,
  };
}

function inferCurrencyFromLocale(locale: string): string {
  const upper = locale.toUpperCase();
  if (upper.startsWith("EN-AU") || upper.startsWith("AU")) return "AUD";
  if (upper.startsWith("EN-GB") || upper.startsWith("GB")) return "GBP";
  if (upper.startsWith("EN-CA") || upper.startsWith("CA")) return "CAD";
  if (upper.startsWith("EN-NZ") || upper.startsWith("NZ")) return "NZD";
  if (/^DE|^FR|^ES|^IT|^NL|^PT|^EU/i.test(locale)) return "EUR";
  return "USD";
}
