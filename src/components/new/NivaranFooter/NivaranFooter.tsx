"use client";

import { FooterHollow } from "@/components/nivaran/common/footer/FooterHollow";
import { SocialLinks } from "@/components/nivaran/common/footer/SocialLinks";
import { BOTTOM_FOOTER, footerData } from "@/content/site-data";
import { cn } from "@/lib/utils";
import { MailIcon } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import {
  ListPopulate,
  LogoAndDescription,
} from "../../nivaran/common/footer/FooterTop";
import NewsletterSubscribe from "@/components/new/NewsletterSubscribe/NewsletterSubscribe";

const NivaranFooter = () => {
  const numberRef = useRef<HTMLDivElement | null>(null);

  const { logo, others, ourWork } = footerData;

  return (
    <footer className="w-full px-4 bg-[linear-gradient(to_bottom,_rgba(235,89,52,0.1)_0%,__rgba(235,89,52,0.1)_5%,_#fff_50%)] md:rounded-t-[2.5rem] rounded-t-3xl font-Poppins">
      {/* Newsletter Subscribe */}
      <div className="max-w-[1320px] mx-auto pt-10 pb-2">
        <NewsletterSubscribe variant="inline" />
      </div>

      <div
        className="  max-w-[1320px] mx-auto py-10 text-gray-600 flex flex-col font-poppins  gap-8 "
        ref={numberRef}
      >
        <div className="lg:flex-row  flex flex-col w-full  lg:w-full gap-8 lg:gap-16  lg:justify-evenly ">
          <div className="flex flex-col gap-4 md:gap-2 sm:flex-row sm:justify-between ">
            <div className="flex flex-col gap-4  sm:w-1/2 lg:w-1/2  ">
              <LogoAndDescription logo={logo} />
              <p className="flex items-center gap-1 border-b-2 border-gray-600/50 w-fit">
                <MailIcon stroke="#4b5563" className="w-5 h-5" />
                <Link
                  href="mailto:partnerships@nivaranfoundation.org"
                  className=" text-gray-600 text-sm md:text-md"
                >
                  partnerships@nivaranfoundation.org
                </Link>
              </p>
            </div>
            <div className="lg:hidden block">
              <FooterHollow />
            </div>
          </div>

          <div className="flex flex-col  gap-4 min-[435px]:flex-row min-[380px]:justify-between  sm:gap-10  ">
            <ul className="text-nowrap min-[380px]:w-1/2">
              <FooterTitle title="Our Works" className="mb-3" />
              {ourWork.map((resource, index) => (
                <ListPopulate {...resource} key={index}></ListPopulate>
              ))}
            </ul>
            <ul className="min-[380px]:w-1/2 text-nowrap">
              <FooterTitle title="Useful Links" className="mb-3" />
              {others.map((resource, index) => (
                <ListPopulate {...resource} key={index}></ListPopulate>
              ))}
            </ul>
            <div className="hidden lg:block">
              <FooterHollow />
            </div>
          </div>
        </div>

        {/* EIN & Address */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs text-gray-500">
          <p>501(c)(3) Nonprofit | EIN: 41-2656587</p>
          <p>1025 Massachusetts Ave, Suite 303, Arlington, MA 02476, USA</p>
        </div>

        <div className="w-full h-0.5 gradient-border "></div>
        <div className="flex flex-col gap-5">
          <div className=" visible opacity-100  items-center sm:hidden sm:invisible sm:opacity-0">
            <SocialLinks />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between  gap-4   relative text-xsm sm:text-sm  ">
            <p>&copy; {new Date().getFullYear()} NIVARAN. All rights reserved</p>
            <div className="flex items-center  ">
              {BOTTOM_FOOTER.map((list) => (
                <Link
                  key={list.link}
                  href={list.link}
                  className="[&:not(:last-child)]:border-r-2 [&:not(:last-child)]:border-primary-main/50 py-0.5 px-3 md:px-6 [&:last-child]:pr-0  [&:first-child]:!pl-0 text-nowrap "
                >
                  {list.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h2
      className={`${cn("text-lg text-primary-main lg:leading-5 ", className)}`}
    >
      {title}
    </h2>
  );
};

export default NivaranFooter;
