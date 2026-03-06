import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import { PageTitle } from "@/components/new/PageTitle/PageTitle";
import {
  SANJEEVANI_PUBLIC_COPY,
  SANJEEVANI_PUBLIC_STATS,
} from "@/content/sanjeevani-public-stats";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Impact & Annual Report | Nivaran Foundation",
  description:
    `See the measurable impact of Nivaran Foundation: ${SANJEEVANI_PUBLIC_STATS.patientsServedText} patients served and ${SANJEEVANI_PUBLIC_STATS.municipalitiesCoveredText} rural municipalities reached through Project Sanjeevani.`,
  alternates: {
    canonical: "https://www.nivaranfoundation.org/impact",
  },
  openGraph: {
    title: "Our Impact & Annual Report | Nivaran Foundation",
    description:
      `See the measurable impact of Nivaran Foundation across rural Nepal. ${SANJEEVANI_PUBLIC_COPY.summaryWithMunicipalities}`,
    url: "https://www.nivaranfoundation.org/impact",
    type: "website",
    siteName: "Nivaran Foundation",
    images: [
      {
        url: "https://www.nivaranfoundation.org/hero_img/hero_img_1.avif",
        width: 1200,
        height: 630,
        alt: "Nivaran Foundation Impact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Impact & Annual Report | Nivaran Foundation",
    description:
      "See the measurable impact of Nivaran Foundation across rural Nepal.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

const IMPACT_STATS = [
  { value: SANJEEVANI_PUBLIC_STATS.patientsServedText, label: "Patients Served", icon: "🏥" },
  { value: SANJEEVANI_PUBLIC_STATS.municipalitiesCoveredText, label: "Rural Municipalities Reached", icon: "🏘️" },
  { value: "96%", label: "Funds to Programs", icon: "💰" },
  { value: SANJEEVANI_PUBLIC_STATS.investmentSoFarCompactText, label: "Tracked Investment", icon: "📊" },
  { value: "4", label: "Program Phases", icon: "🗓️" },
  { value: "2020", label: "Year Founded", icon: "🌱" },
];

const FUND_ALLOCATION = [
  { label: "Healthcare Programs (Sanjeevani)", percentage: 70, color: "bg-emerald-500" },
  { label: "Education Programs (Vidya)", percentage: 15, color: "bg-blue-500" },
  { label: "Operations & Administration", percentage: 10, color: "bg-amber-500" },
  { label: "Fundraising & Outreach", percentage: 5, color: "bg-purple-500" },
];

const MILESTONES = [
  { year: "2020", event: "Nivaran Foundation established as a 501(c)(3) nonprofit organization in the United States." },
  { year: "2025", event: "Project Sanjeevani Phase I launched with the first tracked rural health camps in Nepal." },
  { year: "2025", event: `Expanded to two field teams and reached all ${SANJEEVANI_PUBLIC_STATS.provincesCoveredText} provinces during the first operating cycle.` },
  { year: "2026", event: `Current live tracking records show ${SANJEEVANI_PUBLIC_STATS.patientsServedText} patients served across ${SANJEEVANI_PUBLIC_STATS.campsCompletedText} completed health camps and ${SANJEEVANI_PUBLIC_STATS.municipalitiesCoveredText} rural municipalities.` },
  { year: "2030", event: "National rural coverage remains the long-term scaling target as capacity and field teams expand." },
];

export default function ImpactPage() {
  return (
    <main className="font-Poppins w-full pb-16">
      {/* Breadcrumbs */}
      <div className="max-w-[1320px] mx-auto px-4 pt-2">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Impact" }]} />
      </div>

      {/* Hero */}
      <section className="w-full px-4 py-8 md:py-12">
        <div className="max-w-[1320px] mx-auto text-center">
          <PageTitle prefix="Our Impact in" suffix="Rural Nepal" className="items-center" />
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Every dollar donated to Nivaran Foundation creates measurable change. Here is exactly where your support goes and what it has achieved since our founding in 2020.
          </p>
        </div>
      </section>

      {/* Impact Stats Grid */}
      <section className="w-full px-4">
        <div className="max-w-[1320px] mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
          {IMPACT_STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
            >
              <span className="text-3xl mb-2 block">{stat.icon}</span>
              <p className="text-2xl md:text-3xl font-bold text-primary-500">{stat.value}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fund Allocation */}
      <section className="w-full px-4 py-12">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
            Where Your Money Goes
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            96% of every dollar donated goes directly to program services. We maintain one of the highest fund utilization rates among nonprofits serving South Asia.
          </p>
          <div className="space-y-4 max-w-2xl mx-auto">
            {FUND_ALLOCATION.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="text-sm font-bold text-gray-800">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${item.color} h-3 rounded-full`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="w-full px-4 py-12 bg-gray-50">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Our Journey — Key Milestones
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {MILESTONES.map((milestone, index) => (
              <div key={milestone.year} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {milestone.year}
                  </div>
                  {index < MILESTONES.length - 1 && (
                    <div className="w-0.5 flex-1 bg-primary-200 mt-2" />
                  )}
                </div>
                <div className="pb-6">
                  <p className="text-gray-700 text-sm leading-relaxed">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Annual Report Download */}
      <section className="w-full px-4 py-12">
        <div className="max-w-[1320px] mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Annual Report &amp; Financial Transparency
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Nivaran Foundation is committed to full financial transparency. As a registered 501(c)(3) nonprofit (EIN: 41-2656587), we file IRS Form 990 annually. Our complete financials, program reports, and audit documents are available upon request.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/financial-reports"
              className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              View Financial Reports
            </Link>
            <Link
              href="/accountability-and-transparency"
              className="px-6 py-3 border border-primary-500 text-primary-500 rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              Accountability &amp; Transparency
            </Link>
            <Link
              href="/contact-us"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Request Full Report
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-4 py-12 bg-primary-50">
        <div className="max-w-[1320px] mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Help Us Reach the Next 100,000 Lives
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Your tax-deductible donation directly funds mobile health camps and education programs in Nepal. 96% goes to programs.
          </p>
          <Link
            href="/donate"
            className="inline-block px-8 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors text-lg"
          >
            Donate Now
          </Link>
        </div>
      </section>
    </main>
  );
}
