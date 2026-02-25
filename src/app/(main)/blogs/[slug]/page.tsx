import { globalBlogs } from "@/blogs/listofblogs";
import { getBlogPathBySlug } from "@/lib/blog-routes";
import { buildCanonicalPath } from "@/lib/content/automation";
import { getPublishedContentPostBySlug } from "@/lib/content/posts";
import { getMetadataForBlogSlug } from "@/components/blogs/BlogDetailPage";
import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export async function generateStaticParams() {
  return globalBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  return getMetadataForBlogSlug(slug);
}

export default async function LegacyBlogRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  if (globalBlogs.some((blog) => blog.slug === slug)) {
    permanentRedirect(getBlogPathBySlug(slug));
  }
  const dynamicPost = await getPublishedContentPostBySlug(slug);
  if (dynamicPost) {
    permanentRedirect(buildCanonicalPath(dynamicPost.content_type, dynamicPost.slug));
  }
  permanentRedirect(getBlogPathBySlug(slug));
}
