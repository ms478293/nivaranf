"use client";

import ArrowDownIcon from "@/assets/icons/ArrowDownIcon";
import TimeIcon from "@/assets/icons/TimeIcon";
import { AppButton } from "@/components/ui/app-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { FilterFormProps, ProgramsType } from "../VolunteerList/VolunteerList";

export const FilterForm = ({
  onClose,
  setFilterConfig,
  filterConfig,
  programs,
}: {
  onClose: () => void;
  setFilterConfig: React.Dispatch<React.SetStateAction<FilterFormProps>>;
  filterConfig: FilterFormProps;
  programs: ProgramsType[];
}) => {
  const locations = Array.from(new Set(programs.map((camp) => camp.location)));
  locations.push(null);

  useEffect(() => {
    // Function to remove the scroll lock
    const removeScrollLock = () => {
      document.body.removeAttribute("data-scroll-locked");
      document.body.style.removeProperty("padding-right");
      document.body.style.removeProperty("overflow");
    };

    // Create a MutationObserver to watch for changes to the body's attributes
    const observer = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-scroll-locked"
        ) {
          removeScrollLock();
        }
      });
    });

    // Start observing the body element
    observer.observe(document.body, { attributes: true });

    // Cleanup function
    return () => {
      observer.disconnect();
      removeScrollLock();
    };
  }, []);

  // Use local state to hold temporary values before applying the filter
  const [localFilterConfig, setLocalFilterConfig] =
    useState<FilterFormProps>(filterConfig);

  // Helper function to format Date as YYYY-MM-DD for input[type="date"]
  const formatDateForInput = (date?: Date) =>
    date ? date.toISOString().split("T")[0] : "";

  return (
    <div className="rounded-lg shadow-md md:shadow-none bg-neutral-50 md:bg-secondary-100 p-6 font-Poppins">
      <div
        className="flex justify-between pb-4  w-full sticky top-0 "
        onClick={() => onClose?.()}
      >
        <p className="font-semibold md:text-lg">Filter by</p>
        <ArrowDownIcon className="w-5 h-5 stroke-gray-600 md:hidden" />
      </div>
      <div className="mb-4">
        <Label className="block text-sm text-gray-600 font-medium">
          Beginning Date
        </Label>
        <div className="relative">
          <Input
            type="date"
            value={formatDateForInput(localFilterConfig?.startDate)}
            onChange={(e) =>
              setLocalFilterConfig({
                ...localFilterConfig,
                startDate: e.target.value
                  ? new Date(e.target.value)
                  : undefined,
              })
            }
            className="w-full bg-gray-50"
          />
          <TimeIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>
      </div>

      <div className="mb-4">
        <Label className="block text-sm font-medium text-gray-600">
          Completion Date
        </Label>
        <div className="relative">
          <Input
            type="date"
            value={formatDateForInput(localFilterConfig?.endDate)}
            onChange={(e) =>
              setLocalFilterConfig({
                ...localFilterConfig,
                endDate: e.target.value ? new Date(e.target.value) : undefined,
              })
            }
            className="w-full bg-gray-50"
          />
          <TimeIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>
      </div>

      <div className="mb-4">
        <Label className="block text-sm font-medium text-gray-600">
          Status
        </Label>
        <Select
          value={localFilterConfig?.status}
          onValueChange={(value: FilterFormProps["status"]) =>
            setLocalFilterConfig({
              ...localFilterConfig,
              status: value,
            })
          }
        >
          <SelectTrigger className="bg-gray-50 border-none">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent className="bg-gray-50">
            <SelectGroup>
              {["Ongoing", "Planned", "Completed", null].map((status) => (
                <SelectItem
                  value={status}
                  key={status}
                  className="font-Poppins"
                >
                  {status === null ? "All" : status}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* <div className="mb-4">
        <Label className="block text-sm font-medium text-gray-600">
          Location
        </Label>
        <Select
          value={localFilterConfig?.location}
          onValueChange={(value: FilterFormProps["location"]) =>
            setLocalFilterConfig({ ...localFilterConfig, location: value })
          }
        >
          <SelectTrigger className="bg-gray-50 border-none">
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent className="bg-gray-50 font-Poppins ">
            <SelectGroup>
              {locations.map((location) => (
                <SelectItem value={location} key={location}>
                  {location === null ? "All" : location}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div> */}

      <AppButton
        className="w-full bg-secondary-600 text-neutral-50 hover:bg-secondary-700"
        variant="tertiary"
        onClick={() => {
          setFilterConfig(localFilterConfig); // Apply changes
          onClose(); // Close modal or drawer
          console.log("HELLO WORLD", programs);
        }}
        type="button"
      >
        Apply filter
      </AppButton>
    </div>
  );
};
