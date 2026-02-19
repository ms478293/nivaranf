import { globalBlogs } from "@/blogs/listofblogs";
import { getBlogPathBySlug } from "@/lib/blog-routes";
import { permanentRedirect } from "next/navigation";

export async function generateStaticParams() {
  return globalBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function LegacyBlogRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  permanentRedirect(getBlogPathBySlug(slug));
}
