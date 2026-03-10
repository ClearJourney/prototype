import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    const { getAccountSlug } = await import("@/lib/account");
    const {
      ensureOpportunityExists,
      registerClientProfileToken,
      requestClientProfile,
    } = await import("@/lib/inquiry-store");
    const accountSlug = getAccountSlug();
    const body = (await request.json().catch(() => ({}))) as {
      token?: string;
      clientName?: string;
      stageId?: string;
    };
    const baseUrl = getBaseUrl();

    let result: { link: string; token: string } | null = null;
    const token = body.token && typeof body.token === "string" ? body.token.trim() : null;

    result = token
      ? registerClientProfileToken(id, token, baseUrl)
      : requestClientProfile(id, baseUrl);

    if (!result) {
      ensureOpportunityExists(id, accountSlug, {
        clientName: body.clientName ?? "Client",
        stageId: body.stageId ?? "inquiry",
      });
      result = token
        ? registerClientProfileToken(id, token, baseUrl)
        : requestClientProfile(id, baseUrl);
    }
    if (!result) {
      return NextResponse.json({ error: "Opportunity not found" }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      link: result.link,
      status: "sent",
    });
  } catch (e) {
    console.error("Request client profile error:", e);
    return NextResponse.json(
      { error: "Failed to request client profile" },
      { status: 500 }
    );
  }
}

function getBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    "http://localhost:3000"
  );
}

