"use client";

import { useState } from "react";
import { X, Headphones } from "lucide-react";

const SUGGESTED_QUESTIONS: ((name: string) => string)[] = [
  (name) => `Summarise notes for ${name}`,
  (name) => `What are ${name}'s key travel preferences?`,
  () => "What did they enjoy the most on their last trip?",
  () => "Any upcoming dates I should know about?",
  (name) => `What's the next best step with ${name}?`,
  () => "Any useful tags or labels to remember?",
];

const MOCK_RESPONSES: Record<number, (name: string) => string> = {
  0: (name) =>
    `${name} prefers boutique stays and more intimate, curated experiences. Past notes suggest they value thoughtful service and trips that feel personal rather than generic.`,
  1: (name) =>
    `They prefer luxury boutique hotels, king beds, and quieter, more intimate settings. Dining and cultural experiences appear to matter more than fast-paced itineraries.`,
  2: () =>
    `They seemed to respond best to private, more personal experiences rather than large group activities. Notes suggest they especially valued tailored touches and local experiences.`,
  3: () =>
    `There's an upcoming key date saved on this profile. It may be a good time to check in with something thoughtful or timely.`,
  4: (name) =>
    `A gentle follow-up would make sense next, especially if there's an active reminder or recent trip discussion. A tailored check-in tied to their preferences would likely feel most relevant.`,
  5: () =>
    `This client appears suited to tags like VIP, celebration travel, or luxury-focused preferences depending on the profile data shown.`,
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
};

export function ConciergeAssistantPanel({
  isOpen,
  onClose,
  clientName,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const questions = SUGGESTED_QUESTIONS.map((fn) => fn(clientName));

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-charcoal/10 backdrop-blur-[2px]"
        aria-hidden
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="concierge-panel-title"
        className="fixed bottom-6 right-6 z-50 w-full max-w-md rounded-card border border-border-light bg-white p-6 shadow-soft-xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <span
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-champagne text-navy"
              aria-hidden
            >
              <Headphones className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <div className="min-w-0">
              <h2
                id="concierge-panel-title"
                className="text-lg font-semibold text-charcoal"
              >
                Concierge Assistant
              </h2>
              <p className="mt-0.5 text-sm text-charcoal-light">
                Get quick insights based on this client&apos;s profile, notes,
                and reminders.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-button p-2 text-charcoal-light transition-colors hover:bg-sand-warm hover:text-charcoal flex-shrink-0"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Suggested questions */}
        <div className="mt-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-charcoal-light">
            Suggested questions
          </p>
          <ul className="space-y-2">
            {questions.map((label, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex((prev) => (prev === index ? null : index))
                  }
                  className={`w-full rounded-button border px-4 py-3 text-left text-sm font-medium transition-colors ${
                    selectedIndex === index
                      ? "border-navy/40 bg-navy/5 text-charcoal"
                      : "border-border-light bg-sand-warm/60 text-charcoal hover:bg-sand-warm hover:border-border-light"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {selectedIndex === null && (
            <p className="mt-3 text-xs text-charcoal-light">
              Select a question to get quick insights.
            </p>
          )}

          {/* State B: Mocked answer */}
          {selectedIndex !== null && (
            <div className="mt-4 rounded-button border border-border-light bg-champagne/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-light">
                Insight
              </p>
              <p className="mt-2 text-sm leading-relaxed text-charcoal">
                {MOCK_RESPONSES[selectedIndex](clientName)}
              </p>
              <p className="mt-3 text-xs text-charcoal-light">
                Mock response for V1 UI only
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
