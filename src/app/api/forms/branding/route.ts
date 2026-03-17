import { NextRequest, NextResponse } from "next/server";
import { getAccountSlug } from "@/lib/account";

/**
 * Public API: returns advisor branding (company name) for the inquiry form header.
 * Only returns data when the request slug matches the account slug.
 */
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  const validSlug = getAccountSlug();
  if (!slug || slug !== validSlug) {
    return NextResponse.json({ error: "Invalid or missing slug" }, { status: 404 });
  }
  const businessName =
    process.env.NEXT_PUBLIC_ADVISOR_BUSINESS_NAME ??
    process.env.ADVISOR_BUSINESS_NAME ??
    "Company Name";
  return NextResponse.json({ businessName });
}
