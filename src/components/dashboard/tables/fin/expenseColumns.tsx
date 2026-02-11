import { Button } from "@/components/ui/button";
import { deleteExpenseEntry } from "@/lib/api/finApi/api";
import { queryClient } from "@/providers";
import { expenseEntrySchema } from "@/validations/validations";
import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { z } from "zod";

function EntryActions({ entry }: { entry: any }) {
  const deleteEntryMutation = useMutation({
    mutationFn: deleteExpenseEntry,
    mutationKey: ["deleteExpenseEntry"],
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["entry"] });
      toast.success("Deleted Succesfully");
    },
  });

  const handleDelete = () => {
    console.log(entry);
    console.log("Id:", entry.id);
    deleteEntryMutation.mutate(Number(entry));
  };
  return (
    <Button onClick={handleDelete} variant="destructive">
      Delete
    </Button>
  );
}

export const expenseColumns: ColumnDef<z.infer<typeof expenseEntrySchema>>[] = [
  {
    accessorKey: "type",
    header: "Type",
    enableSorting: true,
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    enableSorting: true,
    cell: ({ row }) => <div>{row.getValue("amount")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    enableSorting: true,
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },

  {
    accessorKey: "updatedAt",
    header: "Date",
    enableSorting: true,
    cell: ({ row }) => {
      const value: Date = row.getValue("updatedAt"); // Raw value
      const date = new Date(value); // Ensure it is a Date object
      return <div>{date.toLocaleString()}</div>; // Render ISO string
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <EntryActions entry={row.original.id} />,
    enableHiding: false,
  },
];
