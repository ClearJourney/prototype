import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";
import { BLOG_ADMIN_COOKIE, isValidAdminCookie } from "@/lib/blog-admin-auth";

export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function POST(req: Request) {
  const cookie = cookies().get(BLOG_ADMIN_COOKIE)?.value;
  if (!(await isValidAdminCookie(cookie))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const type = file.type;
  if (!ALLOWED.has(type)) {
    return NextResponse.json(
      { error: "Invalid file type. Use JPEG, PNG, WebP, or GIF." },
      { status: 400 }
    );
  }

  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.length > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  const ext = EXT[type] ?? "bin";
  const name = `${Date.now()}-${randomBytes(8).toString("hex")}.${ext}`;
  const publicDir = path.join(process.cwd(), "public", "uploads", "blog");
  await mkdir(publicDir, { recursive: true });
  await writeFile(path.join(publicDir, name), buf);

  const url = `/uploads/blog/${name}`;
  return NextResponse.json({ url });
}
