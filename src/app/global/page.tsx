import {
  GLOBAL_CAMPAIGNS,
  GLOBAL_HOME_METRICS,
  GLOBAL_HOME_PILLARS,
  GLOBAL_OPERATING_PRINCIPLES,
} from "@/content/global-site";
import { getGlobalMixedFeed } from "@/lib/global-feed";
import { getBlogPath } from "@/lib/blog-routes";
import { getSubdomainPathPrefix, withSubdomainPrefix } from "@/lib/subdomain-prefix";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Global Nivaran",
  description:
    "A dedicated platform for humanitarian campaigns, field reporting, and crisis analysis built for cross-border public action.",
  alternates: {
    canonical: "https://global.nivaranfoundation.org/",
  },
  openGraph: {
    title: "Global Nivaran",
    description:
      "A dedicated platform for humanitarian campaigns, field reporting, and crisis analysis built for cross-border public action.",
    url: "https://global.nivaranfoundation.org/",
    type: "website",
    siteName: "Global Nivaran",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Nivaran",
    description:
      "A dedicated platform for humanitarian campaigns, field reporting, and crisis analysis built for cross-border public action.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

export default async function GlobalHomePage() {
  const prefix = await getSubdomainPathPrefix("global");
  const latestFeed = await getGlobalMixedFeed(5);
  const leadStory = latestFeed[0];
  const sideStories = latestFeed.slice(1, 4);

  return (
    <div className="pb-16">
      <section className="px-4 pt-10 md:px-6 md:pt-14">
        <div className="mx-auto grid max-w-[1380px] gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-[38px] border border-white/70 bg-[radial-gradient(circle_at_top_left,rgba(115,199,208,0.2),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(242,162,134,0.22),transparent_32%),linear-gradient(145deg,#ffffff_0%,#fff7ef_100%)] px-6 py-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] md:px-10 md:py-12">
            <p className="inline-flex rounded-full border border-slate-200 bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-600">
              Humanitarian campaigns, reporting, and action
            </p>
            <h1 className="mt-6 max-w-5xl font-[family:var(--global-font-display)] text-5xl leading-[0.9] text-slate-950 md:text-7xl xl:text-[5.6rem]">
              A high-clarity home for global response work.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              Global Nivaran is built for campaign launches, crisis reporting, and partner-ready communication that can stand on its own. The goal is simple: make the work understandable, credible, and operationally useful from the first visit.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={withSubdomainPrefix(prefix, "/campaigns")}
                className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Explore campaigns
              </Link>
              <Link
                href={withSubdomainPrefix(prefix, "/news")}
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-950"
              >
                Open newsroom
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {GLOBAL_HOME_METRICS.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[28px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
                >
                  <p className="text-3xl font-semibold text-slate-950 md:text-4xl">{metric.value}</p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                    {metric.label}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{metric.note}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[34px] border border-slate-200/80 bg-slate-950 p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-cyan-300">
              Featured now
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight">
              {GLOBAL_CAMPAIGNS[0].title}
            </h2>
            <p className="mt-4 text-sm leading-8 text-slate-200">
              {GLOBAL_CAMPAIGNS[0].summary}
            </p>
            <div className="mt-6 space-y-3">
              {GLOBAL_CAMPAIGNS[0].highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100"
                >
                  {item}
                </div>
              ))}
            </div>
            <Link
              href={withSubdomainPrefix(prefix, "/campaigns/israel")}
              className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-100"
            >
              Open campaign brief
            </Link>
          </aside>
        </div>
      </section>

      <section className="px-4 py-8 md:px-6">
        <div className="mx-auto grid max-w-[1380px] gap-6 md:grid-cols-3">
          {GLOBAL_HOME_PILLARS.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-[30px] border border-slate-200/80 bg-white/90 p-7 shadow-[0_14px_36px_rgba(15,23,42,0.06)]"
            >
              <h2 className="text-2xl font-semibold text-slate-950">{pillar.title}</h2>
              <p className="mt-4 text-sm leading-8 text-slate-600">{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-4 md:px-6">
        <div className="mx-auto grid max-w-[1380px] gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[32px] border border-slate-200/80 bg-white px-6 py-8 shadow-[0_16px_42px_rgba(15,23,42,0.06)] md:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-500">
              Operating principles
            </p>
            <h2 className="mt-4 font-[family:var(--global-font-display)] text-4xl leading-none text-slate-950">
              Built to hold serious work, not just campaign aesthetics.
            </h2>
            <div className="mt-6 space-y-4">
              {GLOBAL_OPERATING_PRINCIPLES.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200/80 bg-[linear-gradient(145deg,#ffffff_0%,#eef8f9_100%)] px-6 py-8 shadow-[0_16px_42px_rgba(15,23,42,0.06)] md:px-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-500">
                  Newsroom preview
                </p>
                <h2 className="mt-4 font-[family:var(--global-font-display)] text-4xl leading-none text-slate-950">
                  The latest reporting on the platform.
                </h2>
              </div>
              <Link
                href={withSubdomainPrefix(prefix, "/news")}
                className="text-sm font-semibold text-slate-700 transition-colors hover:text-slate-950"
              >
                View all reporting
              </Link>
            </div>

            {leadStory ? (
              <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.95fr]">
                <Link
                  href={withSubdomainPrefix(prefix, getBlogPath(leadStory))}
                  className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
                >
                  <div className="relative h-[260px] overflow-hidden">
                    <Image
                      src={leadStory.thumbnailImage}
                      alt={leadStory.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                      {leadStory.date}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold leading-8 text-slate-950">
                      {leadStory.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{leadStory.summary}</p>
                  </div>
                </Link>

                <div className="space-y-4">
                  {sideStories.map((story) => (
                    <Link
                      key={story.slug}
                      href={withSubdomainPrefix(prefix, getBlogPath(story))}
                      className="block rounded-[24px] border border-slate-200 bg-white px-5 py-5 shadow-[0_10px_24px_rgba(15,23,42,0.05)] transition-transform hover:-translate-y-1"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                        {story.date}
                      </p>
                      <h3 className="mt-3 text-lg font-semibold leading-7 text-slate-950">
                        {story.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{story.summary}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
