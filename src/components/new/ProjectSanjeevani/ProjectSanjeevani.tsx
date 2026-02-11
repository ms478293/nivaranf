"use client";

import RightArrowIcon from "@/assets/icons/RightArrowIcon";
import { AppButton } from "@/components/ui/app-button";
import {
  District_Campaign_Type,
  ProvinceCampaignData,
} from "@/content/Nepal-Info";
import { useDistrictHover } from "@/hooks/map/useDistrictHover";
import Link from "next/link";
import { useRef, useState } from "react";
import MainTitle from "../MainTitle/MainTitle";
import { default as MapListingMain } from "./listing-section/MapListingMain";
import { NepalMap } from "./map-section/NepalMap";

const ProjectSanjeevani = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [isAllColored, setIsAllColored] = useState(false);
  const [popover, setPopover] = useState<{
    visible: boolean;
    x: number;
    y: number;
    districtName: string;
    districtInfo?: District_Campaign_Type;
  }>({
    visible: false,
    x: 0,
    y: 0,
    districtName: "",
    districtInfo: undefined,
  });

  const [currentDistrict, setCurrentDistrict] = useState<{
    districtName: string;
    districtInfo?: District_Campaign_Type;
  } | null>(null);

  useDistrictHover({
    svgRef,
    ProvinceCampaignData,
    setPopover,
    setCurrentDistrict,
    setIsAllColored,
  });

  //Popover postition code this uses x , and y and gives top and left, used for hover in map.
  // const { top, left } = getPopoverPosition(popover);

  return (
    <section
      className="w-full px-4 bg-white font-light font-Poppins"
      id="project-sanjeevani"
    >
      <div className="max-w-[1320px] mx-auto flex flex-col py-4 md:py-16">
        <div className="flex flex-col md:gap-4 sm:flex-row justify-between items-start sm:items-center sm:mb-8 mb-4 px-4">
          <MainTitle suffix="Project" prefix="Sanjeevani" className="mb-6" />
          <Link href="/sanjeevani">
            <AppButton
              variant="ghost"
              className="hover:scale-105 transition-transform duration-100 pl-0"
            >
              <span>View more</span>
              <RightArrowIcon className="w-5 h-5 fill-primary-500" />
            </AppButton>
          </Link>
        </div>

        <div className="grid lg:grid-cols-10 w-full grid-cols-1">
          <div className="col-start-1 lg:col-end-8 col-end-6">
            <NepalMap
              currentDistrict={currentDistrict}
              isAllColored={isAllColored}
              svgRef={svgRef}
              popover={popover}
            />
          </div>
          <MapListingMain />
        </div>
      </div>
    </section>
  );
};

export default ProjectSanjeevani;
