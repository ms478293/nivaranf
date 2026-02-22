"use client";

import BlogCard from "@/components/nivaran/common/BlogCard";
import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { AppButton } from "@/components/ui/app-button";
import { useBlogFeed } from "@/lib/content/useBlogFeed";
import { useTrendingBlogs } from "@/lib/content/useTrendingBlogs";
import { useMegaMenuStore } from "@/store/useMegamenuStore";
import Link from "next/link";
import { useMemo } from "react";

const NEPAL_TERMS = [
  "nepal",
  "kathmandu",
  "pokhara",
  "lumbini",
  "karnali",
  "terai",
  "jajarkot",
  "dolpa",
  "jumla",
  "bajura",
  "mugu",
  "birgunj",
];

const GLOBAL_TERMS = [
  "global",
  "world",
  "international",
  "cross-border",
  "cross border",
  "who",
  "unicef",
  "unesco",
  "unhcr",
  "united nations",
  "africa",
  "asia",
  "europe",
  "latin america",
  "middle east",
  "sudan",
  "gaza",
  "ukraine",
  "bangladesh",
  "india",
  "pakistan",
  "sri lanka",
];

function includesAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

function isGlobalNewsCandidate(blog: {
  title: string;
  summary: string;
  slug: string;
}) {
  const haystack = `${blog.title} ${blog.summary} ${blog.slug}`.toLowerCase();
  if (includesAny(haystack, NEPAL_TERMS)) return false;
  return includesAny(haystack, GLOBAL_TERMS);
}

const NewsAndStoriesMegaMenu = () => {
  const { openActiveMegaMenu } = useMegaMenuStore();
  const featuredData = useTrendingBlogs(4);
  const allBlogs = useBlogFeed(250);
  const headingGradientClass =
    "mb-2 font-semibold bg-[linear-gradient(110deg,#eb6a4f_0%,#2f7fb7_52%,#2aa89a_100%)] bg-clip-text text-transparent";
  const globalCards = useMemo(() => {
    const newsBlogs = allBlogs.filter((blog) => blog.type === "News");

    const candidates = [
      ...newsBlogs.filter(isGlobalNewsCandidate),
      ...newsBlogs,
      ...featuredData.filter((blog) => blog.type === "News"),
      ...featuredData,
    ];

    const unique: typeof candidates = [];
    const seen = new Set<string>();

    for (const blog of candidates) {
      if (!blog?.slug || seen.has(blog.slug)) continue;
      seen.add(blog.slug);
      unique.push(blog);
      if (unique.length === 2) break;
    }

    return unique;
  }, [allBlogs, featuredData]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-[max-content_max-content] gap-4 items-start">
        <section className="rounded-xl border border-gray-200 bg-white p-3 w-fit">
          <div className="flex justify-between items-center">
            <h3 className={headingGradientClass}>Trending Blogs</h3>
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

        <aside className="rounded-xl border border-gray-200 bg-white p-3 w-fit self-start">
          <div className="flex justify-between items-center">
            <h3 className={headingGradientClass}>Global Featured</h3>
            <Link href="/global-news">
              <AppButton variant="ghost" onClick={() => openActiveMegaMenu(null)}>
                View more
              </AppButton>
            </Link>
          </div>
          <div className="flex gap-3">
            <RenderList
              data={globalCards}
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
        </aside>
      </div>
    </div>
  );
};

export default NewsAndStoriesMegaMenu;
