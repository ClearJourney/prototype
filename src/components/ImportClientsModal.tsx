"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X,
  FileDown,
  Upload,
  Check,
  FileText,
  Info,
} from "lucide-react";

const CSV_TEMPLATE = `name,email,phone
Jane Smith,jane@example.com,+1 555 000 0001
John Doe,john@example.com,+1 555 000 0002`;

type Step = 1 | 2 | 3;

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function ImportClientsModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [contactsCount] = useState(142);
  const [errorsCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDownloadTemplate = useCallback(() => {
    const blob = new Blob([CSV_TEMPLATE], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "clear-journey-clients-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const handleFile = useCallback((f: File | null) => {
    if (!f) {
      setFile(null);
      setUploadedFileName("");
      return;
    }
    if (!f.name.toLowerCase().endsWith(".csv")) return;
    setFile(f);
    setUploadedFileName(f.name);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      handleFile(f || null);
      e.target.value = "";
    },
    [handleFile]
  );

  const handleImport = useCallback(() => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2500);
  }, []);

  const handleViewClients = useCallback(() => {
    onClose();
    router.push("/dashboard/clients");
  }, [onClose, router]);

  const handleImportAnother = useCallback(() => {
    setIsSuccess(false);
    setStep(1);
    setFile(null);
    setUploadedFileName("");
  }, []);

  const resetAndClose = useCallback(() => {
    setStep(1);
    setFile(null);
    setUploadedFileName("");
    setIsProcessing(false);
    setIsSuccess(false);
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  // Processing overlay
  if (isProcessing) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/20 p-4 backdrop-blur-[2px]">
        <div className="w-full max-w-sm rounded-card bg-white p-8 shadow-soft-xl text-center">
          <span className="flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-navy/10 text-navy">
            <Upload className="h-7 w-7" strokeWidth={1.5} />
          </span>
          <h2 className="mt-4 text-lg font-semibold text-charcoal">Processing Import</h2>
          <p className="mt-2 text-sm text-charcoal-light">
            We&apos;re securely processing your clients...
          </p>
          <p className="mt-0.5 text-sm text-charcoal-light">
            This usually takes less than 60 seconds.
          </p>
          <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-border-light">
            <div className="h-full w-full animate-pulse rounded-full bg-navy/60" />
          </div>
        </div>
      </div>
    );
  }

  // Success overlay
  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/20 p-4 backdrop-blur-[2px]">
        <div className="relative w-full max-w-sm rounded-card bg-white p-8 shadow-soft-xl text-center">
          <button
            type="button"
            onClick={resetAndClose}
            className="absolute right-4 top-4 rounded-button p-2 text-charcoal-light hover:bg-sand-warm hover:text-charcoal"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <span className="flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-success-muted/15 text-success-muted">
            <Check className="h-7 w-7" strokeWidth={2} />
          </span>
          <h2 className="mt-4 text-lg font-semibold text-charcoal">Your Clients Are Live</h2>
          <p className="mt-2 text-sm text-charcoal-light">
            You can now start setting reminders and personal notes for your newly imported contacts.
          </p>
          <button
            type="button"
            onClick={handleViewClients}
            className="mt-6 w-full rounded-button bg-navy py-3 text-sm font-medium text-white transition-colors hover:bg-navy-dark"
          >
            View Clients →
          </button>
          <button
            type="button"
            onClick={handleImportAnother}
            className="mt-3 text-sm font-medium text-navy hover:underline"
          >
            Import another file
          </button>
        </div>
      </div>
    );
  }

  // Main import steps modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/20 p-4 backdrop-blur-[2px]">
      <div className="relative w-full max-w-lg rounded-card bg-white p-6 shadow-soft-xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-charcoal">Import Your Clients</h2>
            <p className="mt-0.5 text-sm text-charcoal-light">
              Upload your existing client list.
            </p>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="rounded-button p-2 text-charcoal-light hover:bg-sand-warm hover:text-charcoal"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Step indicators */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success-muted/15 text-success-muted">
              <Check className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
            <span className="text-sm font-medium text-charcoal">Step 1 · Download Template</span>
            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="ml-auto text-sm font-medium text-navy hover:underline"
            >
              Re-download
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                step >= 2 ? "bg-success-muted/15 text-success-muted" : "bg-charcoal/10 text-charcoal"
              }`}
            >
              {step >= 2 ? <Check className="h-3.5 w-3.5" strokeWidth={2} /> : "2"}
            </span>
            <span className="text-sm font-medium text-charcoal">Step 2 · Upload Your File</span>
            {file && (
              <button
                type="button"
                onClick={() => handleFile(null)}
                className="ml-auto text-sm font-medium text-navy hover:underline"
              >
                Change file
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                step === 3 ? "bg-navy text-white" : "bg-charcoal/10 text-charcoal"
              }`}
            >
              3
            </span>
            <span className="text-sm font-medium text-charcoal">Step 3 · Confirm Import</span>
          </div>
        </div>

        {/* Step content */}
        {step === 1 && (
          <>
            <div className="mt-6 flex items-start gap-3 rounded-button border border-border-light bg-sand-warm/30 p-3">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-success-muted/15 text-success-muted">
                <Check className="h-3 w-3" strokeWidth={2} />
              </span>
              <p className="text-sm text-charcoal-light">Only name and email are required to start.</p>
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={handleDownloadTemplate}
                className="inline-flex items-center gap-2 rounded-button border border-border-light bg-white px-4 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-sand-warm"
              >
                <FileDown className="h-4 w-4" strokeWidth={1.5} />
                Download CSV Template
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="mt-6">
            <label
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative flex flex-col items-center justify-center rounded-button border-2 border-dashed py-10 transition-colors ${
                isDragging ? "border-navy/40 bg-navy/5" : "border-border-light hover:border-charcoal-light/50"
              }`}
            >
              <Upload className="h-10 w-10 text-charcoal-light" strokeWidth={1.5} />
              <p className="mt-2 text-sm font-medium text-charcoal">
                Drag and drop your file here
              </p>
              <p className="mt-0.5 text-sm text-charcoal-light">or click to browse</p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-charcoal-light">
                <FileText className="h-3.5 w-3.5" strokeWidth={1.5} />
                CSV files up to 10MB
              </p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileInput}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
            </label>
          </div>
        )}

        {step === 3 && (
          <div className="mt-6 rounded-button border border-border-light bg-sand-warm/30 p-4 text-center">
            <span className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-success-muted/15 text-success-muted">
              <Check className="h-6 w-6" strokeWidth={2} />
            </span>
            <p className="mt-2 font-medium text-charcoal">Ready to import</p>
            <div className="mt-2 flex items-center justify-center gap-2 rounded-button bg-white py-2 px-3">
              <FileText className="h-4 w-4 text-charcoal-light" strokeWidth={1.5} />
              <span className="text-sm font-medium text-charcoal">{uploadedFileName || "clients_import.csv"}</span>
            </div>
            <div className="mt-3 flex items-center justify-center gap-4 text-sm">
              <span className="font-medium text-charcoal">CONTACTS: {contactsCount}</span>
              <span className="flex items-center gap-1 font-medium text-success-muted">
                ERRORS: {errorsCount}
                <span className="h-1.5 w-1.5 rounded-full bg-success-muted" />
              </span>
            </div>
            <p className="mt-2 text-xs text-charcoal-light">
              We&apos;ve validated your file. Your client list will be updated securely in the background.
            </p>
          </div>
        )}

        {/* White-glove section removed per updated copy requirements */}

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-border-light pt-4">
          <button
            type="button"
            onClick={resetAndClose}
            className="text-sm font-medium text-charcoal-light hover:text-charcoal"
          >
            Cancel
          </button>
          <div className="flex gap-2">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as Step)}
                className="rounded-button border border-border-light bg-white px-4 py-2 text-sm font-medium text-charcoal hover:bg-sand-warm"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={() => (step === 1 ? setStep(2) : file && setStep(3))}
                disabled={step === 2 && !file}
                className="rounded-button bg-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-dark disabled:opacity-50"
              >
                {step === 1 ? "Next" : "Continue →"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleImport}
                className="rounded-button bg-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-dark"
              >
                Import Clients →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
