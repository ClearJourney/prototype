"use client";

import { useState } from "react";
import { X } from "lucide-react";

const LOSS_REASONS = [
  "Price too high",
  "No response",
  "Booked elsewhere",
  "Dates didn't work",
  "Changed plans",
  "Other",
];

type Props = {
  isOpen: boolean;
  opportunityName: string;
  onClose: () => void;
  onConfirm: (reason: string) => void;
};

export function MarkLostModal({
  isOpen,
  opportunityName,
  onClose,
  onConfirm,
}: Props) {
  const [reason, setReason] = useState("");
  const [otherText, setOtherText] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    const value = reason === "Other" ? otherText : reason;
    if (value.trim()) {
      onConfirm(value.trim());
      setReason("");
      setOtherText("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/20 p-4 backdrop-blur-[2px]">
      <div
        className="relative w-full max-w-sm rounded-card bg-white p-6 shadow-soft-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold text-charcoal">Mark as Lost</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-button p-2 text-charcoal-light transition-colors hover:bg-sand-warm hover:text-charcoal"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
        <p className="mt-2 text-sm text-charcoal-light">
          &ldquo;{opportunityName}&rdquo; will move to the Lost column. No next step is required.
        </p>
        <div className="mt-5">
          <label className="mb-1.5 block text-sm font-medium text-charcoal">
            Loss reason <span className="text-error-muted">*</span>
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-button border border-border-light bg-white px-3 py-2.5 text-charcoal focus:outline-none focus:ring-2 focus:ring-navy/15"
          >
            <option value="">Select reason...</option>
            {LOSS_REASONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          {reason === "Other" && (
            <input
              type="text"
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              placeholder="Specify reason"
              className="mt-2 w-full rounded-button border border-border-light bg-white px-3 py-2.5 text-charcoal focus:ring-2 focus:ring-navy/15"
            />
          )}
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-button border border-border-light px-4 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-sand-warm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!reason || (reason === "Other" && !otherText.trim())}
            className="rounded-button bg-error-muted px-4 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50"
          >
            Mark Lost
          </button>
        </div>
      </div>
    </div>
  );
}
