// Pipeline stage IDs – Prospect is pre-pipeline (excluded from all metrics)
export const ACTIVE_STAGE_IDS = [
  "inquiry",
  "research",
  "proposal",
  "deposit",
  "balance",
  "travel",
  "completed",
  "lost",
] as const;

export type ActiveStageId = (typeof ACTIVE_STAGE_IDS)[number];

// Stage probability for Weighted Forecast (Inquiry 10%, Research 25%, Proposal 50%, Deposit 90%)
export const STAGE_WEIGHTS: Record<string, number> = {
  inquiry: 0.1,
  research: 0.25,
  proposal: 0.5,
  deposit: 0.9,
  balance: 0.95,
  travel: 1,
  completed: 1,
  lost: 0,
};

export function parseValueDisplay(display: string): number {
  const num = display.replace(/[^0-9.]/g, "");
  return Number(num) || 0;
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  AUD: "A$",
  CAD: "CA$",
  GBP: "£",
  EUR: "€",
  NZD: "NZ$",
};

/** Format a numeric value as currency. Uses symbol-based display (e.g. £12,500). */
export function formatValue(num: number, currency = "USD"): string {
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency + " ";
  return `${symbol}${num.toLocaleString()}`;
}
