import type { Metadata } from "next";
import Link from "next/link";
import { getSubdomainPathPrefix, withSubdomainPrefix } from "@/lib/subdomain-prefix";

export const metadata: Metadata = {
  title: "Israel Humanitarian Response",
  description:
    "A separate Nivaran Global campaign page for humanitarian response and family-centered relief related to Israel, outside the Nepal program site.",
  alternates: {
    canonical: "https://global.nivaranfoundation.org/campaigns/israel",
  },
  openGraph: {
    title: "Israel Humanitarian Response | Nivaran Global",
    description:
      "A distinct humanitarian campaign page, kept separate from Nepal health and education programs.",
    url: "https://global.nivaranfoundation.org/campaigns/israel",
    type: "website",
    siteName: "Nivaran Global",
  },
  twitter: {
    card: "summary_large_image",
    title: "Israel Humanitarian Response | Nivaran Global",
    description:
      "A separate humanitarian campaign page under Nivaran Global.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

const focusAreas = [
  {
    title: "Emergency health access",
    body:
      "Short-horizon support for urgent medical needs, essential supplies, and practical coordination with credible local or international partners.",
  },
  {
    title: "Children and families",
    body:
      "Trauma-informed family support, child wellbeing, and community-level protection concerns are treated as core humanitarian priorities, not side issues.",
  },
  {
    title: "Accountable campaign reporting",
    body:
      "This campaign is meant to publish its own updates, designated-use logic, partner summaries, and public communication without borrowing Nepal program metrics.",
  },
];

const guardrails = [
  "This campaign lives on a separate subdomain so the Nepal site stays focused on Nepal programs.",
  "Public updates, storytelling, and partner communication are handled under Nivaran Global rather than under Sanjeevani or Nepal program pages.",
  "Before public fundraising scales, designated fund handling and reporting rules should be published clearly for this campaign.",
];

const faq = [
  {
    question: "Why is this campaign on a separate subdomain?",
    answer:
      "Because Nivaran's Nepal health and education work should remain distinct from global humanitarian campaigns. The separate subdomain keeps public messaging, reporting, and campaign identity cleaner.",
  },
  {
    question: "What is the current focus of this page?",
    answer:
      "This page establishes the structure for a humanitarian response campaign related to Israel, with emphasis on civilian needs, family support, practical partnerships, and separate public accountability.",
  },
  {
    question: "Will this use Nepal program metrics or fundraising language?",
    answer:
      "No. The purpose of Nivaran Global is to avoid mixing Nepal program storytelling, metrics, or donor claims into separate global causes.",
  },
  {
    question: "How should partners engage right now?",
    answer:
      "The best next step is a direct partnership or campaign briefing request so scope, operating model, and reporting expectations are defined before scale.",
  },
];

export default async function IsraelCampaignPage() {
  const prefix = await getSubdomainPathPrefix("global");
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
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

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto max-w-[1320px] rounded-[36px] border border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(115,199,208,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(242,162,134,0.22),transparent_34%),linear-gradient(145deg,#ffffff_0%,#fff8f2_100%)] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-12">
          <p className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary-500">
            Israel Campaign
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[0.98] text-slate-900 md:text-6xl">
            Israel Humanitarian Response
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            This page is the separate home for a humanitarian campaign related
            to Israel. It exists under Nivaran Global so campaign identity,
            partner communication, and future reporting stay distinct from the
            Nepal mission site.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="mailto:partnerships@nivaranfoundation.org?subject=Nivaran%20Global%20%7C%20Israel%20Campaign%20Briefing"
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              Request campaign briefing
            </Link>
            <Link
              href="https://www.nivaranfoundation.org/contact-us"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
            >
              Contact partnerships team
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="mx-auto grid max-w-[1320px] gap-6 md:grid-cols-3">
          {focusAreas.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_12px_35px_rgba(15,23,42,0.05)]"
            >
              <h2 className="text-2xl font-semibold text-slate-900">
                {item.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="mx-auto grid max-w-[1320px] gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-500">
              Why this setup matters
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">
              The point is separation, clarity, and cleaner public trust
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-8 text-slate-600">
              <p>
                You were right to avoid putting this inside the Nepal site.
                A campaign related to Israel should not sit beside Sanjeevani,
                Nepal coverage claims, or Nepal-specific donor messaging.
              </p>
              <p>
                This subdomain gives us a cleaner structure: separate landing
                pages, separate updates, and room for campaign-specific
                reporting once the operating model and designated fund handling
                are finalized.
              </p>
              <p>
                That separation protects both sides. The Nepal mission keeps
                its own focus, and the global campaign gets its own identity
                without feeling bolted onto an unrelated program site.
              </p>
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Campaign Guardrails
            </p>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-200">
              {guardrails.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="mx-auto max-w-[1320px] rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-500">
                Frequently Asked Questions
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                Common questions about the campaign structure
              </h2>
            </div>
            <Link
              href={withSubdomainPrefix(prefix, "/campaigns")}
              className="text-sm font-medium text-primary-500"
            >
              Back to campaigns
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faq.map((item) => (
              <article
                key={item.question}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-base font-semibold text-slate-900">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
