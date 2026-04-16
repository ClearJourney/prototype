export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Stored as sanitized HTML from the rich text editor */
  content: string;
  /** Optional hero image URL (https) shown on the public post */
  heroImage: string;
  /** Override for <title> / OG; empty means use `title` */
  seoTitle: string;
  /** Override for meta description; empty means fall back to excerpt/body */
  seoDescription: string;
  published: boolean;
  publishedAt: string | null;
  updatedAt: string;
  createdAt: string;
};

type StoreShape = {
  posts: BlogPost[];
};

const DATA_FILE = ".data/blog-posts.json";

/** Long enough for real titles; old posts may still be truncated at 80 chars (see getPostBySlug fallbacks). */
const MAX_SLUG_LENGTH = 200;

let loaded = false;
let inMemory: StoreShape = { posts: [] };

function nowIso(): string {
  return new Date().toISOString();
}

function safeParseJson(raw: string): unknown {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

function normalizePost(raw: unknown): BlogPost | null {
  if (!raw || typeof raw !== "object") return null;
  const p = raw as Partial<BlogPost>;
  if (typeof p.id !== "string" || typeof p.slug !== "string") return null;
  return {
    id: p.id,
    slug: p.slug,
    title: typeof p.title === "string" ? p.title : "Untitled",
    excerpt: typeof p.excerpt === "string" ? p.excerpt : "",
    content: typeof p.content === "string" ? p.content : "",
    heroImage: typeof p.heroImage === "string" ? p.heroImage : "",
    seoTitle: typeof p.seoTitle === "string" ? p.seoTitle : "",
    seoDescription: typeof p.seoDescription === "string" ? p.seoDescription : "",
    published: Boolean(p.published),
    publishedAt: typeof p.publishedAt === "string" ? p.publishedAt : null,
    updatedAt: typeof p.updatedAt === "string" ? p.updatedAt : nowIso(),
    createdAt: typeof p.createdAt === "string" ? p.createdAt : nowIso(),
  };
}

function loadFromDisk(): void {
  if (loaded) return;
  loaded = true;
  try {
    const fs = require("fs") as typeof import("fs");
    const path = require("path") as typeof import("path");
    const fullPath = path.join(process.cwd(), DATA_FILE);
    if (!fs.existsSync(fullPath)) return;
    const raw = fs.readFileSync(fullPath, "utf-8");
    const parsed = safeParseJson(raw) as StoreShape | null;
    if (parsed && Array.isArray(parsed.posts)) {
      inMemory = {
        posts: parsed.posts
          .map(normalizePost)
          .filter((x): x is BlogPost => x !== null),
      };
    }
  } catch {
    // Ignore (edge/runtime w/o fs). We'll stay in-memory.
  }
}

function saveToDisk(): void {
  try {
    const fs = require("fs") as typeof import("fs");
    const path = require("path") as typeof import("path");
    const dir = path.join(process.cwd(), ".data");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "blog-posts.json"), JSON.stringify(inMemory, null, 2), "utf-8");
  } catch {
    // Ignore (read-only/serverless, etc.)
  }
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX_SLUG_LENGTH);
}

function ensureUniqueSlug(desired: string, excludeId?: string): string {
  const base = desired || "post";
  const existing = new Set(
    inMemory.posts.filter((p) => p.id !== excludeId).map((p) => p.slug)
  );
  if (!existing.has(base)) return base;
  for (let i = 2; i < 10_000; i++) {
    const candidate = `${base}-${i}`;
    if (!existing.has(candidate)) return candidate;
  }
  return `${base}-${Date.now()}`;
}

