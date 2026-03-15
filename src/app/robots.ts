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

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/dashboard/*",
          "/admin/",
          "/admin/*",
          "/api/admin/",
          "/api/admin/*",
          "/blogs/editor/",
          "/blogs/editor/*",
          "/test",
          "/test/",
        ],
      },
      { userAgent: "GPTBot", allow: "/", disallow: ["/dashboard/", "/admin/", "/api/admin/", "/blogs/editor/"] },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/dashboard/", "/admin/", "/api/admin/", "/blogs/editor/"] },
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/dashboard/", "/admin/", "/api/admin/", "/blogs/editor/"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/dashboard/", "/admin/", "/api/admin/", "/blogs/editor/"] },
      { userAgent: "Googlebot", allow: "/", disallow: ["/dashboard/", "/admin/", "/api/admin/", "/blogs/editor/"] },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "Google-Extended", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
