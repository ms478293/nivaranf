import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

interface AppTableProps<TData = unknown> {
  data: TData[] | null | undefined;
  columns: ColumnDef<TData, any>[];
  searchString?: string;
  children?: React.ReactNode;
  headingStyle?: string;
}

export const AppTable = <TData = unknown,>({
  data,
  columns,
  searchString,
  children,
}: AppTableProps<TData>) => {
  const safeData = Array.isArray(data) ? data : [];
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: safeData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="font-Poppins">
      <div className="flex items-center py-4 font-Poppins">
        <div className={`flex  justify-between w-full gap-4`}>
          <Input
            placeholder="Search"
            value={
              (table?.getColumn(searchString)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table?.getColumn(searchString)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="flex items-center gap-2">
            {children}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto text-primary-500 text-sm border border-primary-500"
                >
                  Select Columns <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="font-Poppins">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table?.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-gray-100 hover:bg-gray-100"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-gray-800 font-light text-sm "
                    // className={
                    //   header.column.getIsSorted()
                    //     ? "text-blue-500 font-bold text-nowrap"
                    //     : ""
                    // }
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        onClick={
                          header.column.getCanSort()
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                        className={`cursor-pointer flex items-center text-nowrap 
                          `}
                        //   ${
                        //   header.column.getCanSort() ? "hover:underline" : ""
                        // }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel().rows?.length ? (
              table?.getRowModel().rows?.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-gray-600 font-light text-sm text-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center "
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between gap-2 text-[10px] md:text-[11px]">
        <p>showing {table.getState().pagination.pageSize} items at a time</p>

        <div className="flex items-center justify-between gap-2 text-[10px]">
          <button
            className="rounded-md bg-primary-color-800 px-3 py-[0.3rem] text-secondary-color-200 hover:bg-primary-color-500"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="rounded-md bg-primary-color-800 px-3 py-[0.3rem] text-secondary-color-200 hover:bg-primary-color-500"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <span className="disabled flex cursor-not-allowed items-center text-secondary-color-200">
            <p>Page</p>
            <span className="block w-10 overflow-hidden rounded-md px-3 py-[0.3rem] text-end">
              {table.getState().pagination.pageIndex + 1}
            </span>
            <span>of</span>
            <span className="block w-10 overflow-hidden rounded-md px-3 py-[0.3rem] text-end">
              {table.getPageCount().toLocaleString()}
            </span>
          </span>

          <button
            className="rounded-md bg-primary-color-800 p-3 px-3 py-[0.3rem] text-secondary-color-200 hover:bg-primary-color-500"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="rounded-md bg-primary-color-800 p-3 px-3 py-[0.3rem] text-secondary-color-200 hover:bg-primary-color-500"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>

          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="rounded-md bg-primary-color-800 p-3 px-3 py-1 text-secondary-color-200 hover:bg-primary-color-500"
          >
            {[5, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
