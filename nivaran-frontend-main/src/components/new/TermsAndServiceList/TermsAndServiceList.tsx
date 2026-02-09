"use client";

import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { TermsAndService } from "@/content/terms-and-service";
import { useHighlightActiveLinks } from "@/hooks/useHighlightActiveLink";
import { PAPTOS } from "../PAPTOS/PAPTOS";
import { TermsAndServiceSidebar } from "./TermsAndServiceSidebar";

export const TermsAndServiceList = () => {
  // const [isSheetOpen, setIsSheetOpen] = useState(false);
  const termsAndServiceIds = TermsAndService.map((terms) => terms.id);

  const { activeId, sectionRefs, setActiveId } =
    useHighlightActiveLinks(termsAndServiceIds);

  return (
    <>
      <div className="w-full px-4 font-Poppins pb-10">
        <div className="max-w-[1320px] mx-auto">
          <h1 className="  text-gray-950 font-[300] text-2xl md:text-4xl">
            Terms of Service
          </h1>
          <div className="flex justify-start gap-4">
            <div className="flex mt-6">
              <div className="md:block hidden mr-6 ">
                <TermsAndServiceSidebar
                  activeId={activeId}
                  setActiveId={setActiveId}
                />
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex flex-col gap-2 text-gray-600">
                  <h3>Nivaran Foundation Privacy Policy</h3>
                  <p>Last Updated: 01/05/2025</p>
                </div>
                <div className="flex flex-col gap-2">
                  <RenderList
                    data={TermsAndService}
                    render={(list, i) => (
                      <div
                        className="flex  "
                        ref={(el) => {
                          sectionRefs.current[i] = el;
                        }}
                        key={list.id}
                      >
                        <p className="mt-4 mr-2 text-gray-950 text-lg font-medium">
                          {i + 1}.
                        </p>
                        <PAPTOS
                          key={i}
                          title={list.title}
                          details={list.details}
                          id={list.id}
                          listClassName="list-none"
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <BottomSheets
        triggerButton={
          <button
            className="text-gray-950 font-medium  bg-neutral-50  z-[20]  fixed  bottom-0 w-full right-0 md:hidden  font-Poppins h-[32px] flex justify-between px-4 items-center"
            onClick={() => setIsSheetOpen(true)}
            style={{ boxShadow: "0 -6px 6px -2px rgba(0, 0, 0, 0.1)" }}
          >
            <span>Terms of Service</span>
            <ArrowupIcon className="w-5 h-5 stroke-gray-600 md:hidden" />
          </button>
        }
        onClose={() => setIsSheetOpen(false)}
        isOpen={isSheetOpen}
        onOpen={() => setIsSheetOpen(true)}
      >
        <TermsAndServiceSidebar
          activeId={activeId}
          setActiveId={setActiveId}
          onClose={() => setIsSheetOpen(false)}
        />
      </BottomSheets> */}
    </>
  );
};
