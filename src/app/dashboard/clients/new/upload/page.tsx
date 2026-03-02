"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function UploadCsvPage() {
  return (
    <div className="mx-auto max-w-xl">
      <Link
        href="/dashboard/clients/new"
        className="mb-6 inline-flex items-center gap-2 text-sm text-charcoal-light transition-colors hover:text-charcoal"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
        Back to options
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight text-charcoal">
        Upload CSV
      </h1>
      <p className="mt-1.5 text-charcoal-light">
        CSV upload and column mapping flow will go here.
      </p>
    </div>
  );
}
