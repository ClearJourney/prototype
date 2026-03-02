"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Link2, UserCircle, List, X } from "lucide-react";
import { SecureClientFormsSection } from "@/components/SecureClientFormsSection";

const buttonSecondaryClass =
  "inline-flex items-center gap-2 rounded-button border border-border-light bg-white px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-sand-warm";

type DropdownAction = "generate-inquiry" | "generate-profile" | "view-links" | null;

export function SendIntakeDropdown({ clientId }: { clientId: string }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState<DropdownAction>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openModal = (action: DropdownAction) => {
    setDropdownOpen(false);
    setModalOpen(action);
  };

  return (
    <div className="relative flex items-center gap-2" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={buttonSecondaryClass}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
      >
        <Send className="h-5 w-5 flex-shrink-0" strokeWidth={1.5} />
        Send Intake
      </button>

      {dropdownOpen && (
        <div
          className="absolute right-0 top-full z-20 mt-1 min-w-[220px] rounded-lg border border-border-light bg-white py-1 shadow-soft-lg"
          role="menu"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => openModal("generate-inquiry")}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-charcoal hover:bg-sand-warm"
          >
            <Link2 className="h-4 w-4 text-charcoal-light" strokeWidth={1.5} />
            Generate Inquiry Link
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => openModal("generate-profile")}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-charcoal hover:bg-sand-warm"
          >
            <UserCircle className="h-4 w-4 text-charcoal-light" strokeWidth={1.5} />
            Generate Client Profile Link
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => openModal("view-links")}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-charcoal hover:bg-sand-warm"
          >
            <List className="h-4 w-4 text-charcoal-light" strokeWidth={1.5} />
            View Active Links
          </button>
        </div>
      )}

      {/* Modal: Generate links (reuses full SecureClientFormsSection) */}
      {(modalOpen === "generate-inquiry" || modalOpen === "generate-profile") && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="send-intake-modal-title"
        >
          <div
            className="absolute inset-0 bg-charcoal/40"
            onClick={() => setModalOpen(null)}
            aria-hidden="true"
          />
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-border-light bg-sand p-6 shadow-soft-xl">
            <div className="absolute right-4 top-4">
              <button
                type="button"
                onClick={() => setModalOpen(null)}
                className="rounded-button p-2 text-charcoal-light hover:bg-sand-warm hover:text-charcoal"
                aria-label="Close"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <div id="send-intake-modal-title" className="sr-only">
              Secure Client Forms
            </div>
            <SecureClientFormsSection clientId={clientId} />
          </div>
        </div>
      )}

      {/* Modal: View Active Links */}
      {modalOpen === "view-links" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="active-links-modal-title"
        >
          <div
            className="absolute inset-0 bg-charcoal/40"
            onClick={() => setModalOpen(null)}
            aria-hidden="true"
          />
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-border-light bg-white p-6 shadow-soft-xl">
            <div className="flex items-center justify-between">
              <h2 id="active-links-modal-title" className="text-lg font-semibold text-charcoal">
                Active Links
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(null)}
                className="rounded-button p-2 text-charcoal-light hover:bg-sand-warm hover:text-charcoal"
                aria-label="Close"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="mt-4 rounded-lg border border-border-light bg-sand-warm/30 p-6 text-center text-sm text-charcoal-light">
              No active intake links for this client. Generate an Inquiry or Client Profile link above to get started.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
