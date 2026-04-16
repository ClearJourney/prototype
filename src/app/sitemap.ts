import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog-store";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: new Date() },
    { url: `${base}/privacy`, lastModified: new Date() },
    { url: `${base}/terms`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
  ];

  const posts = getPublishedPosts();
  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${encodeURIComponent(p.slug)}`,
    lastModified: new Date(p.updatedAt || p.publishedAt || p.createdAt),
  }));

  return [...staticRoutes, ...postRoutes];
}

