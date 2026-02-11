import { donorSchema } from "@/validations/validations";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

export const DonorColumns: ColumnDef<z.infer<typeof donorSchema>>[] = [
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
    accessorKey: "contactNumber",
    header: "Contact Number",
    cell: ({ row }) => <div>{row.getValue("contactNumber")}</div>,
  },
  {
    accessorKey: "emailAddress",
    header: "Email Address",
    cell: ({ row }) => <div>{row.getValue("emailAddress")}</div>,
  },
  {
    accessorKey: "legalInformation",
    header: "Citizenship Info",
    cell: ({ row }) => <div>{row.getValue("legalInformation")}</div>,
  },
];
