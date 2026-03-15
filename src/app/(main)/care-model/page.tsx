import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import MainTitle from "@/components/new/MainTitle/MainTitle";
import { RelatedContent } from "@/components/new/RelatedContent/RelatedContent";
import {
  SANJEEVANI_PUBLIC_COPY,
  SANJEEVANI_PUBLIC_STATS,
} from "@/content/sanjeevani-public-stats";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Care Model & Quality Standards | Nivaran Foundation",
  description:
    "How Nivaran Foundation describes its outreach healthcare delivery model in Nepal, including qualified teams, training, screening, referral discipline, quality control, and safeguarding expectations.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/care-model",
  },
  openGraph: {
    title: "Care Model & Quality Standards | Nivaran Foundation",
    description:
      "A public reference for how Nivaran Foundation approaches healthcare delivery quality, referral discipline, training, and safeguarding in Project Sanjeevani.",
    url: "https://www.nivaranfoundation.org/care-model",
    siteName: "Nivaran Foundation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Care Model & Quality Standards | Nivaran Foundation",
    description:
      "Public care-model and quality reference for Project Sanjeevani and Nivaran Foundation's outreach healthcare work in Nepal.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

const careModelSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does Nivaran Foundation describe its healthcare delivery model?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Nivaran Foundation describes a mobile outreach model centered on community coordination, field screening, clinical review, basic medicine support, and referral pathways for cases that need higher-level care.",
      },
    },
    {
      "@type": "Question",
      name: "What public quality commitments does Nivaran Foundation make?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Public site content states that care is delivered with qualified medical professionals, ongoing training, quality control measures, patient-outcome monitoring, safeguarding practices, and conflict-of-interest disclosure requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Does Nivaran Foundation present mobile camps as a replacement for the hospital system?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. The outreach model is presented as a first-contact and access-bridging mechanism, not as a substitute for permanent hospitals, specialty care, or long-term continuity systems.",
      },
    },
  ],
};

const operatingSteps = [
  {
    title: "Community coordination",
    body:
      "Healthcare delivery starts before a camp day. Site selection, local coordination, scheduling, and outreach all shape whether care actually reaches the intended community.",
  },
  {
    title: "Registration and first-contact screening",
    body:
      "A field camp works as an access point. Patients are registered, screened, and routed through the camp flow so basic clinical demand is surfaced in a structured way.",
  },
  {
    title: "Clinical review and basic treatment support",
    body:
      "Project Sanjeevani is publicly described as delivering free screenings, maternal-care support, disease-prevention services, and basic medicine/checkup support through qualified medical teams.",
  },
  {
    title: "Referral discipline",
    body:
      "Not every case can or should be resolved in a mobile camp. Higher-risk or more complex cases must be escalated through referral pathways rather than over-claimed as field resolution.",
  },
];

const qualityStandards = [
  {
    title: "Qualified medical professionals",
    body:
      "The public FAQ states that healthcare services are delivered with qualified medical professionals rather than awareness-only activity.",
  },
  {
    title: "Ongoing training",
    body:
      "Nivaran publicly states that staff and volunteers receive training, including healthcare-worker training, role-specific preparation, and ongoing support.",
  },
  {
    title: "Quality control and outcome monitoring",
    body:
      "The current public position references quality control measures and monitoring of patient outcomes as part of service-quality discipline.",
  },
  {
    title: "Safeguarding and dignity",
    body:
      "The site states a zero-tolerance position on exploitation and abuse, along with safeguarding measures, reporting mechanisms, and respectful treatment expectations.",
  },
  {
    title: "Conflict disclosure",
    body:
      "Public governance language states that staff, board members, and volunteers are expected to disclose potential conflicts of interest.",
  },
  {
    title: "Operational transparency",
    body:
      "The live tracking portal, province coverage pages, financial reports, and leadership/governance pages create a public diligence surface around the care model.",
  },
];

const boundaries = [
  "A mobile camp is not a substitute for permanent hospitals, specialist care, or year-round continuity of care.",
  "Basic medicine or screening cost should not be confused with the fully loaded operating cost of the program.",
  "Emergency support may be possible in some contexts, but it is not the baseline promise of the routine outreach model.",
  "A credible outreach model depends on referral judgment, logistics quality, and follow-up discipline, not just camp-day volume.",
];

