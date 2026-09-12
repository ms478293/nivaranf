import { globalBlogs } from "@/blogs/listofblogs";
import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import { getBlogPath } from "@/lib/blog-routes";
import {
  displayExcerpt,
  filterNepalExclusiveNewest,
  filterPublicNewsIndex,
} from "@/lib/content/blogFilters";
import { getPublishedBlogItemsBySegment } from "@/lib/content/posts";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Live Updates | Nivaran Foundation",
  description:
    "Latest Nepal program updates and field notes from Nivaran Foundation. This page lists recent posts — it is not a livestream.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/live",
  },
  openGraph: {
    title: "Live Updates | Nivaran Foundation",
    description:
      "Latest Nepal program updates and field notes from Nivaran Foundation.",
    url: "https://www.nivaranfoundation.org/live",
    type: "website",
    siteName: "Nivaran Foundation",
  },
};

export default async function LiveUpdatesPage() {
  const dynamicBlogs = await getPublishedBlogItemsBySegment("news");
  const merged = new Map<string, (typeof globalBlogs)[number]>();
  globalBlogs.forEach((blog) => merged.set(blog.slug, blog));
  dynamicBlogs.forEach((blog) => merged.set(blog.slug, blog));
  const nepal = filterNepalExclusiveNewest(
    filterPublicNewsIndex(Array.from(merged.values())),
    12,
  );
  const newest = nepal[0];

  return (
    <main className="w-full mb-10 px-4 font-Poppins">
      <div className="max-w-[800px] mx-auto flex flex-col gap-4">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Live updates" }]}
        />
        <h1 className="text-3xl font-semibold text-gray-900">Live updates</h1>
        <p className="text-sm text-gray-600">
          Latest Nepal and program notes. This is not a livestream — it is a
          lightweight feed of published updates.
        </p>
        {newest ? (
          <p className="text-xs text-gray-500">
            Nepal desk last filed {newest.date}.{" "}
            <Link href="/news" className="text-primary-500 underline">
              Browse all news
            </Link>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            No Nepal-desk updates are listed right now.{" "}
            <Link href="/news" className="text-primary-500 underline">
              See the news index
            </Link>
            .
          </p>
        )}
        <div className="grid gap-3">
          {nepal.map((blog) => {
            const excerpt = displayExcerpt(blog.summary);
            return (
              <Link
                key={blog.slug}
                href={getBlogPath(blog)}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
              >
                <p className="text-xs text-primary-main uppercase tracking-wide mb-1">
                  {blog.date}
                </p>
                <h2 className="text-lg font-medium text-gray-900">{blog.title}</h2>
                {excerpt ? (
                  <p className="text-sm text-gray-600 mt-1">{excerpt}</p>
                ) : null}
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
