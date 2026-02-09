import LocateIcon from "@/assets/icons/LocateIcon";
import RenderList from "@/components/nivaran/common/renderList/RenderList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  District_Campaign_Type,
  Provice_Campaign_Type,
  ProvinceCampaignData,
} from "@/content/Nepal-Info";
import React, { SetStateAction, useState } from "react";
import StatsBox from "./map-section/stats/StatsBox";

interface ProvinceDetailsProps {
  setPopover: React.Dispatch<
    SetStateAction<{
      visible: boolean;
      x: number;
      y: number;
      districtName: string;
      districtInfo?: District_Campaign_Type;
    }>
  >;
  svgRef: React.RefObject<SVGSVGElement>;
}

const ProvinceDetails = ({ svgRef, setPopover }: ProvinceDetailsProps) => {
  const [activeFilterTag, setActiveFilterTag] = useState("");

  return (
    <div
      className=" hidden sm:block lg:col-start-8 lg:-col-end-1 h-fit col-span-full"
      style={{
        alignSelf: "center",
      }}
    >
      <div className="flex gap-2 flex-col mb-5 mt-6 lg:mt-0">
        <h3 className="uppercase text-gray-950 text-xl font-medium">
          Map Details
        </h3>
        <FilterTagList
          activeFilterTag={activeFilterTag}
          setActiveFilterTag={setActiveFilterTag}
        />
      </div>
      <div>
        <AccordionProvince svgRef={svgRef} setPopover={setPopover} />
      </div>
    </div>
  );
};

const FilterTag = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
}) => {
  return (
    <li
      aria-label={`Click to Filter by ${label}`}
      className={`pointer text-gray-600 px-3 text-sm py-0.5 hover:bg-secondary-200  hover:text-secondary-800  bg-gray-100 rounded-full ${
        isActive ? "bg-secondary-200  text-secondary-800 " : ""
      }`}
      onClick={onClick}
    >
      {label}
    </li>
  );
};

const FilterTagList = ({
  activeFilterTag,
  setActiveFilterTag,
}: {
  activeFilterTag: string;
  setActiveFilterTag: React.Dispatch<SetStateAction<string>>;
}) => {
  return (
    <ul className="flex gap-1.5 flex-wrap">
      {
        <RenderList
          data={["Completed", "On-going", "Planned"]}
          render={(status) => (
            <FilterTag
              label={status}
              key={status}
              onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                setActiveFilterTag((e.target as HTMLElement).textContent);
              }}
              isActive={status === activeFilterTag}
            />
          )}
        />
      }
    </ul>
  );
};

