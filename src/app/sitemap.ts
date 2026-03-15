import { globalBlogs } from "@/blogs/listofblogs";
import { getAllDistrictCoverageParams } from "@/content/sanjeevani-province-pages";
import { getBlogPath } from "@/lib/blog-routes";
import { getBlogFeed } from "@/lib/content/posts";
import type { MetadataRoute } from "next";

const SITE_URL = "https://www.nivaranfoundation.org";

const STATIC_ROUTES: Array<{
  path: string;
  priority: number;
  lastModified?: string;
}> = [
  { path: "/", priority: 1.0 },
  { path: "/about", priority: 0.9 },
  { path: "/donate", priority: 1.0 },
  { path: "/contact-us", priority: 0.8 },
  { path: "/career", priority: 0.7 },
  { path: "/blogs", priority: 0.9 },
  { path: "/articles", priority: 0.9 },
  { path: "/stories", priority: 0.9 },
  { path: "/news", priority: 0.9 },
  { path: "/global-news", priority: 0.8 },
  { path: "/projects", priority: 0.9 },
  { path: "/mobile-health-camps-nepal", priority: 0.8 },
  { path: "/rural-healthcare-nepal", priority: 0.8 },
  { path: "/maternal-health-nepal", priority: 0.8 },
  { path: "/health-ngo-nepal", priority: 0.8 },
  { path: "/free-health-camp-nepal", priority: 0.8 },
  { path: "/impact-fact-sheet", priority: 0.7 },
  { path: "/healthcare-coverage-nepal", priority: 0.8 },
  { path: "/sanjeevani", priority: 0.8 },
  { path: "/sanjeevani/tracking", priority: 0.8 },
  { path: "/vidya", priority: 0.8 },
  { path: "/volunteer", priority: 0.9 },
  { path: "/programs", priority: 0.9 },
  { path: "/programs/health", priority: 0.8 },
  { path: "/programs/education", priority: 0.8 },
  { path: "/gaupalika", priority: 0.6 },
  { path: "/corporate", priority: 0.6 },
  { path: "/accountability-and-transparency", priority: 0.6 },
  { path: "/financial-reports", priority: 0.6 },
  { path: "/financial-responsibility", priority: 0.6 },
  { path: "/belonging-and-inclusion", priority: 0.6 },
  { path: "/advisory-board", priority: 0.5 },
  { path: "/dei", priority: 0.5 },
  { path: "/how-to-help", priority: 0.6 },
  { path: "/organize-locally", priority: 0.5 },
  { path: "/attend", priority: 0.5 },
  { path: "/journey", priority: 0.5 },
  { path: "/frequently-asked-questions", priority: 0.5 },
  { path: "/terms-of-service", priority: 0.3 },
  { path: "/privacy-policy", priority: 0.3 },
];

function toAbsoluteUrl(path: string) {
  return `${SITE_URL}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: toAbsoluteUrl(route.path),
    lastModified: route.lastModified ? new Date(route.lastModified) : now,
    priority: route.priority,
  }));

  const staticBlogEntries: MetadataRoute.Sitemap = globalBlogs.map((blog) => ({
    url: toAbsoluteUrl(getBlogPath(blog)),
    lastModified: blog.date ? new Date(blog.date) : now,
    priority: 0.7,
  }));

  const dynamicBlogItems = await getBlogFeed(500);
  const dynamicBlogEntries: MetadataRoute.Sitemap = dynamicBlogItems.map(
    (blog) => ({
      url: toAbsoluteUrl(getBlogPath(blog)),
      lastModified: blog.date ? new Date(blog.date) : now,
      priority: 0.8,
    })
  );

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
    lastModified: now,
    priority: 0.7,
  }));

  const districtCoverageEntries: MetadataRoute.Sitemap =
    getAllDistrictCoverageParams().map(({ province, district }) => ({
      url: toAbsoluteUrl(`/healthcare-coverage-nepal/${province}/${district}`),
      lastModified: now,
      priority: 0.65,
    }));

  [
    ...staticEntries,
    ...provinceCoverageEntries,
    ...districtCoverageEntries,
    ...staticBlogEntries,
    ...dynamicBlogEntries,
  ].forEach((entry) => {
    deduped.set(entry.url, entry);
  });

  return Array.from(deduped.values());
}
