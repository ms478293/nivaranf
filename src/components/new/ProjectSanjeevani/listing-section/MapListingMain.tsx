import { useState } from "react";
import AccordianComponent from "./AccordianComponent";
import { MapIndexList, MapProvinceList } from "./MapProvinceList";

const MapListingMain = () => {
  const [activeProvince, setActiveProvince] = useState<string | null>(
    "Sudurpashchim"
  );

  const [activeStatus, setActiveStatus] = useState<
    "Planned" | "Ongoing" | "Completed" | "All" | null
  >("All");
  return (
    <div
      className="lg:col-start-8 lg:-col-end-1 h-full col-span-full"
      style={{ alignSelf: "center" }}
    >
      <div className="lg:flex gap-8 lg:flex-col mb-5 mt-6 lg:mt-0 grid grid-cols-1 md:grid-cols-2">
        <MapProvinceList
          activeProvince={activeProvince}
          setActiveProvince={setActiveProvince}
        />
        <MapIndexList
          activeStatus={activeStatus}
          setActiveStatus={setActiveStatus}
          activeProvince={activeProvince}
        />
      </div>
      <AccordianComponent
        activeProvince={activeProvince}
        setActiveProvince={setActiveProvince}
        activeStatus={activeStatus}
      />
    </div>
  );
};

export default MapListingMain;
