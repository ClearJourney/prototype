"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, MessageCircle } from "lucide-react";

type TaskItem = {
  id: string;
  client: string;
  task: string;
  due: string;
  action: string;
  urgent?: boolean;
  opportunityId: string;
  clientId?: string;
};

const TODAY_ITEMS: TaskItem[] = [
  { id: "today-1", client: "The Andersons", task: "Follow up on Tuscany proposal", due: "Due 2:00 PM", action: "Next Step", opportunityId: "o1" },
  { id: "today-2", client: "Chen Family Safari", task: "Confirm hotel availability", due: "Due 4:30 PM", action: "Email", opportunityId: "o4" },
  { id: "today-3", client: "The Johnsons", task: "Send welcome package", due: "Due 6:00 PM", action: "Proposal", opportunityId: "o3" },
];

const NEEDS_ATTENTION: TaskItem[] = [
  { id: "na-1", client: "Martinez Family", task: "Review contract terms", due: "2 days overdue", action: "Reminder", urgent: true, opportunityId: "o2" },
  { id: "na-2", client: "Thompson Group", task: "Call about visa requirements", due: "1 day overdue", action: "Email", urgent: true, opportunityId: "o1" },
];

const COMING_UP: TaskItem[] = [
  { id: "up-1", client: "Roberts Family", task: "Send itinerary draft", due: "Tomorrow", action: "Email", opportunityId: "o5" },
  { id: "up-2", client: "Davis Couple", task: "Check flight prices", due: "Saturday", action: "Call", opportunityId: "o1" },
  { id: "up-3", client: "Lee Family", task: "Finalize dining reservations", due: "Sunday", action: "Email", opportunityId: "o3" },
  { id: "up-4", client: "Patel Group", task: "Send visa checklist", due: "Monday", action: "Email", opportunityId: "o2" },
];

function TaskRow({
  client,
  task,
  due,
  action,
  opportunityId,
}: {
  client: string;
  task: string;
  due: string;
  action: string;
  opportunityId: string;
}) {
  const rowHref = `/dashboard/pipeline?opportunity=${encodeURIComponent(opportunityId)}`;

  return (
    <Link
      href={rowHref}
      className="flex items-start py-4 first:pt-0 last:pb-0 border-b border-border-light/60 last:border-0 transition-colors hover:bg-sand-warm/40 cursor-pointer"
    >
      <div className="min-w-0 flex-1">
        <p className="font-medium text-charcoal">{client}</p>
        <p className="mt-0.5 text-sm text-charcoal-light">{task}</p>
        <p className="mt-0.5 text-xs text-charcoal-light">{due}</p>
        <p className="mt-0.5 text-xs text-charcoal-light">Step: {action}</p>
      </div>
    </Link>
  );
}

export default function DashboardPage() {
  const [needsAttentionCount, setNeedsAttentionCount] = useState<number>(0);

  useEffect(() => {
    fetch("/api/opportunities")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { needsAttentionCount?: number }) => {
        if (typeof data?.needsAttentionCount === "number") {
          setNeedsAttentionCount(data.needsAttentionCount);
        }
      })
      .catch(() => {});
  }, []);

  const totalNeedsAttention = NEEDS_ATTENTION.length + needsAttentionCount;

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
            <p className="mt-0.5 text-xs text-charcoal-light">{TODAY_ITEMS.length} items</p>
            <div className="mt-5">
              {TODAY_ITEMS.map((item) => (
                <TaskRow
                  key={item.id}
                  client={item.client}
                  task={item.task}
                  due={item.due}
                  action={item.action}
                  opportunityId={item.opportunityId}
                />
              ))}
            </div>
          </div>

          <div className="rounded-card bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-charcoal">
              Needs attention
            </h2>
            <p className="mt-0.5 text-xs text-warning-muted">
              {totalNeedsAttention} {totalNeedsAttention === 1 ? "item" : "items"}
              {needsAttentionCount > 0 && ` · ${needsAttentionCount} new ${needsAttentionCount === 1 ? "inquiry" : "inquiries"}`}
            </p>
            <div className="mt-5">
              {needsAttentionCount > 0 && (
                <div className="mb-4 rounded-button border border-amber-200 bg-amber-50/50 p-3">
                  <Link
                    href="/dashboard/pipeline"
                    className="text-sm font-medium text-amber-800 hover:underline"
                  >
                    {needsAttentionCount} new {needsAttentionCount === 1 ? "inquiry" : "inquiries"} in pipeline →
                  </Link>
                </div>
              )}
              {NEEDS_ATTENTION.map((item) => (
                <TaskRow
                  key={item.id}
                  client={item.client}
                  task={item.task}
                  due={item.due}
                  action={item.action}
                  opportunityId={item.opportunityId}
                />
              ))}
            </div>
          </div>

          <div className="rounded-card bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-charcoal">
              Coming up this week
            </h2>
            <p className="mt-0.5 text-xs text-charcoal-light">{COMING_UP.length} items</p>
            <div className="mt-5">
              {COMING_UP.map((item) => (
                <TaskRow
                  key={item.id}
                  client={item.client}
                  task={item.task}
                  due={item.due}
                  action={item.action}
                  opportunityId={item.opportunityId}
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