function newId(): string {
  try {
    const maybeCrypto = globalThis.crypto as unknown;
    if (typeof maybeCrypto === "object" && maybeCrypto) {
      const randomUUID = (maybeCrypto as { randomUUID?: () => unknown }).randomUUID;
      const id = typeof randomUUID === "function" ? randomUUID() : null;
      if (typeof id === "string") return id;
    }
  } catch {}
  return `post_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function getAllPosts(): BlogPost[] {
  loadFromDisk();
  return [...inMemory.posts].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getPublishedPosts(): BlogPost[] {
  loadFromDisk();
  return inMemory.posts
    .filter((p) => p.published)
    .slice()
    .sort((a, b) => {
      const ad = a.publishedAt ?? a.createdAt;
      const bd = b.publishedAt ?? b.createdAt;
      return bd.localeCompare(ad);
    });
}

/**
 * Next post in the same order as `/blog` (newest → oldest). Use the resolved post `slug`.
 * “Next” = the following, slightly older article in the journal.
 */
export function getNextPublishedPostInJournalOrder(slug: string): BlogPost | null {
  const posts = getPublishedPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return null;
  return posts[idx + 1] ?? null;
}

export function getPostById(id: string): BlogPost | null {
  loadFromDisk();
  return inMemory.posts.find((p) => p.id === id) ?? null;
}

export function getPostBySlug(slug: string): BlogPost | null {
  loadFromDisk();
  if (slug == null || String(slug).trim() === "") return null;

  let decoded: string;
  try {
    decoded = decodeURIComponent(String(slug));
  } catch {
    decoded = String(slug);
  }

  const exact = inMemory.posts.find((p) => p.slug === decoded);
  if (exact) return exact;

  let best: BlogPost | null = null;
  for (const p of inMemory.posts) {
    if (!p.slug) continue;
    if (!decoded.startsWith(p.slug)) continue;
    if (!best || p.slug.length > best.slug.length) best = p;
  }
  return best;
}

export function createPost(input: {
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  heroImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  published?: boolean;
}): BlogPost {
  loadFromDisk();
  const createdAt = nowIso();
  const updatedAt = createdAt;
  const desiredSlug = slugify(input.slug?.trim() || input.title);
  const slug = ensureUniqueSlug(desiredSlug);
  const published = Boolean(input.published);
  const publishedAt = published ? createdAt : null;

  const post: BlogPost = {
    id: newId(),
    slug,
    title: input.title.trim() || "Untitled",
    excerpt: (input.excerpt ?? "").trim(),
    content: (input.content ?? "").trim(),
    heroImage: (input.heroImage ?? "").trim(),
    seoTitle: (input.seoTitle ?? "").trim(),
    seoDescription: (input.seoDescription ?? "").trim(),
    published,
    publishedAt,
    updatedAt,
    createdAt,
  };

  inMemory.posts.unshift(post);
  saveToDisk();
  return post;
}

export function updatePost(
  id: string,
  patch: Partial<
    Pick<
      BlogPost,
      | "title"
      | "slug"
      | "excerpt"
      | "content"
      | "heroImage"
      | "seoTitle"
      | "seoDescription"
      | "published"
    >
  >
): BlogPost | null {
  loadFromDisk();
  const idx = inMemory.posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;

  const current = inMemory.posts[idx];
  const next: BlogPost = { ...current };

  if (typeof patch.title === "string") next.title = patch.title.trim() || "Untitled";
  if (typeof patch.excerpt === "string") next.excerpt = patch.excerpt.trim();
  if (typeof patch.content === "string") next.content = patch.content.trim();
  if (typeof patch.heroImage === "string") next.heroImage = patch.heroImage.trim();
  if (typeof patch.seoTitle === "string") next.seoTitle = patch.seoTitle.trim();
  if (typeof patch.seoDescription === "string") next.seoDescription = patch.seoDescription.trim();

  if (typeof patch.slug === "string") {
    const desired = slugify(patch.slug.trim() || next.title);
    next.slug = ensureUniqueSlug(desired, id);
  }

  if (typeof patch.published === "boolean") {
    if (patch.published && !current.published) {
      next.publishedAt = nowIso();
    }
    if (!patch.published) {
      next.publishedAt = null;
    }
    next.published = patch.published;
  }

  next.updatedAt = nowIso();
  inMemory.posts[idx] = next;
  saveToDisk();
  return next;
}

export function deletePost(id: string): boolean {
  loadFromDisk();
  const before = inMemory.posts.length;
  inMemory.posts = inMemory.posts.filter((p) => p.id !== id);
  const changed = inMemory.posts.length !== before;
  if (changed) saveToDisk();
  return changed;
}
