"use client";

import EditIcon from "@/assets/icons/EditIcon";
import { TrashIcon } from "@/assets/icons/TrashIcon";
import { AppTable } from "@/components/new/AppTable/AppTable";
import { DeleteConfirmationModal } from "@/components/new/DeleteConfirmationModal/DeleteConfirmationModal";
import { Modal } from "@/components/new/Modal/Modal";
import { AppButton } from "@/components/ui/app-button";
import { Checkbox } from "@/components/ui/checkbox";
import { useDisclosure } from "@/hooks/useDisclouse";
import { deleteProgram, getAllPrograms } from "@/lib/api/programApi/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ProgramForm } from "../projects/ProgramForm";

export type ProjectStatus = "Ongoing" | "Completed" | "Planned";

export type FoundationType = {
  id: number;
  name: string;
  registrationCode: string;
};

export type ProgramType = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  foundationId: number;
  location: string;
  projectsId: number;
  startDate: string;
  endDate: string;
  contactPerson: string;
  contactNumber: string;
  localEmail: string;
  isOpen: boolean;
  impacts: any[]; // Update type if impacts have a specific structure
  foundation: FoundationType;
  status: ProjectStatus;
};

const ACTIONS_DATA = [
  {
    id: 2,
    label: "Edit",
    icon: <EditIcon className="stroke-1 w-4 h-4 stroke-gray-500" />,
  },
  {
    id: 3,
    label: "Delete",
    icon: <TrashIcon className="stroke-1 w-4 h-4 stroke-gray-500" />,
  },
];

export const ProgramTable = () => {
  const [programData, setProgramData] = useState();
  const {
    data: programs,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["pragramsData"],
    queryFn: async () => await getAllPrograms(),
  });

  const { mutate: deleteAction } = useMutation({
    mutationFn: async () => {
      console.log("PROGRAMS", programData);
      await deleteProgram((programData as any)?.id);
      refetch();
    },
    onSuccess: () => {
      toast.success("Program deleted succesfully");
      // form.reset();
    },
    onError: () => {
      toast.error("Failed to delete, Please try again");
    },
  });

  const viewModal = useDisclosure(false);
  const deleteModal = useDisclosure(false);
  const editModal = useDisclosure(false);

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
        {
          accessorKey: "name",
          header: "Name of Program",
        },
        { accessorKey: "location", header: "Location" },
        {
          accessorKey: "startDate",
          header: "Start Date",
          cell: (data) => (
            <p> {data.row.original.startDate.substring(0, 10)}</p>
          ),
        },
        {
          accessorKey: "endDate",
          header: "End Date",
          cell: (data) => <p> {data.row.original.endDate.substring(0, 10)}</p>,
        },
        { accessorKey: "status", header: "Status" },
        { accessorKey: "contactPerson", header: "Contact Person" },
        { accessorKey: "contactNumber", header: "Contact Number" },
        { accessorKey: "localEmail", header: "Local Email" },
        {
          accessorKey: "viewVolunteers",
          header: "View Volunteers",
          cell: ({ row }) => (
            <Link
              href={{
                pathname: "/dashboard/volunteer/list",
                query: { status: "volunteer", program_id: row.original.id },
              }}
              className="text-neutral-500 text-xsm px-2 py-1 bg-gray-100 rounded-sm text-nowrap"
            >
              View Volunteers
            </Link>
          ),
        },
        {
          accessorKey: "viewApplicants",
          header: "View Applicants",
          cell: ({ row }) => (
            <Link
              href={{
                pathname: "/dashboard/volunteer/list",
                query: { status: "applicant", program_id: row.original.id },
              }}
              className="text-neutral-500 text-xsm px-2 py-1 bg-gray-100 rounded-sm text-nowrap"
            >
              View Applicants
            </Link>
          ),
        },
        {
          accessorKey: "action",
          header: () => <div className="text-center">Actions</div>,
          cell: (data) => {
            return !(data.row as any).isApplicationOnly ? (
              ACTIONS_DATA.map((b) => (
                <button
                  key={b.id}
                  className="[&>svg]:hover:stroke-gray-600 hover:bg-neutral-200 transition-all duration-200 p-1 rounded-sm "
                  onClick={() => {
                    handleSelect(b.label);
                    setProgramData((data.row as any).original);
                  }}
                >
                  {b.icon}
                </button>
              ))
            ) : (
              <button className="w-fit text-neutral-500 bg-gray-100 py-0.5 px-2 rounded-sm text-nowrap text-xsm">
                {/**/}
                View Applicant
              </button>
            );
          },
        },
      ] as ColumnDef<ProgramType>[],
    [createColumnHelper]
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Could not load data</p>;

  return (
    <AppTable data={programs} columns={columns} searchString="name">
      <Modal
        triggerButton={
          <AppButton className="hover:bg-primary-100 hover:text-primary-500 group text-sm">
            <span className=" h-5 w-5 flex items-center justify-center rounded-full border border-neutral-50 group-hover:border-primary-500 ">
              +
            </span>
            <span>Add Program</span>
          </AppButton>
        }
      >
        <ProgramForm />
        {/* <CreateJobForm id={applicantData?.jobOpeningId} /> */}
      </Modal>

      <Modal onClose={editModal.close} isOpen={editModal.state}>
        <ProgramForm
          programData={programData}
          refetch={refetch}
          onClose={editModal.close}
        />
        {/* <CreateJobForm id={applicantData?.jobOpeningId} /> */}
      </Modal>

      <Modal isOpen={deleteModal.state} onClose={deleteModal.close}>
        <DeleteConfirmationModal
          // id={(programData as any)?.id}
          onClose={deleteModal.close}
          mutate={deleteAction}
          label="Do you want to delete this program?"
          refetch={refetch}
        />
      </Modal>
    </AppTable>
  );
};
