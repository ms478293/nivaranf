import { District_Campaign_Type } from "@/content/Nepal-Info";
import StatsBox from "./StatsBox";

export const StatsGrid = ({
  currentDistrict,
}: {
  currentDistrict: {
    districtName: string;
    districtInfo?: District_Campaign_Type;
  };
}) => (
  <>
    {" "}
    <h3 className="text-gray-600 text-md uppercase font-semibold mb-1 ">
      {currentDistrict?.districtName}
    </h3>
    <ul className="grid max-[400px]:grid-cols-1 grid-cols-3 gap-2 md:w-1/2 lg:w-1/3">
      <li className="flex flex-col gap-1 ">
        <StatsBox
          label={"Gaupalika"}
          totalStats={currentDistrict?.districtInfo?.total_gaupalikas}
          variant="outline"
        />
      </li>

      <li className="flex flex-col gap-1 ">
        <StatsBox
          label={"Total Camp"}
          totalStats={currentDistrict?.districtInfo?.total_camps_setup}
          variant="outline"
        />
      </li>

      <li className="flex flex-col gap-1 ">
        <StatsBox
          label={"Working Day"}
          totalStats={currentDistrict?.districtInfo?.days_covered}
          variant="outline"
        />
      </li>
    </ul>
  </>
);
