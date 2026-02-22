"use client";

import BlogCard from "@/components/nivaran/common/BlogCard";
import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { AppButton } from "@/components/ui/app-button";
import { useTrendingBlogs } from "@/lib/content/useTrendingBlogs";
import { useMegaMenuStore } from "@/store/useMegamenuStore";
import Link from "next/link";

const QUICK_LINKS = [
  {
    id: 1,
    title: "Global News",
    description:
      "Worldwide health and education updates curated for impact teams.",
    href: "/global-news",
  },
  {
    id: 2,
    title: "Nepal News",
    description: "Field updates, alerts, and announcements from Nepal programs.",
    href: "/news",
  },
  {
    id: 3,
    title: "Stories",
    description: "Ground-level voices from communities and mobile health camps.",
    href: "/stories",
  },
  {
    id: 4,
    title: "Articles",
    description: "Long-form explainers and analysis on public health systems.",
    href: "/articles",
  },
];

const NewsAndStoriesMegaMenu = () => {
  const { openActiveMegaMenu } = useMegaMenuStore();
  const featuredData = useTrendingBlogs(4);
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
      <div className="flex justify-between gap-6">
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

        <aside className="w-[310px] min-w-[310px] rounded-xl border border-gray-200 bg-white p-4">
          <h3 className="font-medium text-gray-900">Explore by Feed</h3>
          <p className="mt-1 text-xs text-gray-600">
            Open the stream that matches what you want to publish or review.
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            <RenderList
              data={QUICK_LINKS}
              render={(link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="group block rounded-lg border border-gray-200 bg-gray-50 p-3 transition-all duration-200 hover:border-primary-300 hover:bg-primary-100"
                    onClick={() => openActiveMegaMenu(null)}
                  >
                    <p className="text-sm font-medium text-gray-900 group-hover:text-primary-700">
                      {link.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-5 text-gray-600">
                      {link.description}
                    </p>
                  </Link>
                </li>
              )}
            />
          </ul>
        </aside>
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
