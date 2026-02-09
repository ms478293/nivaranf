"use client";

import { ExpandIcon } from "@/assets/icons/ExpandIcon";
import { TrashIcon } from "@/assets/icons/TrashIcon";
import { VolunteerForm } from "@/components/dashboard/forms/volunteer/addVolunteerForm";
import { AppButton } from "@/components/ui/app-button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDisclosure } from "@/hooks/useDisclouse";
import { getAllPrograms } from "@/lib/api/programApi/api";
import { deleteVolunteer, getAllVolunteers } from "@/lib/api/volunteerApi/api";
import { useGetFoundation } from "@/lib/helpers/useFoundation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { DeleteConfirmationModal } from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { Modal } from "../Modal/Modal";
import { VolunteerBaseTable } from "./VolunteerBaseTable";
import { VolunteerDetailModal } from "./VolunteerDetailModal";

export interface VoluteerTableType {
  id: number;
  fname: string; // Merged fname, lname, and mname
  lname: string; // Merged fname, lname, and mname
  mname: string; // Merged fname, lname, and mname
  why: string;
  experience: string;
  address: string;
  email: string;
  phone: string;
  nationality: string;
  gender: string;
  joinedAt: string | null;
  leftAt: string | null;
  programId: number;
}

const ACTIONS_DATA = [
  {
    id: 1,
    label: "Expand",
    icon: <ExpandIcon className="stroke-1 w-4 h-4 stroke-gray-500" />,
  },
  // {
  //   id: 2,
  //   label: "Edit",
  //   icon: <EditIcon className="stroke-1 w-4 h-4 stroke-gray-500" />,
  // },
  {
    id: 3,
    label: "Delete",
    icon: <TrashIcon className="stroke-1 w-4 h-4 stroke-gray-500" />,
  },
];

