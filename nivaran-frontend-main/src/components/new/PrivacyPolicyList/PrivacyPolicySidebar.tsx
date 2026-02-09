import ArrowDownIcon from "@/assets/icons/ArrowDownIcon";
import { privacyPolicySections } from "@/content/privacy-policy";
import Link from "next/link";
import { SetStateAction } from "react";

export const PrivacyPolicySidebar = ({
  activeId,
  setActiveId,
  onClose,
}: {
  activeId?: string;
  setActiveId?: React.Dispatch<SetStateAction<string>>;
  onClose?: () => void;
}) => {
  return (
    <div className="md:sticky md:top-20 md:w-fit">
      <div
        className=" flex-col md:w-fit md:mt-6 bg-gray-50 rounded-xl self-start p-4 gap-2 sticky top-20  flex"
        onClick={() => onClose?.()}
      >
        <div
          className="flex justify-between p-4 -mb-4 w-full"
          onClick={() => onClose?.()}
        >
          <p className="font-medium md:text-lg">Privacy Policy</p>
          <ArrowDownIcon className="w-5 h-5 stroke-gray-600 md:hidden" />
        </div>
        {privacyPolicySections.map((privacy, i) => (
          <Link
            className={`text-gray-600 hover:text-primary-500 transition-all duration-200 hover:underline text-nowrap ${
              privacy.id === activeId ? "text-primary-500 underline" : ""
            }`}
            href={`#${privacy.id}`}
            onClick={() => setActiveId(privacy.id)}
            key={i}
          >
            {i + 1}. {privacy.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
