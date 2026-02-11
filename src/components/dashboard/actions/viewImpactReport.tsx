"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFinsById } from "@/lib/api/finApi/api";
import { getImpact } from "@/lib/api/impactApi/api";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { generatePDF } from "./generatePdf";

// Define the types for the data structures
type FinancialReport = {
  id: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  foundationId: number;
};

type Program = {
  id: number;
  description: string;
  outcome: string;
  createdAt: string;
  updatedAt: string;
  foundationId: number;
};

type Photo = {
  id: number;
  url: string;
  label: string;
  width: number;
  height: number;
  impactId: number;
  createdAt: string;
  updatedAt: string;
  foundationId: number;
};

type ImpactReport = {
  id: number;
  yearOfPublish: string;
  author: string;
  executiveSummary: string;
  mission: string;
  vision: string;
  goals: string[];
  strategicPlanning: string;
  callToAction: string;
  financialReportId: number;
  foundationId: number;
  createdAt: string;
  updatedAt: string;
  financialReport: FinancialReport;
  programs: Program[];
  quantitativeData: any[]; // Adjust according to actual data structure
  Photo: Photo[];
};
type Entry =
  | {
      amount?: number;
      description?: string;
      type?: string;
      updatedAt?: string;
    }
  | undefined;

function EntriesTable({
  entries,
  type,
}: {
  entries: Entry[];
  type: "Income" | "Expense";
}) {
  const displayDate = (entry) => {
    return new Date(entry.toString()).toDateString();
  };
  return (
    <Table>
      <TableCaption>A list of {type} entries.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Amount</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries &&
          entries?.map((entry, index) => {
            if (entry)
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{entry.amount}</TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell>{entry.type}</TableCell>
                  <TableCell className="text-right">
                    {displayDate(entry.updatedAt)}
                  </TableCell>
                </TableRow>
              );
          })}
      </TableBody>
      <TableFooter>
        {/* Add totals or additional footer data if needed */}
      </TableFooter>
    </Table>
  );
}

// Card Component to display individual report details
const ImpactCard: FC<{ impact: ImpactReport }> = ({ impact }) => {
  const [show, setShow] = useState(false);
  const { data: financialReportData } = useQuery({
    queryKey: ["financialReport", impact.financialReportId],
    queryFn: () => {
      if (impact.financialReportId) {
        return getFinsById(impact.financialReportId);
      }
      return Promise.reject(new Error("No financialReportId provided"));
    },
    enabled: !!impact.financialReportId,
  });

  const startDateFin = new Date(
    impact.financialReport.startDate
  ).toLocaleDateString();
  const endDateFin = new Date(
    impact.financialReport.endDate
  ).toLocaleDateString();

  const handleGeneratePDF = () => {
    // Pass the necessary data to generatePDF
    if (financialReportData) {
      generatePDF({
        ...impact,
        yearOfPublish: new Date(impact.yearOfPublish), // Ensure yearOfPublish is a Date object
        financialReportData: financialReportData,
        // programData: impact.programs,
        programIds: impact.programs.map((program) => program.id),
      });
    }
  };

  return (
    <div>
      <div>
        <div
          onClick={() => setShow(!show)}
          className="flex justify-between y-border rounded-lg shadow-lg p-4"
        >
          <div>
            <h2 className="text-xl font-bold">Author: {impact.author}</h2>
            <p className="text-sm text-gray-600">
              Date of Publish: {impact.yearOfPublish}
            </p>
          </div>
          <div>
            <Button onClick={handleGeneratePDF}>Generate PDF</Button>
          </div>
        </div>
      </div>
      <div className={show ? "border rounded-lg shadow-lg p-4 m-4" : "hidden"}>
        <h3 className="mt-4 text-lg font-semibold">Executive Summary</h3>
        <p className="border border-blue-100 p-4 rounded-xl bg-blue-50">
          {impact.executiveSummary}
        </p>
        <h3 className="mt-4 text-lg font-semibold">Mission</h3>
        <p className="border border-blue-100 p-4 rounded-xl bg-blue-50">
          {impact.mission}
        </p>
        <h3 className="mt-4 text-lg font-semibold">Vision</h3>
        <p className="border border-blue-100 p-4 rounded-xl bg-blue-50">
          {impact.vision}
        </p>
        <h3 className="mt-4 text-lg font-semibold">Goals</h3>
        <div className="grid lg:grid-cols-4 grid-cols-1 p-4 gap-8">
          {impact.goals.map((goal, index) => (
            <div
              key={index}
              className="border border-blue-100 p-4 rounded-xl bg-blue-50"
            >
              {goal}
            </div>
          ))}
        </div>
        <h3 className="font-semibold mt-4 text-lg">Programs:</h3>
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-8 p-4">
          {impact.programs.map((program) => (
            <div
              key={program.id}
              className="mt-2 border border-blue-100 p-4 rounded-xl bg-blue-50"
            >
              <p>
                <strong>Description:</strong> {program.description}
              </p>
              <p>
                <strong>Outcome:</strong> {program.outcome}
              </p>
            </div>
          ))}
        </div>
        <h3 className="font-semibold mt-4 text-lg">
          Financial Report{" "}
          <span className="text-sm text-gray-600">
            From: {startDateFin} To: {endDateFin}
          </span>
        </h3>
        <div>
          <h3 className="font-semibold mt-4 text-base">Income Entries</h3>
          <div className="flex flex-col gap-4">
            {financialReportData?.incomeEntries && (
              <EntriesTable
                entries={financialReportData.incomeEntries.map((entry) => ({
                  amount: entry.amount ?? 0,
                  description: entry.description ?? "No description provided",
                  type: entry.type ?? "Unknown",
                  updatedAt: entry.updatedAt,
                }))}
                type="Income"
              />
            )}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mt-4 text-base">Expense Entries</h3>
          <div className="flex flex-col gap-4">
            {financialReportData?.expenseEntries && (
              <EntriesTable
                entries={financialReportData.expenseEntries.map((entry) => ({
                  amount: entry.amount ?? 0,
                  description: entry.description ?? "No description provided",
                  type: entry.type ?? "Unknown",
                  updatedAt: entry.updatedAt,
                }))}
                type="Income"
              />
            )}
          </div>
        </div>

        {/* If you have photos, you can render them here */}
        {impact.Photo.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold">Photos:</h3>
            <div className="flex gap-4 overflow-auto">
              {impact.Photo.map((photo) => (
                <img
                  key={photo.id}
                  src={`https://api.nivaranfoundation.org${photo.url}`} // Adjust according to actual structure
                  alt="Impact Photo"
                  className="object-fill lg:w-48 lg:h-48 m-2"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export function ViewImpactReports() {
  const {
    data: reports,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["impacts"],
    queryFn: () => getImpact({ getByFoundation: true }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data!</div>;
  }

  return (
    <div className="h-screen">
      <div className="grid grid-cols-1 gap-10">
        {reports.map((report: ImpactReport) => (
          <ImpactCard key={report.id} impact={report} />
        ))}
      </div>
    </div>
  );
}
