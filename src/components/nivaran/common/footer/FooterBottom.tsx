import Link from "next/link";
import { SocialLinks } from "./SocialLinks";
export const FooterBottom = () => {
  const footerBottomLinks: { name: string; link: string }[] = [
    {
      name: "Contact Us",
      link: "/contact-us",
    },
    { name: "Privacy Policy", link: "/privacy-policy" },
    { name: "Terms & Conditions", link: "/terms-of-service" },
  ];
  return (
    <div className="w-full flex md:items-center md:justify-between flex-col md:flex-row mt-4  gap-4 ">
      <div className="flex gap-4">
        {footerBottomLinks.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            className="pb-2 border-b-2 border-primary-main text-sm"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="md:relative md:right-0 md:bottom-1 flex">
        <SocialLinks></SocialLinks>
      </div>
    </div>
  );
};
