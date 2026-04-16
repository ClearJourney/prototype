import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  BLOG_ADMIN_COOKIE,
  getAdminCookieValue,
  getBlogAdminPassword,
} from "@/lib/blog-admin-auth";

export async function POST(req: Request) {
  const password = getBlogAdminPassword();
  if (!password) {
    return NextResponse.json(
      { error: "Missing BLOG_ADMIN_PASSWORD" },
      { status: 500 }
    );
  }

  let body: unknown = null;
  try {
    body = (await req.json()) as unknown;
  } catch {
    // ignore
  }

  const submitted =
    body && typeof body === "object" && "password" in body
      ? String((body as { password?: unknown }).password ?? "")
      : "";

  if (submitted !== password) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const value = await getAdminCookieValue();
  if (!value) {
    return NextResponse.json(
      { error: "Missing BLOG_ADMIN_SECRET" },
      { status: 500 }
    );
  }

  cookies().set(BLOG_ADMIN_COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return NextResponse.json({ ok: true });
}

