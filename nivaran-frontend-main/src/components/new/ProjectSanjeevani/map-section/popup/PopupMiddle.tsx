import StatsBox from "../stats/StatsBox";
import { PopoverType } from "./type";

export const PopupMiddle = ({ popover }: { popover: PopoverType }) => {
  return (
    <div className="flex gap-2">
      <StatsBox
        label="Gaupalika Covered"
        totalStats={popover.districtInfo?.total_gaupalikas}
        variant="default"
        className="w-1/2"
      />
      <StatsBox
        label="Camp setup"
        totalStats={popover.districtInfo?.total_camps_setup}
        variant="default"
        className="w-1/2"
      />
    </div>
  );
};
