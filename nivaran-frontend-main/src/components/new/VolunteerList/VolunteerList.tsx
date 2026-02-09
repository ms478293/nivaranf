"use client";

import FilterIcon from "@/assets/icons/FilterIcon";
import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { useScreenSize } from "@/lib/helpers/useScreenSize";
import dynamic from "next/dynamic";
import { useState } from "react";
import { BottomSheets } from "../BottomSheets/BottomSheets";
import { FilterForm } from "../FilterForm/FilterForm";
import MainTitle from "../MainTitle/MainTitle";
import InputSearch from "../SearchInput/SearchInput";

export interface ProgramsType {
  id: number;
  endDate: string;
  startDate: string;
  location: string;
  name: string;
  // contactPerson:string;
  // contactNumber:string;
}

const SmallVolunteerCard = dynamic(
  () => import("@/components/new/VolunteerCard/SmallVolunteerCard"),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse bg-gray-100 p-16 rounded-md" />
    ),
  }
);

const LargeVolunteerCard = dynamic(
  () => import("@/components/new/VolunteerCard/LargeVolunteerCard"),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse bg-gray-100 p-10 h-6 rounded-md" />
    ),
  }
);

export type FilterFormProps = {
  startDate?: Date;
  endDate?: Date;
  status?: "Ongoing" | "Planned" | "Completed" | null;
  location?: string | null;
};

export const VolunteerList = ({ programs }: { programs: ProgramsType[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const screenSize = useScreenSize();
  const [filterConfig, setFilterConfig] = useState<FilterFormProps | null>(
    null
  );
  const today = new Date();

  const filteredCamps = programs
    ?.map((camp) => {
      const campStartDate = new Date(camp.startDate);
      const campEndDate = new Date(camp.endDate);

      let status: "Ongoing" | "Planned" | "Completed";
      if (today > campEndDate) {
        status = "Completed";
      } else if (today < campStartDate) {
        status = "Planned";
      } else {
        status = "Ongoing";
      }

      return { ...camp, status };
    })
    .filter((camp) => {
      const matchesSearch = camp.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      if (!filterConfig) return matchesSearch;

      const matchesStartDate =
        !filterConfig.startDate ||
        new Date(camp.startDate) >= filterConfig.startDate;
      const matchesEndDate =
        !filterConfig.endDate || new Date(camp.endDate) <= filterConfig.endDate;
      const matchesLocation =
        !filterConfig.location ||
        camp.location.toLowerCase() === filterConfig.location.toLowerCase();
      const matchesStatus =
        !filterConfig.status || camp.status === filterConfig.status;

      return (
        matchesSearch &&
        matchesStartDate &&
        matchesEndDate &&
        matchesLocation &&
        matchesStatus
      );
    });

  return (
    <section>
      <MainTitle prefix="Event" suffix="Listing" className="mb-5" />
      <div className="flex gap-2 items-center">
        <InputSearch
          placeholder="Search Event"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <BottomSheets
          onClose={() => setIsSheetOpen(false)}
          isOpen={isSheetOpen}
          onOpen={() => setIsSheetOpen(true)}
          triggerButton={
            <button
              aria-label="Open button Sheet"
              className="bg-secondary-100 p-3 rounded-md lg:hidden block"
              onClick={() => setIsSheetOpen(true)}
            >
              <FilterIcon className="w-5 h-5 stroke-secondary-600" />
            </button>
          }
        >
          <FilterForm
            onClose={() => setIsSheetOpen(false)}
            setFilterConfig={setFilterConfig}
            filterConfig={filterConfig}
            programs={filteredCamps}
          />
        </BottomSheets>
        {/* <button
          className="bg-secondary-100 p-3 rounded-md lg:hidden block"
          onClick={() => setIsSheetOpen(true)}
        >
          <FilterIcon className="w-5 h-5 stroke-secondary-600" />
        </button> */}
      </div>

      <div className="flex gap-4 items-start ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 mt-4 w-full sm:items-start">
          {filteredCamps.length > 0 ? (
            <RenderList
              data={filteredCamps}
              render={(camp) =>
                screenSize === "sm" ? (
                  <SmallVolunteerCard key={camp.id} camp={camp} />
                ) : (
                  <LargeVolunteerCard key={camp.id} camp={camp} />
                )
              }
            />
          ) : (
            <p className="text-gray-500 text-center h-full flex items-center justify-center pt-20">
              No Active Events :(
            </p>
          )}
        </div>
        <div className="hidden lg:block w-[380px]  mt-6 ">
          <FilterForm
            onClose={() => setIsSheetOpen(false)}
            setFilterConfig={setFilterConfig}
            filterConfig={filterConfig}
            programs={filteredCamps}
          />
        </div>
      </div>

      {/* <BottomSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
        <FilterForm
          onClose={() => setIsSheetOpen(false)}
          setFilterConfig={setFilterConfig}
          filterConfig={filterConfig}
        />
      </BottomSheet> */}
    </section>
  );
};
