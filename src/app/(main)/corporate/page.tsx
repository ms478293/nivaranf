import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Corporate | Nivaran Foundation",
  description:
    "Corporate overview of Nivaran Foundation, including legal status, governance model, and operating footprint.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/corporate",
  },
};

const corporateBlocks = [
  {
    title: "Legal Entity",
    text: "Nivaran Foundation is organized as a 501(c)(3) nonprofit and operates with documented governance, compliance, and reporting responsibilities.",
  },
  {
    title: "Operating Footprint",
    text: "Program operations are led in Nepal with support functions in the United States, aligning implementation, partnerships, and accountability across both regions.",
  },
  {
    title: "Governance Direction",
    text: "Strategic priorities are reviewed through mission impact, financial discipline, field feasibility, and beneficiary-centered decision making.",
  },
];

export default function CorporatePage() {
  return (
    <main className="w-full px-4 py-12 font-Poppins">
      <section className="max-w-[1000px] mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Corporate
        </h1>
        <p className="text-gray-600 mt-4 leading-7">
          This page provides a direct corporate overview of Nivaran Foundation.
          It exists as a dedicated reference for structure, governance, and
          organizational accountability.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {corporateBlocks.map((block) => (
            <article
              key={block.title}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                {block.title}
              </h2>
              <p className="text-sm text-gray-600 mt-2 leading-6">{block.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-primary-100 bg-primary-50 p-6">
          <h2 className="text-xl font-semibold text-gray-900">Corporate Navigation</h2>
          <p className="text-sm text-gray-600 mt-2">
            For governance and disclosure details, use the direct links below.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <Link
              href="/accountability-and-transparency"
              className="px-4 py-2 rounded-full bg-white border border-gray-300 text-sm hover:border-primary-500"
            >
              Accountability &amp; Transparency
            </Link>
            <Link
              href="/financial-reports"
              className="px-4 py-2 rounded-full bg-white border border-gray-300 text-sm hover:border-primary-500"
            >
              Financial Reports
            </Link>
            <Link
              href="/financial-responsibility"
              className="px-4 py-2 rounded-full bg-white border border-gray-300 text-sm hover:border-primary-500"
            >
              Financial Responsibility
            </Link>
            <Link
              href="/contact-us"
              className="px-4 py-2 rounded-full bg-white border border-gray-300 text-sm hover:border-primary-500"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
