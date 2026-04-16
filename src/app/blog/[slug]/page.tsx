import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNextPublishedPostInJournalOrder, getPostBySlug } from "@/lib/blog-store";
import { getSiteUrl } from "@/lib/site-url";
import { looksLikeHtml, legacyPlainToHtml, stripHtmlToPlain } from "@/lib/blog-content";
import { sanitizePostBodyHtml } from "@/lib/sanitize-post-html";

export const dynamic = "force-dynamic";

function fmtDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post || !post.published) return {};

  const url = `${getSiteUrl()}/blog/${encodeURIComponent(post.slug)}`;
  const headTitle = (post.seoTitle || post.title).trim() || post.title;
  const rawDesc = (post.seoDescription || post.excerpt || stripHtmlToPlain(post.content, 240)).trim();
  const description = rawDesc.slice(0, 160);

  return {
    title: `${headTitle} · Blog`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: headTitle,
      description,
      images: post.heroImage
        ? [{ url: post.heroImage, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: headTitle,
      description,
      images: post.heroImage ? [post.heroImage] : undefined,
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post || !post.published) notFound();

  const rawContent = post.content.trim();
  const htmlForView = looksLikeHtml(rawContent)
    ? rawContent
    : legacyPlainToHtml(rawContent);
  const safeHtml = sanitizePostBodyHtml(htmlForView);
  const displayTitle = post.title;
  const nextPost = getNextPublishedPostInJournalOrder(post.slug);

  return (
    <article className="pb-24 pt-8 md:pb-32 md:pt-12">
      <div className="mx-auto max-w-[720px] px-5 md:px-8">
        <nav className="flex items-center justify-between gap-4 text-sm">
          <Link
            href="/blog"
            className="font-medium text-navy/90 transition-colors hover:text-navy"
          >
            ← Back to journal
          </Link>
          <Link
            href="/"
            className="rounded-full border border-[#E3DFD6] bg-white/80 px-3 py-1.5 text-charcoal-light transition-colors hover:border-gold-accent/50 hover:text-charcoal"
          >
            Home
          </Link>
        </nav>

        <header className="mt-14 text-center md:mt-20">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold-accent">
            Clear Journey
          </p>
          <h1 className="mt-5 font-serif-display text-[1.85rem] font-medium leading-[1.15] tracking-[-0.02em] text-charcoal md:text-[2.35rem] md:leading-[1.12]">
            {displayTitle}
          </h1>
          {post.publishedAt && (
            <time
              dateTime={post.publishedAt}
              className="mt-6 block text-sm text-charcoal-light"
            >
              {fmtDate(post.publishedAt)}
            </time>
          )}
          {post.excerpt && (
            <p className="mx-auto mt-8 max-w-[520px] text-lg leading-relaxed text-charcoal-light md:text-xl md:leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </header>
      </div>

      {post.heroImage ? (
        <div className="mx-auto mt-12 max-w-[900px] px-4 md:mt-16 md:px-8">
          <div className="overflow-hidden rounded-2xl border border-[#E8DFD2] bg-champagne/30 shadow-soft-lg">
            {/* Arbitrary external hero URLs — use native img */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.heroImage}
              alt=""
              className="aspect-[16/9] w-full object-cover"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      ) : null}

      {/* eslint-disable-next-line react/no-danger -- HTML sanitized on server */}
      <div
        className={[
          // Base prose (no prose-lg — it adds overly loose paragraph rhythm)
          "blog-article prose prose-neutral mx-auto mt-14 max-w-[640px] px-5 text-[17px]",
          // Headings: clear section breaks; body paragraphs stay tighter via globals + prose-p
          "prose-headings:font-serif-display prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-charcoal",
          "prose-h2:mt-12 prose-h2:mb-3 prose-h2:text-2xl prose-h2:scroll-mt-24",
          "prose-h3:mt-9 prose-h3:mb-2 prose-h3:text-xl prose-h3:scroll-mt-24",
          // Paragraphs: ~14px gap, line-height ~1.65 (see globals.css for fallbacks)
          "prose-p:mt-0 prose-p:mb-3.5 prose-p:leading-[1.65] prose-p:text-charcoal",
          "prose-a:font-medium prose-a:text-navy prose-a:no-underline prose-a:decoration-gold-accent/50 prose-a:underline-offset-4 hover:prose-a:text-navy-dark hover:prose-a:underline",
          "prose-strong:font-semibold prose-strong:text-charcoal",
          "prose-blockquote:my-5 prose-blockquote:border-l-gold-accent prose-blockquote:pl-5 prose-blockquote:font-serif-display prose-blockquote:italic prose-blockquote:text-charcoal-light",
          "prose-ul:my-4 prose-ol:my-4 prose-li:my-1 prose-li:marker:text-gold-accent",
          "prose-hr:my-12 prose-hr:border-border-light",
          "prose-img:rounded-xl prose-img:shadow-soft",
          "md:mt-20 md:px-8",
          post.heroImage ? "md:mt-16" : "",
        ].join(" ")}
        dangerouslySetInnerHTML={{ __html: safeHtml || "<p></p>" }}
      />

      {nextPost ? (
        <div className="mx-auto mt-16 max-w-[640px] px-5 md:mt-20 md:px-8">
          <div className="border-t border-[#E8E4DC]/55 pt-10 md:pt-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold-accent">
              Next article
            </p>
            <Link
              href={`/blog/${encodeURIComponent(nextPost.slug)}`}
              className="group mt-4 flex items-start justify-between gap-6 text-left"
            >
              <span className="min-w-0 flex-1 font-serif-display text-xl font-medium leading-snug tracking-tight text-charcoal transition-colors group-hover:text-navy md:text-2xl">
                {nextPost.title}
              </span>
              <span
                className="shrink-0 pt-1 text-lg text-gold-accent/70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-gold-accent md:text-xl"
                aria-hidden
              >
                →
              </span>
            </Link>
          </div>
        </div>
      ) : null}
    </article>
  );
}
