"use client";

import RenderList from "@/components/nivaran/common/renderList/RenderList";
import AboutStatsCard from "./AboutStatCard";

const TARRGETED_RESULTS = [
  {
    id: 1,
    image: "/sanjeevani/sanjeevani-1.png",
    stats: (
      <>
        20% <span className="mb-3 text-3xl">&rarr;</span> 50%
      </>
    ),
    description: "Diseases Prevention Rate",
    alt: "Project Sanjeevani showing the rate of diseases prevention and public health improvement",
  },
  {
    id: 2,
    image: "/sanjeevani/sanjeevani-2.png",
    stats: (
      <>
        300 <span className="text-3xl mb-3">&rarr;</span> 10,000
      </>
    ),
    description: "Daily Patient Treatment",
    alt: "Project Sanjeevani healthcare initiative providing daily treatment to patients",
  },
  {
    id: 3,
    image: "/sanjeevani/sanjeevani-3.png",
    stats: (
      <span className="text-[24px]/[36px] font-bold ">All Over Nepal</span>
    ),
    description: "Population Health Access",
    alt: "Project Sanjeevani improving population health access across Nepal through healthcare initiatives",
  },
];

const TargetedResults = () => {
  return (
    <ul className="flex flex-col gap-4 sm:flex-row lg:px-[150px] ">
      <RenderList
        data={TARRGETED_RESULTS}
        render={(data, i) => (
          <AboutStatsCard data={data} key={i}>
            <AboutStatsCard.Overlay className="bg-[linear-gradient(to_bottom,_transparent_0%_,transparent_60%_,black_80%)]">
              <p className="absolute bottom-0 p-4 flex flex-col justify-center font-Poppins">
                <AboutStatsCard.Stats
                  stats={data.stats}
                  className="text-neutral-50 flex items-center text-[24px]/[36px] font-bold  "
                />
                <AboutStatsCard.Description
                  description={data.description}
                  className="text-neutral-50"
                />
              </p>
            </AboutStatsCard.Overlay>
          </AboutStatsCard>
        )}
      />
    </ul>
  );
};

export default TargetedResults;
