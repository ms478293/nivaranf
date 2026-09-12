import {
  getMetadataForBlogSlug,
  getStaticParamsForSegment,
  renderBlogDetailPage,
} from "@/components/blogs/BlogDetailPage";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getStaticParamsForSegment("news");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // noindex: these items aggregate third-party headlines rather than report
  // Nivaran's own work. Keeping ~500 of them indexable buried our programme
  // pages and read as scaled content. The /news index itself stays indexable.
  return { ...(await getMetadataForBlogSlug((await params).slug)), robots: { index: false, follow: true } };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return renderBlogDetailPage({
    slug: (await params).slug,
    segment: "news",
  });
}
