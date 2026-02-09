import { donationSchema, donorSchema } from "@/validations/validations";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

export const DonationColumns: ColumnDef<z.infer<typeof donationSchema>>[] = [
  {
    accessorKey: "amount",
    header: "Amount",
    enableSorting: true,
    cell: ({ row }) => <div>${row.getValue("amount")}</div>,
  },
  {
    accessorKey: "donationType",
    header: "Donation Type",
    enableSorting: true,
    cell: ({ row }) => <div>{row.getValue("donationType")}</div>,
  },
  {
    accessorKey: "donor",
    header: "Donor",
    cell: ({ row }) => {
      const donor = row.getValue("donor") as z.infer<typeof donorSchema>; // Get the donor object
      return donor ? (
        <div>{`${donor.fname} ${donor.lname}`}</div>
      ) : (
        <div>Anonymous</div>
      );
    },
  },
  {
    accessorKey: "isAnonymous",
    header: "Anonymous?",
    cell: ({ row }) => <div>{row.getValue("isAnonymous") ? "Yes" : "No"}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    enableSorting: true,
    cell: ({ row }) => {
      const value = new Date(row.getValue("createdAt")).toLocaleDateString();

      return <div>{value}</div>;
    },
  },
];
