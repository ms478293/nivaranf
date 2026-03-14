import {
  ISRAEL_CAMPAIGN_FAQ,
  ISRAEL_CAMPAIGN_GUARDRAILS,
  ISRAEL_CAMPAIGN_PILLARS,
} from "@/content/global-site";
import { getSubdomainPathPrefix, withSubdomainPrefix } from "@/lib/subdomain-prefix";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Israel Humanitarian Response",
  description:
    "A dedicated campaign space for civilian-focused humanitarian response, partner briefings, and accountable public communication related to Israel.",
  alternates: {
    canonical: "https://global.nivaranfoundation.org/campaigns/israel",
  },
  openGraph: {
    title: "Israel Humanitarian Response | Global Nivaran",
    description:
      "A dedicated campaign space for civilian-focused humanitarian response, partner briefings, and accountable public communication related to Israel.",
    url: "https://global.nivaranfoundation.org/campaigns/israel",
    type: "website",
    siteName: "Global Nivaran",
  },
};

export default async function IsraelCampaignPage() {
  const prefix = await getSubdomainPathPrefix("global");
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ISRAEL_CAMPAIGN_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="px-4 pt-10 md:px-6 md:pt-14">
        <div className="mx-auto grid max-w-[1380px] gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[38px] border border-white/70 bg-[radial-gradient(circle_at_top_left,rgba(115,199,208,0.18),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(242,162,134,0.24),transparent_34%),linear-gradient(140deg,#ffffff_0%,#fff6ef_100%)] px-6 py-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] md:px-10 md:py-12">
            <p className="inline-flex rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-600">
              Featured campaign
            </p>
            <h1 className="mt-6 max-w-4xl font-[family:var(--global-font-display)] text-5xl leading-[0.9] text-slate-950 md:text-7xl">
              Israel Humanitarian Response
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              This campaign space is built for civilian-focused response planning, clear partner communication, and public accountability that can hold up under scrutiny. The emphasis is on practical response architecture, not generic messaging.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="mailto:global@nivaranfoundation.org?subject=Israel%20Campaign%20Briefing"
                className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Request campaign briefing
              </Link>
              <Link
                href={withSubdomainPrefix(prefix, "/contact")}
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-950"
              >
                Contact operations
              </Link>
            </div>
          </div>

          <aside className="rounded-[34px] border border-slate-200/80 bg-slate-950 p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-cyan-300">Campaign frame</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Current mode</p>
                <p className="mt-2 text-lg font-semibold">Briefing and infrastructure</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Priority</p>
                <p className="mt-2 text-lg font-semibold">Civilian aid and health continuity</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Required discipline</p>
                <p className="mt-2 text-lg font-semibold">Designated-use clarity and public reporting</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 py-8 md:px-6">
        <div className="mx-auto grid max-w-[1380px] gap-6 md:grid-cols-3">
          {ISRAEL_CAMPAIGN_PILLARS.map((item) => (
            <article
              key={item.title}
              className="rounded-[30px] border border-slate-200/80 bg-white p-7 shadow-[0_14px_36px_rgba(15,23,42,0.06)]"
            >
              <h2 className="text-2xl font-semibold text-slate-950">{item.title}</h2>
              <p className="mt-4 text-sm leading-8 text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-4 md:px-6">
        <div className="mx-auto grid max-w-[1380px] gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[32px] border border-slate-200/80 bg-white px-6 py-8 shadow-[0_16px_42px_rgba(15,23,42,0.06)] md:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-500">Why this campaign page exists</p>
            <h2 className="mt-4 font-[family:var(--global-font-display)] text-4xl leading-none text-slate-950">
              Serious campaigns need their own operating surface.
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-8 text-slate-600">
              <p>
                This page exists to hold the pieces that normally get blurred together: response framing, partner communication, public trust, and the mechanics of how the work will be explained.
              </p>
              <p>
                That separation matters. A strong campaign site should let supporters understand scope, let partners understand discipline, and let public reporting stay grounded in what can actually be delivered.
              </p>
              <p>
                The result is a cleaner environment for briefings, launch preparation, and future updates if the work expands.
              </p>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200/80 bg-[linear-gradient(145deg,#ffffff_0%,#eef8f9_100%)] px-6 py-8 shadow-[0_16px_42px_rgba(15,23,42,0.06)] md:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-500">Guardrails</p>
            <div className="mt-6 grid gap-4">
              {ISRAEL_CAMPAIGN_GUARDRAILS.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm leading-7 text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-4 md:px-6">
        <div className="mx-auto max-w-[1380px] rounded-[32px] border border-slate-200/80 bg-white px-6 py-8 shadow-[0_16px_42px_rgba(15,23,42,0.06)] md:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-500">Questions</p>
              <h2 className="mt-4 font-[family:var(--global-font-display)] text-4xl leading-none text-slate-950">
                Campaign FAQ
              </h2>
            </div>
            <Link
              href={withSubdomainPrefix(prefix, "/campaigns")}
              className="text-sm font-semibold text-slate-700 transition-colors hover:text-slate-950"
            >
              Back to campaigns
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {ISRAEL_CAMPAIGN_FAQ.map((item) => (
              <article
                key={item.question}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5"
              >
                <h3 className="text-base font-semibold text-slate-950">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
