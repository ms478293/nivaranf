import { globalBlogs } from "@/blogs/listofblogs";
import { getBlogPath, getBlogRouteSegmentByType } from "@/lib/blog-routes";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nivaran Foundation | Stories",
  description:
    "Field stories from communities and frontline teams working with Nivaran Foundation.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/stories",
  },
};

export default function StoriesPage() {
  const blogs = globalBlogs
    .filter((blog) => getBlogRouteSegmentByType(blog.type) === "stories")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="w-full mb-10 px-4 font-Poppins">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-4">
        <h1 className="text-3xl font-semibold text-gray-900">Stories</h1>
        <p className="text-sm text-gray-600">
          Human-centered stories from communities and field teams.
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
