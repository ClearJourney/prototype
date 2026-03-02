"use client";

import Link from "next/link";
import { Plus, MessageCircle } from "lucide-react";

const TODAY_ITEMS = [
  {
    client: "The Andersons",
    task: "Follow up on Tuscany proposal",
    due: "Due 2:00 PM",
    action: "Next Step",
  },
  {
    client: "Chen Family Safari",
    task: "Confirm hotel availability",
    due: "Due 4:30 PM",
    action: "Email",
  },
  {
    client: "The Johnsons",
    task: "Send welcome package",
    due: "Due 6:00 PM",
    action: "Proposal",
  },
];

const NEEDS_ATTENTION = [
  {
    client: "Martinez Family",
    task: "Review contract terms",
    due: "2 days overdue",
    action: "Reminder",
    urgent: true,
  },
  {
    client: "Thompson Group",
    task: "Call about visa requirements",
    due: "1 day overdue",
    action: "Email",
    urgent: true,
  },
];

const COMING_UP = [
  { client: "Roberts Family", task: "Send itinerary draft", due: "Tomorrow", action: "Email" },
  { client: "Davis Couple", task: "Check flight prices", due: "Saturday", action: "Call" },
  { client: "Lee Family", task: "Finalize dining reservations", due: "Sunday", action: "Email" },
  { client: "Patel Group", task: "Send visa checklist", due: "Monday", action: "Email" },
];

function TaskRow({
  client,
  task,
  due,
  action,
  urgent,
}: {
  client: string;
  task: string;
  due: string;
  action: string;
  urgent?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0 border-b border-border-light/60 last:border-0">
      <div className="min-w-0 flex-1">
        <p className="font-medium text-charcoal">{client}</p>
        <p className="mt-0.5 text-sm text-charcoal-light">{task}</p>
        <p className="mt-0.5 text-xs text-charcoal-light">{due}</p>
      </div>
      <div className="flex flex-shrink-0 items-center gap-2">
        <button
          type="button"
          className="rounded-button border border-border-light bg-white px-3 py-1.5 text-xs font-medium text-charcoal transition-colors hover:bg-sand-warm"
        >
          {action}
        </button>
        <span
          className={`h-2 w-2 rounded-full ${urgent ? "bg-error-muted/80" : "bg-charcoal-light/40"}`}
          aria-hidden
        />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-charcoal">
              Welcome back, Sherry
            </h1>
            <p className="mt-1.5 text-charcoal-light">
              Here&apos;s what&apos;s on your radar today
            </p>
          </div>
          <Link
            href="/dashboard/clients/new"
            className="inline-flex items-center justify-center gap-2 rounded-button bg-navy px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-dark sm:self-center"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            Add Client
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-card bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-charcoal">
              What&apos;s next today
            </h2>
            <p className="mt-0.5 text-xs text-charcoal-light">3 items</p>
            <div className="mt-5">
              {TODAY_ITEMS.map((item, i) => (
                <TaskRow
                  key={i}
                  client={item.client}
                  task={item.task}
                  due={item.due}
                  action={item.action}
                />
              ))}
            </div>
          </div>

          <div className="rounded-card bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-charcoal">
              Needs attention
            </h2>
            <p className="mt-0.5 text-xs text-warning-muted">2 urgent</p>
            <div className="mt-5">
              {NEEDS_ATTENTION.map((item, i) => (
                <TaskRow
                  key={i}
                  client={item.client}
                  task={item.task}
                  due={item.due}
                  action={item.action}
                  urgent={item.urgent}
                />
              ))}
            </div>
          </div>

          <div className="rounded-card bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-charcoal">
              Coming up this week
            </h2>
            <p className="mt-0.5 text-xs text-charcoal-light">4 items</p>
            <div className="mt-5">
              {COMING_UP.map((item, i) => (
                <TaskRow
                  key={i}
                  client={item.client}
                  task={item.task}
                  due={item.due}
                  action={item.action}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Link
        href="/dashboard/suggestions"
        className="fixed bottom-24 right-6 flex flex-col items-center gap-1.5 rounded-2xl bg-navy px-4 py-3 text-white shadow-soft-lg transition-colors hover:bg-navy-dark sm:bottom-8"
        aria-label="Need a suggestion?"
      >
        <MessageCircle className="h-6 w-6" strokeWidth={1.5} />
        <span className="text-xs font-medium">Need a Suggestion?</span>
      </Link>
    </>
  );
}
