import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import { RelatedContent } from "@/components/new/RelatedContent/RelatedContent";
import {
  SANJEEVANI_PUBLIC_COPY,
  SANJEEVANI_PUBLIC_STATS,
} from "@/content/sanjeevani-public-stats";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nivaran Foundation Fact Sheet | Healthcare NGO in Nepal",
  description:
    "A citation-ready fact sheet with Nivaran Foundation's organization profile, current Sanjeevani metrics, healthcare footprint, transparency links, and media or partner contact details.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/impact-fact-sheet",
  },
  keywords: [
    "Nivaran Foundation fact sheet",
    "health NGO Nepal facts",
    "Project Sanjeevani facts",
    "mobile health camps Nepal data",
    "Nivaran media kit",
  ],
  openGraph: {
    title: "Nivaran Foundation Fact Sheet | Healthcare NGO in Nepal",
    description:
      "Use a citation-ready overview of Nivaran Foundation's mission, current healthcare metrics, and transparency resources.",
    url: "https://www.nivaranfoundation.org/impact-fact-sheet",
    type: "website",
    siteName: "Nivaran Foundation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nivaran Foundation Fact Sheet | Healthcare NGO in Nepal",
    description:
      "Organization profile, current healthcare metrics, and contact details for journalists, partners, and researchers.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

const snapshotCards = [
  { label: "Founded", value: "2020", note: "501(c)(3) nonprofit organization" },
  { label: "Patients served", value: SANJEEVANI_PUBLIC_STATS.patientsServedText, note: "current verified cumulative total" },
  { label: "Health camps", value: SANJEEVANI_PUBLIC_STATS.campsCompletedText, note: "completed Project Sanjeevani camps" },
  { label: "Provinces covered", value: `${SANJEEVANI_PUBLIC_STATS.provincesCoveredText}/7`, note: "current national footprint" },
  { label: "Rural municipalities", value: SANJEEVANI_PUBLIC_STATS.municipalitiesCoveredText, note: "current coverage recorded" },
  { label: "Investment so far", value: SANJEEVANI_PUBLIC_STATS.investmentSoFarText, note: "tracked variable spend to date" },
];

const referenceLinks = [
  {
    title: "Project Sanjeevani",
    href: "/sanjeevani",
    description: "Overview of the flagship mobile healthcare initiative.",
  },
  {
    title: "Tracking Portal",
    href: "/sanjeevani/tracking",
    description: "Live operating metrics, camp activity, coverage, and finance view.",
  },
  {
    title: "Press & Media Kit",
    href: "/press",
    description: "Brand assets, media contact, and quick facts for journalists.",
  },
  {
    title: "Financial Reports",
    href: "/financial-reports",
    description: "Transparency and reporting references for donors and partners.",
  },
  {
    title: "Corporate Partnerships",
    href: "/corporate",
    description: "CSR and institutional partnership pathways for implementation support.",
  },
  {
    title: "Health NGO in Nepal",
    href: "/health-ngo-nepal",
    description: "A clearer explanation of what credible rural health execution requires.",
  },
];

export default function ImpactFactSheetPage() {
  return (
    <main className="font-Poppins pb-16">
      <div className="max-w-[1320px] mx-auto px-4 pt-2">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Impact Fact Sheet" },
          ]}
        />
      </div>

      <section className="px-4 py-8 md:py-12">
        <div className="max-w-[1320px] mx-auto rounded-[32px] border border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(115,199,208,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(242,162,134,0.2),transparent_32%),linear-gradient(140deg,#ffffff_0%,#fffaf6_100%)] p-8 md:p-12 shadow-[0_16px_45px_rgba(15,23,42,0.08)]">
          <p className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-500">
            Citation-Ready Summary
          </p>
          <h1 className="mt-5 max-w-4xl text-3xl font-semibold leading-[1.05] text-slate-900 sm:text-4xl md:text-5xl">
            Nivaran Foundation fact sheet for media, partners, and due diligence
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            This page gives journalists, funders, partners, and researchers a
            clean reference point for who Nivaran Foundation is, what Project
            Sanjeevani currently covers, and where to verify the latest public
            program information.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/press"
              className="inline-flex items-center rounded-full bg-primary-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-600"
            >
              Open Press Kit
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
        <div className="max-w-[1320px] mx-auto grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {snapshotCards.map((card) => (
            <article
              key={card.label}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                {card.label}
              </p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                {card.value}
              </p>
              <p className="mt-2 text-sm text-slate-500">{card.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="max-w-[1320px] mx-auto grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
            <h2 className="text-2xl font-semibold text-slate-900">
              Organization profile
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
              <p>
                Nivaran Foundation is a 501(c)(3) nonprofit founded in 2020 and
                focused on healthcare and education delivery for underserved
                communities in Nepal.
              </p>
              <p>
                Its flagship healthcare initiative, Project Sanjeevani, uses
                mobile health camps to reduce first-contact barriers where fixed
                care access is limited. {SANJEEVANI_PUBLIC_COPY.summaryWithMunicipalities}
              </p>
              <p>
                Public-facing program references, media resources, and
                transparency pages are maintained so that donors, partners, and
                journalists can review current claims against active routes
                rather than outdated summaries.
              </p>
            </div>
          </div>
          <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-semibold text-slate-900">
              Reference details
            </h2>
            <dl className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <div>
                <dt className="font-semibold text-slate-900">Legal name</dt>
                <dd>Nivaran Foundation</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Tax status</dt>
                <dd>501(c)(3) nonprofit</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">EIN</dt>
                <dd>41-2656587</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Media / partnership email</dt>
                <dd>
                  <a
                    href="mailto:partnerships@nivaranfoundation.org"
                    className="text-primary-500 hover:underline"
                  >
                    partnerships@nivaranfoundation.org
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Primary healthcare program</dt>
                <dd>Project Sanjeevani</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="px-4 py-4">
        <div className="max-w-[1320px] mx-auto rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
          <h2 className="text-2xl font-semibold text-slate-900">
            How to cite or reference Nivaran
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-base font-semibold text-slate-900">
                Journalists
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use the press kit for logos, quick facts, and approved
                organization details. Link to the tracking portal when citing
                current healthcare rollout numbers.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-base font-semibold text-slate-900">
                Partners
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use the corporate, transparency, and financial routes for due
                diligence, partnership framing, and governance review.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-base font-semibold text-slate-900">
                Researchers
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use topic pages on rural healthcare, mobile camps, and maternal
                health for searchable background context that links back to the
                active program and reporting routes.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-4 py-4">
        <div className="max-w-[1320px] mx-auto">
          <RelatedContent heading="Reference Links" links={referenceLinks} />
        </div>
      </section>
    </main>
  );
}
