"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  UserPlus,
  FileUp,
  ConciergeBell,
  ArrowLeft,
  FileDown,
  FileText,
  Bell,
  Lightbulb,
} from "lucide-react";
import { ImportClientsModal } from "@/components/ImportClientsModal";

const CSV_TEMPLATE = `name,email,phone
Jane Smith,jane@example.com,+1 555 000 0001
John Doe,john@example.com,+1 555 000 0002`;

export default function NewClientOnboardingPage() {
  const [importModalOpen, setImportModalOpen] = useState(false);

  const handleDownloadTemplate = useCallback(() => {
    const blob = new Blob([CSV_TEMPLATE], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "clear-journey-clients-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-2 text-sm text-charcoal-light transition-colors hover:text-charcoal"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
        Back to dashboard
      </Link>

      <div className="mb-10 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-charcoal sm:text-3xl">
          Let&apos;s bring your clients into Clear Journey
        </h1>
        <p className="mt-1.5 text-charcoal-light">
          Choose the fastest way to get started — you&apos;ll be set up in minutes.
        </p>
      </div>

      {/* Three options */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Add one by one */}
        <div className="flex flex-col rounded-card border border-border-light/80 bg-white p-5 shadow-soft">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy/10 text-navy">
            <UserPlus className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <h2 className="mt-3 font-semibold text-charcoal">Add Clients One by One</h2>
          <p className="mt-1 text-sm text-charcoal-light">
            For testing or starting small. Perfect if you want to get a feel for the profile structure.
          </p>
          <div className="mt-4 flex-1">
            <Link
              href="/dashboard/clients/new/manual"
              className="inline-flex w-full justify-center rounded-button border border-border-light bg-white px-4 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-sand-warm"
            >
              Add a Client
            </Link>
            <p className="mt-2 text-xs text-charcoal-light">Best if you&apos;re just exploring.</p>
          </div>
        </div>

        {/* Import CSV - Recommended */}
        <div className="relative flex flex-col rounded-card border border-border-light/80 bg-white p-5 shadow-soft">
          <div className="absolute -top-2 left-4 rounded bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-warning-muted">
            Recommended
          </div>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-accent/15 text-teal-accent">
            <FileText className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <h2 className="mt-3 font-semibold text-charcoal">Import Your Clients in Minutes</h2>
          <p className="mt-1 text-sm text-charcoal-light">
            Upload your full client list using our simple template. Get everyone onboarded instantly.
          </p>
          <div className="mt-4 flex flex-1 flex-col gap-2">
            <button
              type="button"
              onClick={() => setImportModalOpen(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-button bg-navy px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-dark"
            >
              <FileUp className="h-4 w-4" strokeWidth={1.5} />
              Upload CSV
            </button>
            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="inline-flex w-full items-center justify-center gap-2 rounded-button border border-border-light bg-white px-4 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-sand-warm"
            >
              <FileDown className="h-4 w-4" strokeWidth={1.5} />
              Download Template
            </button>
            <p className="mt-0.5 text-xs text-charcoal-light">No formatting headaches. We&apos;ll guide you.</p>
          </div>
        </div>

        {/* White glove */}
        <div className="flex flex-col rounded-card border border-border-light/80 bg-white p-5 shadow-soft">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy/10 text-navy">
            <ConciergeBell className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <h2 className="mt-3 font-semibold text-charcoal">Prefer We Handle It?</h2>
          <p className="mt-1 text-sm text-charcoal-light">
            Send us your client list and we&apos;ll set everything up for you. A true concierge experience.
          </p>
          <div className="mt-4 flex-1">
            <Link
              href="/dashboard/clients/new/white-glove"
              className="inline-flex w-full justify-center rounded-button border border-border-light bg-white px-4 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-sand-warm"
            >
              Request White-Glove Setup
            </Link>
            <p className="mt-2 text-xs text-charcoal-light">Because your time is better spent serving clients.</p>
          </div>
        </div>
      </div>

      {/* What happens next */}
      <div className="mt-16 text-center">
        <h2 className="text-xl font-semibold text-charcoal">What happens next</h2>
        <p className="mt-1 text-sm text-charcoal-light">
          Once your clients are in, Clear Journey works behind the scenes to keep you connected.
        </p>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <div className="flex flex-col items-center rounded-card border border-border-light/80 bg-white p-5 shadow-soft text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy/10 text-navy">
            <FileText className="h-6 w-6" strokeWidth={1.5} />
          </span>
          <h3 className="mt-3 font-semibold text-charcoal">Organized Profiles</h3>
          <p className="mt-1 text-sm text-charcoal-light">
            Every client gets a comprehensive profile with contact details, preferences, and history at your fingertips.
          </p>
        </div>
        <div className="flex flex-col items-center rounded-card border border-border-light/80 bg-white p-5 shadow-soft text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy/10 text-navy">
            <Bell className="h-6 w-6" strokeWidth={1.5} />
          </span>
          <h3 className="mt-3 font-semibold text-charcoal">Timely Reminders</h3>
          <p className="mt-1 text-sm text-charcoal-light">
            Never miss an important date. Get gentle nudges for birthdays, anniversaries, and follow-ups.
          </p>
        </div>
        <div className="flex flex-col items-center rounded-card border border-border-light/80 bg-white p-5 shadow-soft text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy/10 text-navy">
            <Lightbulb className="h-6 w-6" strokeWidth={1.5} />
          </span>
          <h3 className="mt-3 font-semibold text-charcoal">Smart Suggestions</h3>
          <p className="mt-1 text-sm text-charcoal-light">
            Receive intelligent recommendations on the best times to reach out and deepen relationships.
          </p>
        </div>
      </div>

      <ImportClientsModal isOpen={importModalOpen} onClose={() => setImportModalOpen(false)} />
    </div>
  );
}
