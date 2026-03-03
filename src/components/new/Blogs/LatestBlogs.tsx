"use client";

import type { blogListType } from "@/blogs/listofblogs";
import BlogCard from "@/components/nivaran/common/BlogCard";
import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { useScreenSize } from "@/lib/helpers/useScreenSize";
import { IconButton } from "./IconButton";

export const LatestBlogs = ({ blogs }: { blogs: blogListType[] }) => {
  const screenSize = useScreenSize();

  // Already sorted newest-first by the parent filter; just take them as-is
  const latestBlogs = blogs;

  if (latestBlogs.length === 0) {
    return <p className="text-sm text-gray-500">No posts available yet.</p>;
  }

  const hero = latestBlogs[0];
  const secondary = latestBlogs.slice(1, 3);
  const remaining = latestBlogs.slice(3);

  return (
    <div className="flex flex-col gap-8">
      {/* Hero row: 1 large + 2 stacked */}
      <div className="grid grid-cols-2 md:grid-rows-2 gap-4">
        <div
          key={hero.slug}
          className="col-span-full md:row-span-full md:col-start-1 md:col-end-2 justify-between"
        >
          <BlogCard
            data={hero}
            className="flex flex-col shadow-sm h-full"
          >
            <BlogCard.Image className="h-[300px]" overlayStyle={false} />
            <BlogCard.TitleAndDescription className="p-4">
              <IconButton />
            </BlogCard.TitleAndDescription>
          </BlogCard>
        </div>

        {secondary.length > 0 && (
          <div className="col-span-full md:row-span-full md:col-start-2 md:-col-end-1 flex flex-col gap-8 justify-between">
            <RenderList
              data={secondary}
              render={(blog) => (
                <BlogCard
                  data={blog}
                  className="flex h-[210px] shadow-sm w-full"
                  key={blog.slug}
                >
                  <BlogCard.Image
                    showDate={false}
                    showButton={screenSize === "md" || "sm" ? false : true}
                    showAuthor={screenSize === "md" || "sm" ? false : true}
                    overlayStyle={false}
                    className=""
                  />
                  <div className="p-2 flex flex-col">
                    <BlogCard.TitleAndDescription className="" alignDateAndAuthor>
                      <IconButton />
                    </BlogCard.TitleAndDescription>
                  </div>
                </BlogCard>
              )}
            />
          </div>
        )}
      </div>

      {/* Remaining global posts in a standard grid */}
      {remaining.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <RenderList
            data={remaining}
            render={(blog) => (
              <BlogCard data={blog} key={blog.slug} className="shadow-sm">
                <BlogCard.Image className="h-[240px]" />
                <BlogCard.TitleAndDescription className="text-lg/[30px] p-4" />
              </BlogCard>
            )}
          />
        </div>
      )}
    </div>
  );
};
