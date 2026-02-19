import { globalBlogs } from "@/blogs/listofblogs";
import { FilteredBlogsList } from "@/components/new/Blogs/FilteredBlogList";
import NewsletterSubscribe from "@/components/new/NewsletterSubscribe/NewsletterSubscribe";
import { PageTitle } from "@/components/new/PageTitle/PageTitle";
import { getBlogRouteSegmentByType } from "@/lib/blog-routes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nivaran Foundation | Articles",
  description:
    "In-depth articles and analysis from Nivaran Foundation on healthcare, education, and social impact.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/articles",
  },
};

export default function ArticlesPage() {
  const blogs = globalBlogs
    .filter((blog) => getBlogRouteSegmentByType(blog.type) === "articles")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="w-full mb-10 font-Poppins">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-4">
        <PageTitle prefix="In-Depth" suffix="Articles" />
        <p className="text-sm text-gray-600">
          Research, analysis, and long-form reporting from the field.
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
