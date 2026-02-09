"use client";

import { globalBlogs } from "@/blogs/listofblogs";
import BlogCard from "@/components/nivaran/common/BlogCard";
import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { AppButton } from "@/components/ui/app-button";
import { useMegaMenuStore } from "@/store/useMegamenuStore";
import Link from "next/link";

const NewsAndStoriesMegaMenu = () => {
  const { openActiveMegaMenu } = useMegaMenuStore();
  const featuredData = globalBlogs
    .filter((blogs) => blogs.featured)
    .slice(0, 4);
  return (
    <div className="w-fit">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-gray-600 mb-2">Trending Blogs</h3>
        <Link href="/blogs">
          <AppButton variant="ghost" onClick={() => openActiveMegaMenu(null)}>
            View more Blogs
          </AppButton>
        </Link>
      </div>
      <div className="flex justify-between ">
        <div className="flex gap-3">
          <RenderList
            data={featuredData}
            render={(story) => (
              <BlogCard
                data={story}
                key={story.slug}
                className="w-[200px] rounded-xl hover:shadow-sm "
                onClick={() => openActiveMegaMenu(null)}
              >
                <BlogCard.Image
                  className="h-[150px]"
                  showAuthor={false}
                  showButton={false}
                  overlayStyle
                  showDate={false}
                />
                <BlogCard.TitleAndDescription
                  showDescription={false}
                  className="[&>h3]:text-sm font-medium p-2"
                />
              </BlogCard>
            )}
          />
        </div>

        {/* <ul className="flex flex-col gap-2">
          <h3 className="font-medium text-gray-800">Links</h3>
          <RenderList
            data={NEWS_AND_STORIES}
            render={(link) => (
              <li key={link.id}>
                <Link href={link.link} className="text-gray-600 text-sm">
                  {link.label}
                </Link>
              </li>
            )}
          />
        </ul> */}
      </div>
    </div>
  );
};

export default NewsAndStoriesMegaMenu;
