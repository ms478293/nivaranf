import { globalBlogs } from "@/blogs/listofblogs";
import { getBlogPath } from "@/lib/blog-routes";
import { getBlogFeed } from "@/lib/content/posts";
import type { MetadataRoute } from "next";

const SITE_URL = "https://www.nivaranfoundation.org";

const STATIC_ROUTES: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; isKeyPage?: boolean }> = [
  { path: "/", priority: 1.0, changeFrequency: "daily", isKeyPage: true },
  { path: "/about", priority: 0.9, changeFrequency: "monthly", isKeyPage: true },
  { path: "/donate", priority: 1.0, changeFrequency: "weekly", isKeyPage: true },
  { path: "/contact-us", priority: 0.8, changeFrequency: "monthly" },
  { path: "/career", priority: 0.7, changeFrequency: "weekly" },
  { path: "/blogs", priority: 0.9, changeFrequency: "daily", isKeyPage: true },
  { path: "/articles", priority: 0.9, changeFrequency: "daily", isKeyPage: true },
  { path: "/stories", priority: 0.9, changeFrequency: "daily", isKeyPage: true },
  { path: "/news", priority: 0.9, changeFrequency: "daily", isKeyPage: true },
  { path: "/global-news", priority: 0.8, changeFrequency: "hourly" },
  { path: "/projects", priority: 0.9, changeFrequency: "weekly", isKeyPage: true },
  { path: "/mobile-health-camps-nepal", priority: 0.8, changeFrequency: "monthly", isKeyPage: true },
  { path: "/rural-healthcare-nepal", priority: 0.8, changeFrequency: "monthly", isKeyPage: true },
  { path: "/maternal-health-nepal", priority: 0.8, changeFrequency: "monthly", isKeyPage: true },
  { path: "/health-ngo-nepal", priority: 0.8, changeFrequency: "monthly", isKeyPage: true },
  { path: "/free-health-camp-nepal", priority: 0.8, changeFrequency: "monthly", isKeyPage: true },
  { path: "/impact-fact-sheet", priority: 0.7, changeFrequency: "monthly", isKeyPage: true },
  { path: "/healthcare-coverage-nepal", priority: 0.8, changeFrequency: "weekly", isKeyPage: true },
  { path: "/sanjeevani", priority: 0.8, changeFrequency: "weekly" },
  { path: "/sanjeevani/tracking", priority: 0.8, changeFrequency: "weekly", isKeyPage: true },
  { path: "/vidya", priority: 0.8, changeFrequency: "weekly" },
  { path: "/volunteer", priority: 0.9, changeFrequency: "weekly", isKeyPage: true },
  { path: "/programs", priority: 0.9, changeFrequency: "monthly", isKeyPage: true },
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
  const keyPageLastModified = new Date().toISOString();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: toAbsoluteUrl(route.path),
    lastModified: route.isKeyPage ? keyPageLastModified : now,
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
  const provinceCoverageEntries: MetadataRoute.Sitemap = [
    "karnali",
    "sudurpashchim",
    "bagmati",
    "lumbini",
    "madhesh",
    "gandaki",
    "koshi",
  ].map((slug) => ({
    url: toAbsoluteUrl(`/healthcare-coverage-nepal/${slug}`),
    lastModified: keyPageLastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  [...staticEntries, ...provinceCoverageEntries, ...staticBlogEntries, ...dynamicBlogEntries].forEach((entry) => {
    deduped.set(entry.url, entry);
  });

  return Array.from(deduped.values());
}
