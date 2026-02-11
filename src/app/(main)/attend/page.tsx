import { CustomHeading } from "@/components/nivaran/common/CustomHeading";
import { Events } from "@/components/nivaran/programs/Events";
import { initiatives } from "@/content/event-info";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nivara Foundation | Attend an Event",
  description:
    "See latest on what events are ongioing, planned or catalogued at Nivaran Foundation.org",
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
