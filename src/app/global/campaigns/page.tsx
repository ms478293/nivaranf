import type { Metadata } from "next";
import Link from "next/link";
import { getSubdomainPathPrefix, withSubdomainPrefix } from "@/lib/subdomain-prefix";

export const metadata: Metadata = {
  title: "Campaigns",
  description:
    "Campaign pages under Nivaran Global, separated from Nepal-specific programs and reporting.",
  alternates: {
    canonical: "https://global.nivaranfoundation.org/campaigns",
  },
};

const campaigns = [
  {
    title: "Israel Humanitarian Response",
    href: "/campaigns/israel",
    summary:
      "A separate humanitarian campaign page for Israel-related relief and family support work.",
    stage: "Initial campaign setup",
  },
];

export default async function GlobalCampaignsPage() {
  const prefix = await getSubdomainPathPrefix("global");

  return (
    <div className="px-4 py-10">
      <div className="mx-auto max-w-[1320px]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-500">
          Campaign Hub
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900 md:text-5xl">
          Global campaigns managed outside the Nepal site
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          Each campaign here is meant to stand on its own. That means separate
          storylines, separate public updates, and a cleaner way to explain
          what the work is for without mixing it into Nepal program pages.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {campaigns.map((campaign) => (
            <Link
              key={campaign.title}
              href={withSubdomainPrefix(prefix, campaign.href)}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_12px_35px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-1 hover:border-primary-200 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {campaign.stage}
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900">
                {campaign.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {campaign.summary}
              </p>
              <p className="mt-5 text-sm font-medium text-primary-500">
                View campaign →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
