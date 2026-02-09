"use client";

import LocateIcon from "@/assets/icons/LocateIcon";
import { AppButton } from "@/components/ui/app-button";
import { volunteerStatus } from "@/lib/helpers/volunteerStatus";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { BottomSheets } from "../BottomSheets/BottomSheets";
import { VolunteerForm } from "../VolunteerForm/VolunteerForm";
import { ProgramsType } from "../VolunteerList/VolunteerList";

// interface Camp {
//   id: number;
//   campName: string;
//   location: string;
//   startDate: Date;
//   endDate: Date;
// }

// interface CampCardProps {
//   camp: Camp;
// }

const SmallVolunteerCard = ({ camp }: { camp: ProgramsType }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const variant = {
    Planned: "text-forest-600 bg-forest-100 rounded-lg px-2 py-1 text-xs",
    Completed: "text-red-600 bg-red-100 rounded-lg px-2 py-1 text-xs",
    Ongoing: "text-forest-900 bg-forest-300 rounded-lg px-2 py-1 text-xs",
  };

  const { status } = volunteerStatus(camp.startDate, camp.endDate);
  return (
    <div className="bg-secondary-50 p-4 h-full rounded-md flex flex-col gap-4 shadow-sm">
      {/* Camp Name */}
      <div className="flex items-start justify-between">
        <h2 className="text-gray-800 font-medium text-lg font-Poppin leading-6">
          {camp.name}
        </h2>
        <span className={cn("text-xs font-medium ", variant[status])}>
          {status}
        </span>
      </div>

      {/* Location & Date */}
      <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 gap-2">
        <div className="flex items-center  gap-2">
          <LocateIcon className="w-4 h-4 stroke-secondary-600" />
          <span>{camp.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-gray-500" />
          <span>
            {formatDate(camp.startDate.substring(0, 10), "yyyy/MM/dd")} -{" "}
            {formatDate(camp.endDate.substring(0, 10), "yyyy/MM/dd")}
          </span>
        </div>
      </div>

      {status === "Completed" ? null : (
        <BottomSheets
          triggerButton={
            <AppButton
              variant="tertiary"
              onClick={() => setIsSheetOpen(true)}
              className="w-full"
            >
              Volunteer
            </AppButton>
          }
          onClose={() => setIsSheetOpen(false)}
          isOpen={isSheetOpen}
          onOpen={() => setIsSheetOpen(true)}
        >
          <VolunteerForm camp={camp} onClose={() => setIsSheetOpen(false)} />
        </BottomSheets>
      )}
    </div>
  );
};

export default SmallVolunteerCard;
