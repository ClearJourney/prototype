"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [agree, setAgree] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    workEmail: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/onboarding");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: scenic image */}
      <div
        className="hidden w-1/2 bg-cover bg-center lg:block"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200)",
        }}
      />

      {/* Right: form */}
      <div className="flex w-full items-center justify-center bg-sand p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          <Link href="/" className="text-2xl font-medium text-charcoal no-underline">
            clear journey
          </Link>
          <h1 className="mt-8 text-2xl font-bold text-charcoal">
            Create your account
          </h1>
          <p className="mt-2 text-charcoal-light">
            Join other future-ready leaders who use Clear Journey to streamline
            applications.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-charcoal">
                  First name
                </label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, firstName: e.target.value }))
                  }
                  className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
                  placeholder="First name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-charcoal">
                  Last name
                </label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, lastName: e.target.value }))
                  }
                  className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-charcoal">
                Company name
              </label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, companyName: e.target.value }))
                }
                className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
                placeholder="Company name"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-charcoal">
                Work email
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={form.workEmail}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, workEmail: e.target.value }))
                  }
                  className="flex-1 rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
                  placeholder="Work email"
                />
                <button
                  type="button"
                  className="rounded-lg bg-charcoal-light/20 px-4 py-2.5 text-sm font-medium text-charcoal hover:bg-charcoal-light/30"
                >
                  Verify
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-charcoal">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm((p) => ({ ...p, password: e.target.value }))
                }
                className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
                placeholder="Password"
              />
              <p className="mt-1 text-xs text-charcoal-light">
                Must be at least 8 characters with 1 number and 1 capital
                character.
              </p>
            </div>

            <label className="flex cursor-pointer items-start gap-2">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 rounded border-border-light"
              />
              <span className="text-sm text-charcoal">
                I agree to the Terms of Service and Privacy Policy
              </span>
            </label>

            <button
              type="submit"
              className="w-full rounded-lg bg-navy py-3 font-medium text-white hover:bg-navy-dark"
            >
              Start Free 30-Day Trial
            </button>
            <p className="text-center text-sm text-charcoal-light">
              $18/month after trial, cancel anytime.
            </p>
          </form>

          <p className="mt-6 text-center text-sm text-charcoal-light">
            Already have an account?{" "}
            <Link href="/login" className="text-charcoal underline">
              Sign in
            </Link>
          </p>

          <div className="mt-10 flex justify-center gap-8 text-sm text-charcoal-light">
            <span className="flex items-center gap-1">🔒 Private Data</span>
            <span className="flex items-center gap-1">👑 VIP Access</span>
            <span className="flex items-center gap-1">🏢 Build for Advisors</span>
          </div>
        </div>
      </div>
    </div>
  );
}
