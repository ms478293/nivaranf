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
  return getMetadataForBlogSlug((await params).slug);
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
