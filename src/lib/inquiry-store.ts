/**
 * In-memory store for inquiry submissions → pipeline opportunities.
 * Persists to .data/inquiry-opportunities.json in Node (e.g. dev) so data survives restarts.
 * In production, replace with a database.
 */

import type { InquiryFormData } from "@/types/secure-forms";

export type StoredOpportunity = {
  id: string;
  accountSlug: string;
  clientName: string;
  stageId: string;
  value: string;
  valueNum: number;
  budget?: string;
  where?: string;
  journeyType?: string;
  notes?: string;
  createdAt: string;
  needsAttention: boolean;
  /** Raw inquiry payload for drawer/details */
  inquiryPayload?: InquiryFormData;
  nextStep: string | null;
  nextStepDue?: string;
  daysInStage: number;
  initials: string;
  avatarColor: string;
};

const opportunities: StoredOpportunity[] = [];
let idCounter = 1;
let loadedFromFile = false;

const DATA_FILE = ".data/inquiry-opportunities.json";

function loadFromFile(): void {
  if (loadedFromFile) return;
  loadedFromFile = true;
  try {
    const fs = require("fs") as typeof import("fs");
    const path = require("path") as typeof import("path");
    const fullPath = path.join(process.cwd(), DATA_FILE);
    if (!fs.existsSync(fullPath)) return;
    const raw = fs.readFileSync(fullPath, "utf-8");
    const data = JSON.parse(raw) as { opportunities: StoredOpportunity[]; idCounter: number };
    if (Array.isArray(data.opportunities)) {
      opportunities.push(...data.opportunities);
      if (typeof data.idCounter === "number" && data.idCounter > idCounter) {
        idCounter = data.idCounter;
      }
    }
  } catch {
    // No fs (edge) or file missing / invalid – keep in-memory only
  }
}

function saveToFile(): void {
  try {
    const fs = require("fs") as typeof import("fs");
    const path = require("path") as typeof import("path");
    const dir = path.join(process.cwd(), ".data");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const fullPath = path.join(dir, "inquiry-opportunities.json");
    fs.writeFileSync(
      fullPath,
      JSON.stringify({ opportunities, idCounter }, null, 2),
      "utf-8"
    );
  } catch {
    // Ignore (e.g. read-only filesystem in serverless)
  }
}

function nextId(): string {
  return `inq-${idCounter++}`;
}

export function addInquirySubmission(accountSlug: string, data: InquiryFormData): StoredOpportunity {
  loadFromFile();
  const clientName = [data.firstName, data.lastName].filter(Boolean).join(" ") || "Unknown";
  const valueNum = 0;
  const value = "—";
  const now = new Date().toISOString();
  const opportunity: StoredOpportunity = {
    id: nextId(),
    accountSlug,
    clientName,
    stageId: "inquiry",
    value,
    valueNum,
    budget: data.investmentRange || undefined,
    where: data.destination || undefined,
    journeyType: data.journeyType || undefined,
    notes: [data.whatMattersMost, data.additionalConsiderations]
      .filter(Boolean)
      .join("\n\n") || undefined,
    createdAt: now,
    needsAttention: true,
    inquiryPayload: data,
    nextStep: null,
    nextStepDue: undefined,
    daysInStage: 0,
    initials: (data.firstName?.slice(0, 1) || "") + (data.lastName?.slice(0, 1) || "") || "?",
    avatarColor: "bg-blue-500",
  };
  opportunities.push(opportunity);
  saveToFile();
  return opportunity;
}

export function getOpportunities(accountSlug?: string): StoredOpportunity[] {
  loadFromFile();
  if (accountSlug) {
    return opportunities.filter((o) => o.accountSlug === accountSlug);
  }
  return [...opportunities];
}

export function markOpportunityViewed(id: string): void {
  loadFromFile();
  const o = opportunities.find((op) => op.id === id);
  if (o) {
    o.needsAttention = false;
    saveToFile();
  }
}

export function getNeedsAttentionCount(accountSlug?: string): number {
  loadFromFile();
  const list = accountSlug
    ? opportunities.filter((o) => o.accountSlug === accountSlug)
    : opportunities;
  return list.filter((o) => o.needsAttention).length;
}
