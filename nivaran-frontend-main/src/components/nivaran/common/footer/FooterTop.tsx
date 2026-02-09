import { footerData } from "@/content/site-data";
import Image from "next/image";
import Link from "next/link";
import { FooterHollow } from "./FooterHollow";

export const LogoAndDescription = ({
  logo,
}: {
  logo: { src: string; alt: string };
}) => {
  return (
    <div className="md:w-full sm:w-[80%]   lg:w-[350px]">
      <Link
        href="/"
        className="flex flex-col w-fit  justify-center lg:items-start lg:justify-start mb-2"
      >
        <Image
          src={logo.src}
          className="me-3"
          alt={logo.alt}
          height={100}
          width={150}
        ></Image>
      </Link>
      <div className="  lg:text-justify text-gray-600 pr-3 text-sm md:text-md">
        NIVARAN FOUNDATION is a global force in the fight against poverty and
        inequality. We are recognized for our unwavering dedication to
        empowering.
      </div>
    </div>
  );
};

export const ListPopulate = ({
  link,
  name,
  isExternalLink,
}: {
  link: string;
  name: string;
  isExternalLink?: boolean;
}) => {
  return (
    <li className="mb-2 list-none ">
      <Link
        href={link}
        target={isExternalLink ? "_blank" : "_self"}
        className="hover:text-[#eb5834] hover:underline text-wrap md:text-wrap text-sm text-gray-600"
      >
        {name}
      </Link>
    </li>
  );
};
export const FooterTop = () => {
  const { logo, others, ourWork } = footerData;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:gap-12 mb-3 md:mb-6">
        <LogoAndDescription logo={logo} />
        <FooterHollow></FooterHollow>
      </div>

      <div className="flex flex-col md:flex-row justify-between w-full gap-10 md:gap-4 ">
        <FooterMiddle />
        <div className="flex flex-col md:flex-row  md:items-center justify-start w-full mb-2 gap-6 md:justify-end self-end">
          <div className="flex flex-col items-start justify-start md:self-start">
            <h2 className="mb-1 text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-[#2c77bb]">
              Our Work
            </h2>
            <ul className="font-normal text-gray-500 dark:text-black">
              {ourWork.map((resource, index) => (
                <ListPopulate {...resource} key={index}></ListPopulate>
              ))}
            </ul>
          </div>
          <div className="md:self-start">
            <h2 className="mb-1 text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-[#2c77bb]">
              Key Links
            </h2>
            <ul className="font-normal text-gray-500 dark:text-black">
              {others.map((platform, index) => (
                <ListPopulate {...platform} key={index}></ListPopulate>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const FooterMiddle = () => {
  return (
    <div className="flex flex-col gap-4 md:w-1/3 w-full text-sm md:text-base text-gray-700">
      {/* Contact Information */}
      <p className="leading-relaxed">
        If you need assistance with your donation, please email us at&nbsp;
        <a
          href="mailto:profile@nivaranfoundation.org"
          className="text-primary-main font-semibold hover:underline"
        >
          profile@nivaranfoundation.org
        </a>
        , or contact us through our supporter services online form.
      </p>

      {/* Organization Details */}
      <p className="leading-relaxed">
        <span className="font-bold text-primary-main">NIVARAN FOUNDATION</span>{" "}
        is a 501(c)(3) not-for-profit organization.
      </p>

      {/* Copyright */}
      <p className="text-sm text-gray-600 md:text-gray-500">
        &copy; {new Date().getFullYear()} NIVARAN. All rights reserved.
      </p>
    </div>
  );
};
