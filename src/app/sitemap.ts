import { getAllDistrictCoverageParams } from "@/content/sanjeevani-province-pages";
import { getBlogPath } from "@/lib/blog-routes";
import { getBlogFeed } from "@/lib/content/posts";
import { getGlobalFeedBySegment } from "@/lib/global-feed";
import {
  detectSiteVariantFromHost,
  getSiteVariantConfig,
} from "@/lib/site-variant";
import fs from "node:fs/promises";
import path from "node:path";
import { headers } from "next/headers";
import type { MetadataRoute } from "next";

type SitemapEntry = MetadataRoute.Sitemap[number];

type StaticRoute = {
  path: string;
  priority: number;
  isKeyPage?: boolean;
};

const MAIN_STATIC_ROUTES: StaticRoute[] = [
  { path: "/", priority: 1.0, isKeyPage: true },
  { path: "/about", priority: 0.9, isKeyPage: true },
  { path: "/leadership", priority: 0.7, isKeyPage: true },
  { path: "/editorial-standards", priority: 0.6, isKeyPage: true },
  { path: "/care-model", priority: 0.7, isKeyPage: true },
  { path: "/donate", priority: 1.0, isKeyPage: true },
  { path: "/contact-us", priority: 0.8 },
  { path: "/career", priority: 0.7 },
  { path: "/blogs", priority: 0.9, isKeyPage: true },
  { path: "/articles", priority: 0.9, isKeyPage: true },
  { path: "/stories", priority: 0.9, isKeyPage: true },
  { path: "/news", priority: 0.9, isKeyPage: true },
  { path: "/global-news", priority: 0.8 },
  { path: "/projects", priority: 0.9, isKeyPage: true },
  { path: "/mobile-health-camps-nepal", priority: 0.8, isKeyPage: true },
  { path: "/rural-healthcare-nepal", priority: 0.8, isKeyPage: true },
  { path: "/maternal-health-nepal", priority: 0.8, isKeyPage: true },
  { path: "/health-ngo-nepal", priority: 0.8, isKeyPage: true },
  { path: "/free-health-camp-nepal", priority: 0.8, isKeyPage: true },
  { path: "/impact-fact-sheet", priority: 0.7, isKeyPage: true },
  { path: "/healthcare-coverage-nepal", priority: 0.8, isKeyPage: true },
  { path: "/sanjeevani", priority: 0.8 },
  { path: "/sanjeevani/tracking", priority: 0.8, isKeyPage: true },
  { path: "/vidya", priority: 0.8 },
  { path: "/volunteer", priority: 0.9, isKeyPage: true },
  { path: "/programs", priority: 0.9, isKeyPage: true },
  { path: "/programs/health", priority: 0.8 },
  { path: "/programs/education", priority: 0.8 },
  { path: "/gaupalika", priority: 0.6 },
  { path: "/corporate", priority: 0.6 },
  { path: "/accountability-and-transparency", priority: 0.6 },
  { path: "/financial-reports", priority: 0.6 },
  { path: "/financial-responsibility", priority: 0.6 },
  { path: "/belonging-and-inclusion", priority: 0.6 },
  { path: "/advisory-board", priority: 0.6, isKeyPage: true },
  { path: "/dei", priority: 0.5 },
  { path: "/how-to-help", priority: 0.6 },
  { path: "/organize-locally", priority: 0.5 },
  { path: "/attend", priority: 0.5 },
  { path: "/journey", priority: 0.5 },
  { path: "/frequently-asked-questions", priority: 0.5 },
  { path: "/terms-of-service", priority: 0.3 },
  { path: "/privacy-policy", priority: 0.3 },
];

const GLOBAL_STATIC_ROUTES: StaticRoute[] = [
  { path: "/", priority: 1.0, isKeyPage: true },
  { path: "/campaigns", priority: 0.9, isKeyPage: true },
  { path: "/campaigns/israel", priority: 0.9, isKeyPage: true },
  { path: "/news", priority: 0.9, isKeyPage: true },
  { path: "/stories", priority: 0.8, isKeyPage: true },
  { path: "/articles", priority: 0.8, isKeyPage: true },
  { path: "/contact", priority: 0.7 },
  { path: "/privacy-policy", priority: 0.3 },
  { path: "/terms-of-service", priority: 0.3 },
];

const USA_STATIC_ROUTES: StaticRoute[] = [
  { path: "/", priority: 1.0, isKeyPage: true },
  { path: "/live", priority: 0.8, isKeyPage: true },
  { path: "/blogs", priority: 0.8, isKeyPage: true },
];

function toAbsoluteUrl(siteUrl: string, path: string) {
  return `${siteUrl}${path}`;
}

