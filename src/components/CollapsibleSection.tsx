"use client";

import { ChevronDown, ChevronRight } from "lucide-react";

type Props = {
  title: string;
  subtext?: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
};

export function CollapsibleSection({
  title,
  subtext,
  open,
  onToggle,
  children,
  className = "",
}: Props) {
  return (
    <section
      className={`rounded-card border border-border-light bg-white shadow-soft ${className}`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-sand-warm/30"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          {open ? (
            <ChevronDown className="h-5 w-5 flex-shrink-0 text-charcoal-light" strokeWidth={1.5} />
          ) : (
            <ChevronRight className="h-5 w-5 flex-shrink-0 text-charcoal-light" strokeWidth={1.5} />
          )}
          <span className="font-semibold text-charcoal">{title}</span>
        </span>
      </button>
      {open && (
        <div className="border-t border-border-light/60 px-5 py-5">
          {subtext && (
            <p className="mb-4 text-sm text-charcoal-light">{subtext}</p>
          )}
          {children}
        </div>
      )}
    </section>
  );
}
