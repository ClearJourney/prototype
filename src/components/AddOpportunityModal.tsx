"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const STAGES = [
  "Inquiry",
  "Research",
  "Proposal Sent",
  "Deposit IN",
  "Balance Due",
  "Travel",
  "Completed",
];

const NEXT_STEPS = [
  "Call",
  "Email",
  "Meeting",
  "Send Proposal",
  "Collect Payment",
  "Reminder / Check-in",
  "Other",
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  defaultStage?: string;
  initialValues?: { clientName?: string; tripName?: string; notes?: string };
  onSave?: (data: OpportunityFormData) => void;
};

export type OpportunityFormData = {
  client: string;
  tripName: string;
  value: string;
  currency: string;
  stage: string;
  nextStep: string;
  date: string;
  time: string;
  notes: string;
};

export function AddOpportunityModal({
  isOpen,
  onClose,
  defaultStage = "Inquiry",
  initialValues,
  onSave,
}: Props) {
  const [client, setClient] = useState(initialValues?.clientName ?? "");
  const [tripName, setTripName] = useState(initialValues?.tripName ?? "");
  const [value, setValue] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [stage, setStage] = useState(defaultStage);
  const [nextStep, setNextStep] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState(initialValues?.notes ?? "");

  useEffect(() => {
    if (isOpen) {
      if (initialValues) {
        setClient(initialValues.clientName ?? "");
        setTripName(initialValues.tripName ?? "");
        setNotes(initialValues.notes ?? "");
      }
      setStage(defaultStage);
    } else {
      setClient("");
      setTripName("");
      setValue("");
      setNextStep("");
      setDate("");
      setTime("");
      setNotes("");
    }
  }, [isOpen, defaultStage, initialValues?.clientName, initialValues?.tripName, initialValues?.notes]);

  const handleSave = () => {
    onSave?.({
      client,
      tripName,
      value,
      currency,
      stage,
      nextStep,
      date,
      time,
      notes,
    });
    setClient("");
    setTripName("");
    setValue("");
    setNextStep("");
    setDate("");
    setTime("");
    setNotes("");
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
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-charcoal">Add Opportunity</h2>
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
            <label className={labelClass}>Client</label>
            <input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="Search existing clients..."
              className={inputClass}
            />
            <button type="button" className="mt-1.5 text-sm font-medium text-navy hover:underline">
              + New Client
            </button>
          </div>

          <div>
            <label className={labelClass}>Trip Name</label>
            <input
              type="text"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              placeholder="e.g., Thompson Family Safari"
              className={inputClass}
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className={labelClass}>Value</label>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g., 12,500"
                className={inputClass}
              />
            </div>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-7 rounded-button border border-border-light bg-white px-3 py-2.5 text-charcoal focus:outline-none focus:ring-2 focus:ring-navy/15"
            >
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Stage</label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className={inputClass}
            >
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>
              Next Step <span className="text-error-muted">*</span>
            </label>
            <select
              value={nextStep}
              onChange={(e) => setNextStep(e.target.value)}
              className={inputClass}
            >
              <option value="">Select next step...</option>
              {NEXT_STEPS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="dd/mm/yyyy"
                className="flex-1 rounded-button border border-border-light bg-white px-3 py-2 text-sm text-charcoal placeholder-charcoal-light focus:ring-2 focus:ring-navy/15"
              />
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="--:--"
                className="w-24 rounded-button border border-border-light bg-white px-3 py-2 text-sm text-charcoal placeholder-charcoal-light focus:ring-2 focus:ring-navy/15"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes..."
              rows={3}
              className={inputClass}
            />
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
            Save & Add
          </button>
        </div>
      </div>
    </div>
  );
}
