import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import MainTitle from "@/components/new/MainTitle/MainTitle";
import { RelatedContent } from "@/components/new/RelatedContent/RelatedContent";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Advisory Board | Nivaran Foundation",
  description:
    "How Nivaran Foundation is structuring medical, public health, education, and governance advisory support for program quality and institutional accountability.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/advisory-board",
  },
  openGraph: {
    title: "Advisory Board | Nivaran Foundation",
    description:
      "A public overview of the expertise, governance role, and review priorities for Nivaran Foundation's advisory network.",
    url: "https://www.nivaranfoundation.org/advisory-board",
    siteName: "Nivaran Foundation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Advisory Board | Nivaran Foundation",
    description:
      "Medical, public health, education, and governance advisory support for Nivaran Foundation.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

const expertiseAreas = [
  {
    title: "Clinical Quality",
    body:
      "Review standards of care, clinical safety, referral discipline, and the practical realities of field delivery in rural settings.",
  },
  {
    title: "Public Health Strategy",
    body:
      "Guide screening logic, prevention priorities, outreach design, and how community trust affects actual healthcare uptake.",
  },
  {
    title: "Maternal & Child Health",
    body:
      "Strengthen program thinking around first-contact care, continuity, follow-up, and high-risk populations that need tighter care pathways.",
  },
  {
    title: "Education & Community Systems",
    body:
      "Support the education side of Nivaran's mission and help connect service delivery to longer-term community capacity building.",
  },
  {
    title: "Finance, Risk & Compliance",
    body:
      "Bring external scrutiny to donor accountability, conflict management, transparency practices, and governance discipline.",
  },
  {
    title: "Partnerships & Scale",
    body:
      "Pressure-test how programs grow, how partnerships are framed, and how institutional credibility is maintained as visibility increases.",
  },
];

const advisoryResponsibilities = [
  "Review program design assumptions before scale decisions are made.",
  "Provide technical feedback on healthcare quality, training, and patient-safety practices.",
  "Challenge unclear claims, weak evidence, or reporting gaps before they become public risk.",
  "Support diligence conversations with partners, funders, and institutional stakeholders.",
  "Help align field realities with long-term strategy across healthcare and education.",
];

const operatingBaseline = [
  {
    label: "Qualified teams",
    body:
      "Nivaran states that healthcare delivery is carried out with qualified medical professionals rather than awareness-only programming.",
  },
  {
    label: "Training & quality control",
    body:
      "Public FAQ references ongoing training, quality control measures, and monitoring of patient outcomes as part of service quality.",
  },
  {
    label: "Conflict disclosure",
    body:
      "Nivaran publicly states that staff, board members, and volunteers are required to disclose potential conflicts of interest.",
  },
  {
    label: "Safeguarding expectation",
    body:
      "The site already states a zero-tolerance position on exploitation and abuse, plus training and reporting mechanisms.",
  },
];

const advisoryFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the role of the advisory board at Nivaran Foundation?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The advisory board is intended to provide external technical judgment across healthcare quality, public health strategy, education, governance, risk, and scale planning. It supports review and challenge, not ceremonial endorsement.",
      },
    },
    {
      "@type": "Question",
      name: "Is the advisory board already fully formed?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. Nivaran Foundation is still building its advisory network. This page exists so partners and prospective advisors can understand the expertise areas, operating expectations, and governance context before that network is finalized.",
      },
    },
    {
      "@type": "Question",
      name: "What expertise is Nivaran Foundation seeking?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Priority expertise includes clinical governance, public health, maternal and child health, education systems, nonprofit finance, compliance, and organizational scale.",
      },
    },
  ],
};

const expertiseSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Nivaran Foundation Advisory Priorities",
  itemListElement: expertiseAreas.map((area, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: area.title,
    description: area.body,
  })),
};

