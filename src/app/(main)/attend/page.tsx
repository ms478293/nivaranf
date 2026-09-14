import { createPageMetadata } from "@/lib/page-metadata";
import { CustomHeading } from "@/components/nivaran/common/CustomHeading";
import { Events } from "@/components/nivaran/programs/Events";
import { initiatives } from "@/content/event-info";
import { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  "path": "/attend",
  "title": "Nivaran Events & Community Participation | Nivaran Foundation",
  "description": "Learn about participating in Nivaran community events and outreach activities. Contact the team to confirm upcoming dates, locations and ways to take part."
});
export default function Page() {
  return (
    <div className="w-full px-4 bg-white">
      <div className=" max-w-[1140px] mx-auto mb-4">
        <CustomHeading as="h1" className="lg:m-0 lg:my-4">
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
