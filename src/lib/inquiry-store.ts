/**
 * In-memory store for inquiry submissions → pipeline opportunities.
 * Persists to .data/inquiry-opportunities.json in Node (e.g. dev) so data survives restarts.
 * In production, replace with a database.
 */

import type { InquiryFormData, TravelerDetailsStep } from "@/types/secure-forms";

export type ClientProfileStatus = "not_requested" | "sent" | "completed";

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
  /** Client Profile request flow (Inquiry/Research stages) */
  clientProfileStatus?: ClientProfileStatus;
  clientProfileFormLink?: string | null;
  clientProfileRequestedAt?: string | null;
  clientProfileCompletedAt?: string | null;
  /** Latest traveler step from submitted Client Profile intake (honorific, legal name, etc.) */
  profileSubmittedTraveler?: TravelerDetailsStep;
};

const opportunities: StoredOpportunity[] = [];
const profileTokenToOpportunityId = new Map<string, string>();
let idCounter = 1;
let loadedFromFile = false;

const DATA_FILE = ".data/inquiry-opportunities.json";

type StoredData = {
  opportunities: StoredOpportunity[];
  idCounter: number;
  profileTokenMap?: Record<string, string>;
};

function loadFromFile(): void {
  if (loadedFromFile) return;
  loadedFromFile = true;
  try {
    const fs = require("fs") as typeof import("fs");
    const path = require("path") as typeof import("path");
    const fullPath = path.join(process.cwd(), DATA_FILE);
    if (!fs.existsSync(fullPath)) return;
    const raw = fs.readFileSync(fullPath, "utf-8");
    const data = JSON.parse(raw) as StoredData;
    if (Array.isArray(data.opportunities)) {
      opportunities.push(...data.opportunities);
      if (typeof data.idCounter === "number" && data.idCounter > idCounter) {
        idCounter = data.idCounter;
      }
    }
    if (data.profileTokenMap && typeof data.profileTokenMap === "object") {
      for (const [token, oppId] of Object.entries(data.profileTokenMap)) {
        profileTokenToOpportunityId.set(token, oppId);
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
    const profileTokenMap = Object.fromEntries(profileTokenToOpportunityId);
    fs.writeFileSync(
      fullPath,
      JSON.stringify({ opportunities, idCounter, profileTokenMap }, null, 2),
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

function generateProfileToken(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let t = "";
  for (let i = 0; i < 24; i++) t += chars[Math.floor(Math.random() * chars.length)];
  return t;
}

export function requestClientProfile(
  opportunityId: string,
  baseUrl: string
): { link: string; token: string } | null {
  loadFromFile();
  const o = opportunities.find((op) => op.id === opportunityId);
  if (!o) return null;
  const token = generateProfileToken();
  return registerClientProfileToken(opportunityId, token, baseUrl);
}

/** Register a client-generated token (e.g. from same UI as client profile page). */
export function registerClientProfileToken(
  opportunityId: string,
  token: string,
  baseUrl: string
): { link: string; token: string } | null {
  loadFromFile();
  const o = opportunities.find((op) => op.id === opportunityId);
  if (!o) return null;
  const link = `${baseUrl}/forms/profile/${token}`;
  o.clientProfileStatus = "sent";
  o.clientProfileFormLink = link;
  o.clientProfileRequestedAt = new Date().toISOString();
  profileTokenToOpportunityId.set(token, opportunityId);
  saveToFile();
  return { link, token };
}

export function getOpportunityIdByProfileToken(token: string): string | null {
  loadFromFile();
  return profileTokenToOpportunityId.get(token) ?? null;
}

export function markClientProfileCompleted(opportunityId: string): void {
  loadFromFile();
  const o = opportunities.find((op) => op.id === opportunityId);
  if (o) {
    o.clientProfileStatus = "completed";
    o.clientProfileCompletedAt = new Date().toISOString();
    saveToFile();
  }
}

export function markClientProfileCompletedByToken(
  token: string,
  traveler?: TravelerDetailsStep
): boolean {
  loadFromFile();
  const opportunityId = profileTokenToOpportunityId.get(token);
  if (!opportunityId) return false;
  const o = opportunities.find((op) => op.id === opportunityId);
  if (!o) return false;
  if (traveler) {
    o.profileSubmittedTraveler = traveler;
  }
  o.clientProfileStatus = "completed";
  o.clientProfileCompletedAt = new Date().toISOString();
  saveToFile();
  return true;
}

/** Create a minimal opportunity if it doesn't exist (e.g. for manually added pipeline cards). */
export function ensureOpportunityExists(
  opportunityId: string,
  accountSlug: string,
  opts: { clientName: string; stageId: string }
): boolean {
  loadFromFile();
  if (opportunities.some((o) => o.id === opportunityId)) return true;
  const now = new Date().toISOString();
  const initials = opts.clientName.slice(0, 2).toUpperCase().replace(/\s/g, "") || "?";
  opportunities.push({
    id: opportunityId,
    accountSlug,
    clientName: opts.clientName,
    stageId: opts.stageId,
    value: "—",
    valueNum: 0,
    createdAt: now,
    needsAttention: false,
    nextStep: null,
    daysInStage: 0,
    initials,
    avatarColor: "bg-navy",
  });
  saveToFile();
  return true;
}
