"use client";

import { volunteerSchema } from "@/validations/validations";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import ActionsCell from "./actionCell";

// Accept Application Mutation

export const volunteerApplicationColumns: ColumnDef<
  z.infer<typeof volunteerSchema>
>[] = [
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
    accessorKey: "cv",
    header: "CV",
    cell: ({ row }) => <div>{row.getValue("cv")}</div>,
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
    accessorKey: "why",
    header: "Why",
    cell: ({ row }) => <div>{row.getValue("why")}</div>,
  },
  {
    accessorKey: "experience",
    header: "Experience",
    cell: ({ row }) => <div>{row.getValue("experience")}</div>,
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const volunteer = row.original;
      return <ActionsCell volunteerId={volunteer.id} />;
    },
  },
];
