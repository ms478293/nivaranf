import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import { RelatedContent } from "@/components/new/RelatedContent/RelatedContent";
import type { EvidenceLink } from "@/content/healthcare-evidence";
import { SANJEEVANI_PUBLIC_STATS } from "@/content/sanjeevani-public-stats";
import Link from "next/link";

interface TopicStat {
  label: string;
  value: string;
  note: string;
}

interface TopicSection {
  title: string;
  body: string[];
}

interface TopicFaq {
  question: string;
  answer: string;
}

interface TopicLink {
  title: string;
  href: string;
  description: string;
}

interface HealthcareTopicPageProps {
  breadcrumbLabel: string;
  eyebrow: string;
  title: string;
  intro: string;
  summary: string[];
  stats?: TopicStat[];
  sections: TopicSection[];
  faq: TopicFaq[];
  relatedLinks: TopicLink[];
  editorialNote?: string;
  evidenceLinks?: EvidenceLink[];
}

export function HealthcareTopicPage({
  breadcrumbLabel,
  eyebrow,
  title,
  intro,
  summary,
  stats,
  sections,
  faq,
  relatedLinks,
  editorialNote,
  evidenceLinks,
}: HealthcareTopicPageProps) {
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

  const statCards =
    stats ??
    [
      {
        label: "Patients served",
        value: SANJEEVANI_PUBLIC_STATS.patientsServedText,
        note: "current cumulative field total",
      },
      {
        label: "Health camps",
        value: SANJEEVANI_PUBLIC_STATS.campsCompletedText,
        note: "verified completed camps",
      },
      {
        label: "Provinces covered",
        value: `${SANJEEVANI_PUBLIC_STATS.provincesCoveredText}/7`,
        note: "active national footprint",
      },
    ];

  return (
    <main className="font-Poppins pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-[1320px] mx-auto px-4 pt-2">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Programs", href: "/programs" },
            { label: breadcrumbLabel },
          ]}
        />
      </div>

      <section className="px-4 py-8 md:py-12">
        <div className="max-w-[1320px] mx-auto rounded-[32px] border border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(115,199,208,0.2),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(242,162,134,0.2),transparent_32%),linear-gradient(140deg,#ffffff_0%,#fff9f6_100%)] p-8 md:p-12 shadow-[0_16px_45px_rgba(15,23,42,0.08)]">
          <p className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-500">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-3xl font-semibold leading-[1.05] text-slate-900 sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            {intro}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/sanjeevani"
              className="inline-flex items-center rounded-full bg-primary-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-600"
            >
              Explore Project Sanjeevani
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
            >
              Support Rural Healthcare
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-4">
        <div className="max-w-[1320px] mx-auto grid gap-4 md:grid-cols-3">
          {statCards.map((stat) => (
            <article
              key={stat.label}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                {stat.label}
              </p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-slate-500">{stat.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="max-w-[1320px] mx-auto grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
            <h2 className="text-2xl font-semibold text-slate-900">
              Why this topic matters
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
              {summary.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
          <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-semibold text-slate-900">
              What Nivaran is building
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Mobile field delivery where distance blocks routine treatment.</li>
              <li>Verification and tracking through the Sanjeevani portal.</li>
              <li>Referral pathways that connect field camps to higher-level care.</li>
              <li>Donor-facing transparency around progress, scale, and investment.</li>
            </ul>
          </aside>
        </div>
      </section>

      {(editorialNote || evidenceLinks?.length) && (
        <section className="px-4 py-4">
          <div className="max-w-[1320px] mx-auto grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <h2 className="text-2xl font-semibold text-slate-900">
                Editorial and care-quality note
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {editorialNote ||
                  "This page is a public educational overview of access barriers and delivery models. It is not personal medical advice and should not replace diagnosis, treatment, or emergency care from a licensed clinician."}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/care-model"
                  className="inline-flex items-center rounded-full bg-primary-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-600"
                >
                  Review Care Model
                </Link>
                <Link
                  href="/editorial-standards"
                  className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
                >
                  Editorial Standards
                </Link>
              </div>
            </article>

            {evidenceLinks?.length ? (
              <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
                <h2 className="text-2xl font-semibold text-slate-900">
                  Official reference sources
                </h2>
                <div className="mt-5 space-y-4">
                  {evidenceLinks.map((source) => (
                    <a
                      key={source.href}
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-primary-200 hover:bg-white"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-500">
                        {source.source}
                      </p>
                      <h3 className="mt-2 text-base font-semibold text-slate-900">
                        {source.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {source.note}
                      </p>
                    </a>
                  ))}
                </div>
              </article>
            ) : null}
          </div>
        </section>
      )}

      <section className="px-4 py-4">
        <div className="max-w-[1320px] mx-auto grid gap-6 lg:grid-cols-3">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
            >
              <h2 className="text-2xl font-semibold text-slate-900">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="max-w-[1320px] mx-auto rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
          <h2 className="text-2xl font-semibold text-slate-900">
            Frequently asked questions
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faq.map((item) => (
              <article
                key={item.question}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-base font-semibold text-slate-900">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-4">
        <div className="max-w-[1320px] mx-auto">
          <RelatedContent heading="Continue Exploring" links={relatedLinks} />
        </div>
      </section>
    </main>
  );
}
