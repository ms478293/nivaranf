import {
  detectSiteVariantFromHost,
  getSiteVariantConfig,
} from "@/lib/site-variant";
import { headers } from "next/headers";
import type { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") || headerStore.get("host") || "";
  const variant = detectSiteVariantFromHost(host);
  const siteUrl = getSiteVariantConfig(variant).siteUrl;
  const privatePaths = ["/dashboard", "/admin", "/api/", "/auth/", "/content-login", "/blogs/editor", "/test", "/donate/manage"];

  return {
    rules: [
      ...["*", "GPTBot", "OAI-SearchBot", "ClaudeBot", "PerplexityBot", "Googlebot"].map((userAgent) => ({
        userAgent, allow: "/", disallow: privatePaths,
      })),
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "Google-Extended", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
    ],
    sitemap: [`${siteUrl}/sitemap.xml`],
    host: siteUrl,
  };
}
