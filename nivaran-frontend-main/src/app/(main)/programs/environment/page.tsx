import { TitleGifDisplayCard } from "@/components/nivaran/common/TitleGifDisplayCard";
import { Contents } from "@/components/nivaran/programs/Contents";
import { Events } from "@/components/nivaran/programs/Events";
import { EnvironmentContent } from "@/content/site-data";

export default function Education() {
  return (
    <div>
      <TitleGifDisplayCard
        title={"Environment Stewardship"}
        imgUrl="/gifs/environment.gif"
        description={
          "At the Nivaran Foundation, we are deeply committed to addressing the pressing environmental challenges that Nepal faces. From deforestation and waste management issues to the threats to biodiversity, our work focuses on sustainable solutions that protect natural resources and ecosystems. Through reforestation, promoting sustainable agricultural practices, and raising awareness about environmental issues, we aim to foster long-term ecological balance and create a greener future for generations to come."
        }
        altImage="/altImage/environment.jpg"
      ></TitleGifDisplayCard>
      <div
        className="relative md:bg-no-repeat bg-contain "
        style={{
          backgroundImage: "url('/backgrounds/environment.svg')",
        }}
      >
        <div className="z-10 relative">
          <Contents
            data={EnvironmentContent.data}
            name={EnvironmentContent.name}
          ></Contents>

          {/* <!-- Video If Needed --> */}
          <Events
            title="Environment Stewardship Intitiatives"
            description="Find the initiatives promoting sustainability and environmental care, outlined in the table below."
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
