import type { Metadata } from "next";
import { RelatedContent } from "@/components/new/RelatedContent/RelatedContent";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accountability & Transparency | Nivaran Foundation",
  description:
    "How Nivaran Foundation approaches accountability and transparency through governance, reporting, and disclosure commitments.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/accountability-and-transparency",
  },
  openGraph: {
    title: "Accountability & Transparency | Nivaran Foundation",
    description: "Governance, reporting, and disclosure commitments at Nivaran Foundation.",
    url: "https://www.nivaranfoundation.org/accountability-and-transparency",
    siteName: "Nivaran Foundation",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Accountability & Transparency | Nivaran Foundation",
    description: "Nivaran Foundation's approach to accountability and transparency.",
    site: "@NivaranOrg",
  },
};

const accountabilityCards = [
  {
    title: "Program Verification",
    text: "Program execution is documented through district records, field logs, partner coordination notes, and internal review cycles tied to mission outcomes.",
  },
  {
    title: "Financial Disclosure",
    text: "Financial records are maintained for traceability, with disclosure pathways for donors, partners, and compliance-oriented review requests.",
  },
  {
    title: "Operational Integrity",
    text: "Decision making is expected to align with beneficiary needs, legal obligations, and responsible use of funds without mission drift.",
  },
];

export default function AccountabilityAndTransparencyPage() {
  return (
    <main className="w-full px-4 py-12 font-Poppins">
      <section className="max-w-[1000px] mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Accountability &amp; Transparency
        </h1>
        <p className="text-gray-600 mt-4 leading-7">
          Accountability is an operating requirement at Nivaran Foundation.
          This page outlines how transparency is built into governance,
          reporting, and day-to-day program execution.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {accountabilityCards.map((card) => (
            <article
              key={card.title}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <h2 className="text-lg font-semibold text-gray-900">{card.title}</h2>
              <p className="text-sm text-gray-600 mt-2 leading-6">{card.text}</p>
            </article>
          ))}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Disclosure Commitment
          </h2>
          <p className="text-sm text-gray-600 mt-3 leading-6">
            We maintain direct access routes for governance and financial
            information through dedicated pages. If you need documentation
            beyond published materials, use the contact channel for a formal
            request.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Link
              href="/financial-reports"
              className="px-4 py-2 rounded-full bg-primary-500 text-white text-sm"
            >
              Open Financial Reports
            </Link>
            <Link
              href="/contact-us"
              className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:border-primary-500"
            >
              Request Information
            </Link>
            <Link
              href="/financial-responsibility"
              className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:border-primary-500"
            >
              Financial Responsibility
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            How public diligence should work
          </h2>
          <div className="mt-3 space-y-4 text-sm leading-6 text-gray-600">
            <p>
              A trustworthy nonprofit should make its leadership, reporting
              routes, core program logic, and current operating claims
              inspectable without forcing every partner into a private diligence
              process.
            </p>
            <p>
              At Nivaran Foundation, that public diligence surface now includes
              the leadership directory, financial reporting route, impact fact
              sheet, care-model page, and Sanjeevani tracking portal. The goal
              is to reduce ambiguity, not hide behind mission language.
            </p>
            <p>
              When something is still in preparation, it should be stated
              clearly. When a metric is current, it should match the shared
              source of truth used across the website. That is the standard we
              are working toward across every public route.
            </p>
          </div>
        </div>

        <RelatedContent
          heading="Supporting Reference Pages"
          links={[
            {
              title: "Leadership & Governance",
              href: "/leadership",
              description:
                "Public directory of board, program, operations, and fundraising leadership.",
            },
            {
              title: "Financial Reports",
              href: "/financial-reports",
              description:
                "Read reporting status, organization details, and request pathways.",
            },
            {
              title: "Press & Media Kit",
              href: "/press",
              description:
                "Quick facts, brand assets, and media contact details for external coverage.",
            },
            {
              title: "Nivaran Fact Sheet",
              href: "/impact-fact-sheet",
              description:
                "A citation-ready summary for partners, journalists, and due diligence teams.",
            },
          ]}
        />
      </section>
    </main>
  );
}
