"use client";

import TimeIcon from "@/assets/icons/TimeIcon";
import { AppButton } from "@/components/ui/app-button";
import { volunteerStatus } from "@/lib/helpers/volunteerStatus";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import { Modal } from "../Modal/Modal";
import { VolunteerForm } from "../VolunteerForm/VolunteerForm";
import { ProgramsType } from "../VolunteerList/VolunteerList";

const LargeVolunteerCard = ({ camp }: { camp: ProgramsType }) => {
  // let status: "Ongoing" | "Planned" | "Completed";

  const variant = {
    Planned: "text-forest-600 bg-forest-100 rounded-lg px-2 py-1 text-xs",
    Completed: "text-red-600 bg-red-100 rounded-lg px-2 py-1 text-xs",
    Ongoing: "text-forest-900 bg-forest-300 rounded-lg px-2 py-1 text-xs",
  };

  const { status } = volunteerStatus(camp.startDate, camp.endDate);

  // const today = new Date();
  // const startDate = startOfDay(parseISO(camp.startDate));
  // const endDate = startOfDay(parseISO(camp.endDate));
  // if (isAfter(today, startDate)) {
  //   status = "Completed";
  // } else if (isBefore(today, endDate)) {
  //   status = "Planned";
  // } else if (isEqual(startDate, endDate)) {
  //   status = "Ongoing";
  // } else status = "Planned";

  return (
    <div className="flex justify-between p-4 border-b border-gray-200 shadow-sm bg-white h-fit">
      {/* Left Section: Camp Details */}
      <div className="flex  gap-4 w-full">
        <div className="p-2 bg-blue-100 rounded-lg h-fit">
          <TimeIcon className="stroke-secondary-600 w-6 h-6" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <h2 className="text-[20px] font-medium text-gray-800">
              {camp.name}
            </h2>
            <div
              className={
                cn("flex   flex-col   text-sm items-center ")
                // variant[status]
              }
            >
              <span className={cn("text-xs font-medium ", variant[status])}>
                {status}
              </span>
            </div>
          </div>
          <p className="flex items-center gap-3 text-sm text-gray-500">
            <span>Location: {camp.location}</span>
            <span className="block h-4 w-[1px] bg-gray-200"></span>
            <span>
              Date: {formatDate(camp.startDate.substring(0, 10), "yyyy/MM/dd")}{" "}
              - {formatDate(camp.endDate.substring(0, 10), "yyyy/MM/dd")}
            </span>
          </p>
        </div>
      </div>

      {/* Right Section: Status & Button */}
      <div className="flex flex-row gap-2 items-center ">
        {/* {status !== "Completed" && ( */}
        {status === "Completed" ? null : (
          <Modal
            triggerButton={
              <AppButton
                variant="primary-outline"
                className="border border-gray-600 text-gray-600 hover:border-transparent"
              >
                Volunteer
              </AppButton>
            }
          >
            <VolunteerForm camp={camp} />
          </Modal>
        )}
        {/* )} */}
      </div>
    </div>
  );
};

export default LargeVolunteerCard;
