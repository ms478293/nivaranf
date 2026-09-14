"use client";

import RightArrowIcon from "@/assets/icons/RightArrowIcon";
import BlogCard from "@/components/nivaran/common/BlogCard";
import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { AppButton } from "@/components/ui/app-button";
import { useTrendingBlogs } from "@/lib/content/useTrendingBlogs";
import Link from "next/link";
import MainTitle from "../MainTitle/MainTitle";

const InsightsAndInspiraton = () => {
  const featuredData = useTrendingBlogs(4);
  const newestDate = featuredData[0]?.date;
  const updatedLabel = newestDate
    ? new Date(newestDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })
    : null;
  return (
    <section id="latest-updates" aria-label="Latest news and stories" className="w-full bg-white font-light font-Poppins scroll-mt-24">
      <div className="max-w-[1320px] mx-auto flex flex-col py-4 md:py-12 ">
        <div className="flex flex-col md:gap-4 sm:flex-row justify-between items-start sm:items-center sm:mb-8 mb-4 px-4">
          <MainTitle
            suffix="Latest"
            prefix="News & Stories"
            className=""
          />
          <Link href="/blogs">
            <AppButton
              variant="ghost"
              className="hover:scale-105 transition-transform duration-100 pl-0"
            >
              <span>View all updates</span>
              <RightArrowIcon className="w-5 h-5 fill-primary-500" />
            </AppButton>
          </Link>
        </div>
        <div className="px-4 mb-2 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            From Nepal: community stories, news and perspectives.
            {updatedLabel ? <span className="block mt-1 text-xs">Updated {updatedLabel}</span> : null}
          </p>
          <nav aria-label="Browse updates" className="flex gap-5 text-sm text-primary-500">
            <Link href="/news" className="hover:underline underline-offset-4">News</Link>
            <Link href="/stories" className="hover:underline underline-offset-4">Stories</Link>
            <Link href="/articles" className="hover:underline underline-offset-4">Articles</Link>
          </nav>
        </div>
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-x-auto sm:overflow-x-visible snap-x snap-proximity [scrollbar-width:none] px-4 pb-8 pt-4 ">
          <RenderList
            data={featuredData}
            render={(data) => (
              <BlogCard
                data={data}
                key={data.slug}
                className="max-sm:max-w-[min(345px,calc(100vw-2rem))] max-sm:min-w-[min(345px,calc(100vw-2rem))] max-sm:w-[min(345px,calc(100vw-2rem))]  snap-center "
              >
                <BlogCard.Image className="h-[220px] sm:h-[280px] lg:h-[340px]" />
                <BlogCard.TitleAndDescription className="text-lg/[30px] p-4" />
              </BlogCard>
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default InsightsAndInspiraton;
