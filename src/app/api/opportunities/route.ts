import { NextRequest, NextResponse } from "next/server";
import { getAccountSlug } from "@/lib/account";
import { getOpportunities, getNeedsAttentionCount } from "@/lib/inquiry-store";

export async function GET(request: NextRequest) {
  try {
    const accountSlug = getAccountSlug();
    const opportunities = getOpportunities(accountSlug);
    const needsAttentionCount = getNeedsAttentionCount(accountSlug);
    return NextResponse.json({
      opportunities,
      needsAttentionCount,
    });
  } catch (e) {
    console.error("Opportunities API error:", e);
    return NextResponse.json(
      { error: "Failed to load opportunities" },
      { status: 500 }
    );
  }
}
