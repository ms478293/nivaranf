import RenderList from "@/components/nivaran/common/renderList/RenderList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProvinceCampaignData } from "@/content/Nepal-Info";
import { cn } from "@/lib/utils";
import StatsBox from "../map-section/stats/StatsBox";

const AccordianComponent = ({
  activeProvince,
  activeStatus,
  setActiveProvince,
}: {
  activeProvince: string | null;
  setActiveProvince: (province: string) => void;
  activeStatus: "Planned" | "Ongoing" | "Completed" | "All" | null;
}) => {
  return (
    <div>
      <Accordion
        type="single"
        className="flex flex-col gap-2"
        collapsible
        value={activeProvince} // Ensure state consistency
      >
        <RenderList
          data={ProvinceCampaignData}
          render={(data) => {
            const filteredDistricts =
              activeStatus === "All"
                ? data.districts_covered
                : data.districts_covered.filter(
                    (district) =>
                      district.status.toLowerCase() ===
                      activeStatus.toLowerCase()
                  );

            return (
              <AccordionItem
                value={data.name_of_province}
                className={cn(
                  "border-gray-100 py-2 px-2 rounded-md border-y-2 bg-[#FCFCFC]",
                  activeProvince === data.name_of_province
                    ? "relative"
                    : "hidden"
                )}
                key={data.name_of_province}
              >
                <AccordionTrigger
                  className="hover:no-underline w-full py-0"
                  onClick={() =>
                    activeProvince == null
                      ? setActiveProvince(data.name_of_province)
                      : setActiveProvince(null)
                  }
                >
                  <h3 className="text-secondary-800 text-lg font-medium w-full">
                    {data.name_of_province}
                  </h3>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="flex text-center items-center gap-1 absolute top-2 right-6 transition-all">
                    {/* <button className="text-xsm bg-red-500 h-fit py-1 px-2 text-neutral-50 rounded-sm flex items-center justify-between gap-1.5">
                      <LocateIcon className="w-4 h-4 stroke-neutral-50" />
                      <span className="text-xsm">Show on map</span>
                    </button> */}
                  </div>

                  <div className="flex flex-col gap-6 mt-2.5">
                    <div className="grid grid-cols-3 gap-2">
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
                    <ul className="flex gap-x-6 gap-y-2 flex-wrap">
                      <RenderList
                        data={filteredDistricts}
                        render={(district) => (
                          <button
                            aria-label={`Filtered Districts Button of ${district.name_of_district}`}
                            key={district.name_of_district}
                            className="text-secondary-600 border-b-2 border-transparent hover:border-secondary-600 transition-all duration-300"
                          >
                            {district.name_of_district}
                          </button>
                        )}
                      />
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          }}
        />
      </Accordion>
    </div>
  );
};

export default AccordianComponent;
