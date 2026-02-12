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
    images: "/why-nivaran/about-cover.jpeg",
    title: "Sanjeevani",
    description:
      "Our flagship healthcare initiative — 304 health camps across Nepal delivering eye care, dental care, maternal health services, and disease prevention to 61,200+ patients.",
  },
  {
    id: 2,
    link: "/vidya",
    images: "/articles/images/community-clinic.jpg",
    title: "Vidya",
    description:
      "Empowering Nepal's future through quality education — teacher training, scholarships, and school infrastructure in underserved communities.",
  },
];
