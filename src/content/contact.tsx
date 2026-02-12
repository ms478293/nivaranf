import ContactIcon from "@/assets/icons/ContactIcon";
import LocationIcon from "@/assets/icons/LocationIcon";
import MailIcon from "@/assets/icons/MailIcon";

export const CONTACT_DATA = [
  {
    id: 1,
    title: "Phone",
    label1: "(339) 707-2895",
    label2: "+977 1-5312555",
    icon: <ContactIcon className="w-6 h-6 stroke-secondary-800 " />,
  },
  {
    id: 2,
    title: "Email",
    label1: "Our team is happy to assist",
    label2: "support@nivaranfoundation.org",
    icon: <MailIcon className="w-6 h-6 stroke-secondary-800" />,
  },
  {
    id: 3,
    title: "Headquarters",
    label1: "1025 Massachusetts Ave, Suite 303",
    label2: "Arlington, MA 02476, USA",
    icon: <LocationIcon className="w-6 h-6 stroke-secondary-800" />,
  },
];
