import Link from "next/link";
import { getPublishedPosts } from "@/lib/blog-store";

export const dynamic = "force-dynamic";

function fmtDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getPublishedPosts();

  return (
    <div className="mx-auto min-h-screen max-w-[720px] px-5 pb-24 pt-6 md:px-8 md:pt-8">
      <nav
        className="flex items-center justify-between gap-4 border-b border-[#E8E4DC]/90 pb-5 md:pb-6"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="font-serif-display text-[1.15rem] font-normal lowercase leading-none tracking-[0.02em] text-charcoal transition-colors hover:text-navy md:text-[1.25rem]"
        >
          clear journey
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-charcoal-light/90 transition-colors hover:text-charcoal"
        >
          Home
        </Link>
      </nav>

      <header className="pt-14 text-center md:pt-16">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold-accent">
          Journal
        </p>
        <h1 className="mt-4 font-serif-display text-4xl font-medium tracking-[-0.02em] text-charcoal md:text-5xl">
          Blog
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-charcoal-light md:text-lg">
          Notes and ideas from Clear Journey — written for luxury travel advisors.
        </p>
        <div className="mx-auto mt-10 h-px w-16 bg-gold-accent/50" aria-hidden />
      </header>

      <div className="mt-14 md:mt-16">
        {posts.length === 0 ? (
          <p className="text-center text-sm text-charcoal-light">
            No posts yet. Check back soon.
          </p>
        ) : (
          <ul className="border-t border-[#E8E4DC]/55">
            {posts.map((p) => (
              <li
                key={p.id}
                className="border-b border-[#E8E4DC]/55 last:border-b-0"
              >
                <Link
                  href={`/blog/${encodeURIComponent(p.slug)}`}
                  className="group block py-12 transition-colors hover:bg-champagne/15 md:py-14"
                >
                  <div className="max-w-lg">
                    <h2 className="font-serif-display text-xl font-medium tracking-tight text-charcoal transition-colors group-hover:text-navy group-hover:underline group-hover:decoration-gold-accent/50 group-hover:underline-offset-4 md:text-2xl">
                      {p.title}
                    </h2>
                    {p.publishedAt && (
                      <time
                        dateTime={p.publishedAt}
                        className="mt-2.5 block text-[13px] tabular-nums text-charcoal-light/85"
                      >
                        {fmtDate(p.publishedAt)}
                      </time>
                    )}
                  </div>
                  {p.excerpt && (
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-charcoal-light md:text-[15px] md:leading-relaxed">
                      {p.excerpt}
                    </p>
                  )}
                  <span className="mt-5 inline-flex items-center text-[13px] font-normal tracking-wide text-charcoal-light/50 transition-colors group-hover:text-charcoal-light/65">
                    Read article
                    <span className="ml-1.5 opacity-70" aria-hidden>
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
