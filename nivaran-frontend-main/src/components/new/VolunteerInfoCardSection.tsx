import MiniPlantIcon from "@/assets/icons/MiniPlantIcon";
import PuzzleIcon from "@/assets/icons/PuzzleIcon";
import TimeIcon from "@/assets/icons/TimeIcon";
import RenderList from "../nivaran/common/renderList/RenderList";
import { InfoCard, InfoCardType } from "./InfoCard/InfoCard";

export const VOLUNTEER_INFO: InfoCardType[] = [
  {
    id: 1,
    title: "Why Volunteer",
    icon: <PuzzleIcon className="w-10 h-10 stroke-primary-500" />,
    description:
      "Make a difference in people's lives while gaining valuable experience and new skills.",
  },
  {
    id: 2,
    icon: <TimeIcon className="w-10 h-10 stroke-primary-500" />,
    title: "Upcoming Events",
    description:
      "Join our community events and outreach programs to support those in need.",
  },
  {
    id: 3,
    icon: <MiniPlantIcon className="w-10 h-10 stroke-primary-500" />,
    title: "Volunteer Benefits",
    description:
      "Network with like-minded individuals, build your resume, and recognition for your contributions.",
  },
];

const VolunteerInfoCardSection = () => {
  return (
    <section className="flex  gap-4 flex-wrap my-16">
      <RenderList
        data={VOLUNTEER_INFO}
        render={(list) => <InfoCard list={list} key={list.id} />}
      />
    </section>
  );
};

export default VolunteerInfoCardSection;
