export const BLOG_ADMIN_COOKIE = "cj_blog_admin";

function base64UrlEncode(bytes: ArrayBuffer): string {
  const u8 = new Uint8Array(bytes);
  let str = "";
  for (let i = 0; i < u8.length; i++) str += String.fromCharCode(u8[i]);
  // btoa expects "binary string"
  const b64 = btoa(str);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function hmacSha256(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return base64UrlEncode(sig);
}

export function getBlogAdminSecret(): string | null {
  const secret = process.env.BLOG_ADMIN_SECRET || process.env.BLOG_ADMIN_PASSWORD;
  if (secret) return secret;
  if (process.env.NODE_ENV === "production") return null;
  return "dev-secret";
}

export function getBlogAdminPassword(): string | null {
  return process.env.BLOG_ADMIN_PASSWORD || null;
}

export async function getAdminCookieValue(): Promise<string | null> {
  const secret = getBlogAdminSecret();
  if (!secret) return null;
  return await hmacSha256(secret, "blog-admin-v1");
}

export async function isValidAdminCookie(value: string | undefined): Promise<boolean> {
  if (!value) return false;
  const expected = await getAdminCookieValue();
  if (!expected) return false;
  return value === expected;
}

