import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostById } from "@/lib/blog-store";
import { deletePostAction, updatePostAction } from "../../actions";
import { AdminPostFormLoader } from "@/components/admin/AdminPostFormLoader";

export const dynamic = "force-dynamic";

export default function EditPostPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { saved?: string };
}) {
  const post = getPostById(params.id);
  if (!post) notFound();

  const showSaved = searchParams?.saved === "1";

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-semibold tracking-tight text-charcoal">
            Edit post
          </h1>
          <p className="mt-1 text-sm text-charcoal-light">
            Public URL:{" "}
            <Link
              href={`/blog/${encodeURIComponent(post.slug)}`}
              className="font-medium text-navy hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              /blog/{post.slug}
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/posts"
            className="rounded-button border border-border-light bg-white px-3 py-1.5 text-sm text-charcoal transition-colors hover:bg-sand-warm"
          >
            Back
          </Link>
          <form action={deletePostAction.bind(null, post.id)}>
            <button
              type="submit"
              className="rounded-button border border-red-200 bg-red-50 px-3 py-1.5 text-sm text-red-700 transition-colors hover:bg-red-100"
            >
              Delete
            </button>
          </form>
        </div>
      </div>

      {showSaved && (
        <div className="mt-6 rounded-card border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Saved.
        </div>
      )}

      <AdminPostFormLoader
        mode="edit"
        post={post}
        action={updatePostAction.bind(null, post.id)}
      />
    </div>
  );
}
