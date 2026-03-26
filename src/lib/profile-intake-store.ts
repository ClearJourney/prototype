/**
 * Persists client profile intake submissions when the token is not linked to an opportunity,
 * so honorific + traveler data from the public form is not dropped.
 */

import type { TravelerDetailsStep } from "@/types/secure-forms";

const DATA_FILE = ".data/profile-intake-orphans.json";

type OrphanEntry = {
  traveler: TravelerDetailsStep;
  submittedAt: string;
};

type StoreShape = Record<string, OrphanEntry>;

function load(): StoreShape {
  try {
    const fs = require("fs") as typeof import("fs");
    const path = require("path") as typeof import("path");
    const fullPath = path.join(process.cwd(), DATA_FILE);
    if (!fs.existsSync(fullPath)) return {};
    const raw = fs.readFileSync(fullPath, "utf-8");
    const data = JSON.parse(raw) as StoreShape;
    return typeof data === "object" && data !== null ? data : {};
  } catch {
    return {};
  }
}

function save(data: StoreShape): void {
  try {
    const fs = require("fs") as typeof import("fs");
    const path = require("path") as typeof import("path");
    const dir = path.join(process.cwd(), ".data");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "profile-intake-orphans.json"), JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // ignore
  }
}

export function saveOrphanProfileIntake(token: string, traveler: TravelerDetailsStep): void {
  if (!token.trim()) return;
  const all = load();
  all[token] = { traveler, submittedAt: new Date().toISOString() };
  save(all);
}
