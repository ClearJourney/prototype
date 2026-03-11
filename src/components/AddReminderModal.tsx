"use client";

import { useState } from "react";
import { X } from "lucide-react";

export type AddReminderPayload = {
  title: string;
  due_date: string;
  notes?: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AddReminderPayload) => void;
};

export function AddReminderModal({ isOpen, onClose, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle || !dueDate) return;
    onSave({
      title: trimmedTitle,
      due_date: dueDate,
      notes: notes.trim() || undefined,
    });
    setTitle("");
    setDueDate("");
    setNotes("");
    onClose();
  };

  const handleClose = () => {
    setTitle("");
    setDueDate("");
    setNotes("");
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose();
  };

  if (!isOpen) return null;

  const inputClass =
    "w-full rounded-button border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/15 focus:border-navy/30 transition-colors";
  const labelClass = "mb-1.5 block text-sm font-medium text-charcoal";
  const isValid = title.trim().length > 0 && dueDate.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/20 p-4 backdrop-blur-[2px]"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-reminder-modal-title"
    >
      <div
        className="relative w-full max-w-md rounded-card bg-white p-6 shadow-soft-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h2 id="add-reminder-modal-title" className="text-lg font-semibold text-charcoal">
            Add Reminder
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

        <div className="mt-6 space-y-5">
          <div>
            <label className={labelClass} htmlFor="reminder-title">
              Reminder title
            </label>
            <input
              id="reminder-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Follow up on Japan trip"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="reminder-due-date">
              Due date
            </label>
            <input
              id="reminder-due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="reminder-notes">
              Notes (optional)
            </label>
            <textarea
              id="reminder-notes"
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
            onClick={handleClose}
            className="rounded-button border border-border-light bg-white px-4 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-sand-warm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!isValid}
            className="rounded-button bg-navy px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Reminder
          </button>
        </div>
      </div>
    </div>
  );
}
