"use client";

import ArrowDownIcon from "@/assets/icons/ArrowDownIcon";
import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { FAQdata } from "@/content/faq";
import Link from "next/link";
import { useState } from "react";

export const FAQTitle = ({
  filteredFAQS,
  onClose,
}: {
  filteredFAQS: typeof FAQdata;
  onClose?: () => void;
}) => {
  const [activeFaq, setActiveFaq] = useState(null);
  return (
    <div className=" flex-col gap-3 md:max-w-[300px] h-[60vh] md:h-auto overflow-y-auto flex px-2 md:px-0 relative lg:mr-4 md:mr-0 rounded-t-2xl font-Poppins">
      <div
        className="flex justify-between p-4 w-full  bg-neutral-50 sticky   top-0"
        onClick={() => onClose?.()}
      >
        {" "}
        <p className="text-gray-950 font-medium  ">Filter by topic</p>
        <ArrowDownIcon className="w-5 h-5 stroke-gray-600 md:hidden" />
      </div>
      <ul className="flex flex-col gap-1  pb-4">
        <RenderList
          data={filteredFAQS}
          render={(faq, i) => (
            <li
              key={i}
              className={`cursor-pointer text-gray-600 bg-gray-50  rounded-md px-1 font-normal block w-full leading-5 hover:text-primary-500 hover:bg-primary-100 transition-colors duration-300 ${
                faq.title === activeFaq ? "text-primary-500 bg-primary-100" : ""
              }`}
              onClick={() => {
                setActiveFaq(faq.title);
                onClose?.();
              }}
            >
              <Link href={`#${faq.title}`}>
                <h2 className="text-sm p-2">{faq.title}</h2>
              </Link>
            </li>
          )}
        />
      </ul>
    </div>
  );
};
