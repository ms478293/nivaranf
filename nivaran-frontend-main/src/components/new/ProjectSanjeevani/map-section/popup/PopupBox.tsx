import { getPopoverPosition } from "@/lib/map/getPopoverPosition";
import { PopupDaysCovered } from "./PopupDaysCovered";
import { PopupHeader } from "./PopupHeader";
import { PopupMiddle } from "./PopupMiddle";
import { PopoverType } from "./type";

export const PopupBox = ({ popover }: { popover: PopoverType }) => {
  const DistrictInfo = () => {
    return (
      <>
        <PopupHeader popover={popover}></PopupHeader>
        <PopupMiddle popover={popover} />
        <PopupDaysCovered popover={popover} />
      </>
    );
  };

  const { top, left } = getPopoverPosition(popover);

  return (
    <div
      style={{
        top,
        left,
        background: "white",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "16px",
        // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        pointerEvents: "none",
        zIndex: 10,
      }}
      className="  lg:w-72  w-full md:mb-3 md:absolute mt-4 md:mt-0 h-full md:h-auto"
    >
      {popover.visible &&
        (popover?.districtInfo ? (
          <DistrictInfo />
        ) : (
          <p className="font-normal text-sm text-gray-800 flex flex-col gap-2">
            <span className="text-xl/6  font-[600] uppercase text-secondary-800">
              {popover?.districtName}
            </span>
            <span>We are coming soon...</span>
          </p>
        ))}
    </div>
  );
};
