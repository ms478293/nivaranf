import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import { PageTitle } from "@/components/new/PageTitle/PageTitle";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ways to Give | Nivaran Foundation — Donate, Volunteer, Match",
  description:
    "Explore all the ways to support Nivaran Foundation: one-time gifts, recurring donations, employer matching, stock donations, volunteer time, and corporate partnerships. 501(c)(3) tax-deductible.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/ways-to-give",
  },
  openGraph: {
    title: "Ways to Give | Nivaran Foundation",
    description:
      "Support Nivaran Foundation through donations, employer matching, stock gifts, volunteering, and partnerships.",
    url: "https://www.nivaranfoundation.org/ways-to-give",
    type: "website",
    siteName: "Nivaran Foundation",
    images: [
      {
        url: "https://www.nivaranfoundation.org/logo.png",
        width: 1200,
        height: 665,
        alt: "Nivaran Foundation Ways to Give",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ways to Give | Nivaran Foundation",
    description: "Explore all ways to support Nivaran Foundation.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

const GIVING_METHODS = [
  {
    title: "One-Time Donation",
    icon: "💝",
    description:
      "Make a single tax-deductible gift of any amount. 96% of every dollar goes directly to healthcare and education programs in Nepal.",
    cta: "Donate Now",
    href: "/donate",
    highlight: true,
  },
  {
    title: "Monthly Recurring Gift",
    icon: "🔄",
    description:
      "Set up a recurring monthly donation to provide sustained funding for health camps. Monthly donors enable us to plan multi-year projects with confidence.",
    cta: "Start Monthly Giving",
    href: "/donate",
    highlight: true,
  },
  {
    title: "Employer Matching",
    icon: "🏢",
    description:
      "Many employers match charitable donations, effectively doubling your impact at no extra cost. Check with your HR department or use Double the Donation to find out if your company matches.",
    cta: "Learn More",
    href: "https://doublethedonation.com",
    external: true,
  },
  {
    title: "Volunteer Your Time",
    icon: "🤝",
    description:
      "Contribute your skills — in the field in Nepal or remotely. Healthcare professionals, educators, designers, writers, and technologists are all welcome.",
    cta: "See Opportunities",
    href: "/volunteer",
  },
  {
    title: "Corporate Partnership",
    icon: "🏗️",
    description:
      "Partner with Nivaran Foundation through CSR programs, co-branded campaigns, employee engagement events, or project sponsorships. We customize partnerships to your goals.",
    cta: "Contact Us",
    href: "/contact-us",
  },
  {
    title: "Stock or Asset Donation",
    icon: "📈",
    description:
      "Donate appreciated securities, stocks, or other assets for potential tax advantages. Contact us to arrange a stock transfer to Nivaran Foundation.",
    cta: "Contact Us",
    href: "/contact-us",
  },
  {
    title: "Planned / Legacy Giving",
    icon: "📜",
    description:
      "Include Nivaran Foundation in your will, trust, or estate plan. Legacy gifts create lasting impact for generations of Nepali communities.",
    cta: "Contact Us",
    href: "/contact-us",
  },
  {
    title: "Fundraise on Our Behalf",
    icon: "🎉",
    description:
      "Organize a local event, birthday fundraiser, or social media campaign to raise funds for Nivaran's programs. We provide resources and support to make it easy.",
    cta: "Organize Locally",
    href: "/organize-locally",
  },
];

export default function WaysToGivePage() {
  return (
    <main className="font-Poppins w-full pb-16">
      <div className="max-w-[1320px] mx-auto px-4 pt-2">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Ways to Give" }]} />
      </div>

      {/* Hero */}
      <section className="w-full px-4 py-8 md:py-12">
        <div className="max-w-[1320px] mx-auto">
          <PageTitle prefix="Ways to" suffix="Support Our Mission" />
          <p className="mt-4 text-gray-600 max-w-2xl">
            There are many ways to support Nivaran Foundation beyond a standard online donation. Whether through your wallet, your time, or your workplace — every contribution brings healthcare and education closer to those who need it most.
          </p>
        </div>
      </section>

      {/* Giving Methods Grid */}
      <section className="w-full px-4">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GIVING_METHODS.map((method) => (
            <div
              key={method.title}
              className={`rounded-xl p-6 border flex flex-col gap-3 ${
                method.highlight
                  ? "bg-primary-50 border-primary-200"
                  : "bg-white border-gray-200"
              }`}
            >
              <span className="text-3xl">{method.icon}</span>
              <h3 className="font-semibold text-gray-800 text-lg">{method.title}</h3>
              <p className="text-sm text-gray-600 flex-1">{method.description}</p>
              <Link
                href={method.href}
                {...(method.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="mt-2 inline-block text-sm font-medium text-primary-500 hover:text-primary-600 underline"
              >
                {method.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Tax Info */}
      <section className="w-full px-4 py-12">
        <div className="max-w-[1320px] mx-auto">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-8 max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-green-800 mb-3">
              🧾 Tax Deduction Information
            </h2>
            <p className="text-sm text-green-700 mb-2">
              Nivaran Foundation is a registered <strong>501(c)(3) tax-exempt nonprofit organization</strong>. Your donation is fully tax-deductible to the extent allowed by law.
            </p>
            <p className="text-sm text-green-700 mb-2">
              <strong>EIN:</strong> 41-2656587
            </p>
            <p className="text-sm text-green-700">
              A tax receipt will be emailed to you automatically after your donation is processed. For donations over $250, we provide a written acknowledgment per IRS requirements.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-4 py-12 bg-primary-50">
        <div className="max-w-[1320px] mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Ready to Make a Difference?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Choose the giving method that works best for you. Every contribution — large or small — delivers real healthcare to real people.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/donate"
              className="px-8 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              Donate Now
            </Link>
            <Link
              href="/contact-us"
              className="px-8 py-3 border border-primary-500 text-primary-500 rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
