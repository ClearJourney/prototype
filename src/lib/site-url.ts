function normalizeUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return normalizeUrl(explicit);

  const vercel = process.env.VERCEL_URL;
  if (vercel) return normalizeUrl(`https://${vercel}`);

  // Local/dev fallback
  return "http://localhost:3000";
}

