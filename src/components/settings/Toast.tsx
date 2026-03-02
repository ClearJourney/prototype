"use client";

import { useEffect } from "react";
import { Check } from "lucide-react";

type Props = {
  message: string;
  visible: boolean;
  onDismiss: () => void;
  duration?: number;
};

export function Toast({ message, visible, onDismiss, duration = 4000 }: Props) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onDismiss, duration);
    return () => clearTimeout(t);
  }, [visible, onDismiss, duration]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-8 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-card border border-border-light bg-white px-4 py-3 shadow-soft-xl"
      role="status"
      aria-live="polite"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-success/15 text-success">
        <Check className="h-4 w-4" strokeWidth={2.5} />
      </span>
      <span className="text-sm font-medium text-charcoal">{message}</span>
    </div>
  );
}
