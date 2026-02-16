import FacebookIcon from "@/assets/icons/FacebookIcon";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import { LinkedInIcon } from "@/assets/icons/LinkedInIcon";
import TwitterIcon from "@/assets/icons/TwitterIcon";

export interface ListItem {
  title?: string;
  description?: string;
  list?: (string | ListItem)[];
}

export interface JobDescriptionProps {
  data: {
    job_title: string;
    location: string;
    deadline: string;
    job_description: string;
    list: ListItem[];
  };
}

export const JOB_DESCRIPTION_DATA: JobDescriptionProps["data"] = {
  job_title: "Fund raiser co-ordinator",
  location: "Remote",
  deadline: "21st Feb, 2025",
  job_description:
    "Our client is seeking a UI/UX Designer / Frontend Developer with a strong understanding of JavaScript and frontend technologies. The ideal candidate will be responsible for designing intuitive user experiences and implementing them using modern frontend frameworks. This role requires a balance of design thinking and technical expertise to create aesthetically pleasing and high-performing applications.",
  list: [
    {
      title: "Requirements",
      list: [
        "Design and develop user-friendly interfaces with a focus on usability and performance.",
        "Implement frontend components using JavaScript.",
        "Collaborate with product managers and developers to translate design concepts into functional UI.",
        "Conduct user research, wireframing, prototyping, and usability testing to refine the user experience.",
        "Optimize applications for speed, responsiveness, and accessibility across different devices.",
        "Stay updated with the latest trends in UI/UX design, frontend development, and JavaScript frameworks.",
      ],
    },
    {
      title: "Benefits List",
      list: [
        {
          title: "Competitive Salary",
          description:
            "A fair and competitive salary based on experience and location.",
        },
        {
          title: "Competitive Salary",
          description:
            "A fair and competitive salary based on experience and location.",
        },
        {
          title: "Competitive Salary",
          description:
            "A fair and competitive salary based on experience and location.",
        },
        {
          title: "Competitive Salary",
          description:
            "A fair and competitive salary based on experience and location.",
        },
      ],
    },
    {
      title: "Tools and Technologies",
      list: [
        "Fundraising Platforms: Information on the tools and platforms used for donor management (e.g., Salesforce, DonorPerfect).",
        "Communication Tools: Email marketing software, CRM systems, event management tools, etc.",
        "Data Analysis Tools: Tools used for tracking and analyzing fundraising metrics (e.g., Excel, Google Analytics).",
      ],
    },
    {
      title: "Diversity, Equity and Inclusion (DEI)",
      list: [
        "Diversity Statement: NIVARAN Foundation's commitment to fostering a diverse, inclusive, and equitable work environment.",
        "DEI Initiatives: Any programs, events, or policies aimed at improving workplace diversity.",
      ],
    },
    {
      title: "Role-Specific Goals",
      list: [
        "Short-term Goals: Immediate objectives for the first 3-6 months.",
        "Long-term Goals: Key milestones for the year or beyond (e.g., exceeding fundraising targets, building a donor base).",
      ],
    },
    {
      title: "Key Perfomance Indicators",
      list: [
        "Total funds raised.",
        "Number of new donors acquired.",
        "Donor retention rates.",
      ],
    },
    {
      title: "Cross-Department Collaboration",
      list: [
        "Collaboration with Other Teams: Outline of how the Fundraising Officer will work with marketing, communications, finance, and program teams.",
        "Key Stakeholders: Donor relations, board members, and senior leadership that the officer will work closely with.",
      ],
    },
    {
      title: "Work-Life Balance",
      list: [
        "Collaboration with Other Teams: Outline of how the Fundraising Officer will work with marketing, communications, finance, and program teams.",
        "Key Stakeholders: Donor relations, board members, and senior leadership that the officer will work closely with.",
      ],
    },
  ],
};

// NOTE: link need to be changed, this is just for now, It needs Opengraph and seo things
export const SHARE_LINK = [
  {
    id: 1,
    title: "LinkedIn",
    link: "https://www.linkedin.com/company/nivaran-foundation",
    icon: <LinkedInIcon className="w-5 h-5 stroke-gray-950" />,
  },
  {
    id: 2,
    title: "Facebook",
    link: "https://www.facebook.com/profile.php?id=61584248211038",
    icon: <FacebookIcon className="w-5 h-5 stroke-secondary-500 " />,
  },
  {
    id: 3,
    title: "X",
    icon: <TwitterIcon className="w-5 h-5 stroke-gray-950" />,
    link: "https://x.com/NivaranOrg",
  },
  {
    id: 4,
    title: "Instagram",
    icon: <InstagramIcon className="w-5 h-5 stroke-red-600" />,
    link: "https://www.instagram.com/nivaran.foundation/",
  },
];
