import { siteData } from "@/content/site-data";
import Link from "next/link";
import { CustomHeading } from "../common/CustomHeading";

const HeroSection = () => {
  return (
    <div className="max-w-[1140px] mx-auto pb-4">
      {/* <div className="mb-5  font-extrabold font-montaga bg-gradient-to-r from-primary-main to-secondary-main  w-fit mx-2 text-4xl  text-transparent bg-clip-text">
        <span>{siteData.tagline}</span>
      </div> */}
      <CustomHeading className="mt-6 mb-4">{siteData.tagline}</CustomHeading>
      {siteData.description.map((paragraph, index) => (
        <p key={index} className="mb-3 text-black lg:text-base text-sm">
          {paragraph}
        </p>
      ))}
      <Link
        href="/about"
        className="inline-flex items-center text-secondary-main hover:text-black"
      >
        Learn more
      </Link>
    </div>
  );
};

export default HeroSection;
