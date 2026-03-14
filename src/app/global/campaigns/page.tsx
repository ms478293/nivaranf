import { GLOBAL_CAMPAIGNS } from "@/content/global-site";
import { getSubdomainPathPrefix, withSubdomainPrefix } from "@/lib/subdomain-prefix";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Campaigns",
  description:
    "Explore Global Nivaran campaigns built for humanitarian response, partner briefings, and accountable public communication.",
  alternates: {
    canonical: "https://global.nivaranfoundation.org/campaigns",
  },
};

export default async function GlobalCampaignsPage() {
  const prefix = await getSubdomainPathPrefix("global");

  return (
    <div className="px-4 pb-16 pt-10 md:px-6 md:pt-14">
      <div className="mx-auto max-w-[1380px]">
        <section className="rounded-[34px] border border-slate-200/80 bg-[linear-gradient(135deg,#ffffff_0%,#fff8f3_100%)] px-6 py-8 shadow-[0_18px_48px_rgba(15,23,42,0.08)] md:px-10 md:py-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-500">Campaign hub</p>
          <h1 className="mt-4 font-[family:var(--global-font-display)] text-5xl leading-[0.92] text-slate-950 md:text-7xl">
            Campaign spaces built for clarity, briefings, and execution.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            Each campaign in this platform should be able to explain what it is doing, who it is working with, and how it will report publicly. That discipline is the product, not an afterthought.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          {GLOBAL_CAMPAIGNS.map((campaign) => (
            <article
              key={campaign.slug}
              className="rounded-[32px] border border-slate-200/80 bg-white p-7 shadow-[0_16px_42px_rgba(15,23,42,0.06)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                    {campaign.eyebrow}
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
                    {campaign.title}
                  </h2>
                </div>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  {campaign.status}
                </span>
              </div>
              <p className="mt-5 text-sm leading-8 text-slate-600">{campaign.summary}</p>
              <div className="mt-6 grid gap-3">
                {campaign.highlights.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
              <Link
                href={withSubdomainPrefix(prefix, `/campaigns/${campaign.slug}`)}
                className="mt-8 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Open campaign
              </Link>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
