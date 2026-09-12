import {
  getMetadataForBlogSlug,
  getStaticParamsForSegment,
  renderBlogDetailPage,
} from "@/components/blogs/BlogDetailPage";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getStaticParamsForSegment("news", { siteVariant: "global" });
}

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
