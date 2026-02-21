import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Financial Reports | Nivaran Foundation",
  description:
    "Access Nivaran Foundation financial reporting details, organization information, and report request pathways.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/financial-reports",
  },
};

const reportTimeline = [
  {
    title: "Annual Financial Report",
    status: "In preparation",
    detail:
      "Comprehensive annual reporting package with revenue, program allocations, and operating expenses.",
  },
  {
    title: "Program Expenditure Summary",
    status: "In preparation",
    detail:
      "District-level program spending summaries aligned to approved implementation plans.",
  },
  {
    title: "Compliance Documentation",
    status: "Available on request",
    detail:
      "Supporting compliance and organizational documentation can be provided through direct inquiry.",
  },
];

export default function FinancialReportsPage() {
  return (
    <main className="w-full px-4 py-12 font-Poppins">
      <section className="max-w-[1000px] mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Financial Reports
        </h1>
        <p className="text-gray-600 mt-4 leading-7">
          This page is the dedicated route for financial reporting references.
          It centralizes organization details, report status, and request
          channels for donors, partners, and compliance review.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-8">
          <h2 className="text-lg font-semibold text-green-900 mb-3">
            Organization Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-green-700 font-medium">Legal Name</p>
              <p className="text-green-900">Nivaran Foundation</p>
            </div>
            <div>
              <p className="text-green-700 font-medium">Tax Status</p>
              <p className="text-green-900">501(c)(3) Tax-Exempt</p>
            </div>
            <div>
              <p className="text-green-700 font-medium">EIN</p>
              <p className="text-green-900 font-semibold">41-2656587</p>
            </div>
            <div>
              <p className="text-green-700 font-medium">Head Office</p>
              <p className="text-green-900">
                1025 Massachusetts Ave, Suite 303, Arlington, MA 02476
              </p>
            </div>
          </div>
          <a
            href="https://www.irs.gov/charities-non-profits/tax-exempt-organization-search"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-sm text-primary-500 underline hover:text-primary-600"
          >
            Verify our tax-exempt status on IRS.gov
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4">
          {reportTimeline.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h2>
                <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                  {item.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2 leading-6">{item.detail}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Need a Specific Report?
          </h2>
          <p className="text-sm text-gray-600 mt-3 leading-6">
            For report requests or due diligence documentation, contact our team
            with the report type and intended use. We will respond through the
            official partnership channel.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Link
              href="/contact-us"
              className="px-4 py-2 rounded-full bg-primary-500 text-white text-sm"
            >
              Contact Us
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
