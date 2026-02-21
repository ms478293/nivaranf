import { globalBlogs } from "@/blogs/listofblogs";
import { getBlogPath, getBlogRouteSegmentByType } from "@/lib/blog-routes";
import { getPublishedBlogItemsBySegment } from "@/lib/content/posts";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rural Healthcare Articles & Analysis | Nivaran Foundation",
  description:
    "In-depth articles on rural healthcare in Nepal, maternal and child health, disease prevention, and frontline delivery models.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/articles",
  },
  keywords: [
    "rural healthcare Nepal articles",
    "maternal health Nepal",
    "public health Nepal analysis",
    "Nivaran Foundation articles",
  ],
  openGraph: {
    title: "Rural Healthcare Articles & Analysis | Nivaran Foundation",
    description:
      "In-depth articles on rural healthcare in Nepal, maternal and child health, disease prevention, and frontline delivery models.",
    url: "https://www.nivaranfoundation.org/articles",
    type: "website",
    siteName: "Nivaran Foundation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rural Healthcare Articles & Analysis | Nivaran Foundation",
    description:
      "In-depth articles on rural healthcare in Nepal, maternal and child health, disease prevention, and frontline delivery models.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

export default async function ArticlesPage() {
  const staticBlogs = globalBlogs
    .filter((blog) => getBlogRouteSegmentByType(blog.type) === "articles")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const dynamicBlogs = await getPublishedBlogItemsBySegment("articles");

  const mergedBySlug = new Map<string, (typeof staticBlogs)[number]>();
  staticBlogs.forEach((blog) => mergedBySlug.set(blog.slug, blog));
  dynamicBlogs.forEach((blog) => mergedBySlug.set(blog.slug, blog));

  const blogs = Array.from(mergedBySlug.values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="w-full mb-10 px-4 font-Poppins">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-4">
        <h1 className="text-3xl font-semibold text-gray-900">Articles</h1>
        <p className="text-sm text-gray-600">
          Research, analysis, and long-form reports from Nivaran Foundation.
        </p>
        <div className="grid gap-3">
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={getBlogPath(blog)}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
            >
              <p className="text-xs text-primary-main uppercase tracking-wide mb-1">
                {blog.type}
              </p>
              <h2 className="text-lg font-medium text-gray-900">{blog.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{blog.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
