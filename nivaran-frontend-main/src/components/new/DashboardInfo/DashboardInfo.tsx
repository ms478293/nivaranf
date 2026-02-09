import { ContainerIcon } from "@/assets/icons/ContainerIcon";

export const DashboardInfo = ({
  stats,
  label,
}: {
  stats: number | string;
  label: string;
}) => {
  return (
    <div className="flex flex-col justify-between h-28 bg-neutral-50 w-full  p-2 border border-gray-100 rounded-md">
      <p className="text-gray-800 font-semibold text-xl">{stats}</p>
      <div className="flex items-end justify-between">
        <p className="text-gray-600 text-xsm">{label}</p>
        <span className="bg-primary-100 p-2 inline-block w-fit rounded-sm">
          <ContainerIcon className="stroke-1 w-8 h-8 stroke-primary-500" />
        </span>
      </div>
    </div>
  );
};
