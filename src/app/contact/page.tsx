"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getStoredUser } from "@/lib/user";

const MESSAGE_TYPES = [
  "Question",
  "Report an issue",
  "Feature suggestion",
  "General feedback",
] as const;

type FormState = {
  name: string;
  email: string;
  messageType: string;
  message: string;
};

type Touched = Partial<Record<keyof FormState, boolean>>;

const emptyForm: FormState = {
  name: "",
  email: "",
  messageType: "",
  message: "",
};

function getReferringPage(): string | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const ref = document.referrer;
    if (!ref) return undefined;
    const url = new URL(ref);
    if (url.origin !== window.location.origin) return undefined;
    return url.pathname || undefined;
  } catch {
    return undefined;
  }
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [touched, setTouched] = useState<Touched>({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [referringPage, setReferringPage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      setForm((prev) => ({ ...prev, name: user.name, email: user.email }));
    }
  }, []);

  useEffect(() => {
    setReferringPage(getReferringPage());
  }, []);

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setSubmitError(null);
  };

  const handleBlur = (field: keyof FormState) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const valid =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.messageType.trim() !== "" &&
    form.message.trim() !== "";

  const showError = (field: keyof FormState) => {
    const value = form[field];
    const isEmpty = typeof value === "string" ? value.trim() === "" : !value;
    return touched[field] && isEmpty;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, messageType: true, message: true });
    if (!valid) return;
    setSending(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          messageType: form.messageType.trim(),
          message: form.message.trim(),
          referringPage: referringPage || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(typeof data.error === "string" ? data.error : "Something went wrong. Please try again.");
        return;
      }
      setSuccess(true);
      setForm(emptyForm);
      setTouched({});
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "w-full rounded-button border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:ring-2 focus:ring-navy/15";
  const inputErrorClass = "border-error-muted/60 focus:ring-error-muted/20";

  return (
    <div className="flex min-h-screen flex-col bg-sand-warm">
      <header className="border-b border-border-light bg-sand px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Clear Journey"
              width={140}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-charcoal-light hover:text-charcoal"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto flex-1 w-full max-w-xl px-6 py-16">
        <h1 className="text-2xl font-semibold tracking-tight text-charcoal">
          Contact
        </h1>
        <p className="mt-2 text-charcoal-light">
          If you need help, notice something not working, or have an idea that
          could improve Clear Journey, we&apos;d love to hear from you.
        </p>

        {success ? (
          <div
            className="mt-12 rounded-card border border-border-light bg-white p-8 shadow-soft"
            role="status"
            aria-live="polite"
          >
            <p className="text-lg text-charcoal">
              Thank you — your message has been received.
            </p>
            <p className="mt-1 text-charcoal-light">
              We&apos;ll review it shortly.
            </p>
            <button
              type="button"
              onClick={() => setSuccess(false)}
              className="mt-6 rounded-button bg-navy px-4 py-2.5 text-sm font-medium text-white hover:bg-navy-dark"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div>
              <label
                htmlFor="contact-name"
                className="mb-1.5 block text-sm font-medium text-charcoal"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                value={form.name}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                className={`${inputClass} ${showError("name") ? inputErrorClass : ""}`}
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={showError("name")}
                aria-describedby={showError("name") ? "contact-name-err" : undefined}
              />
              {showError("name") && (
                <p id="contact-name-err" className="mt-1 text-sm text-error-muted">
                  Please enter your name.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-1.5 block text-sm font-medium text-charcoal"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                className={`${inputClass} ${showError("email") ? inputErrorClass : ""}`}
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={showError("email")}
                aria-describedby={showError("email") ? "contact-email-err" : undefined}
              />
              {showError("email") && (
                <p id="contact-email-err" className="mt-1 text-sm text-error-muted">
                  Please enter your email.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-type"
                className="mb-1.5 block text-sm font-medium text-charcoal"
              >
                Message type
              </label>
              <select
                id="contact-type"
                value={form.messageType}
                onChange={handleChange("messageType")}
                onBlur={handleBlur("messageType")}
                className={`${inputClass} ${showError("messageType") ? inputErrorClass : ""}`}
                aria-invalid={showError("messageType")}
                aria-describedby={showError("messageType") ? "contact-type-err" : undefined}
              >
                <option value="">Select...</option>
                {MESSAGE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {showError("messageType") && (
                <p id="contact-type-err" className="mt-1 text-sm text-error-muted">
                  Please select a message type.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-sm font-medium text-charcoal"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                value={form.message}
                onChange={handleChange("message")}
                onBlur={handleBlur("message")}
                rows={5}
                className={`${inputClass} resize-y min-h-[120px] ${showError("message") ? inputErrorClass : ""}`}
                placeholder="How can we help?"
                aria-invalid={showError("message")}
                aria-describedby={showError("message") ? "contact-message-err" : undefined}
              />
              {showError("message") && (
                <p id="contact-message-err" className="mt-1 text-sm text-error-muted">
                  Please enter your message.
                </p>
              )}
            </div>

            {submitError && (
              <p className="text-sm text-error-muted" role="alert">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={!valid || sending}
              className="w-full rounded-button bg-navy px-4 py-3 font-medium text-white hover:bg-navy-dark disabled:opacity-50 disabled:pointer-events-none"
            >
              {sending ? "Sending…" : "Send message"}
            </button>
          </form>
        )}

        <p className="mt-12 text-center text-sm text-charcoal-light">
          <Link href="/" className="hover:text-charcoal">
            Back to home
          </Link>
        </p>
      </div>

      <footer className="border-t border-border-light bg-sand px-6 py-6 text-center text-sm text-charcoal-light">
        © 2026 Clear Journey. All rights reserved.
      </footer>
    </div>
  );
}
