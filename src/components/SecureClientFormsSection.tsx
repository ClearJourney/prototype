"use client";

import { useState, useCallback } from "react";
import { Link2, Copy, Mail, Lock, Plane, UserCircle } from "lucide-react";
import { ClientProfileLinkBlock } from "./ClientProfileLinkBlock";

const BASE_URL = typeof window !== "undefined" ? window.location.origin : "";

function generateToken(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let t = "";
  for (let i = 0; i < 24; i++) t += chars[Math.floor(Math.random() * chars.length)];
  return t;
}

type SecureClientFormsSectionMode = "full" | "profile-only";

export function SecureClientFormsSection({
  clientId,
  mode = "full",
}: {
  clientId: string;
  mode?: SecureClientFormsSectionMode;
}) {
  const [inquiryGenerated, setInquiryGenerated] = useState<{
    token: string;
    expiresAt: string | null;
    allowEditsAfterSubmit: boolean;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [expiryDays, setExpiryDays] = useState<string>("30");
  const [allowEdits, setAllowEdits] = useState(true);

  const generateInquiryLink = useCallback(() => {
    const token = generateToken();
    let expiresAt: string | null = null;
    const days = parseInt(expiryDays, 10);
    if (!isNaN(days) && days > 0) {
      const d = new Date();
      d.setDate(d.getDate() + days);
      expiresAt = d.toISOString().slice(0, 10);
    }
    setInquiryGenerated({ token, expiresAt, allowEditsAfterSubmit: allowEdits });
  }, [expiryDays, allowEdits]);

  const inquiryUrl = inquiryGenerated
    ? `${BASE_URL}/forms/inquiry/${inquiryGenerated.token}`
    : null;

  const copyToClipboard = useCallback(
    (url: string) => {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    },
    []
  );

  const sendInquiryViaEmail = useCallback(() => {
    if (!inquiryUrl || !inquiryGenerated) return;
    const subject = "Your Travel Design Intake — Next Step";
    const body = `Hello,\n\nPlease use the link below to share your travel details securely:\n\n${inquiryUrl}\n\n${inquiryGenerated.expiresAt ? `This link expires on ${inquiryGenerated.expiresAt}.` : ""}\n\nWe look forward to designing your journey.`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [inquiryUrl, inquiryGenerated]);

  // Profile form state for "full" mode modal (simple, token-based)
  const [profileToken, setProfileToken] = useState<string | null>(null);
  const [profileExpiresAt, setProfileExpiresAt] = useState<string | null>(null);
  const [profileCopied, setProfileCopied] = useState(false);

  const profileUrl = profileToken ? `${BASE_URL}/forms/profile/${profileToken}` : null;

  const generateProfileLink = useCallback(() => {
    const token = generateToken();
    let expiresAt: string | null = null;
    const days = parseInt(expiryDays, 10);
    if (!isNaN(days) && days > 0) {
      const d = new Date();
      d.setDate(d.getDate() + days);
      expiresAt = d.toISOString().slice(0, 10);
    }
    setProfileToken(token);
    setProfileExpiresAt(expiresAt);
  }, [expiryDays]);

  const copyProfileToClipboard = useCallback(() => {
    if (!profileUrl) return;
    navigator.clipboard.writeText(profileUrl);
    setProfileCopied(true);
    setTimeout(() => setProfileCopied(false), 2000);
  }, [profileUrl]);

  const sendProfileViaEmail = useCallback(() => {
    if (!profileUrl) return;
    const subject = "Your Private Travel Profile — Secure Link";
    const body = `Hello,\n\nPlease use the link below to share your travel details securely:\n\n${profileUrl}\n\n${
      profileExpiresAt ? `This link expires on ${profileExpiresAt}.` : ""
    }\n\nWe look forward to designing your journey.`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [profileUrl, profileExpiresAt]);

  // Profile-only mode keeps existing, richer ClientProfileLinkBlock experience
  if (mode === "profile-only") {
    return (
      <section className="rounded-xl border border-border-light bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-charcoal">Share Client Forms</h2>
            <p className="mt-2 text-sm text-charcoal-light">
              Collect trip details, preferences, and essential information in one secure place.
            </p>
          </div>
        </div>

        <div className="mt-7">
          <p className="mb-2 text-sm font-medium text-charcoal">Client Profile</p>
          <ClientProfileLinkBlock compact={false} />
        </div>

        <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-charcoal-light">
          <span className="flex items-center gap-2">
            <Lock className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.5} />
            Each link is private and encrypted.
          </span>
        </p>
      </section>
    );
  }

  // Full mode: two clear options in the modal
  return (
    <section className="rounded-xl border border-border-light bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-charcoal">Share Client Forms</h2>
          <p className="mt-2 text-sm text-charcoal-light">
            Collect trip details, preferences, and essential information in one secure place.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-6 md:grid-cols-2">
        {/* Option 1 – Travel Inquiry Form */}
        <div className="rounded-xl border border-border-light bg-sand-warm/20 p-4">
          <div className="flex items-center gap-2">
            <Plane className="h-4 w-4 text-charcoal-light" strokeWidth={1.5} />
            <h3 className="text-sm font-medium text-charcoal">Travel Inquiry Form</h3>
          </div>
          <p className="mt-1 text-xs text-charcoal-light">For new trip requests.</p>

          {!inquiryUrl ? (
            <button
              type="button"
              onClick={generateInquiryLink}
              className="mt-4 inline-flex items-center gap-2 rounded-button bg-navy px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-dark"
            >
              <Link2 className="h-4 w-4" strokeWidth={1.5} />
              Generate Inquiry Link
            </button>
          ) : (
            <div className="mt-4 rounded-lg border border-border-light bg-sand-warm/40 p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-charcoal-light">
                Travel Design Intake — Secure link
              </p>
              <div className="space-y-3">
                <code className="block w-full truncate rounded border border-border-light bg-white px-3 py-2 text-sm text-charcoal">
                  {inquiryUrl}
                </code>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(inquiryUrl)}
                    className="inline-flex items-center gap-2 rounded-button bg-navy px-3 py-2 text-sm font-medium text-white hover:bg-navy-dark"
                  >
                    <Copy className="h-4 w-4" strokeWidth={1.5} />
                    {copied ? "Copied" : "Copy link"}
                  </button>
                  <button
                    type="button"
                    onClick={sendInquiryViaEmail}
                    className="inline-flex items-center gap-2 rounded-button border border-border-light bg-white px-3 py-2 text-sm font-medium text-charcoal hover:bg-sand-warm"
                  >
                    <Mail className="h-4 w-4" strokeWidth={1.5} />
                    Send via email
                  </button>
                </div>
              </div>
              {inquiryGenerated?.expiresAt && (
                <p className="mt-2 text-xs text-charcoal-light">
                  Expires: {inquiryGenerated.expiresAt} · Edits after submit:{" "}
                  {inquiryGenerated.allowEditsAfterSubmit ? "Yes" : "No"}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Option 2 – Traveler Profile Form */}
        <div className="rounded-xl border border-border-light bg-sand-warm/20 p-4">
          <div className="flex items-center gap-2">
            <UserCircle className="h-4 w-4 text-charcoal-light" strokeWidth={1.5} />
            <h3 className="text-sm font-medium text-charcoal">Traveler Profile Form</h3>
          </div>
          <p className="mt-1 text-xs text-charcoal-light">
            Collect traveler details for confirmed clients.
          </p>

          {!profileUrl ? (
            <button
              type="button"
              onClick={generateProfileLink}
              className="mt-4 inline-flex items-center gap-2 rounded-button bg-navy px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-dark"
            >
              <Link2 className="h-4 w-4" strokeWidth={1.5} />
              Generate Client Profile Link
            </button>
          ) : (
            <div className="mt-4 rounded-lg border border-border-light bg-sand-warm/40 p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-charcoal-light">
                Private Travel Profile — Secure link
              </p>
              <div className="space-y-3">
                <code className="block w-full truncate rounded border border-border-light bg-white px-3 py-2 text-sm text-charcoal">
                  {profileUrl}
                </code>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={copyProfileToClipboard}
                    className="inline-flex items-center gap-2 rounded-button bg-navy px-3 py-2 text-sm font-medium text-white hover:bg-navy-dark"
                  >
                    <Copy className="h-4 w-4" strokeWidth={1.5} />
                    {profileCopied ? "Copied" : "Copy link"}
                  </button>
                  <button
                    type="button"
                    onClick={sendProfileViaEmail}
                    className="inline-flex items-center gap-2 rounded-button border border-border-light bg-white px-3 py-2 text-sm font-medium text-charcoal hover:bg-sand-warm"
                  >
                    <Mail className="h-4 w-4" strokeWidth={1.5} />
                    Send via email
                  </button>
                </div>
              </div>
              {profileExpiresAt && (
                <p className="mt-2 text-xs text-charcoal-light">
                  Expires: {profileExpiresAt} · Edits after submit: Yes
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-charcoal-light">
        <span className="flex items-center gap-2">
          <Lock className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.5} />
          Each link is private and encrypted.
        </span>
      </p>
    </section>
  );
}