function buildStaticEntries(
  siteUrl: string,
  routes: StaticRoute[],
  now: Date,
  keyPageLastModified: string,
): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: toAbsoluteUrl(siteUrl, route.path),
    lastModified: route.isKeyPage ? keyPageLastModified : now,
    priority: route.priority,
  }));
}

function dedupeEntries(entries: MetadataRoute.Sitemap) {
  const deduped = new Map<string, SitemapEntry>();

  entries.forEach((entry) => {
    deduped.set(entry.url, entry);
  });

  return Array.from(deduped.values());
}

async function getSeoVariant() {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") || headerStore.get("host") || "";
  return detectSiteVariantFromHost(host);
}

async function buildMainSitemap() {
  const siteUrl = getSiteVariantConfig("main").siteUrl;
  const now = new Date();
  const keyPageLastModified = now.toISOString();
  const staticEntries = buildStaticEntries(
    siteUrl,
    MAIN_STATIC_ROUTES,
    now,
    keyPageLastModified,
  );

  const provinceCoverageEntries: MetadataRoute.Sitemap = [
    "karnali",
    "sudurpashchim",
    "bagmati",
    "lumbini",
    "madhesh",
    "gandaki",
    "koshi",
  ].map((slug) => ({
    url: toAbsoluteUrl(siteUrl, `/healthcare-coverage-nepal/${slug}`),
    lastModified: keyPageLastModified,
    priority: 0.7,
  }));

  const districtCoverageEntries: MetadataRoute.Sitemap =
    getAllDistrictCoverageParams().map(({ province, district }) => ({
      url: toAbsoluteUrl(
        siteUrl,
        `/healthcare-coverage-nepal/${province}/${district}`,
      ),
      lastModified: keyPageLastModified,
      priority: 0.65,
    }));

  const blogItems = await getBlogFeed(500);
  const blogEntries: MetadataRoute.Sitemap = blogItems.map((blog) => ({
    url: toAbsoluteUrl(siteUrl, getBlogPath(blog)),
    lastModified: blog.date ? new Date(blog.date) : now,
    priority: 0.8,
  }));

  return dedupeEntries([
    ...staticEntries,
    ...provinceCoverageEntries,
    ...districtCoverageEntries,
    ...blogEntries,
  ]);
}

async function buildGlobalSitemap() {
  const siteUrl = getSiteVariantConfig("global").siteUrl;
  const now = new Date();
  const keyPageLastModified = now.toISOString();
  const staticEntries = buildStaticEntries(
    siteUrl,
    GLOBAL_STATIC_ROUTES,
    now,
    keyPageLastModified,
  );

  const [news, stories, articles] = await Promise.all([
    getGlobalFeedBySegment("news"),
    getGlobalFeedBySegment("stories"),
    getGlobalFeedBySegment("articles"),
  ]);

  const newsEntries: MetadataRoute.Sitemap = news.map((blog) => ({
    url: toAbsoluteUrl(siteUrl, getBlogPath(blog)),
    lastModified: blog.date ? new Date(blog.date) : now,
    priority: 0.8,
  }));

  const storyEntries: MetadataRoute.Sitemap = stories.map((blog) => ({
    url: toAbsoluteUrl(siteUrl, getBlogPath(blog)),
    lastModified: blog.date ? new Date(blog.date) : now,
    priority: 0.7,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((blog) => ({
    url: toAbsoluteUrl(siteUrl, getBlogPath(blog)),
    lastModified: blog.date ? new Date(blog.date) : now,
    priority: 0.7,
  }));

  return dedupeEntries([
    ...staticEntries,
    ...newsEntries,
    ...storyEntries,
    ...articleEntries,
  ]);
}

async function getUsaBlogSlugs() {
  const directory = path.join(process.cwd(), "src", "blogs", "usa");

  try {
    const files = await fs.readdir(directory, { withFileTypes: true });
    return files
      .filter((entry) => entry.isFile() && /\.(md|mdx)$/i.test(entry.name))
      .map((entry) => entry.name.replace(/\.(md|mdx)$/i, ""))
      .sort();
  } catch {
    return [];
  }
}

async function buildUsaSitemap() {
  const siteUrl = getSiteVariantConfig("usa").siteUrl;
  const now = new Date();
  const keyPageLastModified = now.toISOString();
  const staticEntries = buildStaticEntries(
    siteUrl,
    USA_STATIC_ROUTES,
    now,
    keyPageLastModified,
  );
  const blogSlugs = await getUsaBlogSlugs();
  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: toAbsoluteUrl(siteUrl, `/blogs/${slug}`),
    lastModified: keyPageLastModified,
    priority: 0.7,
  }));

  return dedupeEntries([...staticEntries, ...blogEntries]);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const variant = await getSeoVariant();

  if (variant === "global") {
    return buildGlobalSitemap();
  }

  if (variant === "usa") {
    return buildUsaSitemap();
  }

  return buildMainSitemap();
}
