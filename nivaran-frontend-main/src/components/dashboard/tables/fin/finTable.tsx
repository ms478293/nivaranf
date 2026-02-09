import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllFinsByFoundation } from "@/lib/api/finApi/api";
import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { EntryTable } from "./EntryTable"; // Import EntryTable for dialog content
import { FinancialColumns } from "./finColumns";

export function FinancialTable() {
  const {
    data: fins,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fins"],
    queryFn: getAllFinsByFoundation,
  });
  console.log(fins);

  const table = useReactTable({
    data: fins || [],
    columns: FinancialColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {},
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={
                      header.column.getIsSorted()
                        ? "text-blue-500 font-bold"
                        : ""
                    }
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        onClick={
                          header.column.getCanSort()
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                        className={`cursor-pointer flex items-center ${
                          header.column.getCanSort() ? "hover:underline" : ""
                        }`}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <ChevronDown
                            className={`ml-2 h-4 w-4 ${
                              header.column.getIsSorted() === "asc"
                                ? "rotate-180"
                                : ""
                            } ${
                              header.column.getIsSorted()
                                ? "text-blue-500"
                                : "text-gray-400"
                            }`}
                          />
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  {/* Add View Income Entries and View Expense Entries Buttons */}
                  <TableCell className="flex gap-8">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>View Income Entries</Button>
                      </DialogTrigger>
                      <DialogContent className="min-w-[50%]">
                        <DialogHeader>
                          <DialogTitle>Income Entries</DialogTitle>
                        </DialogHeader>
                        <EntryTable
                          isIncomeTable={true}
                          passedEntries={fins[row.index]?.incomeEntries || []}
                        />
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>View Expense Entries</Button>
                      </DialogTrigger>
                      <DialogContent className="min-w-[50%]">
                        <DialogHeader>
                          <DialogTitle>Expense Entries</DialogTitle>
                        </DialogHeader>
                        <EntryTable
                          isIncomeTable={false}
                          passedEntries={fins[row.index]?.expenseEntries || []}
                        />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={FinancialColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
