/**
 * Account slug: stable, unique per account, used for public inquiry form URL.
 * Format: /forms/inquiry/{accountSlug}
 * Next.js inlines NEXT_PUBLIC_ACCOUNT_SLUG at build time in client bundle.
 */
const DEFAULT_ACCOUNT_SLUG = "my-advisor";

export function getAccountSlug(): string {
  return (process.env.NEXT_PUBLIC_ACCOUNT_SLUG ?? DEFAULT_ACCOUNT_SLUG) || DEFAULT_ACCOUNT_SLUG;
}

/** Check if path segment is the account slug (public form) vs a one-time token. */
export function isAccountSlug(segment: string): boolean {
  return segment === getAccountSlug();
}
