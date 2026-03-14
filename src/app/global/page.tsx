import type { Metadata } from "next";
import Link from "next/link";
import { getSubdomainPathPrefix, withSubdomainPrefix } from "@/lib/subdomain-prefix";

export const metadata: Metadata = {
  title: "Nivaran Global",
  description:
    "A separate home for Nivaran Foundation's global humanitarian campaigns, emergency response work, and non-Nepal cause pages.",
  alternates: {
    canonical: "https://global.nivaranfoundation.org/",
  },
  openGraph: {
    title: "Nivaran Global",
    description:
      "Separate global humanitarian campaigns and emergency response work outside Nepal.",
    url: "https://global.nivaranfoundation.org/",
    type: "website",
    siteName: "Nivaran Global",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nivaran Global",
    description:
      "A distinct subdomain for humanitarian campaigns and global causes beyond Nepal.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

const pillars = [
  {
    title: "Separate storytelling",
    body:
      "Global cause pages live here so Nepal health and education programs keep their own identity, metrics, and donor narrative.",
  },
  {
    title: "Separate campaign reporting",
    body:
      "Each campaign can publish its own updates, partners, and financial logic without reusing Nepal program language or stats.",
  },
  {
    title: "Humanitarian focus",
    body:
      "This space is designed for civilian-centered relief, health access, family support, and recovery work in crisis-affected regions.",
  },
];

const activeCampaigns = [
  {
    title: "Israel Humanitarian Response",
    href: "/campaigns/israel",
    status: "Building now",
    body:
      "A dedicated humanitarian campaign page for work related to Israel, kept fully separate from Nivaran's Nepal mission pages and reporting.",
  },
];

export default async function GlobalHomePage() {
  const prefix = await getSubdomainPathPrefix("global");

  return (
    <div className="pb-16">
      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[36px] border border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(115,199,208,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(242,162,134,0.22),transparent_34%),linear-gradient(140deg,#ffffff_0%,#fff7f0_100%)] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-12">
            <p className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary-500">
              Global Platform
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[0.98] text-slate-900 md:text-6xl">
              A separate home for global humanitarian campaigns
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              Nivaran Global is where we house campaign work outside Nepal.
              This keeps the Nepal site focused on Nepal health and education
              programs, while giving global causes their own identity,
              reporting, and public narrative.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={withSubdomainPrefix(prefix, "/campaigns/israel")}
                className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
              >
                Open Israel Campaign
              </Link>
              <Link
                href="mailto:partnerships@nivaranfoundation.org?subject=Nivaran%20Global%20Campaign%20Inquiry"
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
              >
                Talk to the team
              </Link>
            </div>
          </div>

          <aside className="rounded-[32px] border border-slate-200 bg-slate-950 p-8 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Separation Guardrails
            </p>
            <div className="mt-6 space-y-5">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-300">
                  Nepal metrics
                </p>
                <p className="mt-2 text-lg font-semibold">
                  stay off this subdomain
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-300">
                  Campaign reporting
                </p>
                <p className="mt-2 text-lg font-semibold">
                  is published separately here
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-300">
                  Donor messaging
                </p>
                <p className="mt-2 text-lg font-semibold">
                  can be campaign-specific and cleaner
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="mx-auto grid max-w-[1320px] gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_12px_35px_rgba(15,23,42,0.05)]"
            >
              <h2 className="text-2xl font-semibold text-slate-900">
                {pillar.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {pillar.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="mx-auto max-w-[1320px] rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_12px_35px_rgba(15,23,42,0.05)] md:p-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-500">
                Active Campaigns
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                Global cause pages that live outside the Nepal site
              </h2>
            </div>
            <Link
              href={withSubdomainPrefix(prefix, "/campaigns")}
              className="text-sm font-medium text-primary-500"
            >
              View all campaigns
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {activeCampaigns.map((campaign) => (
              <Link
                key={campaign.title}
                href={withSubdomainPrefix(prefix, campaign.href)}
                className="rounded-3xl border border-slate-200 bg-[linear-gradient(160deg,#ffffff_0%,#f7fbfb_100%)] p-6 transition-all hover:-translate-y-1 hover:border-primary-200 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {campaign.status}
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-slate-900">
                  {campaign.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {campaign.body}
                </p>
                <p className="mt-5 text-sm font-medium text-primary-500">
                  Open campaign page →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
