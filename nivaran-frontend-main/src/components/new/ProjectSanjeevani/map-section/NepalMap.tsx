import { District_Campaign_Type } from "@/content/Nepal-Info";
import { useEffect, useRef } from "react";
import MySvg from "../../../../../public/nepal/Nepal Map.svg"; // Import the SVG
import { IndexComponent } from "./index/IndexComponent";
import { PopupBox } from "./popup/PopupBox";
import { StatsMainComponent } from "./stats/StatsMainComponent";

export const NepalMap = ({
  svgRef,
  isAllColored,
  currentDistrict,
  popover,
}: {
  svgRef: React.RefObject<SVGSVGElement>;
  isAllColored: boolean;
  currentDistrict?: {
    districtName: string;
    districtInfo?: District_Campaign_Type;
  } | null;
  popover?: {
    visible: boolean;
    x: number;
    y: number;
    districtName: string;
    districtInfo?: District_Campaign_Type;
  };
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const svg = containerRef.current.querySelector("svg");
      if (svg && svgRef) {
        svgRef.current = svg as SVGSVGElement; // Assign the ref manually
      }
    }
  }, [svgRef]);

  return (
    <div className="h-full lg:h-full relative flex flex-col">
      <div className="flex items-center h-full" ref={containerRef}>
        <MySvg /> {/* Directly render the imported SVG */}
      </div>
      <IndexComponent />
      <StatsMainComponent
        isAllColored={isAllColored}
        currentDistrict={currentDistrict}
      />
      {popover?.visible && isAllColored && <PopupBox popover={popover} />}
    </div>
  );
};