const AccordionProvince = ({ svgRef, setPopover }: ProvinceDetailsProps) => {
  const [activeProvince, setActiveProvince] = useState<string | null>(
    "Sudurpashchim"
  );

  const handleActiveProvince = (province: string) => {
    setActiveProvince((currProvince) =>
      currProvince === province ? null : province
    );
  };

  // Reset district colors to their original based on campaign data
  const resetDistrictColors = (highlightedProvince?: Provice_Campaign_Type) => {
    if (!svgRef.current) return;

    const paths = Array.from(
      svgRef.current.querySelectorAll("path[id]")
    ) as SVGPathElement[];

    paths.forEach((path) => {
      const districtName = path.id.split("__")[1];
      const districtData = ProvinceCampaignData.flatMap(
        (province) => province.districts_covered
      ).find((d) => d.name_of_district === districtName);

      if (
        highlightedProvince &&
        highlightedProvince.districts_covered.some(
          (district) => district.name_of_district === districtName
        )
      ) {
        return;
      }

      if (districtData) {
        // Apply fill color based on status
        if (districtData.status === "planned") path.style.fill = "#a9cda8";
        else if (districtData.status === "completed")
          path.style.fill = "#283f28";
        else if (districtData.status === "ongoing") path.style.fill = "#447544";
        else path.style.fill = "white"; // Default to white for uninitialized districts
      } else {
        path.style.fill = "white"; // Default for districts with no data
      }
    });
  };

  // Highlight a province
  // const highlightProvince = (province: Provice_Campaign_Type) => {
  //   if (svgRef.current) {
  //     resetDistrictColors(province); // Keep only the highlighted province intact

  //     const paths = Array.from(
  //       svgRef.current.querySelectorAll("path[id]")
  //     ) as SVGPathElement[];

  //     paths.forEach((path) => {
  //       const districtName = path.id.split("__")[1];
  //       const isInProvince = province.districts_covered.some(
  //         (district) => district.name_of_district === districtName
  //       );

  //       if (isInProvince) {
  //         path.style.fill = "gray"; // Highlight all districts in the province
  //       }
  //     });
  //   }
  // };

  // Unhighlight a province and reset colors
  // const unhighlightProvince = () => {
  //   resetDistrictColors(); // Reset all districts to their original colors
  // };

  // Highlight a district
  const highlightDistrict = (district: District_Campaign_Type) => {
    setPopover({
      districtInfo: district,
      districtName: district.name_of_district,
      x: 800,
      y: -40,
      visible: true,
    });

    if (svgRef.current) {
      const districtPath = svgRef.current.querySelector(
        `path[id$="__${district.name_of_district}"]`
      ) as SVGPathElement | null;

      if (districtPath) districtPath.style.fill = "#94bde5"; // Highlight the district
    }
  };

  // Unhighlight a district and reset colors
  const unhighlightDistrict = () => {
    resetDistrictColors(); // Reset all districts to their original colors
  };

  return (
    <Accordion
      type="single"
      className="flex flex-col gap-2"
      collapsible
      defaultValue={"Sudurpashchim"}
    >
      <RenderList
        data={ProvinceCampaignData}
        render={(data) => (
          <AccordionItem
            value={data.name_of_province}
            className=" border-gray-100 py-2 px-2
       rounded-md border-y-2 bg-[#FCFCFC] relative"
            key={data.name_of_province}
          >
            <>
              <AccordionTrigger
                className="hover:no-underline w-full  py-0"
                onClick={() => handleActiveProvince(data.name_of_province)}
              >
                <h3 className="text-secondary-800 text-lg font-medium w-full">
                  {data.name_of_province}{" "}
                </h3>
              </AccordionTrigger>
              <AccordionContent className="">
                <div
                  className={`
              flex text-center items-center   gap-1 absolute top-2 right-6 transition-all duration-300 ${
                activeProvince === data.name_of_province
                  ? "absolute top-2 right-6 "
                  : "opacity-0 invisible"
              } `}
                >
                  <button
                    aria-label="Show on map button"
                    className="text-xsm bg-red-500 h-fit py-1 px-2 text-neutral-50 rounded-sm flex items-center justify-between gap-1.5"
                  >
                    <LocateIcon className="w-4 h-4 stroke-neutral-50" />
                    <span className="text-xsm">Show on map</span>
                  </button>
                </div>

                <div className="flex flex-col gap-6 mt-2.5">
                  <div className="grid grid-cols-3 gap-2 ">
                    <StatsBox
                      label="Gaupalika Covered"
                      totalStats={data.gaupalikas_covered}
                      className="[&>span:nth-child(2)]:text-xsm"
                    />
                    <StatsBox
                      label="Camp setup"
                      totalStats={data.total_camps_setup}
                      className="[&>span:nth-child(2)]:text-xsm"
                    />
                    <StatsBox
                      label="Working Days"
                      totalStats={data.districts_covered.reduce(
                        (acc, curr) => acc + curr.days_covered,
                        0
                      )}
                      className="[&>span:nth-child(2)]:text-xsm"
                    />
                  </div>
                  <h4 className="text-gray-800">District included</h4>
                  <ul className="flex gap-x-6 gap-y-5 flex-wrap">
                    {
                      <RenderList
                        data={data.districts_covered}
                        render={(district) => (
                          <button
                            aria-label={`Click on District ${district.name_of_district}`}
                            key={district.name_of_district}
                            className="text-secondary-600 border-b-2 border-transparent hover:border-b-2 transition-all duration-300 hover:border-secondary-600 text-sm "
                            onMouseEnter={() => highlightDistrict(district)}
                            onClick={() => highlightDistrict(district)}
                            onMouseLeave={() => unhighlightDistrict()}
                          >
                            {district.name_of_district}
                          </button>
                        )}
                      />
                    }
                  </ul>
                </div>
              </AccordionContent>
            </>
          </AccordionItem>
        )}
      />
    </Accordion>
  );
};

export default ProvinceDetails;
