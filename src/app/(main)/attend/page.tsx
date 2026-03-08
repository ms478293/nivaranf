import { CustomHeading } from "@/components/nivaran/common/CustomHeading";
import { Events } from "@/components/nivaran/programs/Events";
import { initiatives } from "@/content/event-info";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nivaran Foundation | Attend an Event",
  description:
    "Review Nivaran Foundation events, community initiatives, and planned program activities so supporters can follow upcoming outreach, campaigns, and engagement opportunities.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/attend",
  },
  openGraph: {
    title: "Attend an Event | Nivaran Foundation",
    description: "Review Nivaran Foundation events, community initiatives, and planned program activities across the organization.",
    url: "https://www.nivaranfoundation.org/attend",
    siteName: "Nivaran Foundation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Attend an Event | Nivaran Foundation",
    description: "Review upcoming and planned events connected to Nivaran Foundation programs.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};
export default function Page() {
  return (
    <div className="w-full px-4 bg-white">
      <div className=" max-w-[1140px] mx-auto mb-4">
        <CustomHeading className="lg:m-0 lg:my-4">
          Our Inititatives
        </CustomHeading>

        <section className="flex flex-col gap-8">
          {initiatives.map((initiative, index) => (
            <Events
              title={initiative.title}
              description={initiative.description}
              data={initiative.data}
              key={index}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
