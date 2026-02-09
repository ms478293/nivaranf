"use client";

import RenderList from "@/components/nivaran/common/renderList/RenderList";
import AboutStatsCard from "../AboutStatCard/AboutStatCard";

const TARRGETED_RESULTS = [
  {
    id: 1,
    image: "/partners/partnership-1.jpeg",
    stats: "Amplified Impact",
    description:
      "By collaborating, we pool resources and expertise to create larger, more impactful solutions.",
    alt: "Collaborative partnership driving impact and business success",
  },
  {
    id: 2,
    image: "/partners/partnership-2.jpeg",
    stats: "Shared Vision",
    description:
      "We align with organizations that share our values of compassion, equity, and sustainability.",
    alt: "Diverse group of boys working together for a shared vision of compassion and unity",
  },
  {
    id: 3,
    image: "/partners/partnership-3.jpeg",
    stats: "Sustainable Growth",
    description:
      "Together, we ensure long-term, sustainable outcomes that benefit communities and ecosystems.",
    alt: "Professional analyzing financial graphs, emphasizing transparency in financial reporting and analysis.",
  },
  {
    id: 4,
    image: "/partners/partnership-4.jpeg",
    stats: "Transparency",
    description:
      "We release all our donation and expense record on the public domain. So we can build trust and goodwill in what we do.",
    alt: "Professional analyzing financial graphs, emphasizing transparency in financial reporting and analysis.",
  },
];

export const PartnershipCard = () => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:flex-row  ">
      <RenderList
        data={TARRGETED_RESULTS}
        render={(data, i) => (
          <AboutStatsCard data={data} key={i}>
            <AboutStatsCard.Overlay className="">
              <p className="absolute bottom-0 p-4 flex flex-col justify-center font-Poppins">
                <AboutStatsCard.Stats
                  stats={data.stats}
                  className="text-gray-800 text-lg font-medium mb-2 font-Poppins"
                />
                <AboutStatsCard.Description
                  description={data.description}
                  className="text-sm text-gray-600 font-Poppins"
                />
              </p>
            </AboutStatsCard.Overlay>
          </AboutStatsCard>
        )}
      />
    </ul>
  );
};
