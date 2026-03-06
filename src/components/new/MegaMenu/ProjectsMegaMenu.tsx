import { AppButton } from "@/components/ui/app-button";
import {
  UPCOMING_PROJECTS_DATA,
  UpcomingProjectsDataType,
} from "@/content/upcoming-projects";
import { SANJEEVANI_PUBLIC_STATS } from "@/content/sanjeevani-public-stats";
import { useMegaMenuStore } from "@/store/useMegamenuStore";
import Image from "next/image";
import Link from "next/link";

const HIGHLIGHTS = [
  { value: SANJEEVANI_PUBLIC_STATS.campsCompletedText, label: "Camps" },
  { value: SANJEEVANI_PUBLIC_STATS.patientsServedText, label: "Patients" },
  { value: SANJEEVANI_PUBLIC_STATS.provincesCoveredText, label: "Provinces" },
];

const ProjectsMegaMenu = () => {
  const { openActiveMegaMenu } = useMegaMenuStore();

  return (
    <div className="flex gap-8">
      {/* Left — Project Cards */}
      <div className="flex flex-col gap-4 w-[55%]">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Our Projects
          </h3>
          <Link
            href="/projects"
            className="hidden md:block"
            onClick={() => openActiveMegaMenu(null)}
          >
            <AppButton variant="ghost" className="text-sm">
              View all →
            </AppButton>
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {UPCOMING_PROJECTS_DATA.map((project) => (
            <ProjectCard
              project={project}
              key={project.id}
              onNavigate={() => openActiveMegaMenu(null)}
            />
          ))}
        </div>
      </div>

      {/* Right — Spotlight */}
      <div className="flex flex-col gap-3 w-[45%] bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-5 border border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold text-green-700 uppercase tracking-wider">
              Active Now
            </span>
          </div>
          <Link
            href="/sanjeevani"
            onClick={() => openActiveMegaMenu(null)}
          >
            <AppButton variant="ghost" className="text-sm">
              Details →
            </AppButton>
          </Link>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Project Sanjeevani
          </h2>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
            Bridging healthcare gaps across Nepal — from hygiene education to a
            nationwide hospital network.
          </p>
        </div>

        <div className="flex gap-3 mt-auto">
          {HIGHLIGHTS.map((h) => (
            <div
              key={h.label}
              className="flex-1 bg-white rounded-lg p-2.5 border border-neutral-200 text-center"
            >
              <p className="text-base font-bold text-primary-500">{h.value}</p>
              <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
                {h.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({
  project,
  onNavigate,
}: {
  project: UpcomingProjectsDataType;
  onNavigate: () => void;
}) => {
  return (
    <Link
      href={project.link}
      onClick={onNavigate}
      className="group flex gap-4 p-2 rounded-xl bg-neutral-50 border border-transparent hover:border-primary-200 hover:bg-primary-50/40 transition-all duration-200"
    >
      <div className="w-[100px] h-[72px] flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={project.images}
          alt={`Project ${project.title}`}
          width={200}
          height={144}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col justify-center gap-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {project.title}
          </h4>
          <svg
            className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-0.5 transition-all flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </div>
    </Link>
  );
};

export default ProjectsMegaMenu;
