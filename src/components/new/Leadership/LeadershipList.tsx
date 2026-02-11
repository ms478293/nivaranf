"use client";

import { ArrowupIcon } from "@/assets/icons/ArrowupIcon";
import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { LEADERSHIP_DATA } from "@/content/leadership";
import { useHighlightActiveLinks } from "@/hooks/useHighlightActiveLink";
import { useState } from "react";
import { BottomSheets } from "../BottomSheets/BottomSheets";
import { LeadershipCard } from "./LeadershipCard";
import { LeadershipSidebar } from "./LeadershipSidebar";

export const LeadershipList = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const leadershipIds = LEADERSHIP_DATA.map((terms) => terms.title);

  const { activeId, sectionRefs, setActiveId } =
    useHighlightActiveLinks(leadershipIds);

  return (
    <>
      <div className="flex mt-10 ">
        <div className="md:block hidden mr-6 ">
          <LeadershipSidebar activeId={activeId} setActiveId={setActiveId} />
        </div>
        <div className="flex flex-col gap-6">
          <RenderList
            data={LEADERSHIP_DATA}
            render={(leader, i) => (
              <div>
                <div id={leader.title}></div>
                <div
                  key={i}
                  className="flex flex-col gap-4 mb-12 mt-24 "
                  ref={(el) => {
                    sectionRefs.current[i] = el;
                  }}
                >
                  <h2 className="text-gray-400 font-medium text-lg  border-b border-gray-200 uppercase mb-2">
                    {leader.title}
                  </h2>
                  <div className="flex gap-x-10 gap-y-24 flex-wrap">
                    <RenderList
                      data={leader.members}
                      render={(d, j) => (
                        <LeadershipCard key={j} leadershipData={d} />
                      )}
                    />
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </div>

      <BottomSheets
        triggerButton={
          <button
            aria-label="Filter By Leadership"
            className="text-gray-950 font-medium  bg-neutral-50  z-[20]  fixed  bottom-0 w-full right-0 md:hidden  font-Poppins h-[32px] flex justify-between px-4 items-center"
            onClick={() => setIsSheetOpen(true)}
            style={{ boxShadow: "0 -6px 6px -2px rgba(0, 0, 0, 0.1)" }}
          >
            <span>Filter by Leadership</span>
            <ArrowupIcon className="w-5 h-5 stroke-gray-600 md:hidden" />
          </button>
        }
        onClose={() => setIsSheetOpen(false)}
        isOpen={isSheetOpen}
        onOpen={() => setIsSheetOpen(true)}
      >
        <LeadershipSidebar
          activeId={activeId}
          setActiveId={setActiveId}
          onClose={() => setIsSheetOpen(false)}
        />
      </BottomSheets>
    </>
  );
};
