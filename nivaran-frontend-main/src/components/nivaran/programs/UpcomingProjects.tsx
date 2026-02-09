import Image from "next/image";
import Link from "next/link";
import { CustomHeading } from "../common/CustomHeading";

const projectsData: {
  name: string;
  imgUrl: string;
  description: string;
  link: string;
}[] = [
  {
    name: "Unity",
    imgUrl: "/projects/images/projectUnityHero.jpg",
    description:
      "A project focused on bringing communities together through impactful initiatives.",
    link: "/blogs/unity",
  },
  {
    name: "Nurture",
    imgUrl: "/projects/images/projectNurtureHero.jpg",
    description:
      "Empowering education and personal growth for the next generation.",
    link: "/blogs/nurture",
  },
  {
    name: "Vidya",
    imgUrl: "/projects/images/projectVidyaHero.jpg",
    description:
      "Driving innovation in education technology for a brighter future.",
    link: "/blogs/vidya",
  },
  {
    name: "Terra",
    imgUrl: "/projects/images/projectTerraHero.jpg",
    description:
      "Promoting environmental sustainability through cutting-edge solutions.",
    link: "/blogs/terra",
  },
];

export const UpcomingProjects = () => {
  return (
    <div className="max-w-[1140px] mx-auto">
      <CustomHeading className="text-center mb-4 text-4xl  lg:ml-0 ml-0">
        Upcoming Projects
      </CustomHeading>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {projectsData.map((project, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative w-full h-64">
              <Image
                src={project.imgUrl}
                alt={project.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col gap-2 items-start">
              <h3 className="text-xl font-semibold text-gray-800">
                {project.name}
              </h3>
              <p className="text-gray-600">{project.description}</p>
              <Link
                href={project.link}
                className="text-primary-main font-medium hover:underline"
              >
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
