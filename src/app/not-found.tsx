import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sand px-6 py-16 text-center text-charcoal">
      <p className="text-5xl font-semibold tracking-tight text-navy">404</p>
      <h1 className="mt-4 text-xl font-semibold">Page not found</h1>
      <p className="mt-2 max-w-md text-sm text-charcoal-light">
        This page doesn&apos;t exist, or the content isn&apos;t available yet (for
        example, a blog post that hasn&apos;t been published).
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-button bg-navy px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-dark"
        >
          Home
        </Link>
        <Link
          href="/blog"
          className="rounded-button border border-border-light bg-white px-4 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-sand-warm"
        >
          Blog
        </Link>
      </div>
    </div>
  );
}
