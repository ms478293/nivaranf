"use client";

import { globalBlogs } from "@/blogs/listofblogs";
import BlogCard from "@/components/nivaran/common/BlogCard";
import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { useScreenSize } from "@/lib/helpers/useScreenSize";
import { IconButton } from "./IconButton";

export const LatestBlogs = () => {
  const screenSize = useScreenSize();

  const latestBlogs = globalBlogs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  return (
    <div className="grid grid-cols-2 md:grid-rows-2 gap-4 ">
      <div
        key={latestBlogs[0].slug}
        className="col-span-full md:row-span-full md:col-start-1 md:col-end-2 justify-between"
      >
        <BlogCard
          data={latestBlogs[0]}
          className="flex flex-col shadow-sm h-full"
        >
          <BlogCard.Image className="h-[300px]" overlayStyle={false} />

          <BlogCard.TitleAndDescription className="p-4">
            <IconButton />
          </BlogCard.TitleAndDescription>
        </BlogCard>
      </div>
      <div className="col-span-full md:row-span-full md:col-start-2 md:-col-end-1 flex flex-col gap-8 justify-between">
        <RenderList
          data={latestBlogs.slice(1, 3)}
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
                // className="md:w-1/2"
                className=""
              />
              <div className="p-2 flex flex-col ">
                <BlogCard.TitleAndDescription className="" alignDateAndAuthor>
                  <IconButton />
                </BlogCard.TitleAndDescription>
              </div>
            </BlogCard>
          )}
        />
      </div>
    </div>
  );
};
