import { formatDate } from "@/lib/helpers/formatDate";

interface popoverType {
  visible: boolean;
  x: number;
  y: number;
  districtName: string;
  districtInfo?: {
    total_gaupalikas: number;
    gaupalikas_covered: number;
    total_camps_setup: number;
    start_date: Date | undefined;
    end_date: Date | undefined;
    days_covered: number;
  };
}
export const PopupHeader = ({ popover }: { popover: popoverType }) => {
  console.log(popover);
  return (
    <div className="flex flex-col gap-1 mb-4 ">
      <h3 className="text-xl/6  font-[600] uppercase text-secondary-800">
        {popover.districtName}
      </h3>
      <p className="flex gap-2 font-normal text-sm text-gray-800">
        <span>
          {popover.districtInfo?.start_date?.toISOString() &&
            formatDate(popover.districtInfo.start_date.toISOString())}
        </span>
        {"-"}
        <span>
          {popover.districtInfo?.end_date?.toISOString() &&
            formatDate(popover.districtInfo.end_date.toISOString())}
        </span>
      </p>
    </div>
  );
};
