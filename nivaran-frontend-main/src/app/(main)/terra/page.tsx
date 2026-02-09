import {
  ProjectDataType,
  ProjectDisplay,
} from "@/components/new/projects/ProjectsDisplay";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Nivaran Foundation | Project Terra - Environmental Harmony for Future Generations",
  description:
    "Project Terra focuses on environmental sustainability with innovative solutions to protect the planet. Learn more about our efforts for a greener future",
  alternates: {
    canonical: "https://nivaranfoundation.org/terra",
  },
};

const project_data: ProjectDataType = {
  name: "Terra",
  initiative: "Part of Our Environmental Stewardship Initiatives",
  tagline: "Environmental Harmony for Future Generations",
  paragraphs: [
    "Project Terra is a global sustainability initiative by the Nivaran Foundation, dedicated to restoring ecosystems, advancing renewable energy, and promoting sustainable living.",
    "By integrating community action, technological innovation, and policy advocacy, this initiative is driving long-term climate resilience and ensuring a healthier planet for future generations.",
  ],
  mission:
    "To create a sustainable future through conservation, clean energy, and innovation.",
  vision:
    "Creating sustainable ecosystems through innovation and community action.",
  phases: [
    {
      start_date: "2029",
      objective:
        "Implement conservation programs, sustainable energy solutions, and waste management strategies for global sustainability.",
      metrics: [
        { data: "100", label: "Forest Restoration" },
        { data: "Launch", label: "Sustainable Energy" },
        { data: "Establish", label: "Waste Management" },
      ],
    },
    {
      start_date: "2031",
      objective:
        "Scale up operations, integrate advanced technologies, and drive research and development to foster innovation and efficiency.",
      metrics: [
        { data: "500", label: "Green Communities" },
        { data: "200", label: "Renewable Energy Projects" },
        { data: "100", label: "Conservation Areas" },
      ],
    },
    {
      start_date: "2033",
      objective:
        "Advance climate action centers and drive policy development and innovation with global partners.",
      metrics: [
        { data: "1 Million", label: "Participants Engaged" },
        { data: "Build", label: "Climate Action Centers" },
        { data: "Promote", label: "Tech Advancements" },
      ],
    },
  ],
};
const page = () => {
  return <ProjectDisplay project_data={project_data} />;
};

export default page;
