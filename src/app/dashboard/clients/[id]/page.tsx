import Link from "next/link";
import { Pencil } from "lucide-react";
import { SendIntakeDropdown } from "@/components/SendIntakeDropdown";
import { ClientProfileTabs } from "@/components/ClientProfileTabs";
import { ClientRemindersPanel } from "@/components/ClientRemindersPanel";
import { ConciergeAssistantTrigger } from "@/components/ConciergeAssistantTrigger";
import { getClientData } from "@/lib/mock-clients";
import { formatMockClientDisplayName } from "@/lib/client-display-name";

export default function ClientProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const client = getClientData(id);
  const displayName = formatMockClientDisplayName(client);

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb + Ask Concierge */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <nav className="text-sm text-charcoal-light">
          <Link href="/dashboard/clients" className="hover:text-charcoal">
            Clients
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-charcoal">{displayName}</span>
        </nav>
        <ConciergeAssistantTrigger clientName={displayName} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        {/* Main profile content */}
        <div className="space-y-8">
          {/* Client header */}
          <div className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-border-light bg-white p-6">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-navy text-xl font-medium text-white">
                {client.initials}
              </span>
              <div>
                <h1 className="text-2xl font-bold text-charcoal">{displayName}</h1>
                <p className="text-charcoal-light">
                  {client.dob} ({client.age})
                </p>
                <p className="text-sm text-charcoal-light">{client.email}</p>
                <p className="text-sm text-charcoal-light">{client.phone}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {client.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className={`rounded-full px-3 py-0.5 text-xs font-medium ${tag.style}`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/dashboard/pipeline?client=${id}`}
                className="rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-dark"
              >
                View in Pipeline
              </Link>
              <Link
                href={`/dashboard/clients/${id}/edit`}
                className="inline-flex items-center gap-2 rounded-button border border-border-light bg-white px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-sand-warm"
              >
                <Pencil className="h-5 w-5 flex-shrink-0" strokeWidth={1.5} />
                Edit Profile
              </Link>
              <SendIntakeDropdown clientId={id} />
            </div>
          </div>

          {/* Preferences – tabbed profile panel */}
          <ClientProfileTabs
            preferences={client.preferences}
            travelDocuments={client.travelDocuments}
            emergencyContact={client.emergencyContact}
            health={client.health}
            importantDates={client.importantDates}
          />

          {/* Household */}
          <section className="rounded-xl border border-border-light bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-charcoal">Household</h2>
              <button
                type="button"
                className="text-charcoal-light hover:text-charcoal"
                aria-label="Add member"
              >
                +
              </button>
            </div>
            <ul className="mt-4 space-y-2">
              {client.household.map((member) => (
                <li key={member.name} className="flex justify-between text-sm">
                  <span className="text-charcoal">{member.name}</span>
                  <span className="text-charcoal-light">({member.role})</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-charcoal-light">{client.householdSummary}</p>
          </section>

          {/* Notes & Insights */}
          <section className="rounded-xl border border-border-light bg-white p-6">
            <h2 className="text-lg font-semibold text-charcoal">Notes & Insights</h2>
            <div className="mt-4 rounded-lg bg-amber-50/80 border border-amber-200/60 p-4">
              <p className="text-2xl text-amber-600/80 leading-none">"</p>
              <p className="text-sm text-charcoal -mt-2">{client.aiSummary}</p>
            </div>
            <p className="mt-2 text-xs text-charcoal-light">Concierge AI Summary</p>
            <ul className="mt-4 space-y-3">
              {client.notes.map((note, i) => (
                <li key={i} className="flex justify-between gap-2 border-b border-border-light pb-3 last:border-0">
                  <div>
                    <p className="text-xs font-medium text-charcoal-light">{note.date}</p>
                    <p className="text-sm text-charcoal">{note.text}</p>
                  </div>
                  <button type="button" className="text-charcoal-light hover:text-charcoal" aria-label="More">⋯</button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-3 text-sm font-medium text-navy hover:underline"
            >
              + Add Note
            </button>
          </section>
        </div>

        {/* Right sidebar – Reminders */}
        <ClientRemindersPanel clientId={id} initialReminders={client.reminders} />
      </div>
    </div>
  );
}
