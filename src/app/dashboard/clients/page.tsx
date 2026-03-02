"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ImportClientsModal } from "@/components/ImportClientsModal";

const MOCK_CLIENTS = [
  { id: "1", name: "Arturo M.", totalValue: "$125,000" },
  { id: "2", name: "Fiona Murray", totalValue: "$105,000" },
  { id: "3", name: "Elliot Murray", totalValue: "$45,000" },
];

function ClientsContent() {
  const searchParams = useSearchParams();
  const [importOpen, setImportOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("import") === "1") {
      setImportOpen(true);
    }
  }, [searchParams]);

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Clients</h1>
          <p className="text-sm text-charcoal-light">
            All Clients — Manage your client accounts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="search"
            placeholder="Search clients..."
            className="rounded-lg border border-border-light bg-white px-3 py-2 text-sm text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
          />
          <button
            type="button"
            onClick={() => setImportOpen(true)}
            className="rounded-lg border border-border-light bg-white px-3 py-2 text-sm font-medium text-charcoal hover:bg-sand-warm"
          >
            Filter
          </button>
          <button
            type="button"
            className="rounded-lg border border-border-light bg-white px-3 py-2 text-sm font-medium text-charcoal hover:bg-sand-warm"
          >
            Export
          </button>
          <Link
            href="/dashboard/clients/new"
            className="rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-dark"
          >
            + New Client
          </Link>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-border-light bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-light bg-sand-warm/50 text-left text-xs font-medium uppercase tracking-wider text-charcoal-light">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Total value</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_CLIENTS.map((client) => (
              <tr
                key={client.id}
                className="border-b border-border-light hover:bg-sand-warm/30"
              >
                <td className="px-4 py-3 font-medium text-charcoal">
                  {client.name}
                </td>
                <td className="px-4 py-3 text-charcoal">{client.totalValue}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/dashboard/clients/${client.id}`}
                    className="text-sm text-charcoal underline hover:text-navy"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ImportClientsModal
        isOpen={importOpen}
        onClose={() => setImportOpen(false)}
      />
    </div>
  );
}

export default function ClientsPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <ClientsContent />
    </Suspense>
  );
}
