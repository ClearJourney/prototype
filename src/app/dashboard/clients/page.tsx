import Link from "next/link";
import { ChevronRight } from "lucide-react";

const CLIENTS = [
  { id: "emma-johnson", name: "Emma Johnson", initials: "EJ" },
  { id: "wf1", name: "Warren Foster", initials: "WF" },
  { id: "ls1", name: "Liang Smith", initials: "LS" },
  { id: "ls2", name: "Liang Smith", initials: "LS" },
  { id: "wf2", name: "Warren Foster", initials: "WF" },
];

const total = CLIENTS.length;

export default function ClientsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-charcoal">
          Clients
        </h1>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-charcoal">All Clients</h2>
        <p className="mt-0.5 text-sm text-charcoal-light">
          Showing 1–{total} of {total} clients
        </p>

        <ul className="mt-4 overflow-hidden rounded-card bg-white shadow-soft">
          {CLIENTS.map((client) => (
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
          ))}
        </ul>
      </div>
    </div>
  );
}
