"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { ConciergeAssistantPanel } from "./ConciergeAssistantPanel";

type Props = {
  clientName: string;
};

export function ConciergeAssistantTrigger({ clientName }: Props) {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setPanelOpen((open) => !open)}
        className="inline-flex items-center gap-2 rounded-button border border-border-light bg-white px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-sand-warm"
        aria-expanded={panelOpen}
        aria-haspopup="dialog"
        aria-label="Ask Concierge"
      >
        <Bell className="h-5 w-5 flex-shrink-0" strokeWidth={1.5} />
        Ask Concierge
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-error-muted/90 text-xs font-medium text-white">
          3
        </span>
      </button>
      <ConciergeAssistantPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        clientName={clientName}
      />
    </>
  );
}
