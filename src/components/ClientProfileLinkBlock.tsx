"use client";

import { useState, useCallback } from "react";
import { Link2, Copy, Mail, Calendar, ChevronDown, ChevronUp } from "lucide-react";

const BASE_URL = typeof window !== "undefined" ? window.location.origin : "";

function generateToken(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let t = "";
  for (let i = 0; i < 24; i++) t += chars[Math.floor(Math.random() * chars.length)];
  return t;
}

interface ClientProfileLinkBlockProps {
  /** When provided, registers the token via API and calls onLinkGenerated with the link. */
  opportunityId?: string;
  clientName?: string;
  stageId?: string;
  /** When provided (e.g. from opportunity.clientProfileFormLink), shows the link UI directly. */
  initialLink?: string | null;
  /** Called when a link is generated (for pipeline to update local state). */
  onLinkGenerated?: (link: string) => void;
  /** Compact mode for pipeline slider (no section header, tighter spacing). */
  compact?: boolean;
}

export function ClientProfileLinkBlock({
  opportunityId,
  clientName,
  stageId,
  initialLink,
  onLinkGenerated,
  compact = false,
}: ClientProfileLinkBlockProps) {
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [allowEditsAfterSubmit, setAllowEditsAfterSubmit] = useState(true);
  const [expiryDays, setExpiryDays] = useState<string>("30");
  const [showOptions, setShowOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const url = initialLink ?? (token ? `${BASE_URL}/forms/profile/${token}` : null);

  const generateLink = useCallback(async () => {
    const newToken = generateToken();
    let newExpiresAt: string | null = null;
    const days = parseInt(expiryDays, 10);
    if (!isNaN(days) && days > 0) {
      const d = new Date();
      d.setDate(d.getDate() + days);
      newExpiresAt = d.toISOString().slice(0, 10);
    }

    if (opportunityId) {
      setIsRegistering(true);
      try {
        const res = await fetch(`/api/opportunities/${opportunityId}/client-profile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: newToken,
            clientName: clientName ?? "Client",
            stageId: stageId ?? "inquiry",
          }),
        });
        const data = await res.json().catch(() => null);
        const link = data?.link ?? `${BASE_URL}/forms/profile/${newToken}`;
        setToken(newToken);
        setGeneratedLink(link);
        setExpiresAt(newExpiresAt);
        onLinkGenerated?.(link);
      } catch {
        const fallbackUrl = `${BASE_URL}/forms/profile/${newToken}`;
        setToken(newToken);
        setGeneratedLink(fallbackUrl);
        setExpiresAt(newExpiresAt);
        onLinkGenerated?.(fallbackUrl);
      } finally {
        setIsRegistering(false);
      }
    } else {
      const link = `${BASE_URL}/forms/profile/${newToken}`;
      setToken(newToken);
      setGeneratedLink(link);
      setExpiresAt(newExpiresAt);
      onLinkGenerated?.(link);
    }
  }, [opportunityId, clientName, stageId, expiryDays, allowEditsAfterSubmit, onLinkGenerated]);

  const copyToClipboard = useCallback(() => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [url]);

  const sendViaEmail = useCallback(() => {
    if (!url) return;
    const subject = "Your Private Travel Profile — Secure Link";
    const body = `Hello,\n\nPlease use the link below to share your travel details securely:\n\n${url}\n\n${expiresAt ? `This link expires on ${expiresAt}.` : ""}\n\nWe look forward to designing your journey.`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [url, expiresAt]);

  if (compact) {
    return (
      <div className="space-y-3">
        {!url ? (
          <>
            <button
              type="button"
              onClick={() => setShowOptions(!showOptions)}
              className="flex items-center gap-2 text-xs text-charcoal-light hover:text-charcoal"
            >
              {showOptions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              Options
            </button>
            {showOptions && (
              <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border-light bg-sand-warm/50 p-3 text-sm">
                <label className="flex items-center gap-2 text-charcoal">
                  <Calendar className="h-4 w-4 text-charcoal-light" />
                  <span>Expiry (days)</span>
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={expiryDays}
                    onChange={(e) => setExpiryDays(e.target.value)}
                    className="w-14 rounded border border-border-light bg-white px-2 py-1 text-sm"
                  />
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-charcoal">
                  <input
                    type="checkbox"
                    checked={allowEditsAfterSubmit}
                    onChange={(e) => setAllowEditsAfterSubmit(e.target.checked)}
                    className="rounded border-border-light text-navy"
                  />
                  Allow edits after submission
                </label>
              </div>
            )}
            <button
              type="button"
              onClick={generateLink}
              disabled={isRegistering}
              className="inline-flex items-center gap-2 rounded-button bg-navy px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-dark disabled:opacity-50"
            >
              <Link2 className="h-4 w-4" strokeWidth={1.5} />
              {isRegistering ? "Generating…" : "Generate Client Profile Link"}
            </button>
          </>
        ) : (
          <div className="rounded-lg border border-border-light bg-sand-warm/30 p-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-charcoal-light">
              Private Travel Profile — Secure link
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <code className="min-w-0 flex-1 truncate rounded border border-border-light bg-white px-3 py-2 text-sm text-charcoal">
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
            {expiresAt && (
              <p className="mt-2 text-xs text-charcoal-light">
                Expires: {expiresAt} · Edits after submit: {allowEditsAfterSubmit ? "Yes" : "No"}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="rounded-xl border border-border-light bg-white p-6">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={generateLink}
          disabled={isRegistering}
          className="inline-flex items-center gap-2 rounded-button border border-navy/20 bg-white px-4 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-navy/5 disabled:opacity-50"
        >
          <Link2 className="h-4 w-4" strokeWidth={1.5} />
          {isRegistering ? "Generating…" : "Generate Client Profile Link"}
        </button>
      </div>
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setShowOptions(!showOptions)}
          className="flex items-center gap-2 text-sm text-charcoal-light hover:text-charcoal"
        >
          {showOptions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
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
                checked={allowEditsAfterSubmit}
                onChange={(e) => setAllowEditsAfterSubmit(e.target.checked)}
                className="rounded border-border-light text-navy"
              />
              Allow edits after submission
            </label>
          </div>
        )}
      </div>
      {url && (
        <div className="mt-6 rounded-lg border border-border-light bg-sand-warm/30 p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-charcoal-light">
            Private Travel Profile — Secure link
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <code className="min-w-0 flex-1 truncate rounded border border-border-light bg-white px-3 py-2 text-sm text-charcoal">
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
          {expiresAt && (
            <p className="mt-2 text-xs text-charcoal-light">
              Expires: {expiresAt} · Edits after submit: {allowEditsAfterSubmit ? "Yes" : "No"}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
