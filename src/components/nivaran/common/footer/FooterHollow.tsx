"use client";
import MoveUpRightArrowIcon from "@/assets/icons/MoveUpRightArrowIcon";
import { ImpactRingBadge } from "@/components/new/NivaranFooter/ImpactRingBadge";
import { AppButton } from "@/components/ui/app-button";
import Link from "next/link";
import { SocialLinks } from "./SocialLinks";

export const FooterHollow = () => {
  return (
    <div className="flex flex-col justify-between gap-6 h-full">
      <div className="flex items-center justify-start  my-4 gap-2 ">
        <div className="flex h-fit relative overflow-visible -ml-3">
          <ImpactRingBadge target={96} />
        </div>
        <div className="flex flex-col justify-between sm:justify-center gap-6 h-full min-[465px]:w-[50%]  lg:w-">
          <span className="items-center text-start text-sm">
            96% of our expenses go to program services.
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
