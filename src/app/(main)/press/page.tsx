import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import { PageTitle } from "@/components/new/PageTitle/PageTitle";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Press & Media Kit | Nivaran Foundation",
  description:
    "Download Nivaran Foundation's press kit, logo assets, fact sheet, and media resources. For press inquiries, contact partnerships@nivaranfoundation.org.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/press",
  },
  openGraph: {
    title: "Press & Media Kit | Nivaran Foundation",
    description:
      "Download Nivaran Foundation's press kit, logo assets, and media resources for press coverage.",
    url: "https://www.nivaranfoundation.org/press",
    type: "website",
    siteName: "Nivaran Foundation",
    images: [
      {
        url: "https://www.nivaranfoundation.org/logo.png",
        width: 1200,
        height: 665,
        alt: "Nivaran Foundation Press Kit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Press & Media Kit | Nivaran Foundation",
    description: "Download press resources and media kit from Nivaran Foundation.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

const QUICK_FACTS = [
  { label: "Founded", value: "2020" },
  { label: "Type", value: "501(c)(3) Nonprofit" },
  { label: "EIN", value: "41-2656587" },
  { label: "Headquarters", value: "Kathmandu, Nepal" },
  { label: "US Coordination", value: "United States" },
  { label: "Focus Areas", value: "Healthcare, Education" },
  { label: "Patients Served", value: "20,000+" },
  { label: "Villages Reached", value: "83" },
  { label: "Fund Utilization", value: "96% to Programs" },
  { label: "Founder", value: "Mukesh Thakur" },
];

export default function PressPage() {
  return (
    <main className="font-Poppins w-full pb-16">
      <div className="max-w-[1320px] mx-auto px-4 pt-2">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Press" }]} />
      </div>

      {/* Hero */}
      <section className="w-full px-4 py-8 md:py-12">
        <div className="max-w-[1320px] mx-auto">
          <PageTitle prefix="Press &" suffix="Media Resources" />
          <p className="mt-4 text-gray-600 max-w-2xl">
            Welcome to Nivaran Foundation&apos;s press center. Here you&apos;ll find our logo assets, fact sheet, organizational information, and media contact details for journalists and partners.
          </p>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="w-full px-4">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Facts</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {QUICK_FACTS.map((fact) => (
              <div
                key={fact.label}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4"
              >
                <p className="text-xs text-gray-500 uppercase tracking-wide">{fact.label}</p>
                <p className="text-sm font-semibold text-gray-800 mt-1">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Assets / Logo Download */}
      <section className="w-full px-4 py-12">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Brand Assets &amp; Logos</h2>
          <p className="text-gray-600 mb-6">
            Use these approved logos and assets when referencing Nivaran Foundation in print, web, or media publications. Please do not modify, crop, or recolor our logos.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center">
              <div className="w-48 h-24 flex items-center justify-center mb-4">
                <Image src="/NivaranLogo.svg" alt="Nivaran Foundation Logo SVG" width={192} height={80} />
              </div>
              <p className="text-sm font-medium text-gray-800 mb-2">Primary Logo (SVG)</p>
              <a
                href="/NivaranLogo.svg"
                download
                className="text-primary-500 text-sm underline hover:text-primary-600"
              >
                Download SVG
              </a>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center">
              <div className="w-48 h-24 flex items-center justify-center mb-4">
                <Image src="/logo.png" alt="Nivaran Foundation Logo PNG" width={192} height={80} />
              </div>
              <p className="text-sm font-medium text-gray-800 mb-2">Logo (PNG)</p>
              <a
                href="/logo.png"
                download
                className="text-primary-500 text-sm underline hover:text-primary-600"
              >
                Download PNG
              </a>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center">
              <div className="w-48 h-24 flex items-center justify-center mb-4">
                <Image src="/logo_img.jpg" alt="Nivaran Foundation OG Image" width={192} height={80} className="object-contain" />
              </div>
              <p className="text-sm font-medium text-gray-800 mb-2">Social Media Banner</p>
              <a
                href="/logo_img.jpg"
                download
                className="text-primary-500 text-sm underline hover:text-primary-600"
              >
                Download JPG
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Nivaran — for press use */}
      <section className="w-full px-4 py-12 bg-gray-50">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About Nivaran Foundation</h2>
          <div className="max-w-3xl space-y-4 text-gray-700 text-sm leading-relaxed">
            <p>
              Nivaran Foundation is a 501(c)(3) tax-exempt nonprofit organization founded in 2020. Our mission is to transform healthcare and education access for underserved communities in rural Nepal — where the nearest hospital can be a multi-day walk away.
            </p>
            <p>
              Through <strong>Project Sanjeevani</strong>, our flagship healthcare initiative, we operate mobile health camps that deliver free medical screenings, maternal care, and disease prevention services directly to villages with no permanent healthcare facilities. To date, we have served over 20,000 patients across 83 villages.
            </p>
            <p>
              Through <strong>Project Vidya</strong>, we deliver education support including digital learning tools, teacher training, and school infrastructure improvements to rural Nepali schools.
            </p>
            <p>
              <strong>96% of all funds raised go directly to program services.</strong> The remaining 4% covers essential administrative and fundraising costs — one of the highest program-to-overhead ratios in the sector.
            </p>
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="w-full px-4 py-12">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Media Contact</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-lg">
            <p className="text-gray-700 text-sm mb-2">
              For press inquiries, interview requests, or media collaboration:
            </p>
            <p className="font-medium text-gray-800">
              Email:{" "}
              <a
                href="mailto:partnerships@nivaranfoundation.org"
                className="text-primary-500 underline"
              >
                partnerships@nivaranfoundation.org
              </a>
            </p>
            <p className="font-medium text-gray-800 mt-1">
              Phone: <a href="tel:+97715354693" className="text-primary-500">+977-01-5354693</a>
            </p>
            <p className="text-gray-500 text-xs mt-3">
              We typically respond to media inquiries within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="w-full px-4 py-8 bg-gray-50">
        <div className="max-w-[1320px] mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="https://www.facebook.com/profile.php?id=61584248211038" target="_blank" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Facebook
            </Link>
            <Link href="https://www.instagram.com/nivaran.foundation/" target="_blank" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Instagram
            </Link>
            <Link href="https://x.com/NivaranOrg" target="_blank" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              X (Twitter)
            </Link>
            <Link href="https://www.linkedin.com/company/nivaran-foundation" target="_blank" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              LinkedIn
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
