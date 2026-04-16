"use server";

import { redirect } from "next/navigation";
import { createPost, deletePost, updatePost } from "@/lib/blog-store";
import { sanitizePostBodyHtml } from "@/lib/sanitize-post-html";

function getString(fd: FormData, key: string): string {
  const v = fd.get(key);
  return typeof v === "string" ? v : "";
}

function getBool(fd: FormData, key: string): boolean {
  const v = fd.get(key);
  return v === "on" || v === "true" || v === "1";
}

export async function createPostAction(fd: FormData) {
  const title = getString(fd, "title").trim();
  const slug = getString(fd, "slug").trim();
  const excerpt = getString(fd, "excerpt");
  const content = sanitizePostBodyHtml(getString(fd, "content"));
  const heroImage = getString(fd, "heroImage").trim();
  const seoTitle = getString(fd, "seoTitle").trim();
  const seoDescription = getString(fd, "seoDescription").trim();
  const published = getBool(fd, "published");

  const post = createPost({
    title,
    slug,
    excerpt,
    content,
    heroImage,
    seoTitle,
    seoDescription,
    published,
  });
  redirect(`/admin/posts/${encodeURIComponent(post.id)}/edit`);
}

export async function updatePostAction(id: string, fd: FormData) {
  const title = getString(fd, "title").trim();
  const slug = getString(fd, "slug").trim();
  const excerpt = getString(fd, "excerpt");
  const content = sanitizePostBodyHtml(getString(fd, "content"));
  const heroImage = getString(fd, "heroImage").trim();
  const seoTitle = getString(fd, "seoTitle").trim();
  const seoDescription = getString(fd, "seoDescription").trim();
  const published = getBool(fd, "published");

  updatePost(id, {
    title,
    slug,
    excerpt,
    content,
    heroImage,
    seoTitle,
    seoDescription,
    published,
  });
  redirect(`/admin/posts/${encodeURIComponent(id)}/edit?saved=1`);
}

export async function deletePostAction(id: string) {
  deletePost(id);
  redirect("/admin/posts");
}
