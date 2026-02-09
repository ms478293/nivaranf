import { TitleGifDisplayCard } from "@/components/nivaran/common/TitleGifDisplayCard";
import { Contents } from "@/components/nivaran/programs/Contents";
import { Events } from "@/components/nivaran/programs/Events";
import { ChildWelfareContent } from "@/content/site-data";

export default function Education() {
  return (
    <div>
      <TitleGifDisplayCard
        title={"Child Welfare"}
        imgUrl="/gifs/childwelfare.gif"
        description={
          "At the Nivaran Foundation, we are committed to protecting the rights of children and addressing the challenges they face in underserved communities. With a focus on combating child labor, malnutrition, and early marriages, we aim to create safer, healthier environments for children to thrive. Through our nutrition programs, child protection efforts, and family support initiatives, we work towards building a future where every child has the opportunity to grow and succeed, free from exploitation and hardship."
        }
        altImage="/altImage/childWelfare.jpg"
      ></TitleGifDisplayCard>
      <div
        className="relative md:bg-no-repeat bg-contain "
        style={{
          backgroundImage: "url('/backgrounds/childwelfare.svg')",
        }}
      >
        <div className="z-10 relative">
          <Contents
            data={ChildWelfareContent.data}
            name={ChildWelfareContent.name}
          ></Contents>

          {/* <!-- Video If Needed --> */}
          <Events
            title="Child Welfare Intitiatives"
            description="Explore programs dedicated to protecting and nurturing children, listed below."
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
