import { UPCOMING_PROJECTS_DATA } from "@/content/upcoming-projects";
import MainTitle from "../MainTitle/MainTitle";
import { PageHeader } from "../PageHeader/PageHeader";
import UpcomingProjects from "../UpcomingProjects/UpcomingProjects";
import { ProjectDescription } from "./ProjectDescription";
import { ProjectPhase } from "./ProjectPhases";
export type ProjectDataType = {
  name: string;
  tagline: string;
  initiative: string;
  paragraphs: string[];
  mission: string;
  vision: string;
  phases: {
    start_date: string;
    objective: string;
    metrics: {
      data: string;
      label: string;
    }[];
  }[];
};
export const ProjectDisplay = ({
  project_data,
}: {
  project_data: ProjectDataType;
}) => (
  <main className=" pt-20 font-Poppins flex flex-col gap-10">
    <section className=" w-full px-4">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-8 items-center">
        <div className="flex items-center flex-col">
          <PageHeader prefix="Project" suffix={project_data.name} />

          <p className="px-3 py-0.5 bg-secondary-200 text-secondary-800 w-fit rounded-full text-sm text-center">
            {project_data.initiative}
          </p>
        </div>

        <p className="text-gray-800 text-center max-w-[500px]">
          &quot;{project_data.tagline}&quot;
        </p>
      </div>
    </section>

    {/* <div className="bg-[url('/bg-sanjeevani.jpeg')] w-full h-full absolute -z-10 bg-center bg-cover bg-no-repeat top-1/2 scale-150">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#ffffffd3] to-white"></div>
    </div> */}

    <section className=" w-full px-4 relative lmd:mt-12">
      {/* <div className="w-full h-[140%] -top-20 absolute -z-10">
        <Image
          src="/bg-sanjeevani.jpeg"
          alt="Sanjeevani Imgage"
          width={1200}
          height={1200}
          className="w-full h-full block object-center object-cover grayscale"
        />
        <div className="absolute w-full h-full top-0 bg-[linear-gradient(#ffffff_14%,#ffffff9d,#fff_75%)]"></div>
      </div> */}

      <div className="flex flex-col md:flex-row justify-between max-w-[1320px] mx-auto gap-4 my-8 md:my-12">
        <div className="flex   flex-col items-start md:w-[600px] gap-4">
          <MainTitle
            suffix="About"
            prefix={project_data.name}
            key={project_data.name}
          />
          <p className="text-sm text-gray-600 flex flex-col  md:items-start  gap-4">
            {project_data.paragraphs.map((paragraph, index) => (
              <span key={index}>{paragraph}</span>
            ))}
          </p>
        </div>

        <div className="flex flex-col  md:flex-row gap-2">
          <ProjectDescription
            key={"our Mission"}
            title="Our Mission"
            description={project_data.mission}
          />
          <ProjectDescription
            key={"Our Vision"}
            title="Our Vision"
            description={project_data.vision}
          />
        </div>
      </div>

      {/* <section className="w-full px-4"> */}
      <div className="max-w-[1320px] mx-auto">
        <ProjectPhase phases={project_data.phases} />
      </div>
      {/* </section> */}
    </section>

    <UpcomingProjects
      className="bg-transparent  px-4"
      data={UPCOMING_PROJECTS_DATA.filter(
        (project) =>
          project.title.toLocaleLowerCase() !==
          project_data.name.toLocaleLowerCase()
      )}
    >
      <MainTitle
        suffix="Other"
        prefix="Projects"
        className="-mb-4 md:mb-[3rem]"
      />
    </UpcomingProjects>
  </main>
);
