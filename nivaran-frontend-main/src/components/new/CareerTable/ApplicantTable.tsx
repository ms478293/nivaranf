"use client";

import { JobApplicationType } from "@/app/dashboard/job/view-jobs/page";
import { CrossIcon } from "@/assets/icons/CrossIcon";
import { ExpandIcon } from "@/assets/icons/ExpandIcon";
import { TickIcon } from "@/assets/icons/TickIcon";
import { TrashIcon } from "@/assets/icons/TrashIcon";
import { CreateJobForm } from "@/components/dashboard/forms/JobForm/CreateJobForm";
import { Checkbox } from "@/components/ui/checkbox";
import { useDisclosure } from "@/hooks/useDisclouse";
import { deleteApplicant, getAlljobApplication } from "@/lib/api/jobApi/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AppTable } from "../AppTable/AppTable";
import { DeleteConfirmationModal } from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { Modal } from "../Modal/Modal";
import { CareerViewModal } from "./CareerViewModal";

export type JobApplication = {
  id: number;
  jobOpeningId: number;
  status: "accepted" | "pending" | "rejected";
  fName: string;
  lName: string;
  mName: string;
  contactNo: string;
  optionalContactNo: string;
  emailAddress: string;
  country: string;
  resumeLink: string;
  portfolioLink: string;
  availability: string;
  previousEmployee: boolean;
  universityStudent: boolean;
  acceptsOtherOppurtunity: boolean;
  createdAt: string;
  updatedAt: string;
  forOpening: JobApplicationType;
};

const ACTIONS_DATA = [
  {
    id: 1,
    label: "Expand",
    icon: <ExpandIcon className="stroke-1 w-4 h-4 stroke-gray-500" />,
  },
  // {
  //   id: 3,
  //   label: "Edit",
  //   icon: <EditIcon className="stroke-1 w-4 h-4 stroke-gray-500" />,
  // },
  {
    id: 2,
    label: "Delete",
    icon: <TrashIcon className="stroke-1 w-4 h-4 stroke-gray-500" />,
  },
];

