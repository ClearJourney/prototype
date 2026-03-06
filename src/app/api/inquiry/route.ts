import { NextRequest, NextResponse } from "next/server";
import { getAccountSlug } from "@/lib/account";
import { addInquirySubmission } from "@/lib/inquiry-store";
import type { InquiryFormData } from "@/types/secure-forms";

function parseBody(body: unknown): { accountSlug: string; data: InquiryFormData } | null {
  if (!body || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  const accountSlug = typeof o.accountSlug === "string" ? o.accountSlug : "";
  if (!accountSlug) return null;
  const data = o.data as unknown;
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  return {
    accountSlug,
    data: {
      planningStage: String(d.planningStage ?? ""),
      destination: String(d.destination ?? ""),
      numberOfTravelers: Number(d.numberOfTravelers) || 1,
      desiredDates: d.desiredDates != null ? String(d.desiredDates) : undefined,
      investmentRange: String(d.investmentRange ?? ""),
      journeyType: String(d.journeyType ?? ""),
      servicesRequested: Array.isArray(d.servicesRequested)
        ? (d.servicesRequested as string[])
        : [],
      whatMattersMost: String(d.whatMattersMost ?? ""),
      additionalConsiderations: String(d.additionalConsiderations ?? ""),
      firstName: String(d.firstName ?? ""),
      lastName: String(d.lastName ?? ""),
      email: String(d.email ?? ""),
      phone: String(d.phone ?? ""),
      countryState: String(d.countryState ?? ""),
      referralSource: d.referralSource != null ? String(d.referralSource) : undefined,
      newsletterOptIn: Boolean(d.newsletterOptIn),
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = parseBody(body);
    if (!parsed) {
      return NextResponse.json(
        { error: "Missing accountSlug or form data" },
        { status: 400 }
      );
    }
    const { accountSlug, data } = parsed;
    const validSlug = getAccountSlug();
    if (accountSlug !== validSlug) {
      return NextResponse.json({ error: "Invalid account" }, { status: 403 });
    }
    if (!data.email?.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    const opportunity = addInquirySubmission(accountSlug, data);
    return NextResponse.json({
      success: true,
      opportunityId: opportunity.id,
      message: "Inquiry submitted successfully",
    });
  } catch (e) {
    console.error("Inquiry API error:", e);
    return NextResponse.json(
      { error: "Submission failed" },
      { status: 500 }
    );
  }
}
