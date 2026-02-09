export interface UpcomingProjectsDataType {
  id: number;
  link: string;
  images: string;
  title: string;
  description: string;
}

export const UPCOMING_PROJECTS_DATA: UpcomingProjectsDataType[] = [
  {
    id: 1,
    link: "/terra",
    images: "/articles/images/climate-action.webp",
    title: "Terra",
    description: "Sustainable ecosystems driven by innovation",
  },
  {
    id: 2,
    link: "/vidya",
    images: "/articles/images/community-clinic.jpg",
    title: "Vidya",
    description: "Shaping futures with quality education",
  },
  {
    id: 3,
    link: "/nurture",
    images: "/articles/images/healthcare.jpg",
    title: "Nurture",
    description: "Providing every child's learning opportunity",
  },
  {
    id: 4,
    link: "/unity",
    images: "/articles/images/nepalese-children.jpg",
    title: "Unity",
    description: "Empowering communities through collective action",
  },
  {
    id: 5,
    link: "/sanjeevani",
    images: "/why-nivaran/about-cover.jpeg",
    title: "Sanjeevani",
    description: "Ensuring access to quality healthcare for all",
  },
];
