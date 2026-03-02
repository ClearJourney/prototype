"use client";

import { useState, useRef } from "react";

type Step = 1 | 2 | 3 | "processing" | "success";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export function ImportClientsModal({ isOpen, onClose, onSuccess }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [file, setFile] = useState<File | null>(null);
  const [contactsCount, setContactsCount] = useState(0);
  const [errorsCount, setErrorsCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setContactsCount(142);
      setErrorsCount(0);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f && f.name.endsWith(".csv")) {
      setFile(f);
      setContactsCount(142);
      setErrorsCount(0);
    }
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const downloadTemplate = () => {
    const headers = ["name", "email", "phone", "notes"];
    const csv = [headers.join(",")].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "clear-journey-clients-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const goToStep2 = () => setStep(2);
  const goToStep3 = () => setStep(3);
  const startImport = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
    }, 2500);
  };
  const finishSuccess = () => {
    setStep(1);
    setFile(null);
    onClose();
    onSuccess?.();
  };
  const importAnother = () => {
    setStep(1);
    setFile(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-charcoal-light hover:text-charcoal"
          aria-label="Close"
        >
          ×
        </button>

        <h2 className="text-xl font-bold text-charcoal">
          Import Your Clients
        </h2>
        <p className="mt-1 text-sm text-charcoal-light">
          Bring your existing client list into Clear Journey.
        </p>

        {/* Processing state */}
        {step === "processing" && (
          <div className="mt-8 flex flex-col items-center py-8">
            <div className="mb-4 h-16 w-16 rounded-full bg-charcoal-light/20 flex items-center justify-center text-3xl">
              ☁️
            </div>
            <h3 className="text-lg font-semibold text-charcoal">
              Processing Import
            </h3>
            <p className="mt-2 text-center text-sm text-charcoal-light">
              We&apos;re securely processing your clients...
            </p>
            <p className="text-sm text-charcoal-light">
              This usually takes less than 60 seconds.
            </p>
            <div className="mt-6 h-1 w-full rounded-full bg-charcoal-light/20 overflow-hidden">
              <div className="h-full w-1/3 animate-pulse rounded-full bg-charcoal-light/50" />
            </div>
          </div>
        )}

        {/* Success state */}
        {step === "success" && (
          <div className="mt-8 flex flex-col items-center py-4">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/20 text-2xl text-success">
              ✓
            </div>
            <h3 className="text-xl font-bold text-charcoal">
              Your Clients Are Live
            </h3>
            <p className="mt-2 text-center text-sm text-charcoal-light">
              You can now start setting reminders and personal notes for your
              newly imported contacts.
            </p>
            <button
              type="button"
              onClick={finishSuccess}
              className="mt-6 w-full rounded-lg bg-navy py-3 font-medium text-white hover:bg-navy-dark"
            >
              View Clients →
            </button>
            <button
              type="button"
              onClick={importAnother}
              className="mt-3 text-sm text-charcoal-light underline hover:text-charcoal"
            >
              Import another file
            </button>
          </div>
        )}

        {/* Steps 1–3 */}
        {(step === 1 || step === 2 || step === 3) && (
          <>
            <div className="mt-6 space-y-4">
              {/* Step 1 */}
              <div className="flex items-start gap-3">
                {step > 1 ? (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success text-xs text-white">
                    ✓
                  </span>
                ) : (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-charcoal-light/30 text-xs font-medium text-charcoal">
                    1
                  </span>
                )}
                <div className="flex-1">
                  <p className="font-medium text-charcoal">
                    Step 1 — Download Template
                  </p>
                  <button
                    type="button"
                    onClick={downloadTemplate}
                    className="mt-1 text-sm text-charcoal-light underline hover:text-charcoal"
                  >
                    {step > 1 ? "Re-download" : "Download CSV Template"}
                  </button>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3">
                {step > 2 ? (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success text-xs text-white">
                    ✓
                  </span>
                ) : (
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                      step === 2
                        ? "border-2 border-charcoal bg-white text-charcoal"
                        : "bg-charcoal-light/30 text-charcoal"
                    }`}
                  >
                    2
                  </span>
                )}
                <div className="flex-1">
                  <p className="font-medium text-charcoal">
                    Step 2 — Upload Your Completed File
                  </p>
                  {step === 2 && (
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border-light py-8 hover:border-charcoal-light/50"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <span className="text-4xl">☁️</span>
                      <p className="mt-2 text-charcoal">
                        Drag and drop your file here
                      </p>
                      <p className="text-sm text-charcoal-light underline">
                        or click to browse
                      </p>
                      <span className="mt-2 rounded bg-charcoal-light/10 px-2 py-1 text-xs text-charcoal-light">
                        .CSV FILES ONLY
                      </span>
                    </div>
                  )}
                  {step === 3 && file && (
                    <button
                      type="button"
                      className="mt-1 text-sm text-charcoal-light underline"
                    >
                      Change file
                    </button>
                  )}
                </div>
              </div>

              {/* Step 3 */}
              {(step === 2 || step === 3) && (
                <div className="flex items-start gap-3">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                      step === 3
                        ? "border-2 border-charcoal bg-white text-charcoal"
                        : "bg-charcoal-light/30 text-charcoal"
                    }`}
                  >
                    3
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-charcoal">
                      Step 3 — Confirm Import
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Step 3 content */}
            {step === 3 && (
              <div className="mt-6 rounded-lg bg-sand-warm p-4 text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-success/20 text-xl text-success">
                  ✓
                </div>
                <p className="font-semibold text-charcoal">Ready to import</p>
                <p className="mt-1 text-sm text-charcoal-light">
                  {file?.name ?? "clients_import_v2.csv"}
                </p>
                <div className="mt-3 flex justify-center gap-6 text-sm">
                  <span>
                    <span className="text-charcoal-light">CONTACTS:</span>{" "}
                    {contactsCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-charcoal-light">ERRORS:</span>{" "}
                    {errorsCount}
                    <span className="h-2 w-2 rounded-full bg-success" />
                  </span>
                </div>
                <p className="mt-2 text-xs text-charcoal-light">
                  We&apos;ve validated your file and everything looks perfect.
                </p>
              </div>
            )}

            {/* White-glove */}
            <div className="mt-6 flex gap-2 rounded-lg bg-sand-warm/50 p-3">
              <span className="text-charcoal-light">ℹ️</span>
              <p className="text-sm text-charcoal-light">
                Prefer a white-glove service? Our Concierge Team can handle the
                formatting and import for you.{" "}
                <button
                  type="button"
                  className="underline hover:text-charcoal"
                >
                  Request White-Glove Setup
                </button>
              </p>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-4 py-2 text-charcoal-light hover:bg-sand-warm"
              >
                Cancel
              </button>
              {step === 3 ? (
                <button
                  type="button"
                  onClick={startImport}
                  className="rounded-lg bg-navy px-4 py-2 font-medium text-white hover:bg-navy-dark"
                >
                  Import Clients →
                </button>
              ) : step === 2 ? (
                <>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-lg bg-sand-warm px-4 py-2 font-medium text-charcoal"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={goToStep3}
                    disabled={!file}
                    className="rounded-lg bg-navy px-4 py-2 font-medium text-white hover:bg-navy-dark disabled:opacity-50"
                  >
                    Import Clients →
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={goToStep2}
                  className="rounded-lg bg-navy px-4 py-2 font-medium text-white hover:bg-navy-dark"
                >
                  Next
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
