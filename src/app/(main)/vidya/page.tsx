import { createPageMetadata } from "@/lib/page-metadata";
import {
  ProjectDataType,
  ProjectDisplay,
} from "@/components/new/projects/ProjectsDisplay";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = createPageMetadata({
  "path": "/vidya",
  "title": "Project Vidya: Education Plans for 2027 | Nivaran Foundation",
  "description": "Explore Project Vidya, Nivaran’s education initiative planned for 2027. Learn about proposed learning access, teacher support and phased program goals."
});

const project_data: ProjectDataType = {
  name: "Vidya",
  initiative: "Part of Our Education Initiatives",
  tagline: "Transforming Global Education Through Innovation",
  paragraphs: [
    "Project Vidya is an education-focused initiative by the Nivaran Foundation that aims to bridge global education gaps through technology-driven learning, teacher training, and skill development programs.",
    "Project Vidya is planned for 2027. Figures below (100+ centers, 1,000 teachers, 5 million students) are goals for the phased rollout, not current delivery.",
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
  return <>
    <ProjectDisplay project_data={project_data} />
    <section className="mx-auto mb-16 max-w-4xl border-t border-gray-200 px-6 py-10 text-center">
      <p className="mb-5 text-sm text-gray-600">Project Vidya is planned for 2027. Dedicated gifts are not yet open.</p>
      <Link href="/donate/vidya" className="inline-flex rounded bg-primary-500 px-6 py-3 text-sm text-white">View the Project Vidya appeal →</Link>
    </section>
  </>;
};

export default page;
