"use client";

import { useState, useCallback } from "react";
import { X, Upload, FileText } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function WhiteGloveImportModal({ isOpen, onClose }: Props) {
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const resetAndClose = useCallback(() => {
    setFullName("");
    setBusinessName("");
    setEmail("");
    setPhone("");
    setFile(null);
    setNotes("");
    setIsSubmitting(false);
    setIsSubmitted(false);
    onClose();
  }, [onClose]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    e.target.value = "";
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isSubmitting) return;
      setIsSubmitting(true);

      // Placeholder async behavior to match existing UX patterns
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1200);
    },
    [isSubmitting]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/20 p-4 backdrop-blur-[2px]">
      <div className="relative w-full max-w-lg rounded-card bg-white p-6 shadow-soft-xl">
        <button
          type="button"
          onClick={resetAndClose}
          className="absolute right-4 top-4 rounded-button p-2 text-charcoal-light hover:bg-sand-warm hover:text-charcoal"
          aria-label="Close"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-semibold text-charcoal">White Glove Import</h2>
            <p className="mt-0.5 text-sm text-charcoal-light">
              Upload your client list and our team will take care of the setup.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-medium tracking-wide text-charcoal-light">
                  Full name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 w-full rounded-button border border-border-light bg-white px-3 py-2 text-sm text-charcoal outline-none focus:border-navy"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium tracking-wide text-charcoal-light">
                  Company name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="mt-1 w-full rounded-button border border-border-light bg-white px-3 py-2 text-sm text-charcoal outline-none focus:border-navy"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium tracking-wide text-charcoal-light">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-button border border-border-light bg-white px-3 py-2 text-sm text-charcoal outline-none focus:border-navy"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium tracking-wide text-charcoal-light">
                    Phone number
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full rounded-button border border-border-light bg-white px-3 py-2 text-sm text-charcoal outline-none focus:border-navy"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium tracking-wide text-charcoal-light">
                  File upload
                </label>
                <div className="mt-1 relative">
                  <label className="flex cursor-pointer items-center justify-between gap-3 rounded-button border border-border-light bg-sand-warm/30 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-charcoal-light">
                        <Upload className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                      <div className="text-xs">
                        <p className="font-medium text-charcoal">
                          {file ? file.name : "Choose a file"}
                        </p>
                        <p className="mt-0.5 text-[11px] text-charcoal-light">
                          CSV, XLSX, XLS, PDF
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-navy">Browse</span>
                    <input
                      type="file"
                      accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/pdf"
                      onChange={handleFileInput}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    />
                  </label>
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-charcoal-light">
                  <FileText className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Upload your client list — spreadsheet, CRM export, CSV or Excel. Our team will handle the formatting.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium tracking-wide text-charcoal-light">
                  Optional notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="mt-1 w-full resize-none rounded-button border border-border-light bg-white px-3 py-2 text-sm text-charcoal outline-none focus:border-navy"
                  placeholder="Anything we should know about your client list?"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-border-light pt-4">
              <button
                type="button"
                onClick={resetAndClose}
                className="text-sm font-medium text-charcoal-light hover:text-charcoal"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-button bg-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-dark disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Request"}
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h2 className="text-lg font-semibold text-charcoal">Thanks — we&apos;ve received your request</h2>
            <p className="mt-2 text-sm text-charcoal-light">
              Our team will review your file and help set everything up. We&apos;ll be in touch shortly.
            </p>
            <div className="mt-6 flex justify-end border-t border-border-light pt-4">
              <button
                type="button"
                onClick={resetAndClose}
                className="rounded-button bg-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-dark"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

