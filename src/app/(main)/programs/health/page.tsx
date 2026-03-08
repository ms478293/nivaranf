import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import { RelatedContent } from "@/components/new/RelatedContent/RelatedContent";
import { TitleGifDisplayCard } from "@/components/nivaran/common/TitleGifDisplayCard";
import { Contents } from "@/components/nivaran/programs/Contents";
import { Events } from "@/components/nivaran/programs/Events";
import { HealthContent } from "@/content/site-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Healthcare Programs in Rural Nepal | Nivaran Foundation",
  description:
    "Explore Nivaran Foundation healthcare programs in Nepal, including mobile health camps, maternal care outreach, child health support, and essential treatment in remote communities.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/programs/health",
  },
  keywords: [
    "free healthcare Nepal",
    "rural health programs Nepal",
    "mobile health camps Nepal",
    "maternal health Nepal",
    "Nivaran Foundation healthcare",
  ],
  openGraph: {
    title: "Free Healthcare Programs in Rural Nepal | Nivaran Foundation",
    description:
      "Nivaran Foundation healthcare programs deliver mobile health camps, maternal care support, and essential treatment in underserved communities across Nepal.",
    url: "https://www.nivaranfoundation.org/programs/health",
    type: "website",
    siteName: "Nivaran Foundation",
    images: [
      {
        url: "https://www.nivaranfoundation.org/logo.png",
        width: 1200,
        height: 665,
        alt: "Nivaran Foundation healthcare programs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Healthcare Programs in Rural Nepal | Nivaran Foundation",
    description:
      "Mobile health camps, maternal care support, and essential treatment across underserved communities in Nepal.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
    images: ["https://www.nivaranfoundation.org/logo.png"],
  },
};

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
          "At the Nivaran Foundation, we are dedicated to addressing healthcare inequities faced by underserved communities, particularly in rural areas. With a mission to bridge the gap in healthcare access, we prioritize maternal and child health, disease prevention, and the provision of essential medical services. Through our community clinics, medical camps, and education initiatives, we strive to create a robust healthcare network, empowering individuals to lead healthier lives. We allocate 30% of our funds to these efforts, ensuring that vulnerable populations, particularly in remote areas, receive the care they need."
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
                name: "Healthcare Campaign",
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
      <div className="max-w-[1320px] mx-auto px-4">
        <RelatedContent
          heading="Explore Healthcare Resources"
          links={[
            { title: "Project Sanjeevani", href: "/sanjeevani", description: "Our flagship healthcare initiative delivering multi-specialty medical camps." },
            { title: "Mobile Health Camps in Nepal", href: "/mobile-health-camps-nepal", description: "See how mobile outreach brings screening, medicine, and referral support closer to remote communities." },
            { title: "Rural Healthcare in Nepal", href: "/rural-healthcare-nepal", description: "Understand the access barriers shaping healthcare delivery across rural Nepal." },
            { title: "Maternal Health in Nepal", href: "/maternal-health-nepal", description: "Learn why maternal screening, counseling, and referral pathways matter in rural settings." },
            { title: "Education Programs", href: "/programs/education", description: "Supporting underserved children through school access and learning resources." },
          ]}
        />
      </div>
    </div>
  );
}
