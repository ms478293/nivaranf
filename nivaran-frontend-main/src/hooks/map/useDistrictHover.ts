// hooks/useDistrictHover.ts
import {
  District_Campaign_Type,
  Provice_Campaign_Type,
} from "@/content/Nepal-Info";
import { useEffect } from "react";

export const useDistrictHover = ({
  svgRef,
  ProvinceCampaignData,
  setPopover,
  setCurrentDistrict,
  setIsAllColored,
}: {
  svgRef: React.RefObject<SVGSVGElement>;
  ProvinceCampaignData: Provice_Campaign_Type[];
  setPopover: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
      x: number;
      y: number;
      districtName: string;
      districtInfo?: District_Campaign_Type;
    }>
  >;
  setCurrentDistrict: React.Dispatch<
    React.SetStateAction<{
      districtName: string;
      districtInfo?: District_Campaign_Type;
    } | null>
  >;
  setIsAllColored: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    if (!svgRef.current) return;

    const paths = Array.from(
      svgRef.current.querySelectorAll("path[id]")
    ) as SVGPathElement[];

    let filledCount = 0;
    const districtsWithData = ProvinceCampaignData.flatMap(
      (province) => province.districts_covered
    );

    paths.forEach((path, index) => {
      const districtName = path.id.split("__")[1];
      const districtData = districtsWithData.find(
        (d) => d.name_of_district === districtName
      );

      const handleMouseEnter = () => {
        const pathId = path.id;
        const distPath = document.getElementById(pathId);

        const rect = distPath.getBoundingClientRect();

        setPopover({
          visible: true,
          x: rect.x,
          y: rect.y,
          districtName,
          districtInfo: districtData,
        });
      };

      const handleMouseLeave = () => {
        setPopover((prev) => ({ ...prev, visible: false }));
      };

      path.addEventListener("mouseenter", handleMouseEnter);
      path.addEventListener("mouseleave", handleMouseLeave);

      if (districtData) {
        setTimeout(() => {
          if (districtData.status === "planned") path.style.fill = "#a9cda8";
          else if (districtData.status === "completed")
            path.style.fill = "#283f28";
          else if (districtData.status === "ongoing")
            path.style.fill = "#447544";

          setCurrentDistrict({
            districtName,
            districtInfo: {
              ...districtData,
              start_date: new Date(districtData.start_date),
              end_date: new Date(districtData.end_date),
            },
          });

          filledCount++;
          if (filledCount === districtsWithData.length) {
            setIsAllColored(true);
          }
        }, index * 300);
      }

      return () => {
        path.removeEventListener("mouseenter", handleMouseEnter);
        path.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, [
    svgRef,
    ProvinceCampaignData,
    setPopover,
    setCurrentDistrict,
    setIsAllColored,
  ]);
};
