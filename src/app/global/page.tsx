import { AppButton } from "@/components/ui/app-button";
import MainTitle from "@/components/new/MainTitle/MainTitle";
import {
  GLOBAL_CAMPAIGNS,
  GLOBAL_HOME_METRICS,
  GLOBAL_HOME_PILLARS,
  GLOBAL_OPERATING_PRINCIPLES,
} from "@/content/global-site";
import { getBlogPath } from "@/lib/blog-routes";
import { getGlobalMixedFeed } from "@/lib/global-feed";
import { getSubdomainPathPrefix, withSubdomainPrefix } from "@/lib/subdomain-prefix";
import { ArrowRight, Globe2, NotebookText, ShieldCheck, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nivaran Global",
  description:
    "Nivaran Global is the dedicated Nivaran platform for humanitarian campaigns, crisis reporting, and partner-ready public communication.",
  alternates: {
    canonical: "https://global.nivaranfoundation.org/",
  },
  openGraph: {
    title: "Nivaran Global",
    description:
      "Nivaran Global is the dedicated Nivaran platform for humanitarian campaigns, crisis reporting, and partner-ready public communication.",
    url: "https://global.nivaranfoundation.org/",
    type: "website",
    siteName: "Nivaran Global",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nivaran Global",
    description:
      "Nivaran Global is the dedicated Nivaran platform for humanitarian campaigns, crisis reporting, and partner-ready public communication.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

const pillarIcons = [Globe2, NotebookText, ShieldCheck];

export default async function GlobalHomePage() {
  const prefix = await getSubdomainPathPrefix("global");
  const latestFeed = await getGlobalMixedFeed(4);
  const leadStory = latestFeed[0];
  const sideStories = latestFeed.slice(1, 4);
  const featuredCampaign = GLOBAL_CAMPAIGNS[0];

  return (
    <div className="pb-16">
      <section className="px-4 pb-4 pt-8 md:pt-12">
        <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="rounded-3xl bg-white px-6 py-8 shadow-sm ring-1 ring-gray-100 md:px-8 md:py-10">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary-500">
              Nivaran Global
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-gray-800 md:text-6xl md:leading-[1.08]">
              Humanitarian campaigns and global reporting under one Nivaran system.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">
              This subdomain is built as a separate public-facing platform for cross-border
              campaigns, crisis coverage, partner briefings, and disciplined humanitarian
              communication. It should feel like Nivaran, but it should stand on its own.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <AppButton asChild size="lg" className="font-normal">
                <Link href={withSubdomainPrefix(prefix, "/campaigns")}>
                  Explore campaigns
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </AppButton>
              <AppButton asChild variant="primary-outline" size="lg" className="font-normal">
                <Link href={withSubdomainPrefix(prefix, "/news")}>Open newsroom</Link>
              </AppButton>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {GLOBAL_HOME_METRICS.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-gray-100 bg-neutral-50 p-5">
                  <p className="text-3xl font-semibold text-gray-800">{metric.value}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary-500">
                    {metric.label}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-gray-600">{metric.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100">
              <div className="relative h-[250px] md:h-[320px]">
                <Image
                  src={leadStory?.thumbnailImage || "/logo.png"}
                  alt={leadStory?.title || featuredCampaign.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-4 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-500">
                    Latest reporting
                  </p>
                  {leadStory ? (
                    <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-500">
                      {leadStory.date}
                    </span>
                  ) : null}
                </div>
                <h2 className="text-2xl font-semibold leading-tight text-gray-800">
                  {leadStory?.title || featuredCampaign.title}
                </h2>
                <p className="text-sm leading-7 text-gray-600">
                  {leadStory?.summary || featuredCampaign.summary}
                </p>
                <Link
                  href={
                    leadStory
                      ? withSubdomainPrefix(prefix, getBlogPath(leadStory))
                      : withSubdomainPrefix(prefix, "/campaigns/israel")
                  }
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-500"
                >
                  Read more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>

            <div className="grid gap-4 md:grid-cols-2">
              <article className="rounded-3xl bg-gray-800 p-6 text-white shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-200">
                  Featured campaign
                </p>
                <h2 className="mt-3 text-2xl font-semibold leading-tight">{featuredCampaign.title}</h2>
                <p className="mt-3 text-sm leading-7 text-gray-200">{featuredCampaign.summary}</p>
                <Link
                  href={withSubdomainPrefix(prefix, "/campaigns/israel")}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white"
                >
                  Open campaign
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>

              <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <div className="flex items-center gap-3 text-primary-500">
                  <Users className="h-5 w-5" />
                  <p className="text-xs font-semibold uppercase tracking-[0.22em]">Partner briefings</p>
                </div>
                <p className="mt-4 text-lg font-semibold text-gray-800">
                  Need a campaign or newsroom briefing?
                </p>
                <p className="mt-3 text-sm leading-7 text-gray-600">
                  Use the global desk for partner coordination, media conversations, and
                  structured response discussions.
                </p>
                <Link
                  href={withSubdomainPrefix(prefix, "/contact")}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary-500"
                >
                  Contact the global team
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-6 md:py-10">
        <div className="mx-auto max-w-[1320px]">
          <MainTitle suffix="Platform" prefix="Overview" />
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {GLOBAL_HOME_PILLARS.map((pillar, index) => {
              const Icon = pillarIcons[index] || Globe2;
              return (
                <article key={pillar.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-500">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold text-gray-800">{pillar.title}</h2>
                  <p className="mt-4 text-sm leading-8 text-gray-600">{pillar.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-6 md:py-10">
        <div className="mx-auto grid max-w-[1320px] gap-6 lg:grid-cols-[1fr_0.95fr]">
          <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 md:p-8">
            <MainTitle suffix="Featured" prefix="Campaign" className="mb-0" />
            <h2 className="mt-5 text-3xl font-semibold leading-tight text-gray-800 md:text-4xl">
              {featuredCampaign.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-gray-600">
              {featuredCampaign.summary}
            </p>
            <div className="mt-6 grid gap-3">
              {featuredCampaign.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-2xl border border-gray-100 bg-neutral-50 px-4 py-4 text-sm text-gray-700"
                >
                  {highlight}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <AppButton asChild size="lg" className="font-normal">
                <Link href={withSubdomainPrefix(prefix, "/campaigns/israel")}>Open campaign page</Link>
              </AppButton>
              <AppButton asChild variant="primary-outline" size="lg" className="font-normal">
                <Link href={withSubdomainPrefix(prefix, "/contact")}>Request briefing</Link>
              </AppButton>
            </div>
          </article>

          <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 md:p-8">
            <MainTitle suffix="How we" prefix="Work" className="mb-0" />
            <div className="mt-6 space-y-4">
              {GLOBAL_OPERATING_PRINCIPLES.map((item, index) => (
                <div key={item} className="flex gap-4 rounded-2xl border border-gray-100 bg-neutral-50 px-4 py-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-7 text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-4 py-6 md:py-10">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <MainTitle suffix="Latest" prefix="Reporting" className="mb-0" />
              <p className="mt-4 max-w-2xl text-base leading-8 text-gray-600">
                The newsroom, stories, and briefing layers all sit inside the same global desk so
                campaign work and public reporting stay aligned.
              </p>
            </div>
            <Link href={withSubdomainPrefix(prefix, "/news")} className="text-sm font-medium text-primary-500">
              View all reporting
            </Link>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            {leadStory ? (
              <Link
                href={withSubdomainPrefix(prefix, getBlogPath(leadStory))}
                className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100"
              >
                <div className="relative h-[290px] md:h-[360px]">
                  <Image
                    src={leadStory.thumbnailImage}
                    alt={leadStory.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-500">
                    Lead story
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight text-gray-800 md:text-3xl">
                    {leadStory.title}
                  </h3>
                  <p className="mt-4 text-sm leading-8 text-gray-600">{leadStory.summary}</p>
                </div>
              </Link>
            ) : null}

            <div className="grid gap-4">
              {sideStories.map((story) => (
                <Link
                  key={story.slug}
                  href={withSubdomainPrefix(prefix, getBlogPath(story))}
                  className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition-transform hover:-translate-y-0.5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-500">
                    {story.date}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold leading-7 text-gray-800">{story.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600">{story.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
