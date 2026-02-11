"use client";

import { SettingsIcon } from "@/assets/icons/SettingsIcon";
import { FAQdata } from "@/content/faq";
import React, { SetStateAction, useState } from "react";
import { BottomSheets } from "../BottomSheets/BottomSheets";
import { FAQTitle } from "../FAQList/FAQTitle";
import { PageTitle } from "../PageTitle/PageTitle";
import InputSearch from "../SearchInput/SearchInput";

export const FAQHeader = ({
  searchQuery,
  setSearchQuery,
  filteredFAQ,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<SetStateAction<string>>;
  filteredFAQ: typeof FAQdata;
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return (
    <>
      <section className=" flex flex-col gap-4  mb-8 sticky top-16 md:static bg-neutral-50 py-2">
        <PageTitle suffix="Empower Your Future" prefix="Join Us and" />

        <p className="text-sm text-gray-600">
          For inquiries regarding media or programs, please
          contact us
        </p>
        <div className="flex gap-2 items-center ">
          <InputSearch
            placeholder="Search FAQ"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <BottomSheets
            onClose={() => setIsSheetOpen(false)}
            isOpen={isSheetOpen}
            onOpen={() => setIsSheetOpen(true)}
            triggerButton={
              <button
                aria-label="Open bottom sheet"
                className="text-gray-950 font-medium   z-[20]  bg-secondary-100   w-fit right-0 md:hidden  font-Poppins h-[32px] flex justify-between p-3 rounded-lg py-[1.3rem] items-center"
                onClick={() => setIsSheetOpen(true)}
                // style={{ boxShadow: "0 -6px 6px -2px rgba(0, 0, 0, 0.1)" }}
              >
                <SettingsIcon className="w-5 h-5 stroke-gray-600 md:hidden" />
              </button>
            }
          >
            <FAQTitle
              filteredFAQS={filteredFAQ}
              onClose={() => setIsSheetOpen(false)}
            />
          </BottomSheets>
        </div>
      </section>
    </>
  );
};
