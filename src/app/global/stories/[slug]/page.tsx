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
  return getMetadataForBlogSlug((await params).slug, { siteVariant: "global" });
}

export default async function GlobalStoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return renderBlogDetailPage({
    slug: (await params).slug,
    segment: "stories",
    siteVariant: "global",
  });
}
