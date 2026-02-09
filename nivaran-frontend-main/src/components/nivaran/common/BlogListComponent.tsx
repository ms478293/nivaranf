"use client";
import { globalBlogs as blogs } from "@/blogs/listofblogs";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const BlogListComponent = ({
  onlyFeatured = false,
  categoryWise = "all",
}: {
  onlyFeatured?: boolean;
  categoryWise?: blogListType["type"] | "all";
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryWise);

  // **Filtering blogs based on search & category**
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "all" || blog.type === selectedCategory;
    const matchesFeatured = onlyFeatured ? blog.featured : true;
    const matchesSearch =
      searchQuery === "" ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesFeatured && matchesSearch;
  });

  return (
    <div className="">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4 ">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search blogs..."
          className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Category Filter */}
        <select
          className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value as blogListType["type"] | "all")
          }
        >
          <option value="all">All Categories</option>
          <option value="Story">Story</option>
          <option value="Collaboration">Collaboration</option>
          <option value="News">News</option>
          <option value="Opinion">Opinion</option>
          <option value="Analysis">Analysis</option>
          <option value="Project">Projects</option>
          <option value="Article">Articles</option>
        </select>
      </div>

      {/* Blog Grid */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <BlogCard blog={blog as any} key={blog.slug} />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No blogs found for the selected filter.
          </p>
        )}
      </div>
    </div>
  );
};

type blogListType = {
  slug: string;
  title: string;
  summary: string;
  thumbnailImage: string;
  date: string;
  author: string;
  featured?: boolean;
  type:
    | "Story"
    | "Collaboration"
    | "News"
    | "Opinion"
    | "Analysis"
    | "Project"
    | "Article";
};

const BlogCard = ({ blog }: { blog: any }) => {
  const typeColorMap: Record<
    | "Story"
    | "Collaboration"
    | "News"
    | "Opinion"
    | "Analysis"
    | "Article"
    | "Project",
    string
  > = {
    Story: "bg-red-500",
    Collaboration: "bg-blue-500",
    News: "bg-green-500",
    Opinion: "bg-yellow-500",
    Analysis: "bg-purple-500",
    Article: "bg-orange-500",
    Project: "bg-primary-main",
  };

  return (
    <div
      key={blog.slug}
      className="group relative h-full w-full border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-xl"
    >
      <Link href={`/blogs/${blog.slug}`} className="h-full flex flex-col">
        {/* Image */}
        <div className="relative w-full h-52 overflow-hidden">
          <Image
            src={blog.thumbnailImage}
            alt={blog.title}
            className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
            fill
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col justify-between h-fit bg-white group-hover:bg-gray-100 transition-colors duration-300 ">
          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 mb-2 transition-colors duration-200 line-clamp-2">
            {blog.title}
          </h2>

          {/* Summary */}
          <p className="text-gray-600 text-sm line-clamp-4">{blog.summary}</p>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-300"></div>

        {/* Footer */}
        <div className="flex items-center justify-between w-full  px-4 py-2 text-xs gap-2 transition-colors duration-300">
          <span className="font-bold text-gray-700">{blog.date}</span>
          <span
            className="font-bold text-gray-700 break-words max-w-[200px] truncate"
            title={blog.author || "Author"}
          >
            {blog.author}
          </span>
        </div>
      </Link>

      {/* Floating Tag */}
      <div
        className={cn(
          "absolute top-0 left-0 text-white text-xs font-semibold uppercase px-3 py-1 rounded-br-lg shadow-sm",
          typeColorMap[blog.type]
        )}
      >
        {blog.type}
      </div>
    </div>
  );
};
