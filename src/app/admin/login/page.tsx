import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="px-6 py-16 text-center text-sm text-charcoal-light">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}

