import { TitleGifDisplayCard } from "@/components/nivaran/common/TitleGifDisplayCard";
import { Contents } from "@/components/nivaran/programs/Contents";
import { Events } from "@/components/nivaran/programs/Events";
import { CommunityContent } from "@/content/site-data";

export default function Community() {
  return (
    <div>
      <TitleGifDisplayCard
        title={"Community Development"}
        imgUrl="/gifs/3.gif"
        description={
          "At the Nivaran Foundation, we recognize the urgent need to address the economic challenges faced by many communities in Nepal. With a significant portion of the population living below the poverty line, high unemployment, and limited access to basic services like electricity, we are committed to fostering sustainable development through empowerment, job creation, and infrastructure improvement. By working closely with communities, we aim to create long-term solutions that lift individuals and families out of poverty and provide them with the tools they need to thrive."
        }
        altImage="/altImage/3.jpg"
      ></TitleGifDisplayCard>
      <div
        className="relative md:bg-no-repeat bg-contain "
        style={{
          backgroundImage: "url('/backgrounds/community.svg')",
        }}
      >
        <div className="z-10 relative">
          <Contents
            data={CommunityContent.data}
            name={CommunityContent.name}
          ></Contents>

          {/* <!-- Video If Needed --> */}
          <Events
            title="Community Development Intitiatives"
            description="Learn about programs empowering communities and driving local development, detailed below."
            data={[
              {
                name: "1st Event",
                startDate: "Jan1",
                endDate: "Jan2",
                location: "Nepal",
                status: "Success",
              },
            ]}
          ></Events>
        </div>
        <div className="absolute inset-0 bg-gray-200/20"></div>
      </div>
    </div>
  );
}
