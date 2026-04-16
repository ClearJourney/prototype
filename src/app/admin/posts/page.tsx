import Link from "next/link";
import { getAllPosts } from "@/lib/blog-store";
import { deletePostAction } from "./actions";
import { LogoutButton } from "../LogoutButton";

export const dynamic = "force-dynamic";

function fmt(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return isNaN(d.getTime()) ? iso : d.toLocaleString();
}

export default function AdminPostsPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold-accent">
            Content
          </p>
          <h1 className="mt-2 font-serif-display text-3xl font-medium tracking-tight text-charcoal">
            Blog posts
          </h1>
          <p className="mt-1 text-sm text-charcoal-light">
            Create and edit posts for the public blog.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts/new"
            className="rounded-button bg-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-dark"
          >
            New post
          </Link>
          <LogoutButton />
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-card border border-border-light bg-white shadow-soft">
        <div className="grid grid-cols-12 gap-3 border-b border-border-light px-4 py-3 text-xs font-medium uppercase tracking-wider text-charcoal-light">
          <div className="col-span-5">Title</div>
          <div className="col-span-3">Slug</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {posts.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm text-charcoal-light">
            No posts yet. Create your first post.
          </div>
        ) : (
          <ul className="divide-y divide-border-light">
            {posts.map((p) => (
              <li key={p.id} className="grid grid-cols-12 gap-3 px-4 py-4">
                <div className="col-span-5 min-w-0">
                  <div className="truncate font-medium text-charcoal">
                    {p.title}
                  </div>
                  <div className="mt-1 text-xs text-charcoal-light">
                    Updated: {fmt(p.updatedAt)}
                  </div>
                </div>
                <div className="col-span-3 min-w-0">
                  <div className="truncate text-sm text-charcoal">
                    <Link
                      href={`/blog/${encodeURIComponent(p.slug)}`}
                      className="hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      /blog/{p.slug}
                    </Link>
                  </div>
                  <div className="mt-1 text-xs text-charcoal-light">
                    Published: {fmt(p.publishedAt)}
                  </div>
                </div>
                <div className="col-span-2">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      p.published
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-sand-warm text-charcoal border border-border-light"
                    }`}
                  >
                    {p.published ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/posts/${encodeURIComponent(p.id)}/edit`}
                    className="rounded-button border border-border-light bg-white px-3 py-1.5 text-sm text-charcoal transition-colors hover:bg-sand-warm"
                  >
                    Edit
                  </Link>
                  <form action={deletePostAction.bind(null, p.id)}>
                    <button
                      type="submit"
                      className="rounded-button border border-red-200 bg-red-50 px-3 py-1.5 text-sm text-red-700 transition-colors hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

