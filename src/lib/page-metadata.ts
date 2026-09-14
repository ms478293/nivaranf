import type { Metadata } from "next";

export const MAIN_SITE_URL = "https://www.nivaranfoundation.org";
export const PUBLIC_PAGE_ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

type PageMetadataInput = {
  path: string;
  title: string;
  description: string;
  image?: { url: string; alt: string; width?: number; height?: number };
};

// Keep search snippets and social previews in sync. This helper is for public
// main-site pages; private checkouts and regional sites keep their own rules.
export function createPageMetadata({ path, title, description, image }: PageMetadataInput): Metadata {
  const url = new URL(path, MAIN_SITE_URL).toString();
  const cover = image || {
    url: "/logo.png", alt: "Nivaran Foundation", width: 1200, height: 665,
  };
  const images = [{ ...cover, url: new URL(cover.url, MAIN_SITE_URL).toString() }];
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: PUBLIC_PAGE_ROBOTS,
    openGraph: { title, description, url, siteName: "Nivaran Foundation", type: "website", locale: "en_US", images },
    twitter: { card: "summary_large_image", title, description, site: "@NivaranOrg", images },
  };
}