const verificationLinks = [
  {
    title: "Sanjeevani Tracking Portal",
    href: "/sanjeevani/tracking",
    description:
      "Live program metrics, verified camp history, coverage, and operating data.",
  },
  {
    title: "Leadership & Governance",
    href: "/leadership",
    description:
      "Public directory of board, management, and organizational leadership.",
  },
  {
    title: "Advisory Board",
    href: "/advisory-board",
    description:
      "How external technical and governance review is being structured.",
  },
  {
    title: "Financial Reports",
    href: "/financial-reports",
    description:
      "Reporting and diligence references connected to public trust.",
  },
  {
    title: "Accountability & Transparency",
    href: "/accountability-and-transparency",
    description:
      "How Nivaran explains disclosure, reporting, and operational accountability.",
  },
  {
    title: "Press & Media Kit",
    href: "/press",
    description:
      "Background, fact sheet, and citation-ready organization context.",
  },
];

export default function CareModelPage() {
  return (
    <main className="w-full px-4 py-12 font-Poppins">
      <script
        id="Care-Model-FAQ-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(careModelSchema) }}
      />

      <section className="max-w-[1320px] mx-auto">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Programs", href: "/programs/health" },
            { label: "Care Model" },
          ]}
        />

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <MainTitle
              suffix="Care Model &"
              prefix="Quality Standards"
              as="h1"
              className="max-w-[760px]"
            />
            <p className="mt-5 max-w-3xl text-base leading-8 text-gray-600">
              This page is the public reference for how Nivaran Foundation
              describes healthcare delivery quality inside Project Sanjeevani.
              It exists so partners, donors, journalists, and advisors can see
              the operating logic behind the outreach model rather than relying
              on generic nonprofit language.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-gray-600">
              Today, Sanjeevani has {SANJEEVANI_PUBLIC_STATS.campsCompletedText.toLowerCase()} and{" "}
              {SANJEEVANI_PUBLIC_STATS.patientsServedText.toLowerCase()} across{" "}
              {SANJEEVANI_PUBLIC_STATS.provincesCoveredText}. The care model is
              designed to bridge first-contact access gaps while maintaining a
              disciplined view of what mobile camps can and cannot responsibly
              do.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/sanjeevani/tracking"
                className="inline-flex min-h-[44px] items-center rounded-full bg-primary-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-primary-600"
              >
                Open Tracking Portal
              </Link>
              <Link
                href="/advisory-board"
                className="inline-flex min-h-[44px] items-center rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-800 transition hover:border-primary-500 hover:text-primary-500"
              >
                Review Advisory Context
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <article className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Patients served
              </p>
              <p className="mt-3 text-xl font-semibold text-gray-900">
                {SANJEEVANI_PUBLIC_STATS.patientsServedText}
              </p>
            </article>
            <article className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Verified camps
              </p>
              <p className="mt-3 text-xl font-semibold text-gray-900">
                {SANJEEVANI_PUBLIC_STATS.campsCompletedText}
              </p>
            </article>
            <article className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Coverage
              </p>
              <p className="mt-3 text-xl font-semibold text-gray-900">
                {SANJEEVANI_PUBLIC_STATS.provincesCoveredText}
              </p>
            </article>
            <article className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Public summary
              </p>
              <p className="mt-3 text-sm leading-7 text-gray-700">
                {SANJEEVANI_PUBLIC_COPY.summaryWithMunicipalities}
              </p>
            </article>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">
            How the care model works
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600">
            The outreach model is best understood as an access-and-triage
            system: it brings first-contact care closer to remote communities,
            surfaces unmet need, and routes cases forward when field resolution
            is not enough.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {operatingSteps.map((step) => (
              <article
                key={step.title}
                className="rounded-2xl border border-gray-200 bg-white p-5"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Public quality standards
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {qualityStandards.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-5"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              What this model is not
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-gray-600">
              {boundaries.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-primary-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Why the model matters in rural Nepal
            </h2>
            <p className="mt-4 text-sm leading-7 text-gray-600">
              In many rural settings, the first problem is not specialist
              treatment. It is delay. Distance, transport cost, lost wages, and
              the absence of routine first-contact care push diagnosis and
              treatment later than they should be.
            </p>
            <p className="mt-4 text-sm leading-7 text-gray-600">
              The Sanjeevani model exists to reduce that delay. It brings
              screening, counseling, and early clinical contact closer to the
              village while making it clearer which cases require referral or
              continuity beyond the camp itself.
            </p>
          </div>
        </section>

        <RelatedContent
          heading="Verification & Related Pages"
          links={verificationLinks}
          className="mt-10"
        />
      </section>
    </main>
  );
}
