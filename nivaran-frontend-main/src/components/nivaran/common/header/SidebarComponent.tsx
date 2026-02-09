"use client";

import Link from "next/link";

import { SmallAboutUsMegaMenu } from "@/components/new/MegaMenu/SmallAboutUsMegaMenu";
import { SmallNewsAndStoriesMegaMenu } from "@/components/new/MegaMenu/SmallNewsAndStoriesMegaMenu";
import { SmallProjectsMegaMenu } from "@/components/new/MegaMenu/SmallProjectsMegaMenu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AppButton } from "@/components/ui/app-button";
import Image from "next/image";

export const NAVBAR_LIST = [
  {
    id: 1,
    label: "Projects",
    component: <SmallProjectsMegaMenu />,
  },
  {
    id: 2,
    label: "News & Stories",
    component: <SmallNewsAndStoriesMegaMenu />,
  },
  {
    id: 3,
    label: "About us",
    component: <SmallAboutUsMegaMenu />,
  },
];

export function Sidebar() {
  return (
    <div className="w-full  rounded-lg  h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 font-Poppins p-4 flex flex-col justify-between">
      <div className="w-full flex items-center justify-start mb-1 ">
        <Link className="w-24 cursor-pointer" href="/">
          <Image
            src={"/NivaranLogo.svg"}
            alt="Nivaran Logo"
            width={1000}
            height={1000}
          />
        </Link>
      </div>
      <Accordion type="single" className="space-y-4 flex-1 mt-4" collapsible>
        {NAVBAR_LIST.map((navbar, index) => (
          <AccordionItem
            value={navbar.label}
            key={index}
            className=" border-b last:border-none"
          >
            <AccordionTrigger className="text-gray-800  text-lg  py-1 no-underline data-[state=open]:no-underline data-[state=open]:text-primary-500 data-[state=open]:[&>svg]:!stroke-primary-500   bg-neutral-50 font-medium ">
              <p className="text-base"> {navbar.label}</p>{" "}
            </AccordionTrigger>
            <AccordionContent className=" text-gray-400 mt-2">
              {navbar.component}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex flex-col gap-4">
        <div className="w-full h-[300px] sm:h-[325px] relative rounded-xl overflow-hidden">
          <Image
            src="/why-nivaran/why-nivaran-4.png"
            alt="Image"
            width={500}
            height={500}
            className="w-full h-full object-cover "
            style={{
              objectPosition: "left 25% top 40%",
            }}
          />

          <div className="absolute w-full h-[200px] bg-[linear-gradient(to_bottom,_transparent_12%,_#000_50%_,#000_10%)] left-0 bottom-0"></div>
          <p className="absolute bottom-0 p-4 text-neutral-50 text-[18px] font-[300] flex flex-col ">
            <Image
              className="w-[3rem] "
              width={500}
              height={500}
              src={"/heart.png"}
              alt="Heart Image"
            />
            <span>Be a source</span>
            <span>of Joy for Someone in Need</span>
          </p>
        </div>
        <div className="flex items-center gap-2 w-full">
          <Link href="/volunteer" className="block w-full">
            <AppButton
              variant="primary-outline"
              className=" border border-primary-500 text-primary-500  hover:bg-primary-200 hover:text-primary-500 hover:border-transparent font-normal w-full py-2"
              // size="sm"
            >
              Volunteer
            </AppButton>
          </Link>
          <Link href="/donate" className="block w-full">
            <AppButton
              variant="primary"
              // className="ml-4 text-base hover:text-primary-500"
              className=" font-normal hover:border-transparent hover:bg-primary-200 hover:text-primary-500 w-full py-2"
              // size="sm"
            >
              Donate now
            </AppButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
