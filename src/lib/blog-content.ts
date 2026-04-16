/**
 * Helpers for legacy plain-text posts and HTML used by TipTap / public rendering.
 */

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Turn old plain-text / markdown-ish body into simple HTML paragraphs for TipTap. */
export function legacyPlainToHtml(text: string): string {
  const t = text.trim();
  if (!t) return "";
  const paras = t.split(/\r?\n(?:\s*\r?\n)+/).map((p) => p.trim()).filter(Boolean);
  if (paras.length === 0) return `<p>${escapeHtml(t)}</p>`;
  return paras.map((p) => `<p>${escapeHtml(p)}</p>`).join("");
}

/** Heuristic: existing stored content looks like HTML from the rich editor. */
export function looksLikeHtml(raw: string): boolean {
  const t = raw.trim();
  if (!t) return false;
  return /<\s*\/[a-z]+>/i.test(t) || /<\s*(p|h[1-6]|ul|ol|li|blockquote|div|br|hr|img)\b/i.test(t);
}

/** Initial HTML for the editor (handles legacy plain text). */
export function postContentForEditor(raw: string): string {
  const t = raw ?? "";
  if (!t.trim()) return "";
  if (looksLikeHtml(t)) return t;
  return legacyPlainToHtml(t);
}

export function stripHtmlToPlain(html: string, maxLen = 200): string {
  const plain = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= maxLen) return plain;
  return `${plain.slice(0, maxLen).trim()}…`;
}
