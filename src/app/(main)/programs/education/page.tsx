import { TitleGifDisplayCard } from "@/components/nivaran/common/TitleGifDisplayCard";
import { Contents } from "@/components/nivaran/programs/Contents";
import { Events } from "@/components/nivaran/programs/Events";
import { EducationContent } from "@/content/site-data";

export default function Education() {
  return (
    <div>
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
    </div>
  );
}
