import ArrowDownIcon from "@/assets/icons/ArrowDownIcon";
import { TermsAndService } from "@/content/terms-and-service";
import Link from "next/link";
import { SetStateAction } from "react";

export const TermsAndServiceSidebar = ({
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
        className=" flex-col md:w-fit md:mt-6 bg-gray-50 rounded-xl self-start p-4 gap-2 sticky top-20  flex"
        onClick={() => onClose?.()}
      >
        <div
          className="flex justify-between p-4 -mb-4 w-full"
          onClick={() => onClose?.()}
        >
          <p className="font-medium md:text-lg">Terms of Service</p>
          <ArrowDownIcon className="w-5 h-5 stroke-gray-600 md:hidden" />
        </div>
        {TermsAndService.map((privacy, i) => (
          <Link
            className={`scroll-sec text-gray-600 hover:text-primary-500 text-nowrap hover:underline ${
              privacy.id === activeId ? "text-primary-500 underline" : ""
            }`}
            href={`#${privacy.id}`}
            onClick={() => setActiveId(privacy.id)}
            key={privacy.id}
          >
            {i + 1}. {privacy.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
