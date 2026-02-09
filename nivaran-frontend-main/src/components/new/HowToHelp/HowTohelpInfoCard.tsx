import { BuildingIcon } from "@/assets/icons/BuildingIcon";
import { GiftIcon } from "@/assets/icons/GiftIcon";
import { HandCoinIcon } from "@/assets/icons/HandCoinIcon";
import { HandShakeIcon } from "@/assets/icons/HandShakeIcon";
import MoveUpRightArrowIcon from "@/assets/icons/MoveUpRightArrowIcon";
import { SuitcaseIcon } from "@/assets/icons/SuitcaseIcon";
import { TentIcon } from "@/assets/icons/TentIcon";
import { TrophyIcon } from "@/assets/icons/TrophyIcon";
import { AppButton } from "@/components/ui/app-button";
import Link from "next/link";
import { ReactNode } from "react";

export type DonationType = {
  id: number;
  title: string;
  description: string;
  btnLabel: string;
  icon: ReactNode;
  link: string;
};

export const HOW_TO_HELP = [
  {
    id: 1,
    title: "In-kind Donations",
    description:
      "Donating goods like clothing, medical supplies, and educational materials makes a significant impact. The foundation provides a list of needed items on its website, and every donation helps those in need.",
    btnLabel: "Contact us",
    icon: <GiftIcon className="w-8 h-8 stroke-1 stroke-primary-500" />,
    link: "/contact",
  },
  {
    id: 2,
    title: "Monetary Donations",
    description:
      "Financial donations are essential to the foundation’s work, directly supporting healthcare, education, and nutrition efforts. Your contribution ensures ongoing services and improvements for those in need.",
    btnLabel: "Donate now",
    icon: <HandCoinIcon className="w-8 h-8 stroke-1 stroke-primary-500" />,
    link: "/donate",
  },
  {
    id: 3,
    title: "Corporate Sponsorship",
    description:
      "Businesses can partner with us to sponsor projects or support employee volunteering through CSR programs. These partnerships help us reach more people and make a bigger impact.",
    btnLabel: "Contact us",
    icon: <BuildingIcon className="w-8 h-8 stroke-1 stroke-primary-500" />,
    link: "/contact",
  },
  {
    id: 4,
    title: "Fundraise for NIVARAN",
    description:
      "We fosters a culture of collaboration and respect, where teamwork and mutual support are at the core of our work, and every individual is valued for their contributions and perspectives through a fun and impactful way.",
    btnLabel: "Contact us",
    icon: <TentIcon className="w-8 h-8 stroke-1 stroke-primary-500" />,
    link: "/contact",
  },
  {
    id: 5,
    title: "Volunteering",
    description:
      "Volunteering your time and skills is invaluable. Whether assisting with events or working directly with programs, your involvement makes a tangible impact on the foundation’s success.",
    btnLabel: "Contact us",
    icon: <HandShakeIcon className="w-8 h-8 stroke-1 stroke-primary-500" />,
    link: "/contact",
  },
  {
    id: 6,
    title: "Leave a Legacy, Planned giving",
    description:
      "Planned giving or bequests allow you to support the foundation long-term, ensuring their work continues to benefit communities in Nepal for future generations.",
    btnLabel: "Contact us",
    icon: <TrophyIcon className="w-8 h-8 stroke-1 stroke-primary-500" />,
    link: "/contact",
  },
  {
    id: 7,
    title: "Make a Difference",
    description:
      "We’re seeking passionate individuals who want to make a difference. By joining our team, you’ll play a crucial role in advancing our mission to improve lives in Nepal. ",
    btnLabel: "Contact us",
    icon: <SuitcaseIcon className="w-8 h-8 stroke-1 stroke-primary-500" />,
    link: "/contact",
  },
];

export const HowTohelpInfoCard = () => {
  return (
    <div className="flex flex-wrap lg:justify-center gap-4">
      {HOW_TO_HELP.map((help) => (
        <div
          key={help.id}
          className="p-4 flex flex-col gap-4 justify-between bg-primary-50 rounded-xl border border-primary-200 flex-1  min-w-[315px]  "
        >
          {help.icon}
          <h3 className="font-medium text-[18px] text-gray-800">
            {help.title}
          </h3>
          <p className="text-sm font-light text-gray-600">{help.description}</p>

          <Link href={help.link} className="">
            <AppButton variant="ghost" className="px-0 relative " asChild>
              <div className="flex items-center gap-1">
                <span className="font-normal text-sm">{help.btnLabel}</span>
                <MoveUpRightArrowIcon className="w-4 h-4 fill-primary-500" />
              </div>
            </AppButton>
          </Link>
        </div>
      ))}
    </div>
  );
};