export default function AdvisoryBoardPage() {
  return (
    <main className="w-full px-4 py-12 font-Poppins">
      <script
        id="Advisory-FAQ-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(advisoryFaqSchema) }}
      />
      <script
        id="Advisory-Expertise-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(expertiseSchema) }}
      />

      <section className="max-w-[1320px] mx-auto">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Advisory Board" },
          ]}
        />

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <MainTitle
              suffix="Advisory"
              prefix="Board"
              as="h1"
              className="max-w-[640px]"
            />
            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-600">
              This page explains how Nivaran Foundation is structuring external
              advisory support across healthcare, education, governance, risk,
              and institutional accountability.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-gray-600">
              The advisory network is still being assembled. Until it is
              finalized, this page serves as the public reference for the kinds
              of expertise we seek, the standards advisors are expected to
              pressure-test, and the governance questions we want reviewed with
              seriousness.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact-us"
                className="inline-flex min-h-[44px] items-center rounded-full bg-primary-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-primary-600"
              >
                Express Interest
              </Link>
              <Link
                href="/leadership"
                className="inline-flex min-h-[44px] items-center rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-800 transition hover:border-primary-500 hover:text-primary-500"
              >
                Review Leadership & Governance
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <article className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Status
              </p>
              <p className="mt-3 text-xl font-semibold text-gray-900">
                Advisory recruitment in progress
              </p>
            </article>
            <article className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Focus
              </p>
              <p className="mt-3 text-xl font-semibold text-gray-900">
                Healthcare, education, risk, and governance
              </p>
            </article>
            <article className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Use case
              </p>
              <p className="mt-3 text-xl font-semibold text-gray-900">
                Partner diligence and technical review
              </p>
            </article>
            <article className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Contact path
              </p>
              <p className="mt-3 text-xl font-semibold text-gray-900">
                partnerships@nivaranfoundation.org
              </p>
            </article>
          </div>
        </div>

        <section className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Why this page exists
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <p className="text-sm leading-7 text-gray-600">
              Advisory pages often become vague placeholders. That is not the
              goal here. This page is meant to show what Nivaran expects
              external advisors to challenge: care quality, reporting
              discipline, governance clarity, and whether public-facing claims
              match operational reality.
            </p>
            <p className="text-sm leading-7 text-gray-600">
              It is also a practical route for funders, institutions, and
              prospective advisors who want to understand where technical review
              fits inside the organization before deeper diligence or formal
              engagement begins.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">
            Advisory expertise priorities
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600">
            These are the core areas where Nivaran wants informed outside
            judgment, especially as visibility, fundraising, and program
            ambition increase.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {expertiseAreas.map((area) => (
              <article
                key={area.title}
                className="rounded-2xl border border-gray-200 bg-white p-5"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {area.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {area.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              What advisors are expected to do
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-gray-600">
              {advisoryResponsibilities.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-primary-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Current operating baseline
            </h2>
            <div className="mt-4 space-y-4">
              {operatingBaseline.map((item) => (
                <article key={item.label}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Current governance context
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <article className="rounded-xl bg-gray-50 p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">
                Board and leadership
              </h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                Public board, program, finance, fundraising, operations, and
                communications roles are listed on the leadership page for basic
                institutional verification.
              </p>
            </article>
            <article className="rounded-xl bg-gray-50 p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">
                Reporting routes
              </h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                Financial reporting, accountability references, and the press
                kit already provide public diligence entry points for external
                review.
              </p>
            </article>
            <article className="rounded-xl bg-gray-50 p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">
                Advisory fit
              </h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                Advisory support should add discipline and judgment around
                quality, scale, and credibility. It should not duplicate basic
                management functions already owned by the internal team.
              </p>
            </article>
          </div>
        </section>

        <RelatedContent
          heading="Trust & Verification"
          links={[
            {
              title: "Leadership & Governance",
              href: "/leadership",
              description:
                "Public directory of board, management, and operational leadership.",
            },
            {
              title: "Financial Reports",
              href: "/financial-reports",
              description:
                "Reporting status, compliance references, and donor diligence links.",
            },
            {
              title: "Accountability & Transparency",
              href: "/accountability-and-transparency",
              description:
                "How disclosure, reporting, and public accountability are described.",
            },
            {
              title: "Press & Media Kit",
              href: "/press",
              description:
                "Background materials, fact sheet access, and media-facing organizational context.",
            },
            {
              title: "Healthcare Programs",
              href: "/programs/health",
              description:
                "See the healthcare delivery context advisory review is meant to strengthen.",
            },
            {
              title: "Care Model & Quality Standards",
              href: "/care-model",
              description:
                "Public reference for quality control, referral boundaries, and care delivery expectations.",
            },
            {
              title: "Contact Us",
              href: "/contact-us",
              description:
                "Use the formal contact route for advisory, diligence, or institutional inquiries.",
            },
          ]}
          className="mt-10"
        />
      </section>
    </main>
  );
}
