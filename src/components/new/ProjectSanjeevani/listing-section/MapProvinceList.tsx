import { ProvinceCampaignData } from "@/content/Nepal-Info";
import FilterTag from "./FilterTag";

const MapFilterMain = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>{children}</div>;
};
const MapProvinceList = ({
  activeProvince,
  setActiveProvince,
}: {
  activeProvince: string | null;
  setActiveProvince: (province: string) => void;
}) => {
  return (
    <MapFilterMain>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-medium  text-secondary-800">
          Map Overview
        </h2>
        <p className="text-sm text-gray-500">
          Select a province to view details
        </p>
      </div>
      <ul
        className="flex gap-2 flex-wrap mt-2"
        role="list"
        aria-label="List of Provinces"
      >
        {[...ProvinceCampaignData].map((province) => (
          <FilterTag
            key={province.name_of_province}
            label={province.name_of_province}
            setActiveProvince={setActiveProvince}
            isActive={activeProvince === province.name_of_province}
          />
        ))}
      </ul>
    </MapFilterMain>
  );
};

const MapIndexList = ({
  activeStatus,
  setActiveStatus,
  activeProvince,
}: {
  activeStatus: "Planned" | "Ongoing" | "Completed" | "All" | null;
  setActiveStatus: (
    status: "Planned" | "Ongoing" | "Completed" | "All" | null
  ) => void;
  activeProvince: string | null;
}) => {
  return (
    activeProvince !== null && (
      <>
        <MapFilterMain>
          <div className="flex flex-col gap-2  31">
            <h2 className="text-lg font-medium text-secondary-800">
              Index Overview
            </h2>
            <p className="text-sm text-gray-500">
              Select an index to view details
            </p>
          </div>
          <ul
            className="flex gap-2 flex-wrap mt-2"
            role="list"
            aria-label="List of Current Status"
          >
            {["Planned", "Ongoing", "Completed", "All"].map((index) => (
              <FilterTag
                key={index}
                label={index}
                isActive={index === activeStatus}
                setActiveStatus={setActiveStatus}
              />
            ))}
          </ul>
        </MapFilterMain>
      </>
    )
  );
};

export { MapIndexList, MapProvinceList };
