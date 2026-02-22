"use client";

import MoveUpRightArrowIcon from "@/assets/icons/MoveUpRightArrowIcon";
import BlogCard from "@/components/nivaran/common/BlogCard";
import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { AppButton } from "@/components/ui/app-button";
import { useTrendingBlogs } from "@/lib/content/useTrendingBlogs";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import Link from "next/link";

export const SmallNewsAndStoriesMegaMenu = () => {
  const featuredData = useTrendingBlogs(2);

  return (
    <div className="pl-3">
      <h3 className="text-sm font-light text-gray-600 mb-1">Trending blogs</h3>
      <div className="flex gap-2">
        <RenderList
          data={featuredData}
          render={(story) => (
            <BlogCard
              data={story}
              key={story.slug}
              className="w-[200px] rounded-xl hover:shadow-sm "
              // onClick={() => openActiveMegaMenu(null)}
            >
              <SheetPrimitive.Close key={story.slug}>
                <BlogCard.Image
                  className="h-[100px]"
                  showAuthor={false}
                  showButton={false}
                  overlayStyle
                  showTags={false}
                />
                <BlogCard.TitleAndDescription
                  showDescription={false}
                  className="text-sm font-medium p-2 "
                />
              </SheetPrimitive.Close>
            </BlogCard>
          )}
        />
      </div>
      <div className="mt-3 flex flex-col gap-2 pr-3">
        <SheetPrimitive.Close asChild>
          <Link
            href="/global-news"
            className="rounded-lg border border-primary-200 bg-primary-100 px-3 py-2"
          >
            <p className="text-sm font-medium text-primary-700">Global News</p>
            <p className="mt-0.5 text-xs text-primary-600">
              Worldwide health and education headlines.
            </p>
          </Link>
        </SheetPrimitive.Close>
      </div>
      <SheetPrimitive.Close>
        <AppButton variant="ghost" className="px-0 relative mt-3" asChild>
          <Link href="/blogs">
            <SheetPrimitive.Close className="flex items-center gap-1">
              <span className="font-normal text-sm">View all blogs</span>
              <MoveUpRightArrowIcon className="w-4 h-4 fill-primary-500" />
            </SheetPrimitive.Close>
          </Link>
        </AppButton>
      </SheetPrimitive.Close>
    </div>
  );
};
