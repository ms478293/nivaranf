export interface UpcomingProjectsDataType {
  id: number;
  link: string;
  images: string;
  title: string;
  description: string;
}

export const UPCOMING_PROJECTS_DATA: UpcomingProjectsDataType[] = [
  {
    id: 2,
    link: "/vidya",
    images: "/articles/images/community-clinic.jpg",
    title: "Vidya",
    description: "",
  },
  {
    id: 3,
    link: "/sanjeevani",
    images: "/sanjeevani/sanjeevani-1.png",
    title: "Sanjeevani",
    description: "",
  },
];
