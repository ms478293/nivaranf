import ContactIcon from "@/assets/icons/ContactIcon";
import { HandShakeIcon } from "@/assets/icons/HandShakeIcon";
import LocationIcon from "@/assets/icons/LocationIcon";
import MailIcon from "@/assets/icons/MailIcon";

export const CONTACT_DATA = [
  {
    id: 1,
    title: "Phone",
    label1: "+1 8577017471",
    label2: "+977 1-5312555",
    icon: <ContactIcon className="w-6 h-6 stroke-secondary-800 " />,
  },
  {
    id: 2,
    title: "Email",
    label1: "Our team is happy to assist",
    label2: "partnerships@nivaranfoundation.org",
    icon: <MailIcon className="w-6 h-6 stroke-secondary-800" />,
  },
  {
    id: 3,
    title: "Headquarters",
    label1: "Newroad, Kathmandu",
    label2: "USA Office: Boston MA, US",
    icon: <LocationIcon className="w-6 h-6 stroke-secondary-800" />,
  },
  {
    id: 4,
    title: "Partnership with us",
    label1: "Mail us at",
    label2: "partnerships@nivaranfoundation.org",
    icon: <HandShakeIcon className="w-6 h-6 stroke-secondary-800" />,
  },
];
