import { NextResponse, type NextRequest } from "next/server";
import { BLOG_ADMIN_COOKIE, isValidAdminCookie } from "./src/lib/blog-admin-auth";

function isAdminRoute(pathname: string): boolean {
  return pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
}

function isLoginRoute(pathname: string): boolean {
  return pathname === "/admin/login" || pathname === "/api/admin/login";
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!isAdminRoute(pathname) || isLoginRoute(pathname)) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(BLOG_ADMIN_COOKIE)?.value;
  const ok = await isValidAdminCookie(cookie);
  if (ok) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

