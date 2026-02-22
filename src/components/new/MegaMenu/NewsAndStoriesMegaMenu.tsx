"use client";

import BlogCard from "@/components/nivaran/common/BlogCard";
import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { AppButton } from "@/components/ui/app-button";
import { useTrendingBlogs } from "@/lib/content/useTrendingBlogs";
import { useMegaMenuStore } from "@/store/useMegamenuStore";
import Link from "next/link";

const NewsAndStoriesMegaMenu = () => {
  const { openActiveMegaMenu } = useMegaMenuStore();
  const featuredData = useTrendingBlogs(4);

  return (
    <div className="w-full">
      <div className="flex items-start justify-between gap-6">
        <section className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-600 mb-2">Trending Blogs</h3>
            <Link href="/blogs">
              <AppButton variant="ghost" onClick={() => openActiveMegaMenu(null)}>
                View more Blogs
              </AppButton>
            </Link>
          </div>

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
        </section>

        <aside className="w-[320px] min-w-[320px] rounded-xl border border-primary-200 bg-[linear-gradient(135deg,_#fff6f2_0%,_#edf7ff_100%)] p-4">
          <p className="text-[11px] uppercase tracking-[0.12em] text-primary-600">
            New Section
          </p>
          <h3 className="mt-2 text-xl font-semibold text-gray-900">Global News</h3>
          <p className="mt-2 text-sm leading-6 text-gray-700">
            Separate global feed for high-credibility health and education
            developments outside Nepal.
          </p>
          <div className="mt-4 rounded-lg border border-primary-100 bg-white/90 p-3">
            <p className="text-xs text-gray-600">Covers</p>
            <p className="mt-1 text-sm text-gray-800">
              Global outbreaks, education disruptions, and international policy
              shifts that matter for impact teams.
            </p>
          </div>
          <Link
            href="/global-news"
            className="mt-4 inline-flex items-center rounded-lg border border-primary-500 bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-primary-600"
            onClick={() => openActiveMegaMenu(null)}
          >
            Open Global News
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default NewsAndStoriesMegaMenu;
