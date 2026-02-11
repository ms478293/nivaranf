import { TitleGifDisplayCard } from "@/components/nivaran/common/TitleGifDisplayCard";
import { Contents } from "@/components/nivaran/programs/Contents";
import { Events } from "@/components/nivaran/programs/Events";
import { HealthContent } from "@/content/site-data";

export default function Healthcare() {
  return (
    <div>
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
    </div>
  );
}
