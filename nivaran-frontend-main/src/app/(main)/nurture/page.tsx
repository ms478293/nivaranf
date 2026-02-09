import {
  ProjectDataType,
  ProjectDisplay,
} from "@/components/new/projects/ProjectsDisplay";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Nivaran Foundation | Project Nurture - Ensuring Every Child's Right to Thrive",
  description:
    "Project Nurture promotes health, wellness, and nutrition to improve lives through essential healthcare and ensure a healthier global future",
  alternates: {
    canonical: "https://nivaranfoundation.org/nurture",
  },
};

const project_data: ProjectDataType = {
  name: "Nurture",
  initiative: "Part of Our Child Welfare Initiatives",
  tagline: "Ensuring Every Child's Right to Thrive",
  paragraphs: [
    "Project Nurture is a global initiative by Nivaran Foundation aimed at ensuring that every child has access to nutrition, healthcare, protection, and education. This initiative establishes a comprehensive support system for vulnerable children and families, ensuring they receive the care, safety, and opportunities needed to thrive.",
    "This project will support millions of children worldwide through nutrition centers, healthcare services, and protection programs, creating a strong foundation for lifelong well-being.",
  ],
  mission:
    "To ensure every child has access to nutrition, healthcare, protection, and education, empowering them to thrive.",
  vision:
    "Creating a world where every child has the opportunity to grow, learn, and prosper.",
  phases: [
    {
      start_date: "2028",
      objective:
        "Establish nutrition centers, develop protection networks, and provide support systems to ensure community health and safety.",
      metrics: [
        {
          data: "200",
          label: "Nutrition Centers",
        },
        {
          data: "Implement",
          label: "Protection Networks",
        },
        {
          data: "Begin",
          label: "Healthcare Services",
        },
      ],
    },
    {
      start_date: "2030",
      objective:
        "Expand nutrition centers, offer child psychology services, family counseling, and support programs for children with special needs.",
      metrics: [
        {
          data: "1,000",
          label: "Nutrition Centers",
        },
        {
          data: "500",
          label: "Protection Units",
        },
        {
          data: "200",
          label: "Health Clinics",
        },
      ],
    },
    {
      start_date: "2032",
      objective:
        "Establish advanced child healthcare and implement international standards for child welfare.",
      metrics: [
        {
          data: "Provide",
          label: "Specialized Treatment",
        },
        {
          data: "Implement",
          label: "Child Welfare Standards",
        },
        {
          data: "1,00,000",
          label: "Families Impacted",
        },
      ],
    },
  ],
};

const page = () => {
  return <ProjectDisplay project_data={project_data} />;
};

export default page;
