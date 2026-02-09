"use client";

import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { privacyPolicySections } from "@/content/privacy-policy";
import { useHighlightActiveLinks } from "@/hooks/useHighlightActiveLink";
import { PAPTOS } from "../PAPTOS/PAPTOS";
import { PrivacyPolicySidebar } from "./PrivacyPolicySidebar";

export const PrivacyPolicyList = () => {
  // const [isSheetOpen, setIsSheetOpen] = useState(false);
  const termsAndServiceIds = privacyPolicySections.map((terms) => terms.id);

  const { activeId, sectionRefs, setActiveId } =
    useHighlightActiveLinks(termsAndServiceIds);

  return (
    <>
      <div className="w-full px-4 font-Poppins pb-10">
        <div className="max-w-[1320px] mx-auto">
          <h1 className="text-gray-950 font-[300] text-2xl md:text-4xl">
            Privacy Policy
          </h1>
          <div className="flex justify-start gap-4">
            <div className="flex mt-6">
              <div className="md:block hidden mr-6 ">
                <PrivacyPolicySidebar
                  activeId={activeId}
                  setActiveId={setActiveId}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex flex-col  text-gray-600 mb-4">
                <h3>Nivaran Foundation Privacy Policy</h3>
                <p>Last Updated: 01/05/2025</p>
              </div>
              <div className="flex flex-col gap-2">
                <RenderList
                  data={privacyPolicySections}
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
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <BottomSheets
        triggerButton={
          <button
            className="text-gray-950 font-medium rounded-t-3xl pb-8 pt-4 bg-neutral-50  z-[20]  sticky  bottom-0  right-0 md:hidden block font-Poppins w-fit h-fit"
            style={{ boxShadow: "0 -6px 6px -2px rgba(0, 0, 0, 0.1)" }}
          >
            Privacy Policy
          </button>
        }
        onClose={() => setIsSheetOpen(false)}
        isOpen={isSheetOpen}
        onOpen={() => setIsSheetOpen(true)}
      >
        <PrivacyPolicySidebar
          activeId={activeId}
          setActiveId={setActiveId}
          onClose={() => setIsSheetOpen(false)}
        />
      </BottomSheets> */}
    </>
  );
};
