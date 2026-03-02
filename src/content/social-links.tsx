import FacebookIcon from "@/assets/icons/FacebookIcon";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import { LinkedInIcon } from "@/assets/icons/LinkedInIcon";
import TwitterIcon from "@/assets/icons/TwitterIcon";

export const SOCIAL_LINKS = [
  {
    id: 1,
    name: "Facebook",
    link: "https://www.facebook.com/profile.php?id=61584248211038",
    icon: <FacebookIcon className="w-4 h-4" aria-hidden="true" />,
  },
  {
    id: 2,
    name: "Instagram",
    link: "https://www.instagram.com/nivaran.foundation/",
    icon: <InstagramIcon className="w-4 h-4" aria-hidden="true" />,
  },
  {
    id: 3,
    name: "X (Twitter)",
    link: "https://x.com/NivaranOrg",
    icon: <TwitterIcon className="w-4 h-4" aria-hidden="true" />,
  },
  {
    id: 4,
    name: "LinkedIn",
    link: "https://www.linkedin.com/company/nivaran-foundation",
    icon: <LinkedInIcon className="w-4 h-4" aria-hidden="true" />,
  },
];
