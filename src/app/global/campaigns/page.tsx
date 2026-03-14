import MainTitle from "@/components/new/MainTitle/MainTitle";
import { AppButton } from "@/components/ui/app-button";
import { GLOBAL_CAMPAIGNS, GLOBAL_OPERATING_PRINCIPLES } from "@/content/global-site";
import { getSubdomainPathPrefix, withSubdomainPrefix } from "@/lib/subdomain-prefix";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Campaigns",
  description:
    "Explore Nivaran Global campaigns built for humanitarian response, partner briefings, and accountable public communication.",
  alternates: {
    canonical: "https://global.nivaranfoundation.org/campaigns",
  },
};

export default async function GlobalCampaignsPage() {
  const prefix = await getSubdomainPathPrefix("global");

  return (
    <div className="px-4 pb-16 pt-8 md:pt-12">
      <div className="mx-auto max-w-[1320px]">
        <section className="rounded-3xl bg-white px-6 py-8 shadow-sm ring-1 ring-gray-100 md:px-8 md:py-10">
          <MainTitle suffix="Global" prefix="Campaigns" as="h1" className="mb-0" />
          <p className="mt-5 max-w-3xl text-3xl font-semibold leading-tight text-gray-800 md:text-5xl">
            Dedicated campaign spaces with clearer scope, stronger briefings, and cleaner accountability.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">
            Each campaign page is meant to explain what the work is, how the public should
            understand it, and how partners can engage without ambiguity.
          </p>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-5">
            {GLOBAL_CAMPAIGNS.map((campaign) => (
              <article key={campaign.slug} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-500">
                      {campaign.eyebrow}
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold leading-tight text-gray-800">
                      {campaign.title}
                    </h2>
                  </div>
                  <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-500">
                    {campaign.status}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-8 text-gray-600 md:text-base">{campaign.summary}</p>
                <div className="mt-6 grid gap-3">
                  {campaign.highlights.map((highlight) => (
                    <div key={highlight} className="rounded-2xl border border-gray-100 bg-neutral-50 px-4 py-4 text-sm text-gray-700">
                      {highlight}
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <AppButton asChild size="lg" className="font-normal">
                    <Link href={withSubdomainPrefix(prefix, `/campaigns/${campaign.slug}`)}>
                      Open campaign
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </AppButton>
                </div>
              </article>
            ))}
          </div>

          <aside className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 md:p-8">
            <MainTitle suffix="Why" prefix="Separate" className="mb-0" />
            <p className="mt-5 text-2xl font-semibold leading-tight text-gray-800">
              Campaigns need their own operating surface.
            </p>
            <p className="mt-4 text-sm leading-8 text-gray-600 md:text-base">
              A global campaign should not look like a generic donation box. It should hold its own
              scope, partner logic, communication guardrails, and public reporting structure.
            </p>
            <div className="mt-6 grid gap-3">
              {GLOBAL_OPERATING_PRINCIPLES.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-gray-100 bg-neutral-50 px-4 py-4">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary-500" />
                  <p className="text-sm leading-7 text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
