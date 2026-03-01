import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import { FAQ } from "@/components/new/FAQ/FAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Nivaran Foundation | FAQ - Frequently Asked Questions about Nivaran Foundation",
  description:
    "Find answers to common questions about Nivaran Foundation's services, data protection, and more on our FAQ page. Get the information you need quickly.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/frequently-asked-questions",
  },
  openGraph: {
    title: "FAQ | Nivaran Foundation",
    description: "Find answers to common questions about Nivaran Foundation's services, programs, and data protection.",
    url: "https://www.nivaranfoundation.org/frequently-asked-questions",
    siteName: "Nivaran Foundation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Nivaran Foundation",
    description: "Find answers to common questions about Nivaran Foundation.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

export default function FAQPage() {
  return (
    <>
      <div className="font-Poppins w-full px-4 scroll-smooth ">
        <div className="max-w-[1320px] mx-auto pt-2">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
        </div>
        <FAQ />
      </div>
    </>
  );
}
