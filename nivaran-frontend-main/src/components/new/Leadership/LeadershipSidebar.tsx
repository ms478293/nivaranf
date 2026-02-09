import ArrowDownIcon from "@/assets/icons/ArrowDownIcon";
import { LEADERSHIP_DATA } from "@/content/leadership";
import Link from "next/link";
import { SetStateAction } from "react";

export const LeadershipSidebar = ({
  activeId,
  setActiveId,
  onClose,
}: {
  activeId: string;
  setActiveId: React.Dispatch<SetStateAction<string>>;
  onClose?: () => void;
}) => {
  return (
    <div className="md:sticky md:top-20 font-Poppins">
      <div
        className="flex justify-between p-4 -mb-4 w-full"
        onClick={() => onClose?.()}
      >
        <p className="font-medium text-lg">Filter for Leadership</p>
        <ArrowDownIcon className="w-5 h-5 stroke-gray-600 md:hidden" />
      </div>
      <div className=" flex-col w-fit mt-2  rounded-xl self-start p-4 gap-4   flex ">
        {LEADERSHIP_DATA.map((leader, i) => (
          <Link
            className={`scroll-sec text-gray-600 hover:text-primary-500 text-nowrap hover:underline uppercase font-normal ${
              leader.title === activeId ? "text-primary-500 underline" : ""
            }`}
            href={`#${leader.title}`}
            onClick={() => {
              setActiveId(leader.title);
              onClose?.();
            }}
            key={i}
          >
            {" "}
            {leader.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
