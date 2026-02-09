"use client";

import { CrossIcon } from "@/assets/icons/CrossIcon";
import { SquareArrowIcon } from "@/assets/icons/SquareArrowIcon";
import { TickIcon } from "@/assets/icons/TickIcon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  acceptApplicationStatus,
  onHoldApplicationStatus,
  rejectApplicationStatus,
  shortlistApplicationStatus,
} from "@/lib/api/jobApi/api";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";
import { Modal } from "../Modal/Modal";
import { JobApplication } from "./ApplicantTable";

export const CareerViewModal = ({
  isOpen,
  onClose,
  data,
  refetch,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  data: JobApplication;
  refetch?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
}) => {
  const { mutate: mutateAccept } = useMutation({
    mutationFn: async () => {
      await acceptApplicationStatus(data.id);
    },
    onSuccess: () => {
      toast.success("Status changed to approved");
      refetch();
    },
    onError: () => {
      toast.error("failed to changed status");
    },
  });

  const { mutate: mutateOnHold } = useMutation({
    mutationFn: async () => {
      await onHoldApplicationStatus(data.id);
    },
    onSuccess: () => {
      toast.success("Status changed to on-hold");
      refetch();
    },
    onError: () => {
      toast.error("failed to changed status");
    },
  });

  const { mutate: mutateShortlist } = useMutation({
    mutationFn: async () => {
      await shortlistApplicationStatus(data.id);
    },
    onSuccess: () => {
      toast.success("Status changed to shortlist");
      refetch();
    },
    onError: () => {
      toast.error("failed to changed status");
    },
  });

  const { mutate: rejectMutate } = useMutation({
    mutationFn: async () => {
      await rejectApplicationStatus(data.id);
    },
    onSuccess: () => {
      toast.success("Status changed to shortlist");
      refetch();
    },
    onError: () => {
      toast.error("failed to changed status");
    },
  });

  // if (val === "approved") {
  //   await acceptApplicationStatus(data.id);
  //   refetch();
  //   toast.success("Status changed to approved");
  // } else if (val === "on-hold") {
  //   await onHoldApplicationStatus(data.id);
  //   refetch();
  //   toast.success("Status changed to on-hold");
  // } else if (val === "shortListed") {
  //   await shortlistApplicationStatus(data.id);
  //   refetch();
  //   toast.success("Status changed to shortlisted");
  // } else if (val === "rejected") {
  //   await shortlistApplicationStatus(data.id);
  //   refetch();
  //   toast.success("Status changed to rejected");
  // }

  return (
    <Modal isOpen={isOpen} onClose={() => onClose?.()} triggerButton={null}>
      <div className="bg-white p-6 rounded-3xl shadow-lg max-w-4xl mx-auto font-Poppins">
        <h2 className="text-lg font-semibold pb-4 mb-6 border-b border-gray-100 text-gray-950">
          Job Applicant Details
        </h2>
        <div className="grid grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium  mb-2 text-gray-950">
              Personal Information
            </h3>
            <div className="flex items-center gap-4">
              <p className="flex flex-col gap-1">
                <span className="font-medium text-sm text-gray-800">
                  Full Name:
                </span>
                <span className="font-light text-sm text-gray-600">
                  {data?.fName + " " + data?.mName + " " + data?.lName}
                </span>
              </p>
            </div>
          </div>

          {/* Other Information */}
          <div>
            <h3 className="font-medium  mb-2 text-gray-950">
              Other Information
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {data?.acceptsOtherOppurtunity ? (
                  <p className=" bg-forest-300 border border-forest-600 p-0.5 w-fit rounded-full text-center flex justify-center">
                    <TickIcon className="stroke-1 w-3 h-3 stroke-forest-600" />
                  </p>
                ) : (
                  <p className=" bg-red-300 border border-red-600 p-0.5 w-fit rounded-full text-center flex justify-center">
                    <CrossIcon className="stroke-1 w-3 h-3 stroke-red-600" />
                  </p>
                )}
                <p className="text-gray-600 text-sm font-light">
                  Acceps other opportunities.
                </p>
              </div>
              <div className="flex items-center gap-2">
                {data?.universityStudent ? (
                  <p className=" bg-forest-300 border border-forest-600 p-0.5 w-fit rounded-full text-center flex justify-center">
                    <TickIcon className="stroke-1 w-3 h-3 stroke-forest-600" />
                  </p>
                ) : (
                  <p className=" bg-red-300 border border-red-600 p-0.5 w-fit rounded-full text-center flex justify-center">
                    <CrossIcon className="stroke-1 w-3 h-3 stroke-red-600" />
                  </p>
                )}

                <p className="text-gray-600 text-sm font-light">
                  Have studied University
                </p>
              </div>
              <div className="flex items-center gap-2">
                {data?.previousEmployee ? (
                  <p className=" bg-forest-300 border border-forest-600 p-0.5 w-fit rounded-full text-center flex justify-center">
                    <TickIcon className="stroke-1 w-3 h-3 stroke-forest-600" />
                  </p>
                ) : (
                  <p className=" bg-red-300 border border-red-600 p-0.5 w-fit rounded-full text-center flex justify-center">
                    <CrossIcon className="stroke-1 w-3 h-3 stroke-red-600" />
                  </p>
                )}
                <p className="text-gray-600 text-sm font-light">
                  Have been previous employee
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-10">
          {/* Contact Information */}
          <div>
            <h3 className="font-medium  mb-2 text-gray-950">
              Contact Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <p className="flex flex-col gap-1 ">
                <span className="font-medium text-gray-800 text-sm">
                  Contact no.:
                </span>{" "}
                <span className="text-gray-600 text-sm font-light">
                  {data?.contactNo}
                </span>
              </p>
              <p className="flex flex-col gap-1 ">
                <span className="font-medium text-gray-800 text-sm">
                  Email address:
                </span>{" "}
                <span className="text-gray-600 text-sm font-light">
                  {data?.emailAddress}
                </span>
              </p>
              <p className="flex flex-col gap-1 ">
                <span className="font-medium text-gray-800 text-sm">
                  Optional Contact no.:
                </span>{" "}
                <span className="text-gray-600 text-sm font-light">
                  {" "}
                  {data?.optionalContactNo}
                </span>
              </p>
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="font-medium  mb-2 text-gray-950">Availability</h3>
            {data?.availability ? (
              <div className="flex items-center gap-2">
                <p className=" bg-forest-300 border border-forest-600 p-0.5 w-fit rounded-full text-center flex justify-center">
                  <TickIcon className="stroke-1 w-3 h-3 stroke-forest-600" />
                </p>
                <p className="text-gray-600 text-sm font-light">
                  {data?.availability}
                </p>
              </div>
            ) : null}
          </div>
        </div>

        {/* Resume & Portfolio */}
        <div className="flex justify-between g items-center gap-8 mt-6">
          <div className="flex gap-2 items-center justify-between w-1/2">
            <h3 className="font-medium  mb-2 text-gray-950">Resume</h3>
            <a href="#" className="text-red-500 underline flex gap-2 text-xsm">
              <span>View Resume</span>
              <SquareArrowIcon className="stroke-2 w-4 h-4 stroke-primary-500" />
            </a>
          </div>
          <div className="flex gap-2 items-center justify-between w-1/2">
            <h3 className="font-medium  mb-2 text-gray-950">Portfolio</h3>
            <Link
              href={`/${data?.portfolioLink}`}
              target="_blank"
              className="text-xsm font-light underline text-primary-500 flex gap-2"
            >
              <span> View Portfolio</span>
              <SquareArrowIcon className="stroke-2 w-4 h-4 stroke-primary-500" />
            </Link>
          </div>
        </div>

        {/* Status */}
        <div className="mt-4 flex w-1/2 justify-between items-center font-Poppins">
          <h3 className="font-medium  mb-2 text-gray-950">Status</h3>
          <Select
            // value="approved"
            onValueChange={async (val) => {
              if (val === "approved") {
                mutateAccept();
              } else if (val === "on-hold") {
                mutateOnHold();
              } else if (val === "shortListed") {
                mutateShortlist();
              } else if (val === "rejected") {
                await shortlistApplicationStatus(data.id);
                rejectMutate();
              }
            }}
          >
            <SelectTrigger className="w-32 bg-primary-100 text-primary-500">
              <SelectValue placeholder={data?.status} />
            </SelectTrigger>
            <SelectContent className="font-Poppins">
              <SelectItem value="on-hold">On hold</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="shortListed">shortlisted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          {/* <Button variant="outline" className="border-red-500 text-red-500">
          Go back
        </Button>
        <Button className="bg-red-500 text-white">Apply Changes</Button> */}
        </div>
      </div>
    </Modal>
  );
};
