"use client";

import {
  PhaseSection,
  PhaseSectionDescription,
  PhaseSectionStatsBox,
  PhaseSectionTitle,
} from "../PhaseSection/PhaseSection";

const SanjeevaniPhase = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* PhASE-I */}
      <PhaseSection className="bg-secondary-100 flex flex-col gap-4 justify-between">
        <div>
          <PhaseSectionTitle title="Phase-I" />
          <PhaseSectionDescription description="Start date: 15th May, 2025" />
        </div>
        <div>
          <PhaseSectionTitle title="Objective" />
          <PhaseSectionDescription description="Educate communities on hygiene, disease prevention, and healthy living practices, with a goal of creating a scalable, sustainable healthcare delivery model for rural areas." />
        </div>

        <div className="w-full">
          <PhaseSectionTitle title="Target Coverage" />
          <div className=" gap-2 w-full flex flex-wrap  ">
            <PhaseSectionStatsBox stats="2.5 years" description="Time Period" />
            <PhaseSectionStatsBox
              stats="83 Villages"
              description="Targeted Villages"
            />
            <PhaseSectionStatsBox
              stats="170"
              description="Daily Health Checkups"
            />
          </div>
        </div>
      </PhaseSection>

      {/* PhASE-II */}
      <PhaseSection className="bg-secondary-200 flex flex-col gap-4">
        <div>
          <PhaseSectionTitle title="Phase-II" />
          <PhaseSectionDescription description="Start date: 05 Aug, 2025" />
        </div>
        <div>
          <PhaseSectionTitle title="Objective" />
          <PhaseSectionDescription description="Improve healthcare access with prompt emergency care, maintain WHO standards, and emphasize prevention, education, and disease monitoring. Achieve sustainability through financial stability and local capacity." />
        </div>

        <div className="w-full">
          <PhaseSectionTitle title="Target Coverage" />
          <div className=" gap-2 w-full flex flex-wrap  ">
            <PhaseSectionStatsBox stats="486" description="Villages Coverage" />
            <PhaseSectionStatsBox
              stats="<30 minute"
              description="Avg Response Time"
            />
            <PhaseSectionStatsBox
              stats="729,000"
              description="Population Reach"
            />
          </div>
        </div>
      </PhaseSection>

      {/* PhASE-III */}
      <PhaseSection className="bg-secondary-300 flex flex-col gap-4">
        <div>
          <PhaseSectionTitle title="Phase-III " />
          <PhaseSectionDescription description="Start date: 1st Jan, 2027" />
        </div>
        <div>
          <PhaseSectionTitle title="Objective" />
          <PhaseSectionDescription
            description="Establish a nationwide hospital network that ensures healthcare access, clinical quality, and community health. This aims for financial sustainability, and local capacity building, ultimately improving healthcare outcomes.
"
          />
        </div>

        <div className="w-full">
          <PhaseSectionTitle title="Target Coverage" />
          <div className=" gap-2 w-full flex flex-wrap  ">
            <PhaseSectionStatsBox stats="77 " description="Total Hospitals" />
            <PhaseSectionStatsBox
              stats="Specialized Units"
              description=" Hospital Setup"
            />
            <PhaseSectionStatsBox
              stats="24/7"
              description="Emergency Response"
            />
          </div>
        </div>
      </PhaseSection>

      {/* PhASE-IV */}
      <PhaseSection className="bg-secondary-400 flex flex-col gap-4 ">
        <div>
          <PhaseSectionTitle title="Phase-IV" />
          <PhaseSectionDescription description="Start date: 1st Oct, 2029" />
        </div>
        <div>
          <PhaseSectionTitle title="Objective" />
          <PhaseSectionDescription
            description="Establish a nationwide hospital network that ensures healthcare access, clinical quality, and community health. This aims for financial sustainability, and local capacity building, ultimately improving healthcare outcomes.
"
          />
        </div>

        <div className="w-full">
          <PhaseSectionTitle title="Target Coverage" />
          <div className=" gap-2 w-full flex flex-wrap  ">
            <PhaseSectionStatsBox stats="1" description="Central Hospital" />
            <PhaseSectionStatsBox stats="700+" description="Bed Capacity" />
            <PhaseSectionStatsBox
              stats="WHO standard"
              description="Quality Maintenance"
            />
          </div>
        </div>
      </PhaseSection>
    </div>
  );
};

export default SanjeevaniPhase;
