import MainTitle from "@/components/new/MainTitle/MainTitle";
import { AppButton } from "@/components/ui/app-button";
import {
  ISRAEL_CAMPAIGN_FAQ,
  ISRAEL_CAMPAIGN_GUARDRAILS,
  ISRAEL_CAMPAIGN_PILLARS,
} from "@/content/global-site";
import { getSubdomainPathPrefix, withSubdomainPrefix } from "@/lib/subdomain-prefix";
import { ArrowRight, HeartHandshake, Shield, Stethoscope } from "lucide-react";
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

const pillarIcons = [Stethoscope, HeartHandshake, Shield];

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
    <div className="px-4 pb-16 pt-8 md:pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-[1320px]">
        <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-3xl bg-white px-6 py-8 shadow-sm ring-1 ring-gray-100 md:px-8 md:py-10">
            <MainTitle suffix="Featured" prefix="Campaign" as="h1" className="mb-0" />
            <p className="mt-5 max-w-4xl text-3xl font-semibold leading-tight text-gray-800 md:text-5xl">
              Israel Humanitarian Response
            </p>
            <p className="mt-5 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">
              This campaign space is designed for civilian-focused response planning, clear partner
              communication, and public accountability that can withstand scrutiny.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <AppButton asChild size="lg" className="font-normal">
                <Link href="mailto:support@global.nivaranfoundation.org?subject=Israel%20Campaign%20Briefing">
                  Request campaign briefing
                </Link>
              </AppButton>
              <AppButton asChild variant="primary-outline" size="lg" className="font-normal">
                <Link href={withSubdomainPrefix(prefix, "/contact")}>Contact operations</Link>
              </AppButton>
            </div>
          </div>

          <aside className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-3xl bg-gray-800 p-6 text-white shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-200">
                Current mode
              </p>
              <p className="mt-3 text-2xl font-semibold">Briefing and infrastructure</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-500">
                Priority
              </p>
              <p className="mt-3 text-xl font-semibold text-gray-800">
                Civilian aid and continuity of care
              </p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-500">
                Standard
              </p>
              <p className="mt-3 text-xl font-semibold text-gray-800">
                Designated-use clarity and public reporting
              </p>
            </div>
          </aside>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-3">
          {ISRAEL_CAMPAIGN_PILLARS.map((item, index) => {
            const Icon = pillarIcons[index] || Shield;
            return (
              <article key={item.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-500">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-2xl font-semibold text-gray-800">{item.title}</h2>
                <p className="mt-4 text-sm leading-8 text-gray-600">{item.body}</p>
              </article>
            );
          })}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 md:p-8">
            <MainTitle suffix="Campaign" prefix="Guardrails" className="mb-0" />
            <div className="mt-6 grid gap-3">
              {ISRAEL_CAMPAIGN_GUARDRAILS.map((item) => (
                <div key={item} className="rounded-2xl border border-gray-100 bg-neutral-50 px-4 py-4 text-sm leading-7 text-gray-600">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 md:p-8">
            <MainTitle suffix="Campaign" prefix="FAQ" className="mb-0" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {ISRAEL_CAMPAIGN_FAQ.map((item) => (
                <div key={item.question} className="rounded-2xl border border-gray-100 bg-neutral-50 px-4 py-4">
                  <h2 className="text-base font-semibold text-gray-800">{item.question}</h2>
                  <p className="mt-3 text-sm leading-7 text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-3xl bg-white px-6 py-8 shadow-sm ring-1 ring-gray-100 md:px-8 md:py-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <MainTitle suffix="Next" prefix="Step" className="mb-0" />
              <p className="mt-4 max-w-2xl text-base leading-8 text-gray-600">
                If you need a structured conversation about scope, partner roles, or how this
                campaign should be publicly framed, start with a direct briefing request.
              </p>
            </div>
            <AppButton asChild size="lg" className="font-normal">
              <Link href={withSubdomainPrefix(prefix, "/contact")}>
                Open contact page
                <ArrowRight className="h-4 w-4" />
              </Link>
            </AppButton>
          </div>
        </section>
      </div>
    </div>
  );
}
