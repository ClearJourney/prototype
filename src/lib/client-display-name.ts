import type { TravelerDetailsStep } from "@/types/secure-forms";

/** Split a full name string into first / middle / last (same rules as map-client-to-manual-profile). */
export function parseFullName(fullName: string): {
  first: string;
  middle: string;
  last: string;
} {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0) return { first: "", middle: "", last: "" };
  if (parts.length === 1) return { first: parts[0], middle: "", last: "" };
  const first = parts[0];
  const last = parts[parts.length - 1];
  const middle = parts.slice(1, -1).join(" ");
  return { first, middle, last };
}

function resolveTitlePrefix(title: TravelerDetailsStep["title"], titleOther: string): string {
  if (!title) return "";
  if (title === "Other") return titleOther.trim();
  return title;
}

/** Formal display e.g. "Mr John Smith" — omits title when unset. */
export function formatClientProfileDisplayName(t: Pick<
  TravelerDetailsStep,
  "title" | "titleOther" | "legalFirstName" | "middleName" | "legalLastName"
>): string {
  const nameParts = [t.legalFirstName, t.middleName, t.legalLastName].filter(Boolean).join(" ").trim();
  const prefix = resolveTitlePrefix(t.title, t.titleOther);
  if (!prefix) return nameParts;
  return nameParts ? `${prefix} ${nameParts}` : prefix;
}

/** Display heading from mock client `name` plus optional honorific fields. */
export function formatMockClientDisplayName(client: {
  name: string;
  title?: TravelerDetailsStep["title"];
  titleOther?: string;
}): string {
  const { first, middle, last } = parseFullName(client.name);
  return formatClientProfileDisplayName({
    title: client.title ?? "",
    titleOther: client.titleOther ?? "",
    legalFirstName: first,
    middleName: middle,
    legalLastName: last,
  });
}
