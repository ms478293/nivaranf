import { globalBlogs } from "@/blogs/listofblogs";
import { getBlogPath } from "@/lib/blog-routes";
import { getBlogFeed } from "@/lib/content/posts";
import type { MetadataRoute } from "next";

const SITE_URL = "https://www.nivaranfoundation.org";

const STATIC_ROUTES: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/donate", priority: 1, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact-us", priority: 0.8, changeFrequency: "monthly" },
  { path: "/career", priority: 0.7, changeFrequency: "weekly" },
  { path: "/blogs", priority: 0.9, changeFrequency: "daily" },
  { path: "/articles", priority: 0.9, changeFrequency: "daily" },
  { path: "/stories", priority: 0.9, changeFrequency: "daily" },
  { path: "/news", priority: 0.9, changeFrequency: "daily" },
  { path: "/global-news", priority: 0.8, changeFrequency: "hourly" },
  { path: "/sanjeevani", priority: 0.8, changeFrequency: "weekly" },
  { path: "/vidya", priority: 0.8, changeFrequency: "weekly" },
  { path: "/volunteer", priority: 0.7, changeFrequency: "weekly" },
  { path: "/programs", priority: 0.7, changeFrequency: "monthly" },
  { path: "/programs/health", priority: 0.8, changeFrequency: "monthly" },
  { path: "/programs/education", priority: 0.8, changeFrequency: "monthly" },
  { path: "/gaupalika", priority: 0.6, changeFrequency: "monthly" },
  { path: "/corporate", priority: 0.6, changeFrequency: "monthly" },
  { path: "/accountability-and-transparency", priority: 0.6, changeFrequency: "monthly" },
  { path: "/financial-reports", priority: 0.6, changeFrequency: "monthly" },
  { path: "/financial-responsibility", priority: 0.6, changeFrequency: "monthly" },
  { path: "/belonging-and-inclusion", priority: 0.6, changeFrequency: "monthly" },
  { path: "/advisory-board", priority: 0.5, changeFrequency: "monthly" },
  { path: "/dei", priority: 0.5, changeFrequency: "monthly" },
  { path: "/how-to-help", priority: 0.6, changeFrequency: "monthly" },
  { path: "/organize-locally", priority: 0.5, changeFrequency: "monthly" },
  { path: "/attend", priority: 0.5, changeFrequency: "monthly" },
  { path: "/journey", priority: 0.5, changeFrequency: "monthly" },
  { path: "/frequently-asked-questions", priority: 0.5, changeFrequency: "monthly" },
  { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
];

function toAbsoluteUrl(path: string) {
  return `${SITE_URL}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: toAbsoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const staticBlogEntries: MetadataRoute.Sitemap = globalBlogs.map((blog) => ({
    url: toAbsoluteUrl(getBlogPath(blog)),
    lastModified: blog.date ? new Date(blog.date) : now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const dynamicBlogItems = await getBlogFeed(500);
  const dynamicBlogEntries: MetadataRoute.Sitemap = dynamicBlogItems.map((blog) => ({
    url: toAbsoluteUrl(getBlogPath(blog)),
    lastModified: blog.date ? new Date(blog.date) : now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const deduped = new Map<string, MetadataRoute.Sitemap[number]>();
  [...staticEntries, ...staticBlogEntries, ...dynamicBlogEntries].forEach((entry) => {
    deduped.set(entry.url, entry);
  });

  return Array.from(deduped.values());
}
