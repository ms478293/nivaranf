import { District_Campaign_Type } from "@/content/Nepal-Info";
import { StatsGrid } from "./StatsGrid";
import { TotalFigures } from "./TotalFigures";

export const StatsMainComponent = ({
  isAllColored,
  currentDistrict,
}: {
  isAllColored: boolean;
  currentDistrict?: {
    districtName: string;
    districtInfo?: District_Campaign_Type;
  };
}) => (
  <div className="relative  left-0 flex flex-col">
    {isAllColored ? (
      <TotalFigures />
    ) : (
      currentDistrict && (
        <StatsGrid currentDistrict={currentDistrict}></StatsGrid>
      )
    )}
  </div>
);
