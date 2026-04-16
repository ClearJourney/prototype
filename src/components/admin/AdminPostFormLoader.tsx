"use client";

import dynamic from "next/dynamic";
import type { BlogPost } from "@/lib/blog-store";

const AdminPostForm = dynamic(
  () =>
    import("./AdminPostForm").then((m) => m.AdminPostForm),
  {
    ssr: false,
    loading: () => (
      <div className="mt-8 rounded-card border border-border-light bg-white p-10 text-center text-sm text-charcoal-light shadow-soft">
        Loading editor…
      </div>
    ),
  }
);

type Props = {
  mode: "create" | "edit";
  action: (formData: FormData) => void | Promise<void>;
  post?: BlogPost;
};

/** TipTap must not run during SSR — load the form only in the browser. */
export function AdminPostFormLoader(props: Props) {
  return <AdminPostForm {...props} />;
}