export const VolunteerTable = () => {
  const currentFoundation = useGetFoundation(); // Get the selected foundation
  const viewModal = useDisclosure(false);
  const deleteModal = useDisclosure(false);
  const editModal = useDisclosure(false);
  const searchParams = useSearchParams();
  const [volunteerData, setVolunteerData] =
    useState<VoluteerTableType | null>();
  const [selectedProgram, setSelectedProgram] = useState<null | number>(
    Number(searchParams.get("program_id"))
  );

  const [activeTabs, setActiveTabs] = useState(
    searchParams.get("status") === "applicant"
  );

  const {
    data: volunteers,
    isLoading,
    refetch,
    isError,
    // error,
  } = useQuery({
    queryKey: ["volunteers", currentFoundation],
    queryFn: async () => await getAllVolunteers(),
    // enabled: !!currentFoundation, // Ensure the query runs only when a foundation is selected
  });

  const {
    mutate: deleteAction,
    // data: volunteers,
    // isLoading,
    // isError,
    // error,
  } = useMutation({
    mutationFn: async () => {
      if (!volunteerData) return;
      await deleteVolunteer((volunteerData as any).id);
    },
    // enabled: !!currentFoundation, // Ensure the query runs only when a foundation is selected
    onSuccess: () => {
      toast.success("Volunteer deleted succesfully");
      refetch();
      // form.reset();
    },
    onError: () => {
      toast.error("Failed to delete, Please try again");
    },
  });

  const {
    data: programs,
    // isLoading,
    // isError,
    // refetch,
  } = useQuery({
    queryKey: ["pragramsData"],
    queryFn: async () => await getAllPrograms(),
  });

  const getProgramName = (programId: number) => {
    return programs?.find((program) => program.id === programId)?.name;
  };

  const inActiveVolunteersData = volunteers?.filter(
    (v) =>
      v.isApplicationOnly &&
      (selectedProgram === null ||
        selectedProgram <= 0 ||
        v.programId === selectedProgram)
  );
  const activeVolunteersData = volunteers?.filter(
    (v) =>
      !v.isApplicationOnly &&
      (selectedProgram === null ||
        selectedProgram <= 0 ||
        v.programId === selectedProgram)
  );

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

  const columnHelper = createColumnHelper<VoluteerTableType>();
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
          accessorKey: "fullName",
          header: "Full Name",
          cell: (data) => (
            <p>
              {data.row.original.fname} {data.row.original.mname}{" "}
              {data.row.original.lname}
            </p>
          ),
          filterFn: (row, _, filterValue) => {
            const fullName =
              `${row.original.fname} ${row.original.mname} ${row.original.lname}`.toLowerCase();
            return fullName.includes(filterValue.toLowerCase());
          },
        },
        {
          accessorKey: "why",
          header: "Why",
          cell: (data) => (
            <p className="max-w-[150px] truncate text-ellipsis">
              {data.row.original.why}
            </p>
          ),
        },
        {
          accessorKey: "experience",
          header: "Experience",
          cell: (data) => (
            <p className="max-w-[150px] truncate text-ellipsis">
              {data.row.original.experience
                ? data.row.original.experience
                : "---"}
            </p>
          ),
        },
        { accessorKey: "phone", header: "Contact No" },
        { accessorKey: "gender", header: "Gender" },
        {
          accessorKey: "email",
          header: "Email",
          cell: (data) => (
            <p className="max-w-[150px] truncate text-ellipsis">
              {data.row.original.email}
            </p>
          ),
        },
        {
          accessorKey: "program",
          header: "Affiliated Program",
          cell: ({ row }) => {
            return (
              <p className="max-w-[150px] truncate text-ellipsis">
                {getProgramName(row.original.programId)}
              </p>
            );
          },
        },

        { accessorKey: "address", header: "Address" },
        {
          accessorKey: "action",
          header: () => <div className="text-center">Actions</div>,
          cell: ({ row }) =>
            !activeTabs
              ? ACTIONS_DATA.map((b) => (
                  <button
                    key={b.id}
                    className="[&>svg]:hover:stroke-gray-600 hover:bg-neutral-200 transition-all duration-200 p-1 rounded-sm "
                    onClick={() => {
                      handleSelect(b.label);
                      setVolunteerData((row as any).original);
                      setActiveTabs(false);
                    }}
                  >
                    {b.icon}
                  </button>
                ))
              : ACTIONS_DATA.map((b) => (
                  <button
                    key={b.id}
                    className="[&>svg]:hover:stroke-gray-600 hover:bg-neutral-200 transition-all duration-200 p-1 rounded-sm "
                    onClick={() => {
                      handleSelect(b.label);
                      setVolunteerData((row as any).original);
                      setActiveTabs(true);
                    }}
                  >
                    {b.icon}
                  </button>
                )),
        },
      ] as ColumnDef<VoluteerTableType>[],
    [columnHelper]
  );

  if (isError)
    return (
      <p className="text-red-500 text-xl text-center">Failed to fetch data</p>
    );

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <VolunteerBaseTable
          data={!activeTabs ? activeVolunteersData : inActiveVolunteersData}
          columns={columns}
          searchString="fullName"
          headingStyle="flex flex-row-reverse justify-between w-full"
          tabNode={
            <div className=" items-end flex flex-1">
              <div className=" flex gap-2 border-b flex-1 items-end ">
                <button
                  className={`bg-gray-100 px-4 py-1 text-gray-400 rounded-t-sm text-sm w-fit text-nowrap ${
                    activeTabs ? "bg-primary-500 text-neutral-50" : ""
                  }`}
                  onClick={() => setActiveTabs(true)}
                >
                  New Applicant
                </button>
                <button
                  className={`bg-gray-100 px-4 py-1 text-gray-400 rounded-t-sm text-sm w-fit text-nowrap ${
                    !activeTabs ? "bg-primary-500 text-neutral-50" : ""
                  }`}
                  onClick={() => setActiveTabs(false)}
                >
                  Active Volunteer
                </button>
              </div>

              <div>
                <Select
                  onValueChange={(value) => setSelectedProgram(value as never)}
                  defaultValue={
                    (selectedProgram as unknown as string) || "All Programs"
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Programs" />
                  </SelectTrigger>
                  <SelectContent className="font-Poppins">
                    <SelectItem
                      value={0 || "All Programs"}
                      key={"all-programs"}
                    >
                      {"All Programs"}
                    </SelectItem>
                    {programs?.map((program) => (
                      <SelectItem value={program?.id} key={program.id}>
                        {program.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          }
        >
          <Modal
            triggerButton={
              <AppButton className="hover:bg-primary-100 hover:text-primary-500 group text-sm">
                <span className=" h-5 w-5 flex items-center justify-center rounded-full border border-neutral-50 group-hover:border-primary-500 ">
                  +
                </span>
                <span>Add new Volunteer</span>
              </AppButton>
            }
          >
            <VolunteerForm />
          </Modal>
        </VolunteerBaseTable>
      )}

      <Modal isOpen={editModal.state} onClose={editModal.close}>
        <VolunteerForm data={volunteerData} />
      </Modal>

      <Modal isOpen={deleteModal.state} onClose={deleteModal.close}>
        <DeleteConfirmationModal
          // id={(volunteerData as any)?.id}
          onClose={deleteModal.close}
          mutate={deleteAction}
          refetch={refetch}
          label="Do you want to delete this volunteer?"
        />
      </Modal>

      <Modal isOpen={viewModal.state} onClose={viewModal.close}>
        <VolunteerDetailModal
          onClose={() => {
            deleteModal.close();
            viewModal.close();
          }}
          volunteer={volunteerData}
          deleteAction={deleteAction}
          refetch={refetch}
        />
      </Modal>
    </div>
  );
};
