import { Button } from "@/components/ui/button";
import { deleteFin } from "@/lib/api/finApi/api";
import { queryClient } from "@/providers";
import { financialSchema } from "@/validations/validations";
import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { z } from "zod";

function FinActions({ entry }: { entry: any }) {
  const deleteEntryMutation = useMutation({
    mutationFn: deleteFin,
    mutationKey: ["deleteFin"],
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["fins"] });
      toast.success("Deleted Succesfully");
    },
  });

  const handleDelete = () => {
    console.log(entry);
    deleteEntryMutation.mutate(Number(entry.id));
  };
  return (
    <Button variant={"destructive"} onClick={handleDelete}>
      Delete
    </Button>
  );
}
export const FinancialColumns: ColumnDef<z.infer<typeof financialSchema>>[] = [
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const value = new Date(row.getValue("startDate")).toLocaleDateString();
      return <div>{value}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const value = new Date(row.getValue("endDate")).toLocaleDateString();
      return <div>{value}</div>;
    },
    enableSorting: true,
  },

  {
    id: "actions",
    cell: ({ row }) => <FinActions entry={row.original} />,
    enableHiding: false,
  },
];
