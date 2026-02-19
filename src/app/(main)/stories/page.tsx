import { globalBlogs } from "@/blogs/listofblogs";
import { FilteredBlogsList } from "@/components/new/Blogs/FilteredBlogList";
import NewsletterSubscribe from "@/components/new/NewsletterSubscribe/NewsletterSubscribe";
import { PageTitle } from "@/components/new/PageTitle/PageTitle";
import { getBlogRouteSegmentByType } from "@/lib/blog-routes";
import type { Metadata } from "next";

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
    <div className="w-full mb-10 font-Poppins">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-4">
        <PageTitle prefix="From the" suffix="Field Stories" />
        <p className="text-sm text-gray-600">
          Human-centered stories from rural Nepal and beyond.
        </p>
        <div className="w-full h-[1.5px] gradient-border" />
        <FilteredBlogsList blogs={blogs} />
        <div className="mt-8">
          <NewsletterSubscribe variant="banner" />
        </div>
      </div>
    </div>
  );
}
