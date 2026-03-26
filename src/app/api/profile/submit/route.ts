import { NextRequest, NextResponse } from "next/server";
import type { ClientProfileFormData, TravelerDetailsStep } from "@/types/secure-forms";

/**
 * Called when a client submits the Client Profile form.
 * Marks the linked opportunity as completed (sent → completed) and stores traveler payload when provided.
 */
export const dynamic = "force-dynamic";

function parseTraveler(body: unknown): TravelerDetailsStep | undefined {
  const data = body as { data?: ClientProfileFormData } | null;
  const t = data?.data?.traveler;
  if (!t || typeof t !== "object") return undefined;
  return t as TravelerDetailsStep;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const token = typeof body?.token === "string" ? body.token.trim() : "";
    if (!token) {
      return NextResponse.json(
        { error: "Missing token" },
        { status: 400 }
      );
    }
    const traveler = parseTraveler(body);
    const { markClientProfileCompletedByToken } = await import("@/lib/inquiry-store");
    const linked = markClientProfileCompletedByToken(token, traveler);
    if (!linked) {
      if (traveler) {
        const { saveOrphanProfileIntake } = await import("@/lib/profile-intake-store");
        saveOrphanProfileIntake(token, traveler);
        return NextResponse.json({ success: true, status: "completed", stored: "orphan" });
      }
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, status: "completed" });
  } catch (e) {
    console.error("Profile submit API error:", e);
    return NextResponse.json(
      { error: "Submission failed" },
      { status: 500 }
    );
  }
}
