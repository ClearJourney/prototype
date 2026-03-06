import { NextRequest, NextResponse } from "next/server";
import { markOpportunityViewed } from "@/lib/inquiry-store";

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    markOpportunityViewed(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Opportunity PATCH error:", e);
    return NextResponse.json(
      { error: "Failed to update" },
      { status: 500 }
    );
  }
}
