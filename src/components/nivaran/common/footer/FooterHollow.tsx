"use client";
import MoveUpRightArrowIcon from "@/assets/icons/MoveUpRightArrowIcon";
import { AppButton } from "@/components/ui/app-button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SocialLinks } from "./SocialLinks";

export const FooterHollow = () => {
  const [gifSrc, setGifSrc] = useState("/infographic/hollowCircle.gif");

  useEffect(() => {
    // Update the gifSrc with a timestamp to reload the GIF whenever the component renders
    setGifSrc(`/infographic/hollowCircle.gif?timestamp=${Date.now()}`);
  }, []);

  return (
    <div className="flex flex-col justify-between gap-6 h-full">
      <div className="flex items-center justify-start  my-4 gap-2 ">
        <div className="flex  h-fit relative overflow-visible -ml-3 ">
          <Image
            src={gifSrc}
            width={300}
            height={300}
            alt="HollowCircle"
            className="w-32 h-32 max-h-32 max-w-32 object-cover overflow-visible"
            unoptimized
          />
        </div>
        <div className="flex flex-col justify-between sm:justify-center gap-6 h-full min-[465px]:w-[50%]  lg:w-">
          <span className="items-center text-start text-sm">
            of our expenses go to program services.
          </span>
          <div className="self-start">
            <Link href="/donate" className="  text-sm text-nowrap">
              <AppButton variant="ghost" className="px-0 relative" asChild>
                <div className="flex items-center ">
                  <span className="font-normal ">Donate now</span>
                  <MoveUpRightArrowIcon className="w-4 h-4 fill-primary-500 rotate-45" />
                </div>
              </AppButton>
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        <SocialLinks />
      </div>
    </div>
  );
};
