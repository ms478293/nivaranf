import { globalBlogs, type blogListType } from "@/blogs/listofblogs";
import { getBlogPath, getBlogRouteSegmentByType } from "@/lib/blog-routes";
import { getPublishedBlogItemsBySegment } from "@/lib/content/posts";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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

function hasAnyTerm(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

function isGlobalNews(blog: blogListType) {
  const haystack = `${blog.title} ${blog.summary} ${blog.slug}`.toLowerCase();
  if (hasAnyTerm(haystack, NEPAL_TERMS)) return false;
  return hasAnyTerm(haystack, GLOBAL_TERMS);
}

function sortByDateDesc(items: blogListType[]) {
  return [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export const metadata: Metadata = {
  title: "Global Health & Education News | Nivaran Foundation",
  description:
    "Follow high-priority global health and education developments curated by Nivaran Foundation for humanitarian and policy action.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/global-news",
  },
  keywords: [
    "global health news",
    "global education news",
    "international humanitarian updates",
    "Nivaran global desk",
  ],
  openGraph: {
    title: "Global Health & Education News | Nivaran Foundation",
    description:
      "High-priority global health and education developments curated by Nivaran Foundation.",
    url: "https://www.nivaranfoundation.org/global-news",
    type: "website",
    siteName: "Nivaran Foundation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Health & Education News | Nivaran Foundation",
    description:
      "High-priority global health and education developments curated by Nivaran Foundation.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

export default async function GlobalNewsPage() {
  const staticNews = sortByDateDesc(
    globalBlogs.filter((blog) => getBlogRouteSegmentByType(blog.type) === "news")
  );
  const dynamicNews = await getPublishedBlogItemsBySegment("news");

  const mergedBySlug = new Map<string, blogListType>();
  staticNews.forEach((blog) => mergedBySlug.set(blog.slug, blog));
  dynamicNews.forEach((blog) => mergedBySlug.set(blog.slug, blog));

  const allNews = sortByDateDesc(Array.from(mergedBySlug.values()));
  const globalFeed = allNews.filter(isGlobalNews);
  const displayFeed = globalFeed.length > 0 ? globalFeed : allNews;

  const leadStory = displayFeed[0];
  const otherStories = displayFeed.slice(1, 13);

  return (
    <main className="w-full mb-12 px-4 font-Poppins">
      <div className="mx-auto max-w-[1320px]">
        <section className="mt-1 overflow-hidden rounded-2xl border border-primary-200 bg-[linear-gradient(120deg,_#fff7f4_0%,_#eef8ff_55%,_#f4f9f7_100%)] p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary-600">
            Global News Desk
          </p>
          <h1 className="mt-3 max-w-[760px] text-3xl font-semibold text-gray-900 sm:text-4xl">
            Global Health and Education Signals Worth Acting On
          </h1>
          <p className="mt-4 max-w-[850px] text-sm leading-7 text-gray-700 sm:text-base">
            This page tracks high-credibility developments from around the world,
            filtered for health and education impact. We prioritize updates that
            can inform response, funding, preparedness, and policy decisions.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/news"
              className="rounded-lg border border-primary-500 bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-primary-600"
            >
              View Nepal News
            </Link>
            <Link
              href="/blogs"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition-all hover:border-primary-300 hover:text-primary-700"
            >
              View All Posts
            </Link>
          </div>
        </section>

        {globalFeed.length === 0 ? (
          <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            No clearly global posts are published yet. Showing latest News feed
            until Global_News posts are published.
          </div>
        ) : null}

        {leadStory ? (
          <section className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <Link
              href={getBlogPath(leadStory)}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <div className="relative h-[320px] w-full overflow-hidden sm:h-[380px]">
                <Image
                  src={leadStory.thumbnailImage}
                  alt={leadStory.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,_#000000c2_15%,_transparent_55%)]" />
                <p className="absolute left-4 top-4 w-fit rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-600">
                  {leadStory.type}
                </p>
                <p className="absolute bottom-4 left-4 text-xs text-gray-100">
                  {leadStory.date}
                </p>
              </div>
              <div className="p-5 sm:p-6">
                <h2 className="text-xl font-semibold leading-8 text-gray-900 sm:text-2xl">
                  {leadStory.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                  {leadStory.summary}
                </p>
              </div>
            </Link>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900">How We Curate</h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                We prioritize credibility first, then urgency, then relevance to
                frontline health and education outcomes.
              </p>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-gray-700">
                <li className="rounded-lg bg-gray-50 px-3 py-2">
                  Evidence-backed public sources only
                </li>
                <li className="rounded-lg bg-gray-50 px-3 py-2">
                  High impact for vulnerable populations
                </li>
                <li className="rounded-lg bg-gray-50 px-3 py-2">
                  Clear action value for field teams
                </li>
              </ul>
              <div className="mt-5 rounded-xl border border-primary-200 bg-primary-50 p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-primary-600">
                  Automation Pipeline
                </p>
                <p className="mt-1 text-sm text-primary-700">
                  Global_News runs hourly and publishes only when quality,
                  relevance, and credibility thresholds are met.
                </p>
              </div>
            </div>
          </section>
        ) : null}

        <section className="mt-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {otherStories.map((story) => (
              <Link
                key={story.slug}
                href={getBlogPath(story)}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:shadow-md"
              >
                <div className="relative h-[200px] w-full overflow-hidden">
                  <Image
                    src={story.thumbnailImage}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,_#0000009c_8%,_transparent_55%)]" />
                  <p className="absolute left-3 top-3 rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-600">
                    {story.type}
                  </p>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500">{story.date}</p>
                  <h3 className="mt-1 line-clamp-2 text-lg font-semibold leading-7 text-gray-900">
                    {story.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                    {story.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
