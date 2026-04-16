"use client";

import { useRef, useState } from "react";
import type { BlogPost } from "@/lib/blog-store";
import { postContentForEditor } from "@/lib/blog-content";
import { RichTextEditor } from "./RichTextEditor";

type Props = {
  mode: "create" | "edit";
  action: (formData: FormData) => void | Promise<void>;
  post?: BlogPost;
};

const inputClass =
  "mt-2 w-full rounded-button border border-border-light bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gold-accent/40";
const labelClass = "text-sm font-medium text-charcoal";

const HERO_MAX_BYTES = 5 * 1024 * 1024;
const HERO_ACCEPT = "image/jpeg,image/png,image/webp,image/gif";

export function AdminPostForm({ mode, action, post }: Props) {
  const initialHtml = post ? postContentForEditor(post.content) : "";
  const editorKey = post?.id ?? "new";
  const [heroImage, setHeroImage] = useState(post?.heroImage ?? "");
  const [heroUploadError, setHeroUploadError] = useState<string | null>(null);
  const [heroUploading, setHeroUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function uploadHeroFile(file: File) {
    setHeroUploadError(null);
    if (!HERO_ACCEPT.split(",").includes(file.type)) {
      setHeroUploadError("Please choose a JPEG, PNG, WebP, or GIF image.");
      return;
    }
    if (file.size > HERO_MAX_BYTES) {
      setHeroUploadError("Image must be 5MB or smaller.");
      return;
    }
    setHeroUploading(true);
    try {
      const body = new FormData();
      body.set("file", file);
      const res = await fetch("/api/admin/upload-hero", {
        method: "POST",
        body,
        credentials: "same-origin",
      });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok) {
        setHeroUploadError(data.error ?? "Upload failed.");
        return;
      }
      if (typeof data.url === "string") {
        setHeroImage(data.url);
      } else {
        setHeroUploadError("Invalid response from server.");
      }
    } catch {
      setHeroUploadError("Network error. Try again.");
    } finally {
      setHeroUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <form action={action} className="mt-8 space-y-6">
      <div className="rounded-card border border-border-light bg-white p-6 shadow-soft">
        <p className="text-xs font-medium uppercase tracking-wider text-charcoal-light">
          Post
        </p>
        <div className="mt-4 space-y-5">
          <label className="block">
            <span className={labelClass}>Title</span>
            <input
              name="title"
              required
              defaultValue={post?.title}
              className={inputClass}
              placeholder="Post title"
            />
          </label>

          <label className="block">
            <span className={labelClass}>Slug</span>
            <input
              name="slug"
              defaultValue={post?.slug}
              className={inputClass}
              placeholder="url-friendly-slug"
            />
            <p className="mt-1 text-xs text-charcoal-light">
              {mode === "create"
                ? "Leave blank to generate from the title."
                : "Shown in /blog/your-slug."}
            </p>
          </label>

          <div className="block">
            <span className={labelClass}>Hero image</span>
            <input
              name="heroImage"
              type="text"
              value={heroImage}
              onChange={(e) => setHeroImage(e.target.value)}
              className={inputClass}
              placeholder="Upload or paste an image"
            />
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept={HERO_ACCEPT}
                className="sr-only"
                aria-hidden
                tabIndex={-1}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void uploadHeroFile(f);
                }}
              />
              <button
                type="button"
                disabled={heroUploading}
                onClick={() => fileInputRef.current?.click()}
                className="rounded-button border border-border-light bg-white px-3 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-cream disabled:opacity-50"
              >
                {heroUploading ? "Uploading…" : "Upload image"}
              </button>
              <span className="text-xs text-charcoal-light">
                Upload a hero image (recommended 1600 × 900).
              </span>
            </div>
            {heroUploadError ? (
              <p className="mt-2 text-xs text-red-600" role="alert">
                {heroUploadError}
              </p>
            ) : null}
            {heroImage ? (
              <div className="mt-3">
                <p className="text-xs text-charcoal-light">Preview</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroImage}
                  alt=""
                  className="mt-1 max-h-40 max-w-full rounded border border-border-light object-contain"
                />
              </div>
            ) : null}
          </div>

          <label className="block">
            <span className={labelClass}>Excerpt</span>
            <textarea
              name="excerpt"
              rows={3}
              defaultValue={post?.excerpt}
              className={`${inputClass} resize-y`}
              placeholder="Short summary for listings and social previews."
            />
          </label>
        </div>
      </div>

      <div className="rounded-card border border-border-light bg-white p-6 shadow-soft">
        <p className="text-xs font-medium uppercase tracking-wider text-charcoal-light">
          Content
        </p>
        <div className="mt-4">
          <span className={labelClass}>Body</span>
          <p className="mt-1 text-xs text-charcoal-light">
            Formatting is saved as HTML. Use the toolbar for headings, lists, quotes, links,
            dividers, and inline images. Press <strong className="text-charcoal">Enter</strong> for
            a new paragraph; <strong className="text-charcoal">Shift+Enter</strong> for a line break
            inside the same paragraph (keeps sentences together on the blog).
          </p>
          <div className="mt-3">
            <RichTextEditor key={editorKey} initialHtml={initialHtml} />
          </div>
        </div>
      </div>

      <div className="rounded-card border border-border-light bg-white p-6 shadow-soft">
        <p className="text-xs font-medium uppercase tracking-wider text-charcoal-light">
          SEO
        </p>
        <div className="mt-4 space-y-5">
          <label className="block">
            <span className={labelClass}>SEO title</span>
            <input
              name="seoTitle"
              defaultValue={post?.seoTitle}
              className={inputClass}
              placeholder="Override page title for search &amp; browser tab (optional)"
            />
          </label>
          <label className="block">
            <span className={labelClass}>SEO description</span>
            <textarea
              name="seoDescription"
              rows={3}
              defaultValue={post?.seoDescription}
              className={`${inputClass} resize-y`}
              placeholder="Meta description for search results (optional)"
            />
          </label>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-card border border-border-light bg-white px-6 py-4 shadow-soft">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            name="published"
            defaultChecked={post?.published}
            className="h-4 w-4 rounded border-border-light"
          />
          <span className="text-sm text-charcoal">Published</span>
        </label>
        <button
          type="submit"
          className="rounded-button bg-navy px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-dark"
        >
          {mode === "create" ? "Create post" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
