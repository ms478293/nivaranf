import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accountability & Transparency | Nivaran Foundation",
  description:
    "How Nivaran Foundation approaches accountability and transparency through governance, reporting, and disclosure commitments.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/accountability-and-transparency",
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
      </section>
    </main>
  );
}
