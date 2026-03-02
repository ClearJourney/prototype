"use client";

import { useState } from "react";
import { X } from "lucide-react";

const CANCELLATION_REASONS = [
  "Not using it enough",
  "Too expensive",
  "Missing features",
  "Switching systems",
  "Other",
];

type Step = 1 | 2 | 3;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  accessEndDate: string; // e.g. "March 15, 2026"
  onConfirmCancellation: () => void;
};

export function CancelMembershipModal({
  isOpen,
  onClose,
  accessEndDate,
  onConfirmCancellation,
}: Props) {
  const [step, setStep] = useState<Step>(1);
  const [reason, setReason] = useState("");
  const [otherText, setOtherText] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    setStep(1);
    setReason("");
    setOtherText("");
    onClose();
  };

  const handleConfirm = () => {
    onConfirmCancellation();
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/20 p-4 backdrop-blur-[2px]">
      <div
        className="relative w-full max-w-md rounded-card bg-white p-6 shadow-soft-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold text-charcoal">
            {step === 1 && "We'd hate to see you go."}
            {step === 2 && "What's the main reason you're cancelling?"}
            {step === 3 && "Confirm cancellation"}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-button p-2 text-charcoal-light transition-colors hover:bg-sand-warm hover:text-charcoal"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Step 1: Retention offers */}
        {step === 1 && (
          <>
            <p className="mt-2 text-sm text-charcoal-light">
              Before you cancel, here are a few options that may help.
            </p>
            <div className="mt-6 space-y-3">
              <button
                type="button"
                className="block w-full rounded-button border border-border-light bg-white px-4 py-3 text-left text-sm font-medium text-charcoal transition-colors hover:bg-sand-warm"
              >
                Claim 30-Day Extension
              </button>
              <button
                type="button"
                className="block w-full rounded-button border border-border-light bg-white px-4 py-3 text-left text-sm font-medium text-charcoal transition-colors hover:bg-sand-warm"
              >
                Switch to 50% Off
              </button>
              <button
                type="button"
                className="block w-full rounded-button border border-border-light bg-white px-4 py-3 text-left text-sm font-medium text-charcoal transition-colors hover:bg-sand-warm"
              >
                Book a 15-Min Call
              </button>
            </div>
            <div className="mt-6 border-t border-border-light pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-sm text-charcoal-light underline hover:text-charcoal"
              >
                Continue to cancel
              </button>
            </div>
          </>
        )}

        {/* Step 2: Reason capture */}
        {step === 2 && (
          <>
            <div className="mt-5 space-y-2">
              {CANCELLATION_REASONS.map((r) => (
                <label
                  key={r}
                  className="flex cursor-pointer items-center gap-3 rounded-button border border-border-light bg-white px-3 py-2.5 has-[:checked]:border-navy/30 has-[:checked]:bg-navy/5"
                >
                  <input
                    type="radio"
                    name="reason"
                    value={r}
                    checked={reason === r}
                    onChange={() => setReason(r)}
                    className="h-4 w-4 border-border-light text-navy focus:ring-navy/20"
                  />
                  <span className="text-sm text-charcoal">{r}</span>
                </label>
              ))}
            </div>
            {reason === "Other" && (
              <textarea
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
                placeholder="Please specify"
                rows={2}
                className="mt-3 w-full rounded-button border border-border-light bg-white px-3 py-2.5 text-sm text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:ring-2 focus:ring-navy/15"
              />
            )}
            <div className="mt-6 flex justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-button border border-border-light px-4 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-sand-warm"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={!reason || (reason === "Other" && !otherText.trim())}
                className="rounded-button bg-navy px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-dark disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <>
            <p className="mt-2 text-sm text-charcoal-light">
              Your access will remain active until {accessEndDate}.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-button border border-border-light px-4 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-sand-warm"
              >
                Keep Membership
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-button bg-error-muted px-4 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
              >
                Confirm Cancellation
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
