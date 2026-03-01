import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import { RelatedContent } from "@/components/new/RelatedContent/RelatedContent";
import { TitleGifDisplayCard } from "@/components/nivaran/common/TitleGifDisplayCard";
import { Contents } from "@/components/nivaran/programs/Contents";
import { Events } from "@/components/nivaran/programs/Events";
import { EducationContent } from "@/content/site-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education Programs in Nepal | Nivaran Foundation",
  description:
    "Nivaran Foundation education programs support underserved children in Nepal through school access, learning support, and community-based education initiatives.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/programs/education",
  },
  keywords: [
    "education programs Nepal",
    "rural education Nepal",
    "child education Nepal",
    "Nivaran Foundation education",
    "community education initiatives",
  ],
  openGraph: {
    title: "Education Programs in Nepal | Nivaran Foundation",
    description:
      "Discover how Nivaran Foundation supports quality education access for underserved communities in Nepal.",
    url: "https://www.nivaranfoundation.org/programs/education",
    type: "website",
    siteName: "Nivaran Foundation",
    images: [
      {
        url: "https://www.nivaranfoundation.org/logo.png",
        width: 1200,
        height: 665,
        alt: "Nivaran Foundation education programs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Education Programs in Nepal | Nivaran Foundation",
    description:
      "Discover how Nivaran Foundation supports quality education access for underserved communities in Nepal.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
    images: ["https://www.nivaranfoundation.org/logo.png"],
  },
};

export default function Education() {
  return (
    <div>
      <div className="max-w-[1320px] mx-auto px-4 pt-2">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Programs" }, { label: "Education" }]} />
      </div>
      <TitleGifDisplayCard
        title={"Education"}
        imgUrl="/gifs/childPath.gif"
        description={
          "At the Nivaran Foundation, we are dedicated to addressing the critical education challenges faced by underserved communities. With a focus on reducing dropout rates, bridging the literacy gap, and increasing enrollment, we aim to create equal educational opportunities for all children. Our approach is centered on providing quality education, empowering teachers, and offering scholarships to ensure that every child has the chance to thrive. Through targeted initiatives, we strive to break the cycle of poverty and help build a brighter future for the next generation."
        }
        altImage="/altImages/childPath.jpg"
      ></TitleGifDisplayCard>
      <div
        className="relative md:bg-no-repeat bg-contain "
        style={{
          backgroundImage: "url('/backgrounds/education.svg')",
        }}
      >
        {" "}
        <div className="z-10 relative">
          <Contents
            data={EducationContent.data}
            name={EducationContent.name}
          ></Contents>

          {/* <!-- Video If Needed --> */}
          <Events
            title="Education Intitiatives"
            description="Browse the programs fostering learning and empowerment through quality education, listed below."
            data={[
              {
                name: "Equip School Supplies",
                startDate: "January 2025",
                endDate: "February 2025",
                location: "Nepal",
                status: "Success",
              },
            ]}
          ></Events>
        </div>
        <div className="absolute inset-0 bg-gray-200/20"></div>
      </div>
      <div className="max-w-[1320px] mx-auto px-4">
        <RelatedContent
          heading="Explore Our Programs"
          links={[
            { title: "Healthcare Programs", href: "/programs/health", description: "Free mobile health camps delivering essential medical services across rural Nepal." },
            { title: "Project Sanjeevani", href: "/sanjeevani", description: "Multi-specialty health camps providing dental, eye, maternal, and general care." },
            { title: "About Nivaran Foundation", href: "/about", description: "Learn about our 501(c)(3) mission, team, and the communities we serve." },
            { title: "Donate to Education", href: "/donate", description: "Your contribution helps build classrooms, train teachers, and keep children in school." },
            { title: "Volunteer", href: "/volunteer", description: "Share your skills and time with children and educators in Nepal." },
          ]}
        />
      </div>
    </div>
  );
}
