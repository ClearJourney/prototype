"use client";

import { useState } from "react";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { SettingsCard } from "@/components/settings/SettingsCard";
import { X } from "lucide-react";

// Stub: replace with API when ready
async function exportData(): Promise<void> {
  await new Promise((r) => setTimeout(r, 800));
}

async function deleteAccount(): Promise<void> {
  await new Promise((r) => setTimeout(r, 500));
}

export default function DangerZoneSettingsPage() {
  const [exporting, setExporting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportData();
      // In real app: trigger download or show success
    } finally {
      setExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "DELETE") return;
    setDeleting(true);
    try {
      await deleteAccount();
      setDeleteModalOpen(false);
      setDeleteConfirm("");
    } finally {
      setDeleting(false);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteConfirm("");
  };

  return (
    <>
      <SettingsPanel
        title="Danger Zone"
        description="Destructive actions. These cannot be undone."
      >
        <SettingsCard
          title="Export all data"
          description="Download your data as a CSV file."
          danger={false}
        >
          <button
            type="button"
            onClick={handleExport}
            disabled={exporting}
            className="rounded-button border border-border-light bg-white px-4 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-sand-warm disabled:opacity-60"
          >
            {exporting ? "Preparing…" : "Export All Data (CSV)"}
          </button>
        </SettingsCard>

        <SettingsCard
          title="Delete account"
          description="Permanently delete your account and all associated data. This action is irreversible."
          danger
        >
          <button
            type="button"
            onClick={() => setDeleteModalOpen(true)}
            className="rounded-button border border-error-muted/50 bg-white px-4 py-2.5 text-sm font-medium text-error-muted transition-colors hover:bg-error-muted/10"
          >
            Delete Account
          </button>
        </SettingsCard>
      </SettingsPanel>

      {deleteModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/20 p-4 backdrop-blur-[2px]">
          <div
            className="relative w-full max-w-sm rounded-card border border-error-muted/30 bg-white p-6 shadow-soft-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-semibold text-charcoal">
                Delete account
              </h2>
              <button
                type="button"
                onClick={closeDeleteModal}
                className="rounded-button p-2 text-charcoal-light transition-colors hover:bg-sand-warm hover:text-charcoal"
                aria-label="Close"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <p className="mt-2 text-sm text-charcoal-light">
              This is irreversible. All your data will be permanently removed.
              Type <strong className="text-charcoal">DELETE</strong> to confirm.
            </p>
            <input
              type="text"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              placeholder="Type DELETE"
              className="mt-4 w-full rounded-button border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:ring-2 focus:ring-navy/15"
            />
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="rounded-button border border-border-light px-4 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-sand-warm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleteConfirm !== "DELETE" || deleting}
                className="rounded-button bg-error-muted px-4 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50"
              >
                {deleting ? "Deleting…" : "Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
