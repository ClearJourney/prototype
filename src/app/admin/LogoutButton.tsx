"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        try {
          await fetch("/api/admin/logout", { method: "POST" });
        } finally {
          router.replace("/admin/login");
          router.refresh();
          setLoading(false);
        }
      }}
      className="rounded-button border border-border-light bg-white px-3 py-1.5 text-sm text-charcoal transition-colors hover:bg-sand-warm disabled:opacity-60"
    >
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
}

