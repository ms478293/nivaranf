"use client";

import { CareerType } from "@/app/(main)/career/page";
import EditIcon from "@/assets/icons/EditIcon";
import { TrashIcon } from "@/assets/icons/TrashIcon";
import { CreateJobForm } from "@/components/dashboard/forms/JobForm/CreateJobForm";
import { AppButton } from "@/components/ui/app-button";
import { Checkbox } from "@/components/ui/checkbox";
import { useDisclosure } from "@/hooks/useDisclouse";
import { deletejob, getAllJobs } from "@/lib/api/jobApi/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ExpandIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AppTable } from "../AppTable/AppTable";
import { DeleteConfirmationModal } from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { Modal } from "../Modal/Modal";
import { JobDetailsModal } from "./JobDetailsModal";

const ACTIONS_DATA = [
  {
    id: 1,
    label: "Expand",
    icon: <ExpandIcon className="stroke-1 w-4 h-4 stroke-gray-500" />,
  },
  {
    id: 3,
    label: "Edit",
    icon: <EditIcon className="stroke-1 w-4 h-4 stroke-gray-500" />,
  },
  {
    id: 2,
    label: "Delete",
    icon: <TrashIcon className="stroke-1 w-4 h-4 stroke-gray-500" />,
  },
];

export const JobTable = () => {
  const viewModal = useDisclosure(false);
  const deleteModal = useDisclosure(false);
  const editModal = useDisclosure(false);
  const [applicantData, setApplicantData] = useState<CareerType | null>(null);

  const {
    refetch,
    data: jobData,
    isLoading,
  } = useQuery({
    queryKey: ["joblist"],
    queryFn: () => getAllJobs(),
  });

  // const [isRowSelected, setIsRowSelected] = useState(false);

  const handleSelect = (option: string) => {
    switch (option) {
      case "Delete":
        deleteModal.open();
        break;
      case "Expand":
        viewModal.open();
        break;
      case "Edit":
        editModal.open();
        break;

      default:
        throw new Error("Not valid option");
    }
  };

  const { mutate: deleteAction } = useMutation({
    mutationFn: async () => {
      await deletejob(applicantData.id);
    },
    onSuccess: () => {
      toast.success("job deleted succesfully");
      refetch();
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
  //   isBefore(parseISO((job as any).applyBefore), today)
  // ).length;

  // const activeJobs = jobData?.filter((job) => {
  //   const jobDate = parseISO((job as any).applyBefore);
  //   return isAfter(jobDate, today) || isEqual(jobDate, today);
  // }).length;

  const columnHelper = createColumnHelper<CareerType>();
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
                // setIsRowSelected((check) => !check);
              }}
              aria-label="Select all"
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => {
                row.toggleSelected(!!value);
                // setIsRowSelected((check) => !check);
              }}
              aria-label="Select row"
            />
          ),
          enableSorting: false,
          enableHiding: false,
        },
        { accessorKey: "jobName", header: "Job Name" },
        // { accessorKey: "gender", header: "Gender" },
        { accessorKey: "jobType", header: "JobType" },
        { accessorKey: "positionsOpen", header: "Open Positins" },

        {
          accessorKey: "action",
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
      ] as ColumnDef<CareerType>[],
    [columnHelper]
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div>
        {/* <div className="flex items-center justify-between gap-4">
          <DashboardInfo stats={totalJobOpenings} label="Total Openings" />
          <DashboardInfo stats={inactiveJobs} label="Inactive Jobs" />
          <DashboardInfo stats={activeJobs} label="Active Jobs" />
          <DashboardInfo stats={activeJobs} label="New Applicants" />
        </div> */}
        <AppTable columns={columns} data={jobData} searchString="jobName">
          <Modal
            triggerButton={
              <AppButton className="hover:bg-primary-100 hover:text-primary-500 group text-sm">
                <span className=" h-5 w-5 flex items-center justify-center rounded-full border border-neutral-50 group-hover:border-primary-500 ">
                  +
                </span>
                <span>Add Job Listing</span>
              </AppButton>
            }
          >
            <CreateJobForm id={applicantData?.id} />
          </Modal>

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
        <CreateJobForm id={applicantData?.id} refetch={refetch} />
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
          label="Do you want to delete this job listing?"
        />{" "}
      </Modal>

      <Modal
        isOpen={viewModal.state}
        onClose={viewModal.close}
        triggerButton={null}
      >
        <JobDetailsModal data={applicantData} />
      </Modal>
      {/* <CareerViewModal
        isOpen={viewModal.state}
        onClose={viewModal.close}
        data={applicantData}
        refetch={refetch}
      /> */}
    </div>
  );
};
