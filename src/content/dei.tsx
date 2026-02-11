import { GenderIcon } from "@/assets/icons/GenderIcon";
import { HandShakeIcon } from "@/assets/icons/HandShakeIcon";
import { IDCardIcon } from "@/assets/icons/IDCardIcon";
import { SpeechIcon } from "@/assets/icons/SpeechIcon";

export interface DEIINFOTYPE {
  id: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const DEI_INFO_CARD = [
  {
    id: 1,
    title: "Equality",
    description:
      "We are committed to equality in the workplace, offering equal career development opportunities to ensure all employees succeed and contribute. ",
    icon: <GenderIcon className="w-6 h-6 stroke-primary-500" />,
  },
  {
    id: 2,
    title: "Value Every Voice",
    description:
      "We ensure a collaborative culture where everyone's voice is heard, driving innovation and creativity, ensuring that decisions reflect our diverse experiences. ",
    icon: <SpeechIcon className="w-6 h-6 stroke-primary-500" />,
  },
  {
    id: 3,
    title: "Inclusive Hiring",
    description:
      "We are dedicated to promote inclusive hiring by providing equal opportunities & fostering a workforce that enriches our organization with diverse perspectives & experiences. . ",
    icon: <IDCardIcon className="w-6 h-6 stroke-primary-500" />,
  },
  {
    id: 4,
    title: "Collaborative Hiring",
    description:
      "We foster a culture of collaboration & respect, where teamwork and mutual support are at the core of our work, and every individual is valued for their contributions and perspectives. ",
    icon: <HandShakeIcon className="w-6 h-6 stroke-primary-500" />,
  },
];

export interface DEI_EMPOWERING_TYPE {
  id: number;
  stats: string;
  title: string;
  description: string;
}

export const DEI_EMPOWERING_VOICES: DEI_EMPOWERING_TYPE[] = [
  {
    id: 1,
    stats: "77",
    title: "District Hospitals",
    description:
      "Ensuring healthcare access for diverse communities that promotes an inclusive environment where all individuals receive equal and respectful care.",
  },
  {
    id: 2,
    stats: "100%",
    title: "Child Safety Inclusion",
    description:
      "Promoting an environment where every child feels secure, valued, & protected, ensuring they can grow and develop free from harm, abuse, or neglect.",
  },
  {
    id: 3,
    stats: "5 Million",
    title: "Student from Various Age",
    description:
      "Enrolling children of diverse age groups in digital learning centers & offering training programs for educators to enhance teaching  across all age.",
  },
  {
    id: 4,
    stats: "80%",
    title: "Sustainable Practices",
    description:
      "Encourage diverse youth involvement to promote eco-friendly habits and ensure widespread commitment to sustainable practices.",
  },
];
