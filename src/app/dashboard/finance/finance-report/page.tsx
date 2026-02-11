"use client";
import { AddFinForm } from "@/components/dashboard/forms/fin/addFinanceForm";
import { EntryTable } from "@/components/dashboard/tables/fin/EntryTable";
import { FinancialTable } from "@/components/dashboard/tables/fin/finTable";
import { Button } from "@/components/ui/button";
import {
  getAllExpenseEntries,
  getAllIncomeEntries,
} from "@/lib/api/finApi/api";
import { useGetFoundation } from "@/lib/helpers/useFoundation";
import {
  expenseEntrySchema,
  incomeEntrySchema,
} from "@/validations/validations";
import * as XLSX from "xlsx";
import { z } from "zod";

export default function Page() {
  const currentFoundation = useGetFoundation();

  const generateExcel = async () => {
    if (!currentFoundation) {
      alert("Please select a foundation.");
      return;
    }

    try {
      const [incomeEntries, expenseEntries] = await Promise.all([
        getAllIncomeEntries(),
        getAllExpenseEntries(),
      ]);

      // If both incomeEntries and expenseEntries are empty
      if (incomeEntries.length === 0 && expenseEntries.length === 0) {
        alert("No data to generate.");
        return;
      }

      // Convert income and expense entries to worksheet data
      const incomeSheet =
        incomeEntries.length > 0
          ? XLSX.utils.json_to_sheet(incomeEntries)
          : null;
      const expenseSheet =
        expenseEntries.length > 0
          ? XLSX.utils.json_to_sheet(expenseEntries)
          : null;

      const headerStyle = {
        font: {
          bold: true,
          sz: 14, // Font size increased to 14
        },
        alignment: {
          horizontal: "center",
          vertical: "center",
        },
        fill: {
          fgColor: { rgb: "FFFF00" }, // Yellow background for header
        },
        border: {
          top: { style: "thin", color: { rgb: "333333" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      };

      const cellStyle = {
        alignment: { horizontal: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        }, // Thin border around the cells
      };

      // Apply styles and add columns only if data exists
      const applyStyles = (
        sheet: XLSX.WorkSheet,
        entries:
          | z.infer<typeof incomeEntrySchema>[]
          | z.infer<typeof expenseEntrySchema>[]
      ) => {
        if (!sheet) return;

        sheet["!cols"] = [{ wch: 30 }, { wch: 30 }, { wch: 30 }];

        // Apply header styles for columns (A1, B1, C1)
        for (let col = 0; col < 3; col++) {
          const cell = sheet[XLSX.utils.encode_cell({ r: 0, c: col })]; // Encode A1, B1, C1
          if (cell) cell.s = headerStyle;
        }

        // Apply cell styles for rows
        for (let row = 1; row <= entries.length; row++) {
          for (let col = 0; col < 3; col++) {
            const cell = sheet[XLSX.utils.encode_cell({ r: row, c: col })];
            if (cell) cell.s = cellStyle;
          }
        }
      };

      if (incomeSheet) {
        applyStyles(incomeSheet, incomeEntries);
      }

      if (expenseSheet) {
        applyStyles(expenseSheet, expenseEntries);
      }

      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Append sheets only if they exist
      if (incomeSheet) {
        XLSX.utils.book_append_sheet(workbook, incomeSheet, "Income Entries");
      }
      if (expenseSheet) {
        XLSX.utils.book_append_sheet(workbook, expenseSheet, "Expense Entries");
      }

      // Generate the Excel file
      const currentDate = new Date().toISOString().split("T")[0];
      const fileName = `${currentDate}.xlsx`;
      XLSX.writeFile(workbook, fileName);
    } catch (error) {
      console.error("Error generating Excel file:", error);
      alert("Failed to generate Excel file. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-20 bg-wh">
      <div className="space-y-4 flex-col bg-green-50 p-4">
        <div className="flex justify-end">
          <Button onClick={generateExcel}>Generate Excel</Button>
        </div>
        <div className="flex gap-20">
          <div className="flex flex-col border p-4 rounded-xl bg-white w-1/2">
            <h1>Expense Report</h1>
            <EntryTable isIncomeTable={false}></EntryTable>
          </div>

          <div className="flex flex-col border p-4 rounded-xl bg-white w-1/2">
            <h1>Income Report</h1>
            <EntryTable isIncomeTable={true}></EntryTable>
          </div>
        </div>
      </div>

      <div className="flex justify-start items-start space-x-2">
        <div className="w-fit rounded-xl">
          <AddFinForm></AddFinForm>
        </div>
        <div className="flex-col space-y-4 bg-white p-4 rounded-xl ">
          <span className="text-2xl leading-8">Financial Reports</span>
          <FinancialTable></FinancialTable>
        </div>
      </div>
    </div>
  );
}
