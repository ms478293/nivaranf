import { CareerType } from "@/app/(main)/career/page";
import MoveUpRightArrowIcon from "@/assets/icons/MoveUpRightArrowIcon";
import { SuitcaseIcon } from "@/assets/icons/SuitcaseIcon";
import Link from "next/link";

export const CareersList = ({ career }: { career: CareerType }) => {
  const deadline = new Date(career.applyBefore);

  return (
    <div className="flex items-center gap-4 border-b border-gray-50 py-2">
      <div className="bg-secondary-100 p-2 rounded-sm w-fit">
        <SuitcaseIcon className="w-6 h-6 stroke-secondary-800 stroke-1 " />
      </div>
      <div className="">
        <h3 className="text-gray-800 font-medium">{career.jobName}</h3>
        <div className="flex items-center gap-2  text-gray-600 text-xsm  md:text-sm ">
          <p>{career.jobType}</p>
          <div className="w-[1px] h-4 bg-gray-200"></div>
          <p>Apply before: {deadline.toDateString()}</p>
        </div>
      </div>

      <Link
        aria-label={`View Detailed page of ${career.jobName}`}
        href={`/career/${career.id}`}
        className="p-2 hover:bg-primary-500 bg-gray-400 rounded-full transition-all duration-200 ml-auto"
      >
        <MoveUpRightArrowIcon className="w-4 h-4 fill-neutral-50 " />
      </Link>
    </div>
  );
};
