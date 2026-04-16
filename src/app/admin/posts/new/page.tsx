import Link from "next/link";
import { createPostAction } from "../actions";
import { AdminPostFormLoader } from "@/components/admin/AdminPostFormLoader";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-charcoal">
            New post
          </h1>
          <p className="mt-1 text-sm text-charcoal-light">
            Draft or publish — content is formatted with the editor below.
          </p>
        </div>
        <Link
          href="/admin/posts"
          className="rounded-button border border-border-light bg-white px-3 py-1.5 text-sm text-charcoal transition-colors hover:bg-sand-warm"
        >
          Back
        </Link>
      </div>

      <AdminPostFormLoader mode="create" action={createPostAction} />
    </div>
  );
}
