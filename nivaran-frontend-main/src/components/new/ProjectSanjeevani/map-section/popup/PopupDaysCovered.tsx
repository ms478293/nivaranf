import { PopoverType } from "./type";

export const PopupDaysCovered = ({ popover }: { popover: PopoverType }) => {
  let DaysCoveredPercentage = 0;
  const today = new Date().getTime();
  const startDate = new Date(popover.districtInfo?.start_date || "").getTime();
  const endDate = new Date(popover.districtInfo?.end_date || "").getTime();

  if (!startDate || !endDate) {
    return null;
  }

  const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
  const elapsedDays = (today - startDate) / (1000 * 60 * 60 * 24);

  const isOngoing = today >= startDate && today <= endDate;
  const isCompleted = today > endDate;
  const hasNotStarted = today < startDate;

  if (isCompleted) {
    DaysCoveredPercentage = 100;
  } else if (isOngoing) {
    DaysCoveredPercentage = (elapsedDays / totalDays) * 100;
  } else if (hasNotStarted) {
    DaysCoveredPercentage = 0;
  }

  return (
    <div className="bg-secondary-100 mt-2 rounded-md w-full overflow-hidden flex justify-between items-center">
      <p
        className="bg-secondary-800 py-1.5 pl-2.5 text-nowrap text-neutral-50 flex justify-between font-medium"
        style={{
          width: `${DaysCoveredPercentage}%`,
        }}
      >
        Days Covered
      </p>
      <span className="text-secondary-800 pr-2.5 font-semibold font-Outfit text-[18px]">
        {popover.districtInfo?.days_covered ?? "0"}
      </span>
    </div>
  );
};
