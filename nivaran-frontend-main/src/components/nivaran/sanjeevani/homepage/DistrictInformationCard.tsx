export const DistrictInformationCard = ({
  currentDistrict,
}: {
  currentDistrict: {
    districtName: string;
    districtInfo?: {
      total_gaupalikas: number;
      gaupalikas_covered: number;
      total_camps_setup: number;
      start_date: Date | undefined;
      end_date: Date | undefined;
      days_covered: number;
    };
  };
} | null) => {
  return (
    <div className="flex flex-col gap-4 p-3 h-fit w-fit rounded-2xl bg-white">
      <div>
        <h3 className="text-[24px] leading-6 font-semibold text-[#204A77] ">
          {currentDistrict.districtName}
        </h3>
        <div className="text-sm leading-normal">
          <span>
            {typeof currentDistrict.districtInfo.start_date == undefined
              ? "TBD"
              : currentDistrict.districtInfo.start_date.toDateString()}
          </span>
          {" - "}
          <span>
            {typeof currentDistrict.districtInfo.end_date == undefined
              ? "TBD"
              : currentDistrict.districtInfo.end_date.toDateString()}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1 text-[#204A77]">
        <div className="flex gap-1">
          <div className="rounded-sm p-1 flex flex-col justify-between  h-24 bg-[#E5EEF9] w-1/2">
            <div className="text-lg font-bold">
              {currentDistrict.districtInfo.gaupalikas_covered}
            </div>
            <div className="text-xs/[18px] font-normal text-wrap ">
              Gaupalikas Covered
            </div>
          </div>
          <div className="rounded-sm p-1 flex flex-col justify-between h-24 bg-[#E5EEF9] w-1/2">
            <div className="text-lg font-bold ">
              {currentDistrict.districtInfo.total_camps_setup}
            </div>
            <div className="text-xs/[18px] font-normal text-wrap break-words">
              Camps Setup
            </div>
          </div>
        </div>
        <div className="h-9 bg-[#E5EEF9]">
          <div className="h-full flex justify-between">
            <span className=" bg-[#204A77] h-full flex text-white items-center justify-center w-1/2 text-xs/3 font-medium">
              Days Covered
            </span>
            <span className="px-3 py-1 text-lg/5 font-bold">
              {currentDistrict.districtInfo.days_covered}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
