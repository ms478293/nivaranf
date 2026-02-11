import {
  ProjectDataType,
  ProjectDisplay,
} from "@/components/new/projects/ProjectsDisplay";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Nivaran Foundation | Project Unity - Empowering Communities for Sustainable Growth",
  description:
    "Project Unity empowers communities with economic growth, leadership, and innovation. Learn how we’re creating lasting social change",
  alternates: {
    canonical: "https://nivaranfoundation.org/unity",
  },
};

const project_data: ProjectDataType = {
  name: "Unity",
  initiative: "Part of Our Community Development Initiatives",
  tagline: "Empowering Communities for Sustainable Growth",
  paragraphs: [
    "Project Unity is a flagship initiative by the Nivaran Foundation, focused on fostering self-sufficient communities through economic empowerment, leadership development, and social innovation.",
    "Through strategic investments in education, entrepreneurship, and infrastructure, Project Unity is designed to build resilient economies, enhance leadership capacity, and integrate technology into everyday life.",
  ],
  mission:
    "Empower communities by fostering economic growth, leadership, and sustainable development.",
  vision:
    "Building resilient communities through empowerment, innovation, and collective action.",
  phases: [
    {
      start_date: "2030",
      objective:
        "Establish community centers focused on development, economic empowerment, and leadership training to drive growth and empowerment.",
      metrics: [
        {
          data: "100",
          label: "Community Development Hubs",
        },
        {
          data: "Promote",
          label: "Economic Empowerment",
        },
        {
          data: "Influence",
          label: "Youth Leadership",
        },
      ],
    },
    {
      start_date: "2033",
      objective:
        "Expand operations with community hubs, digital centers, and innovation labs to drive growth, innovation, and sustainable infrastructure.",
      metrics: [
        {
          data: "500",
          label: "Community Development Hubs",
        },
        {
          data: "Advanced",
          label: "Tech Innovation",
        },
        {
          data: "Setup",
          label: "Green Infrastructure",
        },
      ],
    },
    {
      start_date: "2036",
      objective:
        "Drive regional development and sustainability through economic zones, knowledge hubs, and smart communities.",
      metrics: [
        {
          data: "5 Million",
          label: "Beneficiaries",
        },
        {
          data: "Launch",
          label: "Sustainable Systems",
        },
        {
          data: "3,50,000",
          label: "Youths Empowered",
        },
      ],
    },
  ],
};

const page = () => {
  return <ProjectDisplay project_data={project_data} />;
};

export default page;
