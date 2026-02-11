import { BulbIcon } from "@/assets/icons/BulbIcon";
import { CompassIcon } from "@/assets/icons/CompassIcon";
import { EarthIcon } from "@/assets/icons/EarthIcon";
import { GroupIcon } from "@/assets/icons/GroupIcon";
import { HandIcon } from "@/assets/icons/HandIcon";
import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { InfoCard } from "../InfoCard/InfoCard";

export const CAREER_INFO_DATA = [
  {
    id: 1,
    title: "Global Awarness and Cultural Sensitivity",
    icon: <EarthIcon className="w-10 h-10 stroke-primary-500" />,
    description:
      "Enhanced global awareness, respectful and effective engagement",
  },
  {
    id: 2,
    icon: <GroupIcon className="w-10 h-10 stroke-primary-500" />,
    title: "Collaboration and team work",
    description:
      "Opportunity to work across cultures, backgrounds, and expertise",
  },
  {
    id: 3,
    icon: <BulbIcon className="w-10 h-10 stroke-primary-500" />,
    title: "Problem-Solving and Innovation",
    description:
      "Empowered leadership, initiative, and community growth support",
  },
  {
    id: 4,
    icon: <HandIcon className="w-10 h-10 stroke-primary-500" />,
    title: "Accountability and Integrity",
    description:
      "Empowered leadership, initiative, and community growth support",
  },
  {
    id: 5,
    icon: <CompassIcon className="w-10 h-10 stroke-primary-500" />,
    title: "Leadership and Empowerment",
    description:
      "Empowered leadership, initiative, and community growth support",
  },
];

export const CareersInfoList = () => {
  return (
    <section className="flex  gap-4 overflow-x-auto my-8 md:grid sm:grid-cols-2 lg:grid-cols-3 scrollbar-hide">
      <RenderList
        data={CAREER_INFO_DATA}
        render={(list) => <InfoCard list={list} key={list.id} />}
      />
    </section>
  );
};
