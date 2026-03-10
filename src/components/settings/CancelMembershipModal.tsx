"use client";

import { useState } from "react";
import { X } from "lucide-react";

type Step = 1 | 2;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  accessEndDate: string; // e.g. "March 15, 2026"
  onConfirmCancellation: () => void;
  /** Called when user chooses "Claim 30-Day Extension" */
  onClaimExtension?: () => void;
  /** Called when user chooses "Switch to 50% Off" */
  onSwitchToDiscount?: () => void;
  /** URL to open when user chooses "Book a 15-Min Call" (opens in new tab) */
  bookingLink?: string;
};

const RETENTION_OPTIONS = [
  {
    id: "extension" as const,
    title: "Claim 30-Day Extension",
    description: "Take another month on us while you decide.",
  },
  {
    id: "discount" as const,
    title: "Switch to 50% Off",
    description: "Stay with Clear Journey at half price for the next three months.",
  },
  {
    id: "call" as const,
    title: "Book a 15-Min Call",
    description: "If something isn't working as expected, we'd be happy to help.",
  },
];

export function CancelMembershipModal({
  isOpen,
  onClose,
  accessEndDate,
  onConfirmCancellation,
  onClaimExtension,
  onSwitchToDiscount,
  bookingLink,
}: Props) {
  const [step, setStep] = useState<Step>(1);

  if (!isOpen) return null;

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  const handleConfirm = () => {
    onConfirmCancellation();
    handleClose();
  };

  const handleOptionClick = (option: (typeof RETENTION_OPTIONS)[number]) => {
    if (option.id === "extension") onClaimExtension?.();
    else if (option.id === "discount") onSwitchToDiscount?.();
    else if (option.id === "call" && bookingLink) {
      window.open(bookingLink, "_blank", "noopener,noreferrer");
    }
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
            {step === 2 && "Confirm cancellation"}
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

        {/* Step 1: Retention options */}
        {step === 1 && (
          <>
            <p className="mt-3 text-sm text-charcoal-light">
              Before you cancel, here are a few options that may help.
            </p>
            <div className="mt-6 space-y-3">
              {RETENTION_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleOptionClick(option)}
                  className="block w-full rounded-card border border-border-light bg-white px-4 py-3.5 text-left transition-colors hover:border-charcoal-light/30 hover:bg-sand-warm/50"
                >
                  <span className="block text-sm font-medium text-charcoal">
                    {option.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-charcoal-light">
                    {option.description}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-6 border-t border-border-light pt-5">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs text-charcoal-light underline decoration-charcoal-light/50 hover:text-charcoal hover:decoration-charcoal"
              >
                Continue to cancel
              </button>
            </div>
          </>
        )}

        {/* Step 2: Final confirmation */}
        {step === 2 && (
          <>
            <p className="mt-3 text-sm text-charcoal-light">
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
