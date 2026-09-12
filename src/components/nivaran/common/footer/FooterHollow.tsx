"use client";
import MoveUpRightArrowIcon from "@/assets/icons/MoveUpRightArrowIcon";
import { AppButton } from "@/components/ui/app-button";
import Link from "next/link";
import { SocialLinks } from "./SocialLinks";

export const FooterHollow = () => {
  return (
    <div className="flex flex-col justify-between gap-6 h-full">
      <div className="flex items-center justify-start  my-4 gap-2 ">
        <div className="flex flex-col justify-between sm:justify-center gap-6 h-full min-[465px]:w-[50%]  lg:w-">
          <span className="items-center text-start text-sm">
            See our financial reporting status.
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
