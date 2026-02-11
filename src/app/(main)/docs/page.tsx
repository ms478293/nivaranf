import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nivaran Foundation | Financial Reports & Transparency",
  description:
    "View Nivaran Foundation's financial reports, IRS filings, and transparency documents. 501(c)(3) EIN: 99-3919025.",
};

export default function Page() {
  return (
    <div className="py-12 w-full px-4 font-Poppins">
      <div className="max-w-[900px] mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Financial Reports &amp; Transparency
        </h1>
        <p className="text-gray-600 mb-10">
          We believe in full transparency. Below you will find our financial
          documents, IRS filings, and organizational reports. Every donor
          deserves to know exactly how their contribution is used.
        </p>

        {/* Organization Info */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-green-900 mb-3">
            Organization Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
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
              <p className="text-green-900 font-bold">99-3919025</p>
            </div>
            <div>
              <p className="text-green-700 font-medium">Location</p>
              <p className="text-green-900">Boston, Massachusetts, United States</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-green-200">
            <a
              href="https://www.irs.gov/charities-non-profits/tax-exempt-organization-search"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary-500 underline hover:text-primary-600"
            >
              Verify our 501(c)(3) status on IRS.gov
            </a>
          </div>
        </div>

        {/* Fund Allocation */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            How We Use Your Donations
          </h2>
          <div className="space-y-4">
            {[
              {
                label: "Healthcare Programs",
                pct: 70,
                color: "bg-primary-500",
              },
              { label: "Education Programs", pct: 15, color: "bg-[#FCAC2B]" },
              { label: "Operations & Admin", pct: 10, color: "bg-gray-400" },
              { label: "Fundraising", pct: 5, color: "bg-gray-300" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {item.label}
                  </span>
                  <span className="text-sm font-bold text-gray-800">
                    {item.pct}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className={`${item.color} h-3 rounded-full`}
                    style={{ width: `${item.pct}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents - Coming Soon */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Documents &amp; Reports
          </h2>
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
            <svg
              className="w-12 h-12 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Annual Report Coming Soon
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Our first comprehensive annual report will be published here. It
              will include detailed financials, program outcomes, and impact
              metrics.
            </p>
            <p className="text-xs text-gray-400">
              In the meantime, contact us at{" "}
              <a
                href="mailto:partnerships@nivaranfoundation.org"
                className="text-primary-500 underline"
              >
                partnerships@nivaranfoundation.org
              </a>{" "}
              for any financial inquiries.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Have questions about our finances or operations?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-full text-sm font-medium hover:bg-primary-600 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
