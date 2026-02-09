import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  addJoinedAt,
  addLeftAt,
  deleteVolunteer,
} from "@/lib/api/volunteerApi/api"; // Import the API functions
import { queryClient } from "@/providers";
import { volunteerSchema } from "@/validations/validations";
import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

function VolunteerActions({ volunteer }: { volunteer: any }) {
  const [selectedJoinedDate, setSelectedJoinedDate] = useState<
    Date | undefined
  >(undefined);
  const [selectedLeftDate, setSelectedLeftDate] = useState<Date | undefined>(
    undefined
  );

  const deleteVolunteerMutation = useMutation({
    mutationFn: deleteVolunteer,
    mutationKey: ["delete"],
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["volunteers"] });
      toast.success("Deleted Succesfully");
    },
  });

  const handleDelete = () => {
    deleteVolunteerMutation.mutate(Number(volunteer.id));
  };

  const handleUpdateJoinedDate = async () => {
    if (selectedJoinedDate) {
      try {
        await addJoinedAt(volunteer.id, selectedJoinedDate);
        console.log("Joined At date updated:", selectedJoinedDate);
      } catch (error) {
        console.error("Error updating Joined At:", error);
      }
    } else {
      console.error("No date selected");
    }
  };

  const handleUpdateLeftDate = async () => {
    if (selectedLeftDate) {
      try {
        await addLeftAt(volunteer.id, selectedLeftDate);
        console.log("Left At date updated:", selectedLeftDate);
      } catch (error) {
        console.error("Error updating Left At:", error);
      }
    } else {
      console.error("No date selected");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Button onClick={handleDelete} variant="destructive">
          Delete
        </Button>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedJoinedDate
                ? format(selectedJoinedDate, "PPP")
                : "Set Joined Date"}
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Joining Date</DialogTitle>
            </DialogHeader>
            <Calendar
              mode="single"
              selected={selectedJoinedDate}
              onSelect={setSelectedJoinedDate}
              initialFocus
            />
            <DialogFooter>
              <Button onClick={handleUpdateJoinedDate}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedLeftDate
                ? format(selectedLeftDate, "PPP")
                : "Set Left Date"}
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Left Date</DialogTitle>
            </DialogHeader>
            <Calendar
              mode="single"
              selected={selectedLeftDate}
              onSelect={setSelectedLeftDate}
              initialFocus
            />
            <DialogFooter>
              <Button onClick={handleUpdateLeftDate}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const volunteerColumns: ColumnDef<z.infer<typeof volunteerSchema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fname",
    header: "First Name",
    cell: ({ row }) => <div>{row.getValue("fname")}</div>,
  },
  {
    accessorKey: "lname",
    header: "Last Name",
    cell: ({ row }) => <div>{row.getValue("lname")}</div>,
  },
  {
    accessorKey: "nationality",
    header: "Nationality",
    enableSorting: true,
    cell: ({ row }) => <div>{row.getValue("nationality")}</div>,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    enableSorting: true,
    cell: ({ row }) => <div>{row.getValue("gender")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => <div>{row.getValue("address")}</div>,
  },

  {
    accessorKey: "joinedAt",
    header: "Joined At",
    enableSorting: true,
    cell: ({ row }) => {
      return <div>{row.getValue("joinedAt")}</div>;
    },
  },
  {
    accessorKey: "leftAt",
    header: "Left At",
    enableSorting: true,
    cell: ({ row }) => {
      return <div>{row.getValue("leftAt")}</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <VolunteerActions volunteer={row.original} />,
    enableHiding: false,
  },
];
