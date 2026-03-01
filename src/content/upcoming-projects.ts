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
    link: "/sanjeevani",
    images: "/sanjeevani/sanjeevani-1.png",
    title: "Sanjeevani",
    description: "Bridging gaps in healthcare access across Nepal.",
  },
  {
    id: 2,
    link: "/vidya",
    images: "/projects/images/projectVidyaHero.jpg",
    title: "Vidya",
    description: "Transforming global education through innovation.",
  },
];
