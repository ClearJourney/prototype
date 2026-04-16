import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { BLOG_ADMIN_COOKIE } from "@/lib/blog-admin-auth";

export async function POST() {
  cookies().set(BLOG_ADMIN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return NextResponse.json({ ok: true });
}

