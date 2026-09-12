import DonationCard from "@/components/new/DonationCard/DonationCard";
import { DonationFAQ } from "@/components/new/DonationFAQ/DonationFAQ";
import WhereMoneyGoes from "@/components/new/DonorTrust/WhereMoneyGoes";
import { PageTitle } from "@/components/new/PageTitle/PageTitle";
import { AppButton } from "@/components/ui/app-button";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";

const TITLE = "Donate to Nivaran Foundation | Healthcare & Education in Nepal";
const DESCRIPTION =
  "Make a one-time gift to Nivaran Foundation's healthcare and education work in Nepal. Choose where your gift goes and receive your donation receipt by email. EIN: 41-2656587.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.nivaranfoundation.org/donate" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.nivaranfoundation.org/donate",
    type: "website",
    siteName: "Nivaran Foundation",
    images: [
      { url: "https://www.nivaranfoundation.org/logo.png", width: 1200, height: 665, alt: "Donate to Nivaran Foundation" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
    images: ["https://www.nivaranfoundation.org/logo.png"],
  },
};

const donationFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I choose where my donation goes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. On the donation form you can direct your gift to where it is needed most (the default), Project Sanjeevani mobile health camps, maternal and child health, or education in Nepal. If a program is fully funded or cannot be carried out, Nivaran directs the gift where the need is greatest.",
      },
    },
    {
      "@type": "Question",
      name: "Is my gift one-time or recurring?",
      acceptedAnswer: { "@type": "Answer", text: "Every gift made through the donation form is a one-time gift." },
    },
    {
      "@type": "Question",
      name: "What is Nivaran Foundation's EIN?",
      acceptedAnswer: { "@type": "Answer", text: "Nivaran Foundation EIN is 41-2656587." },
    },
  ],
};

export default function DonationPage() {
  return (
    <main className="font-Poppins w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(donationFaqSchema) }} />

      <div className="max-w-[1320px] mx-auto px-4 pt-2">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Donate" }]} />
      </div>

      {/* Hero + Donation Card */}
      <section className="w-full px-4 pb-8 md:pb-10">
        <div
          className="max-w-[1320px] mx-auto bg-[url('/nivaran_word.png')] bg-no-repeat flex flex-col md:gap-12"
          style={{ backgroundPosition: "top 10% left 40%" }}
        >
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-between items-start">
            <div className="mb-4 md:mb-8 flex flex-col gap-4 md:w-1/2">
              <PageTitle prefix="Be the Change" suffix="You Want to See" />
              <p className="text-sm leading-relaxed text-gray-600">
                Sanjeevani health camps are postponed while monsoon rain keeps the mountain roads unsafe. Every
                postponed camp will be held; your gift is what brings the teams back the moment the routes are clear.
              </p>
              <p className="text-sm leading-relaxed text-gray-600">
                Every gift is a one-time gift to Nivaran&rsquo;s healthcare and education work in Nepal. You choose
                where it goes, and your donation receipt arrives by email.
              </p>
              <Link href="/sanjeevani" aria-label="See Project Sanjeevani">
                <AppButton className="font-light bg-neutral-50" variant="primary-outline">
                  See Project Sanjeevani
                </AppButton>
              </Link>
            </div>
            <div className="w-full md:w-1/2 order-first md:order-none">
              <Suspense>
                <DonationCard />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <WhereMoneyGoes />

      <section className="w-full px-4 pb-12">
        <div className="max-w-[1320px] mx-auto">
          <DonationFAQ />
        </div>
      </section>
    </main>
  );
}
