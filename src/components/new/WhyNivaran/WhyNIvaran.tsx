"use client";

import RenderList from "@/components/nivaran/common/renderList/RenderList";
import AboutStatsCard from "../AboutStatCard/AboutStatCard";

const WHY_NIVARAN = [
  {
    id: 1,
    image: "/why-nivaran/why-nivaran-2.png",
    stats: "66%",
    description: "of Nepali lacks tertiary healthcare",
  },
  {
    id: 2,
    image: "/why-nivaran/why-nivaran-3.png",
    stats: "3/5",
    description: "families face healthcare inequity ",
  },
  {
    id: 3,
    image: "/why-nivaran/why-nivaran-4.png",
    stats: "46%",
    description: "of children suffer from malnutrition",
  },
];

export const WhyNIvaran = () => {
  return (
    <ul className="flex flex-col gap-4 sm:flex-row lg:px-[150px] ">
      <RenderList
        data={WHY_NIVARAN}
        render={(data, i) => (
          <AboutStatsCard data={data} key={i}>
            <AboutStatsCard.Overlay className="bg-[linear-gradient(to_bottom,_transparent_0%_,transparent_60%_,black_80%)]">
              <p className="absolute bottom-0 p-4 flex flex-col justify-center font-Outfit">
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
