"use client";

import { useState, useMemo } from "react";
import { AddReminderModal, type AddReminderPayload } from "@/components/AddReminderModal";

export type ReminderItem = { title: string; due: string };

type ClientRemindersPanelProps = {
  clientId: string;
  initialReminders: {
    overdue: ReminderItem[];
    upcoming: ReminderItem[];
  };
};

type AddedReminder = AddReminderPayload & {
  id: string;
  client_id: string;
};

function formatDueDate(isoDate: string): string {
  const d = new Date(isoDate + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function isOverdue(isoDate: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(isoDate + "T12:00:00");
  due.setHours(0, 0, 0, 0);
  return due < today;
}

export function ClientRemindersPanel({
  clientId,
  initialReminders,
}: ClientRemindersPanelProps) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addedReminders, setAddedReminders] = useState<AddedReminder[]>([]);

  const handleSaveReminder = (data: AddReminderPayload) => {
    const newReminder: AddedReminder = {
      ...data,
      id: crypto.randomUUID?.() ?? `rem-${Date.now()}`,
      client_id: clientId,
    };
    setAddedReminders((prev) => [...prev, newReminder]);
    setAddModalOpen(false);
  };

  const { overdue, upcoming } = useMemo(() => {
    const overdueList: { key: string; title: string; due: string }[] = [
      ...initialReminders.overdue.map((r) => ({
        key: `initial-overdue-${r.title}-${r.due}`,
        title: r.title,
        due: r.due,
      })),
    ];
    const upcomingList: { key: string; title: string; due: string }[] = [
      ...initialReminders.upcoming.map((r) => ({
        key: `initial-upcoming-${r.title}-${r.due}`,
        title: r.title,
        due: r.due,
      })),
    ];

    for (const r of addedReminders) {
      const dueFormatted = formatDueDate(r.due_date);
      const item = { key: r.id, title: r.title, due: dueFormatted };
      if (isOverdue(r.due_date)) {
        overdueList.push(item);
      } else {
        upcomingList.push(item);
      }
    }

    return { overdue: overdueList, upcoming: upcomingList };
  }, [initialReminders, addedReminders]);

  return (
    <>
      <aside className="h-fit rounded-xl border border-border-light bg-white p-5 lg:sticky lg:top-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-charcoal">Reminders</h2>
          <button
            type="button"
            className="text-charcoal-light hover:text-charcoal"
            aria-label="Add reminder"
            onClick={() => setAddModalOpen(true)}
          >
            +
          </button>
        </div>
        {overdue.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-600">
              Overdue
            </p>
            <ul className="mt-2 space-y-2">
              {overdue.map((r) => (
                <li
                  key={r.key}
                  className="rounded-lg border border-red-200 bg-red-50/50 p-3"
                >
                  <p className="text-sm font-medium text-charcoal">{r.title}</p>
                  <p className="text-xs text-red-600">Due: {r.due}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-light">
            Upcoming
          </p>
          <ul className="mt-2 space-y-2">
            {upcoming.map((r) => (
              <li
                key={r.key}
                className="rounded-lg border border-border-light bg-sand-warm/50 p-3"
              >
                <p className="text-sm font-medium text-charcoal">{r.title}</p>
                <p className="text-xs text-charcoal-light">Due: {r.due}</p>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <AddReminderModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleSaveReminder}
      />
    </>
  );
}
