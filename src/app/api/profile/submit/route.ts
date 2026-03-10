import { NextRequest, NextResponse } from "next/server";

/**
 * Called when a client submits the Client Profile form.
 * Marks the linked opportunity as completed (sent → completed).
 */
export const dynamic = "force-dynamic";

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
    const { markClientProfileCompletedByToken } = await import("@/lib/inquiry-store");
    const updated = markClientProfileCompletedByToken(token);
    if (!updated) {
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
