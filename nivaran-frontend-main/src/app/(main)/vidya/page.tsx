import {
  ProjectDataType,
  ProjectDisplay,
} from "@/components/new/projects/ProjectsDisplay";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Nivaran Foundation | Project Vidya - Transforming Global Education Through Innovation",
  description:
    "Project Vidya uses technology to innovate and transform education, creating better learning experiences for brighter futures worldwide",
  alternates: {
    canonical: "https://nivaranfoundation.org/vidya",
  },
};

const project_data: ProjectDataType = {
  name: "Vidya",
  initiative: "Part of Our Education Initiatives",
  tagline: "Transforming Global Education Through Innovation",
  paragraphs: [
    "Project Vidya is an education-focused initiative by the Nivaran Foundation that aims to bridge global education gaps through technology-driven learning, teacher training, and skill development programs.",
    "Project Vidya will expand educational access to underserved communities and equip learners with the skills necessary for the future workforce. Through AI-powered learning, STEM education, and vocational training, we are shaping a future where quality education is accessible to all.",
  ],
  mission:
    "Empower millions of students through tech-driven education, teacher training, and skill development.",
  vision:
    "Empowering communities worldwide through accessible, quality education.",
  phases: [
    {
      start_date: "2027",
      objective:
        "Establish digital learning centers, train educators, and develop infrastructure to enhance access to quality education.",
      metrics: [
        {
          data: "100",
          label: "Digital Learning Centers",
        },
        {
          data: "Upgrade",
          label: "Infrastructure Development",
        },
        {
          data: "1,000",
          label: "Teacher Training Programs",
        },
      ],
    },
    {
      start_date: "2029",
      objective:
        "Integrate advanced technology, develop comprehensive programs, and scale operations to drive impactful growth and innovation.",
      metrics: [
        {
          data: "1,000",
          label: "Digital Learning Centers",
        },
        {
          data: "20",
          label: "Teacher Academies",
        },
        {
          data: "5",
          label: "Regional Hubs",
        },
      ],
    },
    {
      start_date: "2031",
      objective:
        "Establish research centers and innovation labs to drive advancements, offer international certifications, and foster collaboration and academic excellence.",
      metrics: [
        {
          data: "5 Million",
          label: "Students Enrollment",
        },
        {
          data: "Launch",
          label: "Research Centers",
        },
        {
          data: "1,000",
          label: "Community Benefited",
        },
      ],
    },
  ],
};

const page = () => {
  return <ProjectDisplay project_data={project_data} />;
};

export default page;
