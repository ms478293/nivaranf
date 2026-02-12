import Link from "next/link";

const FUND_BREAKDOWN = [
  {
    label: "Healthcare Programs",
    percentage: 70,
    color: "bg-primary-500",
    description: "Health camps, clinics, medical supplies, patient care",
  },
  {
    label: "Education Programs",
    percentage: 15,
    color: "bg-[#FCAC2B]",
    description: "Teacher training, scholarships, school infrastructure",
  },
  {
    label: "Operations & Admin",
    percentage: 10,
    color: "bg-gray-400",
    description: "Staff, logistics, office, compliance",
  },
  {
    label: "Fundraising",
    percentage: 5,
    color: "bg-gray-300",
    description: "Donor outreach and communications",
  },
];

const IMPACT_ITEMS = [
  { amount: "$25", impact: "provides eye care for 5 patients" },
  { amount: "$50", impact: "funds a full day of health camp operations" },
  { amount: "$100", impact: "supplies medicines for 20 families" },
  { amount: "$500", impact: "sponsors a complete community health camp" },
];

const WhereMoneyGoes = () => {
  return (
    <section className="w-full px-4 py-12 bg-white font-Poppins">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Fund Breakdown */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Where Your Money Goes
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              We believe in full transparency. 85% of every dollar goes directly
              to programs that save lives and educate children.
            </p>

            <div className="space-y-4">
              {FUND_BREAKDOWN.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {item.label}
                    </span>
                    <span className="text-sm font-bold text-gray-800">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className={`${item.color} h-3 rounded-full transition-all duration-1000`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Impact Calculator */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Your Impact
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              Every contribution makes a measurable difference in someone&apos;s
              life.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {IMPACT_ITEMS.map((item) => (
                <div
                  key={item.amount}
                  className="border border-gray-200 rounded-xl p-5 hover:border-primary-500 hover:shadow-md transition-all duration-300 group"
                >
                  <p className="text-3xl font-bold text-primary-500 group-hover:scale-110 transition-transform duration-300">
                    {item.amount}
                  </p>
                  <p className="text-gray-700 text-sm mt-2">{item.impact}</p>
                </div>
              ))}
            </div>

            <Link
              href="/donate"
              className="inline-block mt-6 bg-primary-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors duration-300 text-center w-full sm:w-auto"
            >
              Donate Now — Every Dollar Counts
            </Link>
          </div>
        </div>

        {/* EIN & Verification */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500">
              Nivaran Foundation is a registered 501(c)(3) nonprofit
              organization.
            </p>
            <p className="text-sm font-semibold text-gray-700 mt-1">
              EIN: 41-2656587
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Your donation is 100% tax-deductible to the extent allowed by law.
              Verify our status on{" "}
              <a
                href="https://www.irs.gov/charities-non-profits/tax-exempt-organization-search"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 underline hover:text-primary-600"
              >
                IRS.gov
              </a>
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-5 h-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">
                501(c)(3) Verified
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-5 h-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">
                Tax-Deductible
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-5 h-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">
                85% to Programs
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-5 h-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">
                Secure Payments via Square
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhereMoneyGoes;
