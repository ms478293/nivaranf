import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { AppButton } from "@/components/ui/app-button";
import {
  UPCOMING_PROJECTS_DATA,
  UpcomingProjectsDataType,
} from "@/content/upcoming-projects";
import { useScreenSize } from "@/lib/helpers/useScreenSize";
import { cn } from "@/lib/utils";
import { useMegaMenuStore } from "@/store/useMegamenuStore";
import Image from "next/image";
import Link from "next/link";

const PROJECT_PLAN = [
  {
    id: 1,
    label: "Total phase-I Budget",
    stats: "$ 18 Million",
  },
  {
    id: 2,
    label: "Population Treated",
    stats: "20,000+",
  },
];

const ProjectsMegaMenu = () => {
  const projectsData = UPCOMING_PROJECTS_DATA;
  const screenSize = useScreenSize();
  const { openActiveMegaMenu } = useMegaMenuStore();

  return (
    <div className="flex justify-between">
      <div className="flex flex-col justify-between gap-3 ">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-600 mb-2">Upcoming Projects</h3>
          <Link
            href="/#upcoming-projects"
            className="hidden md:block"
            onClick={() => openActiveMegaMenu(null)}
          >
            <AppButton variant="ghost">View all Projects</AppButton>
          </Link>
        </div>

        <div
          className={cn(
            "",
            screenSize === "md" || "lg"
              ? "flex flex-col gap-2"
              : screenSize === "xl"
              ? "grid grid-cols-2 "
              : "grid grid-cols-2  "
          )}
        >
          <RenderList
            data={
              screenSize === "md" || "lg"
                ? projectsData.slice(0, 2)
                : projectsData
            }
            render={(project) => (
              <ProjectCard project={project} key={project.id} />
            )}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 w-[40%] ">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-700">
            Current Project
          </h2>
          <Link href={"/sanjeevani"} onClick={() => openActiveMegaMenu(null)}>
            <AppButton variant="ghost">View details</AppButton>
          </Link>
        </div>
        <p className="text-sm text-gray-600">
          Empowering lives by bridging gaps in healthcare access and education
          through community-driven solutions.
        </p>

        <div className="flex flex-col gap-1">
          <h3 className="text-gray-800">Vision for 2030 AD</h3>
          <div className="flex gap-4">
            <RenderList
              data={PROJECT_PLAN}
              render={(project) => (
                <div
                  key={project.id}
                  className="flex flex-col p-2 bg-gray-100 w-[310px] gap-3"
                >
                  <h4 className="text-gray-800 text-sm font-medium">
                    {" "}
                    {project.label}
                  </h4>
                  <p className="text-xl text-gray-600 font-[600]">
                    {project.stats}
                  </p>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project }: { project: UpcomingProjectsDataType }) => {
  return (
    <div className=" p-1.5 bg-neutral-100 rounded-md h-[76px] flex gap-4">
      <div className=" w-[90px] overflow-hidden rounded-md">
        <Image
          src={project.images}
          alt="Project"
          width={250}
          height={250}
          className="w-full h-full block object-cover object-center "
        />
      </div>
      <h3 className="flex  justify-between items-center  w-[140px] leading-none">
        <span className="text-xsm text-gray-800">Project</span>
        <span className="text-lg font-semibold text-gray-950 ">
          {project.title}
        </span>
      </h3>
    </div>
  );
};

export default ProjectsMegaMenu;
