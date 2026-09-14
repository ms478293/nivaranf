import { createPageMetadata } from "@/lib/page-metadata";
import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import { RelatedContent } from "@/components/new/RelatedContent/RelatedContent";
import { TitleGifDisplayCard } from "@/components/nivaran/common/TitleGifDisplayCard";
import { Contents } from "@/components/nivaran/programs/Contents";
import { Events } from "@/components/nivaran/programs/Events";
import { HealthContent } from "@/content/site-data";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = createPageMetadata({
  "path": "/programs/health",
  "title": "Free Healthcare in Rural Nepal | Nivaran Foundation",
  "description": "Explore Nivaran’s free mobile health camps in rural Nepal, including screening, maternal and child health support, medicines and referral pathways.",
  "image": {
    "url": "/hero_img/hero_img_2.webp",
    "alt": "A healthcare worker examining a patient",
    "width": 1920,
    "height": 1080
  }
});

export default function Healthcare() {
  return (
    <div>
      <div className="max-w-[1320px] mx-auto px-4 pt-2">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Programs" }, { label: "Healthcare" }]} />
      </div>
      <TitleGifDisplayCard
        title={"Healthcare"}
        imgUrl="/gifs/healthcare.gif"
        description={
          "At the Nivaran Foundation, we are dedicated to addressing healthcare inequities faced by underserved communities, particularly in rural areas. With a mission to bridge the gap in healthcare access, we prioritize maternal and child health, disease prevention, and the provision of essential medical services. Through our community clinics, medical camps, and education initiatives, we strive to create a robust healthcare network, empowering individuals to lead healthier lives, so that vulnerable populations, particularly in remote areas, receive the care they need."
        }
        altImage="/altImage/healthCare.jpg"
      ></TitleGifDisplayCard>

      {/* Background Image Section */}
      <div
        className="relative md:bg-no-repeat bg-contain "
        style={{
          backgroundImage: "url('/backgrounds/healthcare.svg')",
        }}
      >
        <div className="z-10 relative">
          <Contents
            data={HealthContent.data}
            name={HealthContent.name}
          ></Contents>

          {/* Video or Other Content */}
          <Events
            title="Health Intitiatives"
            description="Discover the initiatives enhancing health and wellness for communities, detailed in the table below."
            data={[
              {
                name: "Project Sanjeevani Phase I (current program)",
                startDate: "May 2025",
                endDate: "February 2026",
                location: "7 provinces, Nepal — 16 camps, 17,355 patients as of Feb 2026",
                status: "completed",
              },
              {
                name: "Tapro Village campaign (historical)",
                startDate: "January 2024",
                endDate: "",
                location: "Tapro Village, Nepal",
                status: "planned",
              },
            ]}
          ></Events>
        </div>

        {/* Optional: Add a semi-transparent overlay for better contrast */}
        <div className="absolute inset-0 bg-gray-200/20"></div>
      </div>
      <div className="max-w-[1320px] mx-auto px-4 py-8 text-center">
        <Link
          href="/donate/sanjeevani"
          className="inline-flex items-center rounded-full bg-primary-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-600"
        >
          Support our health camps
        </Link>
      </div>
      <div className="max-w-[1320px] mx-auto px-4">
        <RelatedContent
          heading="Explore Healthcare Resources"
          links={[
            { title: "Project Sanjeevani", href: "/sanjeevani", description: "Our flagship healthcare initiative delivering multi-specialty medical camps." },
            { title: "Mobile Health Camps in Nepal", href: "/mobile-health-camps-nepal", description: "See how mobile outreach brings screening, medicine, and referral support closer to remote communities." },
            { title: "Rural Healthcare in Nepal", href: "/rural-healthcare-nepal", description: "Understand the access barriers shaping healthcare delivery across rural Nepal." },
            { title: "Maternal Health in Nepal", href: "/maternal-health-nepal", description: "Learn why maternal screening, counseling, and referral pathways matter in rural settings." },
            { title: "Health NGO in Nepal", href: "/health-ngo-nepal", description: "Understand what credible rural healthcare delivery requires from a nonprofit operating in Nepal." },
            { title: "Free Health Camp Nepal", href: "/free-health-camp-nepal", description: "See what a real free health camp includes, from staffing and screening to medicine and referrals." },
            { title: "Coverage in Nepal", href: "/healthcare-coverage-nepal", description: "Explore the province-by-province footprint of current Sanjeevani coverage and districts served." },
            { title: "Education Programs", href: "/programs/education", description: "Supporting underserved children through school access and learning resources." },
          ]}
        />
      </div>
    </div>
  );
}
