import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Financial Responsibility | Nivaran Foundation",
  description:
    "How Nivaran Foundation applies financial responsibility across planning, allocation, controls, and reporting.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/financial-responsibility",
  },
};

const responsibilityAreas = [
  {
    title: "Budget Discipline",
    text: "Program budgets are planned against implementation scope and reviewed against actual field execution to reduce variance and waste.",
  },
  {
    title: "Fund Allocation",
    text: "Funds are allocated by mission priorities with emphasis on healthcare and community-facing impact while preserving operational continuity.",
  },
  {
    title: "Controls & Approvals",
    text: "Financial transactions follow layered approval and documentation requirements to strengthen internal control and traceability.",
  },
  {
    title: "Review & Correction",
    text: "Operating and financial performance is reviewed regularly, and corrective actions are applied when spending or execution drifts from plan.",
  },
];

export default function FinancialResponsibilityPage() {
  return (
    <main className="w-full px-4 py-12 font-Poppins">
      <section className="max-w-[1000px] mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Financial Responsibility
        </h1>
        <p className="text-gray-600 mt-4 leading-7">
          Financial responsibility at Nivaran Foundation is built on planning,
          control, and accountability. This page explains the principles used
          to protect donor trust and ensure funds are used for mission outcomes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {responsibilityAreas.map((area) => (
            <article
              key={area.title}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <h2 className="text-lg font-semibold text-gray-900">{area.title}</h2>
              <p className="text-sm text-gray-600 mt-2 leading-6">{area.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Accountability in Practice
          </h2>
          <p className="text-sm text-gray-600 mt-3 leading-6">
            Financial responsibility is not limited to bookkeeping. It includes
            clear scope definition, documented approvals, routine review, and
            responsive correction so that resources remain aligned with
            beneficiary needs.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Link
              href="/financial-reports"
              className="px-4 py-2 rounded-full bg-primary-500 text-white text-sm"
            >
              View Financial Reports
            </Link>
            <Link
              href="/accountability-and-transparency"
              className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:border-primary-500"
            >
              Accountability &amp; Transparency
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
