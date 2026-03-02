"use client";

import { useState, useMemo } from "react";
import {
  AddOpportunityModal,
  type OpportunityFormData,
} from "@/components/AddOpportunityModal";
import { AddProspectModal } from "@/components/AddProspectModal";
import {
  OpportunityDrawer,
  type OpportunityDetail,
} from "@/components/OpportunityDrawer";
import { formatValue, STAGE_WEIGHTS } from "@/lib/pipeline";

const STAGES = [
  { id: "prospect", name: "Prospect", color: "bg-orange-500" },
  { id: "inquiry", name: "Inquiry", color: "bg-blue-500" },
  { id: "research", name: "Research", color: "bg-yellow-500" },
  { id: "proposal", name: "Proposal Sent", color: "bg-purple-500" },
  { id: "deposit", name: "Deposit IN", color: "bg-green-500" },
  { id: "balance", name: "Balance Due", color: "bg-teal-500" },
  { id: "travel", name: "Travel", color: "bg-sky-500" },
  { id: "completed", name: "Completed", color: "bg-emerald-500" },
  { id: "lost", name: "Lost", color: "bg-red-400" },
];

type Prospect = {
  id: string;
  clientName: string;
  interestNote: string;
  date: string;
};

type Opportunity = {
  id: string;
  clientName: string;
  tripName?: string;
  value: string;
  valueNum: number;
  nextStep: string | null;
  nextStepDue?: string;
  daysInStage: number;
  initials: string;
  avatarColor: string;
  stageId: string;
  when?: string;
  duration?: string;
  where?: string;
  budget?: string;
  partySize?: string;
  decisionMaker?: string;
  notes?: string;
  travelers?: { name: string; role: string }[];
  completedDate?: string; // for "Completed This Month"
};

const MOCK_PROSPECTS: Prospect[] = [
  {
    id: "p1",
    clientName: "Johnson Family",
    interestNote: "Spoke about Japan trip - waiting for pricing",
    date: "Dec 20",
  },
  {
    id: "p2",
    clientName: "Miller Couple",
    interestNote: "Interested in European river cruise",
    date: "Dec 22",
  },
];

const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: "o1",
    clientName: "Thompson Family",
    tripName: "Thompson Family Safari",
    value: "$85,000",
    valueNum: 85000,
    nextStep: "Follow up call • Due Dec 15",
    nextStepDue: "Dec 15",
    daysInStage: 5,
    initials: "TF",
    avatarColor: "bg-blue-500",
    stageId: "inquiry",
  },
  {
    id: "o2",
    clientName: "Martinez Wedding",
    value: "$45,000",
    valueNum: 45000,
    nextStep: null,
    daysInStage: 12,
    initials: "MW",
    avatarColor: "bg-red-500",
    stageId: "inquiry",
  },
  {
    id: "o3",
    clientName: "Wilson Anniversary",
    value: "$120,000",
    valueNum: 120000,
    nextStep: "Send hotel options • Due Dec 18",
    nextStepDue: "Dec 18",
    daysInStage: 3,
    initials: "WA",
    avatarColor: "bg-amber-500",
    stageId: "research",
  },
  {
    id: "o4",
    clientName: "Sarah Chen",
    tripName: "Chen Family Safari",
    value: "$95,000",
    valueNum: 95000,
    nextStep: "Call • Due Dec 20, 2025",
    nextStepDue: "Dec 20, 2025",
    daysInStage: 7,
    initials: "SC",
    avatarColor: "bg-blue-500",
    stageId: "proposal",
    when: "March 15-25, 2026",
    duration: "10 days, 9 nights",
    where: "Maldives - Four Seasons",
    budget: "$15,000 - $20,000",
    partySize: "2 adults",
    decisionMaker: "John Davis",
    notes:
      "Honeymoon trip. Prefer overwater villa with sunset view. Dietary restrictions: vegetarian meals. Anniversary is March 26th - would like special celebration arranged.",
    travelers: [
      { name: "John Davis", role: "Primary" },
      { name: "Emma Davis", role: "Partner" },
    ],
  },
  {
    id: "o5",
    clientName: "Roberts Honeymoon",
    value: "$78,000",
    valueNum: 78000,
    nextStep: "Book flights • Due Dec 22",
    nextStepDue: "Dec 22",
    daysInStage: 2,
    initials: "RH",
    avatarColor: "bg-green-500",
    stageId: "deposit",
  },
];

