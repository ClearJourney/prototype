"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { getDatePlaceholder, getPreferences } from "@/lib/preferences";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: {
    clientName: string;
    interestNote: string;
    followUpDate: string;
    email: string;
    phone: string;
  }) => void;
};

export function AddProspectModal({ isOpen, onClose, onSave }: Props) {
  const [clientName, setClientName] = useState("");
  const [interestNote, setInterestNote] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSave = () => {
    onSave?.({
      clientName,
      interestNote,
      followUpDate,
      email,
      phone,
    });
    setClientName("");
    setInterestNote("");
    setFollowUpDate("");
    setEmail("");
    setPhone("");
    onClose();
  };

  if (!isOpen) return null;

  const inputClass =
    "w-full rounded-button border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/15 focus:border-navy/30 transition-colors";
  const labelClass = "mb-1.5 block text-sm font-medium text-charcoal";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/20 p-4 backdrop-blur-[2px]">
      <div
        className="relative w-full max-w-md rounded-card bg-white p-6 shadow-soft-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-charcoal">Add Prospect</h2>
            <p className="mt-0.5 text-sm text-charcoal-light">
              Quickly capture potential clients for future follow-up
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-button p-2 text-charcoal-light transition-colors hover:bg-sand-warm hover:text-charcoal"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label className={labelClass}>
              Client Name <span className="text-error-muted">*</span>
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Johnson Family"
              className={`${inputClass} border-amber-200/80 focus:ring-amber-400/20`}
            />
          </div>

          <div>
            <label className={labelClass}>
              Interest / Note <span className="text-error-muted">*</span>
            </label>
            <textarea
              value={interestNote}
              onChange={(e) => setInterestNote(e.target.value)}
              placeholder="e.g. Interested in Japan next year, wants boutique hotels."
              rows={3}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Follow-Up Date (Optional)</label>
            <input
              type="text"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              placeholder={getDatePlaceholder(getPreferences().dateFormat)}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Email (Optional)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Phone (Optional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-button border border-border-light bg-white px-4 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-sand-warm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-button bg-navy px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-dark"
          >
            Save Prospect
          </button>
        </div>
      </div>
    </div>
  );
}
