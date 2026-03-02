"use client";

import { useState } from "react";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { SettingsCard } from "@/components/settings/SettingsCard";
import { CancelMembershipModal } from "@/components/settings/CancelMembershipModal";

// Stub data; replace with API when ready
const BILLING_STUB = {
  planName: "Early Access",
  pricePerMonth: 47,
  currency: "USD",
  nextBillingDate: "March 15, 2026",
  cardBrand: "Visa",
  last4: "4242",
  accessEndDate: "March 15, 2026", // if they cancel today
};

export default function BillingSettingsPage() {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  return (
    <>
      <SettingsPanel
        title="Billing"
        description="Your plan and payment details."
      >
        <SettingsCard
          title="Current plan"
          description="Manage your subscription."
        >
          <div className="space-y-4">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-xl font-semibold text-charcoal">
                {BILLING_STUB.planName}
              </span>
              <span className="text-charcoal-light">
                ${BILLING_STUB.pricePerMonth} / month
              </span>
            </div>
            <p className="text-sm text-charcoal-light">
              Next billing date: {BILLING_STUB.nextBillingDate}
            </p>
          </div>
        </SettingsCard>

        <SettingsCard
          title="Payment method"
          description="Card on file."
        >
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-charcoal">
              {BILLING_STUB.cardBrand} •••• {BILLING_STUB.last4}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-button border border-border-light bg-white px-4 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-sand-warm"
              >
                Update Card
              </button>
              <button
                type="button"
                className="rounded-button border border-border-light bg-white px-4 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-sand-warm"
              >
                View Invoices
              </button>
            </div>
          </div>
        </SettingsCard>

        <SettingsCard
          title="Cancel membership"
          description="You can cancel anytime. Your access continues until the end of your billing period."
        >
          <button
            type="button"
            onClick={() => setCancelModalOpen(true)}
            className="text-sm font-medium text-charcoal-light underline hover:text-charcoal"
          >
            Cancel Membership
          </button>
        </SettingsCard>
      </SettingsPanel>

      <CancelMembershipModal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        accessEndDate={BILLING_STUB.accessEndDate}
        onConfirmCancellation={() => {
          // Stub: call API to cancel
        }}
      />
    </>
  );
}
