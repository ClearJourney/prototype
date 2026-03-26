"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronRight, Plus, X } from "lucide-react";

type ClientRow = {
  id: string;
  name: string;
  initials: string;
  tags: string[];
};

const CLIENTS: ClientRow[] = [
  { id: "emma-johnson", name: "Ms Emma Johnson", initials: "EJ", tags: ["VIP", "Returning Client"] },
  { id: "wf1", name: "Warren Foster", initials: "WF", tags: ["Safari", "Luxury Resorts"] },
  { id: "ls1", name: "Liang Smith", initials: "LS", tags: ["Family", "Japan"] },
  { id: "ls2", name: "Liang Smith", initials: "LS", tags: ["Honeymoon", "Cruise"] },
  { id: "wf2", name: "Warren Foster", initials: "WF", tags: ["Returning Client", "Luxury Resorts"] },
];

export default function ClientsPage() {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const availableTags = useMemo(() => {
    const set = new Set<string>();
    CLIENTS.forEach((c) => c.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  const filteredClients = useMemo(() => {
    if (selectedTags.size === 0) return CLIENTS;
    return CLIENTS.filter((client) =>
      client.tags.some((tag) => selectedTags.has(tag))
    );
  }, [selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const clearFilters = () => setSelectedTags(new Set());

  const resultsText = useMemo(() => {
    const n = filteredClients.length;
    if (selectedTags.size === 0) return `Showing ${n} client${n !== 1 ? "s" : ""}`;
    if (selectedTags.size === 1) {
      const tag = Array.from(selectedTags)[0];
      return `Showing ${n} client${n !== 1 ? "s" : ""} matching "${tag}"`;
    }
    return `Showing ${n} client${n !== 1 ? "s" : ""} matching ${selectedTags.size} filters`;
  }, [filteredClients.length, selectedTags]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-charcoal">
          Clients
        </h1>
        <Link
          href="/dashboard/clients/new"
          className="inline-flex items-center justify-center gap-2 rounded-button bg-navy px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-dark sm:self-center"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Add Client
        </Link>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-charcoal">All Clients</h2>
        <p className="mt-0.5 text-sm text-charcoal-light">{resultsText}</p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {availableTags.map((tag) => {
            const isActive = selectedTags.has(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-navy text-white hover:bg-navy-dark"
                    : "bg-sand-warm/60 text-charcoal hover:bg-sand-warm"
                }`}
              >
                {tag}
              </button>
            );
          })}
          {selectedTags.size > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-charcoal-light transition-colors hover:bg-sand-warm/60 hover:text-charcoal"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2} />
              Clear filters
            </button>
          )}
        </div>

        <ul className="mt-4 overflow-hidden rounded-card bg-white shadow-soft">
          {filteredClients.length === 0 ? (
            <li className="px-5 py-12 text-center text-sm text-charcoal-light">
              No clients match these filters.
              <br />
              Try removing a tag or clearing filters.
            </li>
          ) : (
            filteredClients.map((client) => (
              <li key={client.id} className="border-b border-border-light/60 last:border-0">
                <Link
                  href={`/dashboard/clients/${client.id}`}
                  className="flex items-center justify-between gap-4 px-5 py-4 text-charcoal transition-colors hover:bg-sand-warm/50"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-navy text-sm font-medium text-white">
                      {client.initials}
                    </span>
                    <span className="font-medium">{client.name}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 flex-shrink-0 text-charcoal-light" strokeWidth={1.5} />
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
