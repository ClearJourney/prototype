/**
 * Current user for pre-filling contact form etc.
 * Stored in localStorage when user is "logged in" (e.g. using the dashboard).
 * Replace with real auth/session when backend is ready.
 */
const STORAGE_KEY = "clearjourney_user";

export type CurrentUser = {
  name: string;
  email: string;
};

export function getStoredUser(): CurrentUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as unknown;
    if (data && typeof data === "object" && "name" in data && "email" in data) {
      const { name, email } = data as { name: string; email: string };
      if (typeof name === "string" && typeof email === "string") return { name, email };
    }
  } catch {
    // ignore
  }
  return null;
}

export function setStoredUser(user: CurrentUser): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch {
    // ignore
  }
}
