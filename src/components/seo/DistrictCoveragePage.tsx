import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import { RelatedContent } from "@/components/new/RelatedContent/RelatedContent";
import { SANJEEVANI_PUBLIC_STATS } from "@/content/sanjeevani-public-stats";
import { getDistrictCoverageData } from "@/content/sanjeevani-province-pages";
import Link from "next/link";
import { notFound } from "next/navigation";

function formatDateLabel(value?: string) {
  if (!value) return "Date unavailable";
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function DistrictCoveragePage({
  provinceSlug,
  districtSlug,
}: {
  provinceSlug: string;
  districtSlug: string;
}) {
  const data = getDistrictCoverageData(provinceSlug, districtSlug);

  if (!data) {
    notFound();
  }

  const faq = [
    {
      question: `How many patients has Nivaran served in ${data.district} District?`,
      answer: `Current Sanjeevani tracking records show ${data.totalPatients.toLocaleString(
        "en-US"
      )} patients served in ${data.district} District across ${
        data.camps.length
      } recorded camp${data.camps.length === 1 ? "" : "s"}.`,
    },
    {
      question: `Which municipality has Nivaran reached in ${data.district}?`,
      answer: `${data.municipalities.join(
        ", "
      )} is the rural municipality currently represented in the public Sanjeevani record for ${data.district} District.`,
    },
    {
      question: `Why does district-level healthcare tracking matter?`,
      answer:
        "District pages make healthcare access claims more credible by showing the exact geography, patient totals, camp windows, and field indicators behind the wider province narrative.",
    },
    {
      question: `How does this district fit the wider Sanjeevani rollout?`,
      answer: `${data.district} District is part of Nivaran Foundation's current ${data.province} Province footprint, which contributes to a national coverage record spanning all ${SANJEEVANI_PUBLIC_STATS.provincesCoveredText} provinces of Nepal.`,
    },
  ];

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

  const patientsPerDay = Math.round(data.totalPatients / data.effectiveDays);
  const provinceHref = `/healthcare-coverage-nepal/${provinceSlug}`;

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
            { label: "Coverage in Nepal", href: "/healthcare-coverage-nepal" },
            { label: data.province, href: provinceHref },
            { label: data.district },
          ]}
        />
      </div>

      <section className="px-4 py-8 md:py-12">
        <div className="max-w-[1320px] mx-auto rounded-[32px] border border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(115,199,208,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(242,162,134,0.22),transparent_32%),linear-gradient(140deg,#ffffff_0%,#fffaf6_100%)] p-8 md:p-12 shadow-[0_16px_45px_rgba(15,23,42,0.08)]">
          <p className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-500">
            District Coverage
          </p>
          <h1 className="mt-5 max-w-4xl text-3xl font-semibold leading-[1.05] text-slate-900 sm:text-4xl md:text-5xl">
            Healthcare access in {data.district} District, {data.province}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            {data.district} District is currently represented in the public
            Sanjeevani record through {data.totalPatients.toLocaleString("en-US")}{" "}
            patients served across {data.camps.length} recorded camp
            {data.camps.length === 1 ? "" : "s"} in {data.municipalities.join(", ")}.
            This district page shows the field record behind Nivaran
            Foundation&apos;s wider {data.province} Province healthcare footprint.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={provinceHref}
              className="inline-flex items-center rounded-full bg-primary-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-600"
            >
              Open {data.province} Province Page
            </Link>
            <Link
              href="/sanjeevani/tracking"
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
            >
              Open Tracking Portal
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-4">
        <div className="max-w-[1320px] mx-auto grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Patients served",
              value: data.totalPatients.toLocaleString("en-US"),
              note: `current verified total in ${data.district}`,
            },
            {
              label: "Municipalities reached",
              value: data.municipalities.length.toLocaleString("en-US"),
              note: data.municipalities.join(", "),
            },
            {
              label: "Effective camp days",
              value: data.effectiveDays.toLocaleString("en-US"),
              note: "combined field days in current record",
            },
            {
              label: "Latest recorded camp",
              value: formatDateLabel(data.latestCamp?.endDate),
              note: data.latestCamp
                ? `${data.latestCamp.ruralMunicipality}, ${data.latestCamp.teamAssigned}`
                : "No recent camp logged",
            },
          ].map((stat) => (
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
        <div className="max-w-[1320px] mx-auto grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
            <h2 className="text-2xl font-semibold text-slate-900">
              Why district-level tracking matters
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
              <p>{data.provinceIntro}</p>
              <p>
                In practice, district-level visibility matters because access
                barriers are local. The difference between routine care and
                delayed treatment often comes down to whether screening,
                medicines, and referral support reach a specific municipality,
                not whether a province looks covered on paper.
              </p>
              <p>
                That is why this page focuses on {data.district} specifically:
                where the camp happened, how many patients were seen, how long
                the field window lasted, and what service indicators were
                logged.
              </p>
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-semibold text-slate-900">
              Current recorded footprint
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
              <p>
                {data.district} currently sits inside the published{" "}
                {data.province} Province rollout, with municipalities logged in
                the Sanjeevani record and linked to a wider national coverage
                footprint.
              </p>
              <p>
                The current district record spans from{" "}
                {formatDateLabel(data.firstCamp?.startDate)} to{" "}
                {formatDateLabel(data.latestCamp?.endDate)} and includes{" "}
                {data.totalReferrals.toLocaleString("en-US")} estimated referrals
                plus {data.totalMedicinesDistributed.toLocaleString("en-US")}{" "}
                medicines distributed.
              </p>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Operational snapshot
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-2xl font-semibold text-slate-900">
                    {patientsPerDay.toLocaleString("en-US")}
                  </p>
                  <p className="text-sm text-slate-500">avg patients per day</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-slate-900">
                    {data.camps.length.toLocaleString("en-US")}
                  </p>
                  <p className="text-sm text-slate-500">logged camp cycles</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 py-4">
        <div className="max-w-[1320px] mx-auto grid gap-6 lg:grid-cols-3">
          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
            <h2 className="text-2xl font-semibold text-slate-900">
              Municipalities reached
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {data.municipalities.map((municipality) => (
                <li
                  key={municipality}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  {municipality}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
            <h2 className="text-2xl font-semibold text-slate-900">
              Service indicators
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-6 text-slate-600">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Estimated referrals
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {data.totalReferrals.toLocaleString("en-US")}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Medicines distributed
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {data.totalMedicinesDistributed.toLocaleString("en-US")}
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
            <h2 className="text-2xl font-semibold text-slate-900">
              Province context
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
              <p>
                {data.province} is one of the {SANJEEVANI_PUBLIC_STATS.provincesCoveredText}{" "}
                provinces currently represented in the national Sanjeevani
                footprint.
              </p>
              <p>{data.provinceChallenge[0]}</p>
              <p>{data.provinceResponse[0]}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="max-w-[1320px] mx-auto rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
          <h2 className="text-2xl font-semibold text-slate-900">
            Camp record in {data.district} District
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-600">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-[0.12em] text-slate-500">
                  <th className="px-3 py-3 font-semibold">Camp ID</th>
                  <th className="px-3 py-3 font-semibold">Municipality</th>
                  <th className="px-3 py-3 font-semibold">Camp Window</th>
                  <th className="px-3 py-3 font-semibold">Patients</th>
                  <th className="px-3 py-3 font-semibold">Team</th>
                </tr>
              </thead>
              <tbody>
                {data.camps.map((camp) => (
                  <tr key={camp.campId} className="border-b border-slate-100 align-top">
                    <td className="px-3 py-4 font-medium text-slate-900">
                      {camp.campId}
                    </td>
                    <td className="px-3 py-4">{camp.ruralMunicipality}</td>
                    <td className="px-3 py-4">
                      {formatDateLabel(camp.startDate)} to{" "}
                      {formatDateLabel(camp.endDate)}
                    </td>
                    <td className="px-3 py-4">
                      {camp.totalPatients.toLocaleString("en-US")}
                    </td>
                    <td className="px-3 py-4">{camp.teamAssigned}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
          <RelatedContent
            heading="Continue Exploring"
            links={[
              {
                title: `${data.province} Province Coverage`,
                href: provinceHref,
                description:
                  "Return to the province page for the full district footprint and camp record.",
              },
              {
                title: "Coverage in Nepal",
                href: "/healthcare-coverage-nepal",
                description:
                  "View the full province-by-province coverage hub for Project Sanjeevani.",
              },
              {
                title: "Tracking Portal",
                href: "/sanjeevani/tracking",
                description:
                  "Open the live operating view for camps, coverage, and recent field activity.",
              },
              {
                title: "Nivaran Fact Sheet",
                href: "/impact-fact-sheet",
                description:
                  "Use the fact sheet when citing current healthcare metrics and organization details.",
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
