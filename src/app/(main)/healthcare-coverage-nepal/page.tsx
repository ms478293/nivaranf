import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import { RelatedContent } from "@/components/new/RelatedContent/RelatedContent";
import { SANJEEVANI_PROVINCE_PAGES, getProvinceCoverageData } from "@/content/sanjeevani-province-pages";
import { SANJEEVANI_PUBLIC_STATS } from "@/content/sanjeevani-public-stats";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Healthcare Coverage in Nepal | Province-by-Province Sanjeevani Footprint",
  description:
    "Explore Nivaran Foundation's current healthcare coverage in Nepal by province, including districts served, patients reached, and verified Project Sanjeevani camp activity.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/healthcare-coverage-nepal",
  },
  keywords: [
    "healthcare coverage Nepal",
    "Project Sanjeevani provinces",
    "rural healthcare Nepal districts",
    "mobile health camps Nepal provinces",
    "Nivaran Foundation coverage",
  ],
  openGraph: {
    title: "Healthcare Coverage in Nepal | Province-by-Province Sanjeevani Footprint",
    description:
      "See where Project Sanjeevani is operating across Nepal and review the current province-by-province healthcare footprint.",
    url: "https://www.nivaranfoundation.org/healthcare-coverage-nepal",
    type: "website",
    siteName: "Nivaran Foundation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare Coverage in Nepal | Province-by-Province Sanjeevani Footprint",
    description:
      "A province-by-province overview of Sanjeevani's current healthcare coverage across Nepal.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

const provinceCards = SANJEEVANI_PROVINCE_PAGES.map((page) => {
  const data = getProvinceCoverageData(page.slug);
  if (!data) {
    throw new Error(`Missing province coverage data for slug: ${page.slug}`);
  }

  return {
    slug: page.slug,
    province: data.province,
    totalPatients: data.totalPatients,
    campsCompleted: data.provinceSummary.campsCompleted,
    districts: data.provinceSummary.districts,
    latestCamp: data.latestCamp,
  };
}).sort((a, b) => b.totalPatients - a.totalPatients);

export default function HealthcareCoverageNepalPage() {
  return (
    <main className="font-Poppins pb-16">
      <div className="max-w-[1320px] mx-auto px-4 pt-2">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Coverage in Nepal" },
          ]}
        />
      </div>

      <section className="px-4 py-8 md:py-12">
        <div className="max-w-[1320px] mx-auto rounded-[32px] border border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(115,199,208,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(242,162,134,0.22),transparent_32%),linear-gradient(140deg,#ffffff_0%,#fffaf6_100%)] p-8 md:p-12 shadow-[0_16px_45px_rgba(15,23,42,0.08)]">
          <p className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-500">
            Where We Work
          </p>
          <h1 className="mt-5 max-w-4xl text-3xl font-semibold leading-[1.05] text-slate-900 sm:text-4xl md:text-5xl">
            Current healthcare coverage across Nepal
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            Project Sanjeevani currently reports{" "}
            {SANJEEVANI_PUBLIC_STATS.patientsServedText} patients served across{" "}
            {SANJEEVANI_PUBLIC_STATS.campsCompletedText} completed camps in all{" "}
            {SANJEEVANI_PUBLIC_STATS.provincesCoveredText} provinces of Nepal.
            This page turns that footprint into a province-by-province coverage
            map for donors, journalists, and partners reviewing where the
            program is already active.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/sanjeevani/tracking"
              className="inline-flex items-center rounded-full bg-primary-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-600"
            >
              Open Tracking Portal
            </Link>
            <Link
              href="/impact-fact-sheet"
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
            >
              Open Fact Sheet
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-4">
        <div className="max-w-[1320px] mx-auto grid gap-4 md:grid-cols-3">
          {[
            {
              label: "Provinces covered",
              value: `${SANJEEVANI_PUBLIC_STATS.provincesCoveredText}/7`,
              note: "current national footprint",
            },
            {
              label: "District footprint",
              value: provinceCards
                .reduce((sum, province) => sum + province.districts.length, 0)
                .toLocaleString("en-US"),
              note: "districts represented in current camp records",
            },
            {
              label: "Rural municipalities",
              value: SANJEEVANI_PUBLIC_STATS.municipalitiesCoveredText,
              note: "municipalities currently logged in public tracking",
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
        <div className="max-w-[1320px] mx-auto grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {provinceCards.map((province) => (
            <Link
              key={province.slug}
              href={`/healthcare-coverage-nepal/${province.slug}`}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-1 hover:border-primary-200 hover:shadow-[0_16px_35px_rgba(15,23,42,0.08)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-500">
                Province Coverage
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                {province.province}
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Patients
                  </p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">
                    {province.totalPatients.toLocaleString("en-US")}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Camps
                  </p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">
                    {province.campsCompleted.toLocaleString("en-US")}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                Districts served: {province.districts.join(", ")}.
              </p>
              <p className="mt-3 inline-flex text-sm font-medium text-primary-500">
                Open {province.province} coverage →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-4">
        <div className="max-w-[1320px] mx-auto">
          <RelatedContent
            heading="Related Healthcare Pages"
            links={[
              {
                title: "Project Sanjeevani",
                href: "/sanjeevani",
                description:
                  "Overview of the healthcare program behind the province-level coverage footprint.",
              },
              {
                title: "Tracking Portal",
                href: "/sanjeevani/tracking",
                description:
                  "Live operating view of camps, patients served, province coverage, and finance.",
              },
              {
                title: "Health NGO in Nepal",
                href: "/health-ngo-nepal",
                description:
                  "See what makes a rural health organization credible beyond broad mission language.",
              },
              {
                title: "Free Health Camp Nepal",
                href: "/free-health-camp-nepal",
                description:
                  "Understand how a free health camp works from staffing to follow-up.",
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