// Prospects excluded from all metrics. Completed and Lost excluded from "active" counts and value sums.
const ACTIVE_STAGE_IDS = ["inquiry", "research", "proposal", "deposit", "balance", "travel"];

function daysBadgeColor(days: number): "red" | "yellow" | "green" | "purple" {
  if (days >= 14) return "red";
  if (days >= 7) return "yellow";
  return "green";
}

const DAYS_COLORS = {
  red: "text-error-muted bg-red-50/80",
  yellow: "text-warning-muted bg-amber-50/80",
  green: "text-success-muted bg-green-50/80",
  purple: "text-charcoal bg-sand-warm",
};

export default function PipelinePage() {
  const [opportunityModalOpen, setOpportunityModalOpen] = useState(false);
  const [prospectModalOpen, setProspectModalOpen] = useState(false);
  const [addToStage, setAddToStage] = useState<string | null>(null);
  const [convertFromProspect, setConvertFromProspect] = useState<Prospect | null>(null);
  const [prospects, setProspects] = useState<Prospect[]>(MOCK_PROSPECTS);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(MOCK_OPPORTUNITIES);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);
  const [draggedOpportunityId, setDraggedOpportunityId] = useState<string | null>(null);
  const [dragOverStageId, setDragOverStageId] = useState<string | null>(null);

  const activeOpportunities = useMemo(
    () =>
      opportunities.filter(
        (o) =>
          ACTIVE_STAGE_IDS.includes(o.stageId) &&
          o.stageId !== "completed" &&
          o.stageId !== "lost"
      ),
    [opportunities]
  );

  // Core Sales Health – exclude Prospect, Completed, Lost
  const totalOpportunities = activeOpportunities.length;
  const totalDealValue = useMemo(
    () => activeOpportunities.reduce((sum, o) => sum + o.valueNum, 0),
    [activeOpportunities]
  );
  const weightedForecast = useMemo(
    () =>
      activeOpportunities.reduce(
        (sum, o) => sum + o.valueNum * (STAGE_WEIGHTS[o.stageId] ?? 0),
        0
      ),
    [activeOpportunities]
  );
  const averageDealSize =
    totalOpportunities > 0 ? Math.round(totalDealValue / totalOpportunities) : 0;

  // Risk & Urgency – exclude Prospect
  const missingNextStep = useMemo(
    () =>
      activeOpportunities.filter(
        (o) => !o.nextStep || o.nextStep === "No next step set"
      ).length,
    [activeOpportunities]
  );

  // Positives / Wins
  const activeTravelers = useMemo(
    () => opportunities.filter((o) => o.stageId === "travel").length,
    [opportunities]
  );
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const completedThisMonth = useMemo(
    () =>
      opportunities
        .filter((o) => {
          if (o.stageId !== "completed" || !o.completedDate) return false;
          const d = new Date(o.completedDate);
          return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        })
        .reduce((sum, o) => sum + o.valueNum, 0),
    [opportunities, currentMonth, currentYear]
  );

  const openAddOpportunity = (stageId?: string) => {
    setAddToStage(stageId ?? null);
    setConvertFromProspect(null);
    setOpportunityModalOpen(true);
  };

  const openConvertModal = (prospect: Prospect) => {
    setConvertFromProspect(prospect);
    setAddToStage("inquiry");
    setOpportunityModalOpen(true);
  };

  const mapStageToId = (s: string) => {
    const map: Record<string, string> = {
      Inquiry: "inquiry",
      Research: "research",
      "Proposal Sent": "proposal",
      "Deposit IN": "deposit",
      "Balance Due": "balance",
      Travel: "travel",
      Completed: "completed",
      Lost: "lost",
    };
    return map[s] ?? "inquiry";
  };

  const handleSaveOpportunity = (data: OpportunityFormData) => {
    const stageId = mapStageToId(data.stage);
    const valueNum = Number(data.value.replace(/[^0-9.]/g, "")) || 0;
    const valueStr =
      data.currency === "USD"
        ? formatValue(valueNum)
        : `${valueNum.toLocaleString()} ${data.currency}`;
    const nextStepStr = data.nextStep
      ? `${data.nextStep}${data.date ? ` • Due ${data.date}` : ""}`
      : null;
    const name = data.client || data.tripName || "New Opportunity";

    setOpportunities((prev) => [
      ...prev,
      {
        id: `o${Date.now()}`,
        clientName: name,
        tripName: data.tripName || undefined,
        value: valueStr,
        valueNum,
        nextStep: nextStepStr,
        nextStepDue: data.date || undefined,
        daysInStage: 0,
        initials: name.slice(0, 2).toUpperCase().replace(/\s/g, "") || "N",
        avatarColor: "bg-navy",
        stageId,
      },
    ]);

    if (convertFromProspect) {
      setProspects((prev) => prev.filter((p) => p.id !== convertFromProspect.id));
      setConvertFromProspect(null);
    }
    setOpportunityModalOpen(false);
  };

  const handleSaveProspect = (data: {
    clientName: string;
    interestNote: string;
    followUpDate: string;
  }) => {
    setProspects((prev) => [
      ...prev,
      {
        id: `p${Date.now()}`,
        clientName: data.clientName,
        interestNote: data.interestNote,
        date: data.followUpDate || "—",
      },
    ]);
  };

  const getOpportunitiesForStage = (stageId: string) => {
    if (stageId === "prospect") return [];
    return opportunities.filter((o) => o.stageId === stageId);
  };

  const selectedOpportunity: OpportunityDetail | null = useMemo(() => {
    if (!selectedOpportunityId) return null;
    const o = opportunities.find((x) => x.id === selectedOpportunityId);
    if (!o) return null;
    const stage = STAGES.find((s) => s.id === o.stageId);
    const nextStepDisplay =
      o.nextStep === null || o.nextStep === "No next step set" ? null : o.nextStep;
    return {
      id: o.id,
      clientName: o.clientName,
      tripName: o.tripName,
      value: o.value,
      valueNum: o.valueNum,
      stageId: o.stageId,
      stageName: stage?.name ?? o.stageId,
      nextStep: nextStepDisplay,
      nextStepDue: o.nextStepDue,
      daysInStage: o.daysInStage,
      initials: o.initials,
      avatarColor: o.avatarColor,
      when: o.when,
      duration: o.duration,
      where: o.where,
      budget: o.budget,
      partySize: o.partySize,
      decisionMaker: o.decisionMaker,
      notes: o.notes,
      travelers: o.travelers,
    };
  }, [selectedOpportunityId, opportunities]);

  const handleMarkDone = (id: string) => {
    setOpportunities((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, nextStep: null } : o
      )
    );
  };

  const handleSaveNextStep = (id: string, action: string, dueDate: string) => {
    const nextStep = dueDate ? `${action} • Due ${dueDate}` : action;
    setOpportunities((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, nextStep, nextStepDue: dueDate || undefined }
          : o
      )
    );
  };

  const handleMarkLost = (id: string, _reason: string) => {
    setOpportunities((prev) =>
      prev.map((o) => (o.id === id ? { ...o, stageId: "lost" as const, nextStep: null } : o))
    );
    setSelectedOpportunityId(null);
  };

  const handleMarkWon = (id: string) => {
    setOpportunities((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              stageId: "deposit" as const,
              nextStep: "Collect Balance",
              nextStepDue: undefined,
            }
          : o
      )
    );
  };

  const handleMoveOpportunity = (opportunityId: string, newStageId: string) => {
    if (!STAGES.some((s) => s.id === newStageId) || newStageId === "prospect") return;
    setOpportunities((prev) =>
      prev.map((o) =>
        o.id === opportunityId ? { ...o, stageId: newStageId, daysInStage: 0 } : o
      )
    );
  };

  const handleDragStart = (e: React.DragEvent, opportunityId: string) => {
    setDraggedOpportunityId(opportunityId);
    e.dataTransfer.setData("opportunityId", opportunityId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setDraggedOpportunityId(null);
    setDragOverStageId(null);
  };

  const handleDragOver = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (stageId !== "prospect") setDragOverStageId(stageId);
  };

  const handleDragLeave = () => {
    setDragOverStageId(null);
  };

  const handleDrop = (e: React.DragEvent, targetStageId: string) => {
    e.preventDefault();
    setDragOverStageId(null);
    if (targetStageId === "prospect") return;
    const opportunityId = e.dataTransfer.getData("opportunityId");
    if (opportunityId) handleMoveOpportunity(opportunityId, targetStageId);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <select className="rounded-button border border-border-light bg-white px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-navy/10">
            <option>2024 Pipeline</option>
          </select>
          <select className="rounded-button border border-border-light bg-white px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-navy/10">
            <option>All Time</option>
          </select>
          <select className="rounded-button border border-border-light bg-white px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-navy/10">
            <option>USD</option>
          </select>
          <input
            type="search"
            placeholder="Search opportunities..."
            className="w-48 rounded-button border border-border-light bg-white px-3 py-2 text-sm text-charcoal placeholder-charcoal-light focus:outline-none focus:ring-2 focus:ring-navy/10"
          />
        </div>
        <button
          type="button"
          onClick={() => openAddOpportunity()}
          className="rounded-button bg-navy px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-dark"
        >
          + Add Opportunity
        </button>
      </div>

      {/* KPI summary – single responsive grid, equal-height cards, consistent alignment */}
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-9"
        role="region"
        aria-label="Pipeline KPIs"
      >
        {[
          {
            variant: "default" as const,
            value: totalOpportunities,
            label: "Total Opportunities",
          },
          {
            variant: "default" as const,
            value: formatValue(totalDealValue),
            label: "Total Deal Value",
            isCurrency: true,
          },
          {
            variant: "default" as const,
            value: formatValue(Math.round(weightedForecast)),
            label: "Weighted Forecast",
            isCurrency: true,
          },
          {
            variant: "default" as const,
            value: formatValue(averageDealSize),
            label: "Average Deal Size",
            isCurrency: true,
          },
          {
            variant: "alert" as const,
            value: missingNextStep,
            label: "Missing Next Step",
          },
          {
            variant: "alert" as const,
            value: "$340K",
            label: "Outstanding Balances",
            isCurrency: true,
          },
          {
            variant: "alert" as const,
            value: 3,
            label: "Overdue Balances",
          },
          {
            variant: "success" as const,
            value: activeTravelers,
            label: "Active Travelers",
          },
          {
            variant: "success" as const,
            value: formatValue(completedThisMonth),
            label: "Completed This Month",
            isCurrency: true,
          },
        ].map(({ variant, value, label, isCurrency }) => (
          <div
            key={label}
            className={[
              "flex min-h-[88px] flex-col justify-start rounded-card border p-4 shadow-soft text-left",
              variant === "default" &&
                "border-border-light bg-white",
              variant === "alert" &&
                "border-red-100 bg-red-50/30",
              variant === "success" &&
                "border-teal-accent/20 bg-teal-accent/5",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <p
              className={[
                "text-2xl font-semibold leading-tight tracking-tight tabular-nums",
                variant === "default" && "text-charcoal",
                variant === "alert" && "text-error-muted",
                variant === "success" && "text-success-muted",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {isCurrency ? (
                <span className="whitespace-nowrap">{value}</span>
              ) : (
                value
              )}
            </p>
            <p
              className={[
                "mt-1.5 text-xs leading-tight",
                variant === "default" && "text-charcoal-light",
                variant === "alert" && "text-error-muted/90",
                variant === "success" && "text-success-muted/90",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {STAGES.map((stage) => (
          <div
            key={stage.id}
            onDragOver={(e) => handleDragOver(e, stage.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, stage.id)}
            className={`w-72 flex-shrink-0 rounded-card p-4 transition-colors ${
              dragOverStageId === stage.id
                ? "border-2 border-navy/30 bg-navy/5 shadow-soft"
                : "bg-white shadow-soft"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${stage.color}`} />
              <span className="font-semibold text-charcoal">{stage.name}</span>
              <span className="text-sm text-charcoal-light">
                {stage.id === "prospect"
                  ? prospects.length
                  : getOpportunitiesForStage(stage.id).length}
              </span>
            </div>
            {stage.id === "inquiry" && (
              <p className="mt-1.5 text-xs text-charcoal-light">
                For future clients who&apos;ve shown interest — don&apos;t count toward
                totals until converted.
              </p>
            )}

            <div className="mt-4 space-y-2">
              {stage.id === "prospect" &&
                prospects.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-button bg-sand-warm/50 p-3"
                  >
                    <p className="font-medium text-charcoal">{p.clientName}</p>
                    <p className="mt-0.5 text-xs text-charcoal-light">{p.interestNote}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-charcoal-light">{p.date}</span>
                      <button
                        type="button"
                        onClick={() => openConvertModal(p)}
                        className="rounded-button bg-teal-accent/15 px-2.5 py-1 text-xs font-medium text-teal-accent hover:bg-teal-accent/25"
                      >
                        Convert
                      </button>
                    </div>
                  </div>
                ))}

              {stage.id !== "prospect" &&
                getOpportunitiesForStage(stage.id).map((o) => {
                  const daysColor = daysBadgeColor(o.daysInStage);
                  const nextStepDisplay =
                    o.nextStep === null || o.nextStep === "No next step set"
                      ? "No next step set"
                      : o.nextStep;
                  const isDragging = draggedOpportunityId === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      draggable
                      onDragStart={(e) => handleDragStart(e, o.id)}
                      onDragEnd={handleDragEnd}
                      onClick={() => setSelectedOpportunityId(o.id)}
                      className={`w-full rounded-button bg-white p-3 text-left shadow-soft transition-opacity hover:bg-sand-warm/50 ${
                        isDragging ? "cursor-grabbing opacity-50" : "cursor-grab"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-charcoal">
                            {o.tripName || o.clientName}
                          </p>
                          <p className="text-sm font-medium text-charcoal">{o.value}</p>
                          <p
                            className={`text-xs ${
                              nextStepDisplay === "No next step set"
                                ? "text-error-muted"
                                : "text-charcoal-light"
                            }`}
                          >
                            {nextStepDisplay}
                          </p>
                          <span
                            className={`mt-1 inline-block rounded px-1.5 py-0.5 text-xs font-medium ${DAYS_COLORS[daysColor]}`}
                          >
                            {o.daysInStage} days
                          </span>
                        </div>
                        <span
                          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${o.avatarColor} text-xs font-medium text-white`}
                        >
                          {o.initials}
                        </span>
                      </div>
                    </button>
                  );
                })}
            </div>

            <button
              type="button"
              onClick={() =>
                stage.id === "prospect"
                  ? setProspectModalOpen(true)
                  : openAddOpportunity(stage.id)
              }
              className="mt-4 w-full rounded-button border border-dashed border-border-light py-2.5 text-sm text-charcoal-light transition-colors hover:border-charcoal-light/50 hover:bg-sand-warm/50 hover:text-charcoal"
            >
              {stage.id === "prospect" ? "+ Add Prospect" : "+ Add Opportunity"}
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 rounded-card border border-amber-100 bg-amber-50/50 px-4 py-3 text-sm text-warning-muted">
        <span className="text-lg leading-none">↑</span>
        <span>Bottleneck Alert: 4 opportunities stuck more than 14 days in Research</span>
      </div>

      <AddOpportunityModal
        isOpen={opportunityModalOpen}
        onClose={() => {
          setOpportunityModalOpen(false);
          setConvertFromProspect(null);
        }}
        defaultStage={
          addToStage === "inquiry"
            ? "Inquiry"
            : addToStage === "research"
              ? "Research"
              : addToStage === "proposal"
                ? "Proposal Sent"
                : addToStage === "deposit"
                  ? "Deposit IN"
                  : addToStage === "balance"
                    ? "Balance Due"
                    : addToStage === "travel"
                      ? "Travel"
                      : addToStage === "completed"
                        ? "Completed"
                        : "Inquiry"
        }
        initialValues={
          convertFromProspect
            ? {
                clientName: convertFromProspect.clientName,
                tripName: `${convertFromProspect.clientName} Trip`,
                notes: convertFromProspect.interestNote,
              }
            : undefined
        }
        onSave={handleSaveOpportunity}
      />
      <AddProspectModal
        isOpen={prospectModalOpen}
        onClose={() => setProspectModalOpen(false)}
        onSave={handleSaveProspect}
      />

      {selectedOpportunity && (
        <>
          <div
            className="fixed inset-0 z-30 bg-charcoal/20 backdrop-blur-[2px]"
            onClick={() => setSelectedOpportunityId(null)}
            aria-hidden
          />
          <OpportunityDrawer
            opportunity={selectedOpportunity}
            onClose={() => setSelectedOpportunityId(null)}
            onMarkDone={handleMarkDone}
            onSaveNextStep={handleSaveNextStep}
            onMarkLost={handleMarkLost}
            onMarkWon={handleMarkWon}
          />
        </>
      )}
    </div>
  );
}
