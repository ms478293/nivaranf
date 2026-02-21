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
  return (
    <section className="w-full  bg-white font-light font-Poppins">
      <div className="max-w-[1320px] mx-auto flex flex-col py-4 md:py-12 ">
        <div className="flex flex-col md:gap-4 sm:flex-row justify-between items-start sm:items-center sm:mb-8 mb-4 px-4">
          <MainTitle
            suffix="Stories"
            prefix="Insights & Inspiration"
            className=""
          />
          <Link href="/blogs">
            <AppButton
              variant="ghost"
              className="hover:scale-105 transition-transform duration-100 pl-0"
            >
              <span>View more</span>
              <RightArrowIcon className="w-5 h-5 fill-primary-500" />
            </AppButton>
          </Link>
        </div>
        {/* <div className="flex justify-start  flex-wrap  snap-x snap-proximity  gap-4 [scrollbar-width:none] mt-8"> */}
        <div className="grid-cols-1 flex sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-x-auto snap-x snap-proximity  [scrollbar-width:none] px-4 pb-8 pt-4 ">
          <RenderList
            data={featuredData}
            render={(data) => (
              <BlogCard
                data={data}
                key={data.slug}
                className="max-sm:max-w-[345px] max-sm:min-w-[345px] max-sm:w-[345px]  snap-center "
              >
                <BlogCard.Image className="h-[340px]" />
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
