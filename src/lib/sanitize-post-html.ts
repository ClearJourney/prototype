import sanitizeHtml from "sanitize-html";

const allowedTags = [
  "p",
  "br",
  "h1",
  "h2",
  "h3",
  "h4",
  "strong",
  "b",
  "em",
  "i",
  "ul",
  "ol",
  "li",
  "blockquote",
  "a",
  "img",
  "hr",
];

/** Server-safe HTML for public blog article body (stored editor output). */
export function sanitizePostBodyHtml(html: string): string {
  const trimmed = html.trim();
  if (!trimmed) return "";

  return sanitizeHtml(trimmed, {
    allowedTags,
    allowedAttributes: {
      a: ["href", "title", "rel", "target"],
      img: ["src", "alt", "title", "width", "height", "loading"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: {
      img: ["http", "https"],
    },
  });
}
