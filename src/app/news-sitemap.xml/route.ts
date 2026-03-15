import { getBlogPath } from "@/lib/blog-routes";
import { getBlogFeed } from "@/lib/content/posts";
import { getGlobalFeedBySegment } from "@/lib/global-feed";
import {
  detectSiteVariantFromHost,
  getSiteVariantConfig,
  type SiteVariant,
} from "@/lib/site-variant";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

type NewsSitemapItem = {
  title: string;
  slug: string;
  date: string;
  type?: string;
};

const NEWS_WINDOW_MS = 1000 * 60 * 60 * 24 * 2;
const NEWS_LIMIT = 1000;

function xmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function normalizeIsoDate(value?: string) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString();
}

function filterRecentNews(items: NewsSitemapItem[]) {
  const cutoff = Date.now() - NEWS_WINDOW_MS;

  return items
    .filter((item) => item.type === undefined || item.type === "News")
    .filter((item) => {
      const parsed = item.date ? new Date(item.date).getTime() : Number.NaN;
      return Number.isFinite(parsed) && parsed >= cutoff;
    })
    .slice(0, NEWS_LIMIT);
}

async function getVariant() {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") || headerStore.get("host") || "";
  return detectSiteVariantFromHost(host);
}

async function getNewsItemsForVariant(variant: SiteVariant) {
  if (variant === "global") {
    const items = await getGlobalFeedBySegment("news");
    return filterRecentNews(items);
  }

  if (variant === "usa") {
    return [];
  }

  const items = await getBlogFeed(NEWS_LIMIT * 2);
  return filterRecentNews(items);
}

export async function GET() {
  const variant = await getVariant();
  const siteConfig = getSiteVariantConfig(variant);
  const publicationName =
    variant === "global" ? "Nivaran Global" : "Nivaran Foundation";
  const items = await getNewsItemsForVariant(variant);

  const body = items
    .map((item) => {
      const loc = `${siteConfig.siteUrl}${getBlogPath({
        slug: item.slug,
        type: "News",
      })}`;
      const publicationDate = normalizeIsoDate(item.date);

      if (!publicationDate) return "";

      return `  <url>
    <loc>${xmlEscape(loc)}</loc>
    <news:news>
      <news:publication>
        <news:name>${xmlEscape(publicationName)}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${publicationDate}</news:publication_date>
      <news:title>${xmlEscape(item.title)}</news:title>
    </news:news>
  </url>`;
    })
    .filter(Boolean)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${body}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
