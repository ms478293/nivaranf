import type { MetadataRoute } from "next";

const SITE_URL = "https://www.nivaranfoundation.org";

export default function robots(): MetadataRoute.Robots {
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
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
