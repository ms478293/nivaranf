import {
  getMetadataForBlogSlug,
  renderBlogDetailPage,
} from "@/components/blogs/BlogDetailPage";
import type { Metadata } from "next";

// Regional links depend on the request host. Avoid a build-time archive walk
// for pages that the regional layout renders on demand.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // noindex — see the note in src/app/(main)/news/[slug]/page.tsx
  return { ...(await getMetadataForBlogSlug((await params).slug, { siteVariant: "global" })), robots: { index: false, follow: true } };
}

export default async function GlobalNewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return renderBlogDetailPage({
    slug: (await params).slug,
    segment: "news",
    siteVariant: "global",
  });
}