export const ApplicantTable = () => {
  const viewModal = useDisclosure(false);
  const deleteModal = useDisclosure(false);
  const editModal = useDisclosure(false);
  const [applicantData, setApplicantData] = useState<JobApplication | null>(
    null
  );

  const {
    refetch,
    data: jobData,
    isLoading,
  } = useQuery({
    queryKey: ["application"],
    queryFn: () => getAlljobApplication(),
  });

  const [, setIsRowSelected] = useState(false);

  const handleSelect = (option: string) => {
    switch (option) {
      case "Delete":
        deleteModal.open();
        break;
      case "Expand":
        viewModal.open();
        break;
      // case "Edit":
      // editModal.open();
      // break;

      default:
        throw new Error("Not valid option");
    }
  };

  const { mutate: deleteAction } = useMutation({
    mutationFn: async () => {
      await deleteApplicant(applicantData.id);
    },
    onSuccess: () => {
      toast.success("Applicant deleted succesfully");
      // form.reset();
    },
    onError: () => {
      toast.error("Failed to delete, Please try again");
    },
  });

  // const totalJobOpenings = new Set(jobData?.map((item) => item.jobOpeningId))
  //   .size;
  // const today = new Date();

  // const inactiveJobs = jobData?.filter((job) =>
  //   isBefore(parseISO((job as any)?.applyBefore), today)
  // ).length;

  // const activeJobs = jobData?.filter((job) => {
  //   const jobDate = parseISO((job as any).applyBefore);
  //   return isAfter(jobDate, today) || isEqual(jobDate, today);
  // }).length;

  const columnHelper = createColumnHelper<JobApplication>();
  const columns = useMemo(
    () =>
      [
        {
          id: "select",
          header: ({ table }) => (
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                table.getIsSomePageRowsSelected()
              }
              onCheckedChange={(value) => {
                table.toggleAllPageRowsSelected(!!value);
                setIsRowSelected((check) => !check);
              }}
              aria-label="Select all"
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => {
                row.toggleSelected(!!value);
                setIsRowSelected((check) => !check);
              }}
              aria-label="Select row"
            />
          ),
          enableSorting: false,
          enableHiding: false,
        },
        {
          accessorKey: "fullName",
          header: "Full name",
          cell: (data) => (
            <p className="w-fit   max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
              {data.row.original.fName +
                " " +
                data.row.original.mName +
                " " +
                data.row.original.lName}
            </p>
          ),
          filterFn: (row, _, filterValue) => {
            const fullName =
              `${row.original.fName} ${row.original.mName} ${row.original.lName}`.toLowerCase();
            return fullName.includes(filterValue.toLowerCase());
          },
        },
        // { accessorKey: "gender", header: "Gender" },
        { accessorKey: "country", header: "Country" },
        { accessorKey: "contactNo", header: "Contact no" },
        {
          accessorKey: "emailAddress",
          header: "Email",
          cell: ({ getValue }) => (
            <p className="w-fit   max-w-[100px] overflow-hidden whitespace-nowrap text-ellipsis">
              {getValue() as string}
            </p>
          ),
        },
        {
          accessorKey: "previousEmployee",
          header: "Previously Employee",
          cell: ({ getValue }) => (
            <div className="w-full flex justify-center">
              {getValue() ? (
                <p className=" bg-forest-300 border border-forest-600 p-0.5 w-fit rounded-full text-center flex justify-center">
                  <TickIcon className="stroke-1 w-3 h-3 stroke-forest-700" />
                </p>
              ) : (
                <p className=" bg-red-300 border border-red-600 p-0.5 w-fit rounded-full text-center flex justify-center">
                  <CrossIcon className="stroke-1 w-3 h-3 stroke-red-600" />
                </p>
              )}
            </div>
          ),
        },
        {
          accessorKey: "portfolioLink",
          header: "Portfolio Link",
          cell: ({ getValue }) => (
            <p className="w-fit   max-w-[100px] overflow-hidden whitespace-nowrap text-ellipsis">
              {getValue() as string}
            </p>
          ),
        },
        {
          accessorKey: "availability",
          header: "Availability",
          cell: ({ getValue }) => (
            <p className="w-fit   max-w-[100px] overflow-hidden whitespace-nowrap text-ellipsis">
              {getValue() as string}
            </p>
          ),
        },
        {
          accessorKey: "resumeLink",
          header: "Resume",
          cell: () => (
            <button className="text-neutral-500 text-xsm px-2 py-1 bg-gray-100 rounded-sm text-nowrap">
              View Resume
            </button>
          ),
        },
        {
          accessorKey: "acceptsOtherOppurtunity",
          header: "Consider Job (12mths)",
          cell: ({ getValue }) => (
            <div className="w-full flex justify-center">
              {getValue() ? (
                <p className=" bg-forest-300 border border-forest-600 p-0.5 w-fit rounded-full text-center flex justify-center">
                  <TickIcon className="stroke-1 w-3 h-3 stroke-forest-700" />
                </p>
              ) : (
                <p className=" bg-red-300 border border-red-600 p-0.5 w-fit rounded-full text-center flex justify-center">
                  <CrossIcon className="stroke-1 w-3 h-3 stroke-red-600" />
                </p>
              )}
            </div>
          ),
        },
        {
          accessorKey: "universityStudent",
          header: "University Student",
          cell: ({ getValue }) => (
            <div className="w-full flex justify-center">
              {getValue() ? (
                <p className=" bg-forest-300 border border-forest-600 p-0.5 w-fit rounded-full text-center flex justify-center">
                  <TickIcon className="stroke-1 w-3 h-3 stroke-forest-700" />
                </p>
              ) : (
                <p className=" bg-red-300 border border-red-600 p-0.5 w-fit rounded-full text-center flex justify-center">
                  <CrossIcon className="stroke-1 w-3 h-3 stroke-red-600" />
                </p>
              )}
            </div>
          ),
        },
        {
          accessorKey: "status",
          header: "Status",
          cell: ({ getValue }) => {
            return getValue() === "shortlisted" ? (
              <p className="text-forest-500 text-xsm px-4 py-1 bg-forest-100 rounded-full text-nowrap">
                {getValue() as string}
              </p>
            ) : getValue() === "accepted" ? (
              <p className="text-forest-100 text-xsm px-4 py-1 bg-forest-500 rounded-full text-nowrap">
                {getValue() as string}
              </p>
            ) : getValue() === "pending" ? (
              <p className="text-primary-500 text-xsm px-4 py-1 bg-primary-100 rounded-full text-nowrap">
                {getValue() as string}
              </p>
            ) : getValue() === "on-hold" ? (
              <p className="text-gray-100 text-xsm px-4 py-1 bg-gray-400 rounded-full text-nowrap">
                {getValue() as string}
              </p>
            ) : (
              <p className="text-red-600 text-xsm px-4 py-1 bg-red-100 rounded-full text-nowrap">
                {getValue() as string}
              </p>
            );
          },
        },
        {
          accessorKey: "actions",
          header: () => <div className="text-center">Actions</div>,
          cell: (data) => (
            <div className="w-full text-center outline-none flex gap-2 items-center">
              {ACTIONS_DATA.map((b) => (
                <button
                  key={b.id}
                  className="[&>svg]:hover:stroke-gray-600 hover:bg-neutral-200 transition-all duration-200 p-1 rounded-sm "
                  onClick={() => {
                    handleSelect(b.label);
                    setApplicantData(data.row.original);
                  }}
                >
                  {b.icon}
                </button>
              ))}
            </div>
          ),
        },
      ] as ColumnDef<JobApplication>[],
    [columnHelper]
  );
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div>
        <div className="flex items-center justify-between gap-4">
          {/* <DashboardInfo stats={totalJobOpenings} label="Total Openings" />
          <DashboardInfo stats={inactiveJobs} label="Inactive Jobs" />
          <DashboardInfo stats={activeJobs} label="Active Jobs" />
          <DashboardInfo stats={activeJobs} label="New Applicants" /> */}
        </div>
        <AppTable columns={columns} data={jobData} searchString="fullName">
          {/* <Modal
            triggerButton={
              <AppButton className="hover:bg-primary-100 hover:text-primary-500 group text-sm">
                <span className=" h-5 w-5 flex items-center justify-center rounded-full border border-neutral-50 group-hover:border-primary-500 ">
                  +
                </span>
                <span>Add Job Listing</span>
              </AppButton>
            }
          >
            <CreateJobForm id={applicantData?.jobOpeningId} />
          </Modal> */}

          {/* <AppButton
            className={`hover:border-transparent hover:bg-primary-100 hover:text-primary-500 text-sm ${
              !isRowSelected
                ? "bg-gray-200 hover:bg-gray-200 cursor-not-allowed hover:text-neutral-50"
                : ""
            } `}
          >
            Delete
          </AppButton> */}
        </AppTable>
      </div>

      <Modal onClose={editModal.close} isOpen={editModal.state}>
        <CreateJobForm id={applicantData?.jobOpeningId} />
      </Modal>
      <Modal
        isOpen={deleteModal.state}
        onClose={deleteModal.close}
        triggerButton={null}
      >
        <DeleteConfirmationModal
          onClose={deleteModal.close}
          mutate={deleteAction}
          refetch={refetch}
          label="Do you want to delete this applicant?"
        />{" "}
      </Modal>

      <CareerViewModal
        isOpen={viewModal.state}
        onClose={viewModal.close}
        data={applicantData}
        refetch={refetch}
      />
      {/* <CareerViewModal
        isOpen={viewModal.state}
        onClose={viewModal.close}
        data={applicantData}
        refetch={refetch}
      /> */}
    </div>
  );
};
