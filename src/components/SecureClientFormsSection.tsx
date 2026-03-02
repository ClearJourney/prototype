"use client";

import { useState, useCallback } from "react";
import {
  Link2,
  Copy,
  Mail,
  Calendar,
  Lock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { FormKind } from "@/types/secure-forms";

const BASE_URL = typeof window !== "undefined" ? window.location.origin : "";

function generateToken(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let t = "";
  for (let i = 0; i < 24; i++) t += chars[Math.floor(Math.random() * chars.length)];
  return t;
}

interface GeneratedLinkState {
  kind: FormKind;
  token: string;
  expiresAt: string | null;
  allowEditsAfterSubmit: boolean;
}

export function SecureClientFormsSection({ clientId }: { clientId: string }) {
  const [generated, setGenerated] = useState<GeneratedLinkState | null>(null);
  const [copied, setCopied] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [expiryDays, setExpiryDays] = useState<string>("30");
  const [allowEdits, setAllowEdits] = useState(true);

  const generateLink = useCallback(
    (kind: FormKind) => {
      const token = generateToken();
      let expiresAt: string | null = null;
      const days = parseInt(expiryDays, 10);
      if (!isNaN(days) && days > 0) {
        const d = new Date();
        d.setDate(d.getDate() + days);
        expiresAt = d.toISOString().slice(0, 10);
      }
      setGenerated({
        kind,
        token,
        expiresAt,
        allowEditsAfterSubmit: allowEdits,
      });
    },
    [expiryDays, allowEdits]
  );

  const url =
    generated &&
    `${BASE_URL}/forms/${generated.kind === "inquiry" ? "inquiry" : "profile"}/${generated.token}`;

  const copyToClipboard = useCallback(() => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [url]);

  const sendViaEmail = useCallback(() => {
    if (!url || !generated) return;
    const subject =
      generated.kind === "inquiry"
        ? "Your Travel Design Intake — Next Step"
        : "Your Private Travel Profile — Secure Link";
    const body = `Hello,\n\nPlease use the link below to share your travel details securely:\n\n${url}\n\n${generated.expiresAt ? `This link expires on ${generated.expiresAt}.` : ""}\n\nWe look forward to designing your journey.`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [url, generated]);

  return (
    <section className="rounded-xl border border-border-light bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-charcoal">
            Secure Client Forms
          </h2>
          <p className="mt-1 text-sm text-charcoal-light">
            Collect trip details, preferences, and essential information in one
            secure place.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => generateLink("inquiry")}
          className="inline-flex items-center gap-2 rounded-button border border-navy/20 bg-white px-4 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-navy/5"
        >
          <Link2 className="h-4 w-4" strokeWidth={1.5} />
          Generate Inquiry Link
        </button>
        <button
          type="button"
          onClick={() => generateLink("profile")}
          className="inline-flex items-center gap-2 rounded-button border border-navy/20 bg-white px-4 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-navy/5"
        >
          <Link2 className="h-4 w-4" strokeWidth={1.5} />
          Generate Client Profile Link
        </button>
      </div>

      {/* Optional settings (expiry, allow edits) */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setShowOptions(!showOptions)}
          className="flex items-center gap-2 text-sm text-charcoal-light hover:text-charcoal"
        >
          {showOptions ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
          Options
        </button>
        {showOptions && (
          <div className="mt-3 flex flex-wrap items-center gap-6 rounded-lg border border-border-light bg-sand-warm/50 p-4">
            <label className="flex items-center gap-2 text-sm text-charcoal">
              <Calendar className="h-4 w-4 text-charcoal-light" />
              <span>Expiry (days)</span>
              <input
                type="number"
                min="1"
                max="365"
                value={expiryDays}
                onChange={(e) => setExpiryDays(e.target.value)}
                className="w-16 rounded border border-border-light bg-white px-2 py-1 text-sm"
              />
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-charcoal">
              <input
                type="checkbox"
                checked={allowEdits}
                onChange={(e) => setAllowEdits(e.target.checked)}
                className="rounded border-border-light text-navy"
              />
              Allow edits after submission
            </label>
          </div>
        )}
      </div>

      {generated && url && (
        <div className="mt-6 rounded-lg border border-border-light bg-sand-warm/30 p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-charcoal-light">
            {generated.kind === "inquiry"
              ? "Travel Design Intake"
              : "Private Travel Profile"}{" "}
            — Secure link
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <code className="flex-1 truncate rounded bg-white px-3 py-2 text-sm text-charcoal border border-border-light min-w-0">
              {url}
            </code>
            <button
              type="button"
              onClick={copyToClipboard}
              className="inline-flex items-center gap-2 rounded-button bg-navy px-3 py-2 text-sm font-medium text-white hover:bg-navy-dark"
            >
              <Copy className="h-4 w-4" strokeWidth={1.5} />
              {copied ? "Copied" : "Copy link"}
            </button>
            <button
              type="button"
              onClick={sendViaEmail}
              className="inline-flex items-center gap-2 rounded-button border border-border-light bg-white px-3 py-2 text-sm font-medium text-charcoal hover:bg-sand-warm"
            >
              <Mail className="h-4 w-4" strokeWidth={1.5} />
              Send via email
            </button>
          </div>
          {generated.expiresAt && (
            <p className="mt-2 text-xs text-charcoal-light">
              Expires: {generated.expiresAt} · Edits after submit:{" "}
              {generated.allowEditsAfterSubmit ? "Yes" : "No"}
            </p>
          )}
        </div>
      )}

      <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-charcoal-light">
        <span className="flex items-center gap-2">
          <Lock className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.5} />
          Each link is private and encrypted.
        </span>
        <a href="/dashboard/settings#forms" className="hover:text-charcoal">
          Customize branding &amp; budget ranges
        </a>
      </p>
    </section>
  );
}
