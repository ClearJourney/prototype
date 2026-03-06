"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { MarkLostModal } from "./MarkLostModal";
import { getDatePlaceholder, getPreferences } from "@/lib/preferences";

const NEXT_STEP_OPTIONS = [
  "Call",
  "Email",
  "Meeting",
  "Send Proposal",
  "Collect Payment",
  "Reminder / Check-in",
  "Other",
];

export type OpportunityDetail = {
  id: string;
  clientName: string;
  tripName: string;
  value: string;
  valueNum: number;
  stageId: string;
  stageName: string;
  nextStep: string | null;
  nextStepDue?: string;
  daysInStage: number;
  initials: string;
  avatarColor: string;
  when?: string;
  duration?: string;
  where?: string;
  budget?: string;
  partySize?: string;
  decisionMaker?: string;
  notes?: string;
  travelers?: { name: string; role: string }[];
};

type Props = {
  opportunity: OpportunityDetail | null;
  onClose: () => void;
  onMarkDone: (id: string) => void;
  onSaveNextStep: (id: string, action: string, dueDate: string) => void;
  onMarkLost: (id: string, reason: string) => void;
  onMarkWon: (id: string) => void;
};

export function OpportunityDrawer({
  opportunity,
  onClose,
  onMarkDone,
  onSaveNextStep,
  onMarkLost,
  onMarkWon,
}: Props) {
  const [showAddNextStep, setShowAddNextStep] = useState(false);
  const [nextStepAction, setNextStepAction] = useState("");
  const [nextStepDue, setNextStepDue] = useState("");
  const [showMarkLostModal, setShowMarkLostModal] = useState(false);

  if (!opportunity) return null;

  const hasNoNextStep =
    !opportunity.nextStep || opportunity.nextStep === "No next step set";
  const isClosed = opportunity.stageId === "completed" || opportunity.stageId === "lost";

  const handleMarkDone = () => {
    onMarkDone(opportunity.id);
    setShowAddNextStep(true);
    setNextStepAction("");
    setNextStepDue("");
  };

  const handleSaveNextStep = () => {
    if (nextStepAction.trim()) {
      onSaveNextStep(opportunity.id, nextStepAction.trim(), nextStepDue);
      setShowAddNextStep(false);
    }
  };

  const inputClass =
    "w-full rounded-button border border-border-light bg-white px-3 py-2 text-sm text-charcoal placeholder-charcoal-light focus:outline-none focus:ring-2 focus:ring-navy/15";

  return (
    <>
      <div className="fixed inset-y-0 right-0 z-40 w-full max-w-md overflow-y-auto bg-white shadow-soft-xl">
        <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-border-light/80 bg-white p-5">
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-lg font-semibold text-charcoal">
              {opportunity.tripName || opportunity.clientName}
            </h2>
            <p className="mt-0.5 text-sm text-charcoal-light">{opportunity.clientName}</p>
            <p className="mt-0.5 text-xs text-charcoal-light">
              {opportunity.stageName} · {opportunity.value}
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

        <div className="space-y-6 p-5">
          <section>
            <h3 className="text-sm font-semibold text-charcoal">Next Step</h3>
            {hasNoNextStep && !isClosed && (
              <div className="mt-2 rounded-button border border-amber-200/80 bg-amber-50/60 px-3 py-2.5 text-sm text-warning-muted">
                This opportunity has no next step. Add one to keep it moving.
              </div>
            )}
            {!hasNoNextStep && opportunity.nextStep && (
              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="text-sm text-charcoal">
                  {opportunity.nextStep}
                  {opportunity.nextStepDue && (
                    <span className="text-charcoal-light"> · Due {opportunity.nextStepDue}</span>
                  )}
                </p>
                {!isClosed && (
                  <button
                    type="button"
                    onClick={handleMarkDone}
                    className="rounded-button bg-teal-accent/15 px-3 py-1.5 text-sm font-medium text-teal-accent transition-colors hover:bg-teal-accent/25"
                  >
                    Mark Done
                  </button>
                )}
              </div>
            )}
            {showAddNextStep && (
              <div className="mt-3 rounded-button bg-sand-warm/50 p-3">
                <p className="mb-2 text-sm font-medium text-charcoal">
                  What&apos;s the next step?
                </p>
                <select
                  value={nextStepAction}
                  onChange={(e) => setNextStepAction(e.target.value)}
                  className={`${inputClass} mb-2`}
                >
                  <option value="">Select action type...</option>
                  {NEXT_STEP_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={nextStepDue}
                  onChange={(e) => setNextStepDue(e.target.value)}
                  placeholder={getDatePlaceholder(getPreferences().dateFormat)}
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={handleSaveNextStep}
                  disabled={!nextStepAction.trim()}
                  className="mt-3 rounded-button bg-navy px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-dark disabled:opacity-50"
                >
                  Save Next Step
                </button>
              </div>
            )}
            {!showAddNextStep && hasNoNextStep && !isClosed && (
              <button
                type="button"
                onClick={() => setShowAddNextStep(true)}
                className="mt-2 text-sm font-medium text-navy hover:underline"
              >
                + Add next step
              </button>
            )}
          </section>

          <section>
            <h3 className="text-sm font-semibold text-charcoal">Key Details</h3>
            <dl className="mt-2 space-y-1.5 text-sm">
              {opportunity.when && (
                <>
                  <dt className="text-charcoal-light">When</dt>
                  <dd className="text-charcoal">{opportunity.when}</dd>
                </>
              )}
              {opportunity.duration && (
                <>
                  <dt className="text-charcoal-light">Duration</dt>
                  <dd className="text-charcoal">{opportunity.duration}</dd>
                </>
              )}
              {opportunity.where && (
                <>
                  <dt className="text-charcoal-light">Where</dt>
                  <dd className="text-charcoal">{opportunity.where}</dd>
                </>
              )}
              {opportunity.budget && (
                <>
                  <dt className="text-charcoal-light">Budget</dt>
                  <dd className="text-charcoal">{opportunity.budget}</dd>
                </>
              )}
              {opportunity.partySize && (
                <>
                  <dt className="text-charcoal-light">Party Size</dt>
                  <dd className="text-charcoal">{opportunity.partySize}</dd>
                </>
              )}
              {opportunity.decisionMaker && (
                <>
                  <dt className="text-charcoal-light">Decision Maker</dt>
                  <dd className="text-charcoal">{opportunity.decisionMaker}</dd>
                </>
              )}
              {!opportunity.when && !opportunity.where && (
                <dd className="text-charcoal-light">No key details yet.</dd>
              )}
            </dl>
          </section>

          {opportunity.notes && (
            <section>
              <h3 className="text-sm font-semibold text-charcoal">Notes</h3>
              <p className="mt-1 text-sm text-charcoal-light">{opportunity.notes}</p>
            </section>
          )}

          <section>
            <h3 className="text-sm font-semibold text-charcoal">Travelers</h3>
            {opportunity.travelers && opportunity.travelers.length > 0 ? (
              <ul className="mt-2 space-y-1 text-sm text-charcoal">
                {opportunity.travelers.map((t, i) => (
                  <li key={i}>
                    {t.name} · {t.role}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-sm text-charcoal-light">No travelers added.</p>
            )}
            <button type="button" className="mt-2 text-sm font-medium text-navy hover:underline">
              + Add Member
            </button>
          </section>

          {!isClosed && (
            <div className="flex gap-2 border-t border-border-light/80 pt-5">
              <button
                type="button"
                onClick={() => setShowMarkLostModal(true)}
                className="flex-1 rounded-button bg-error-muted/90 py-2.5 text-sm font-medium text-white transition-colors hover:bg-error-muted"
              >
                Mark Lost
              </button>
              <button
                type="button"
                onClick={() => onMarkWon(opportunity.id)}
                className="flex-1 rounded-button bg-success-muted py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
              >
                Mark Won
              </button>
            </div>
          )}
        </div>
      </div>

      <MarkLostModal
        isOpen={showMarkLostModal}
        opportunityName={opportunity.tripName || opportunity.clientName}
        onClose={() => setShowMarkLostModal(false)}
        onConfirm={(reason) => {
          onMarkLost(opportunity.id, reason);
          setShowMarkLostModal(false);
          onClose();
        }}
      />
    </>
  );
}
