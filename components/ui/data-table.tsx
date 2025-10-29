import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type PaginationState,
  type RowData,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Pagination } from "./pagination";

export interface DataTableProps<TData extends RowData, TValue = unknown> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  emptyMessage?: string;
  pagination?: boolean;
  pageSize?: number;
  manualPagination?: boolean;
  manualSorting?: boolean;
  pageCount?: number;
  onPaginationChange?: (pagination: PaginationState) => void;
  onSortingChange?: (sorting: SortingState) => void;
  className?: string;
  rowClassName?: string | ((row: TData) => string);
}

function DataTable<TData extends RowData, TValue = unknown>({
  columns,
  data,
  loading = false,
  emptyMessage = "No results found.",
  pagination = true,
  pageSize = 10,
  manualPagination = false,
  manualSorting = false,
  pageCount,
  onPaginationChange,
  onSortingChange,
  className,
  rowClassName,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [paginationState, setPaginationState] = React.useState<PaginationState>(
    {
      pageIndex: 0,
      pageSize,
    }
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      setSorting(newSorting);
      onSortingChange?.(newSorting);
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function" ? updater(paginationState) : updater;
      setPaginationState(newPagination);
      onPaginationChange?.(newPagination);
    },
    state: {
      sorting,
      pagination: paginationState,
    },
    manualPagination,
    manualSorting,
    pageCount: pageCount ?? Math.ceil(data.length / pageSize),
  });

  const rows = table.getRowModel().rows;
  const hasData = data.length > 0;

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="rounded-md border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse" role="table">
            <thead className="bg-muted/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} role="row">
                  {headerGroup.headers.map((header) => {
                    const canSort = header.column.getCanSort();
                    const isSorted = header.column.getIsSorted();

                    return (
                      <th
                        key={header.id}
                        role="columnheader"
                        aria-sort={
                          isSorted === "asc"
                            ? "ascending"
                            : isSorted === "desc"
                              ? "descending"
                              : "none"
                        }
                        className={cn(
                          "px-4 py-3 text-left text-sm font-semibold text-foreground",
                          canSort && "cursor-pointer select-none"
                        )}
                        onClick={
                          canSort
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                        onKeyDown={
                          canSort
                            ? (e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  header.column.getToggleSortingHandler()?.(
                                    e as any
                                  );
                                }
                              }
                            : undefined
                        }
                        tabIndex={canSort ? 0 : undefined}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={cn(
                              "flex items-center gap-2",
                              canSort && "hover:text-foreground/80"
                            )}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {canSort && (
                              <span className="inline-flex">
                                {isSorted === "asc" ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : isSorted === "desc" ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronsUpDown className="h-4 w-4 opacity-50" />
                                )}
                              </span>
                            )}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {loading ? (
                <tr role="row">
                  <td
                    colSpan={columns.length}
                    className="px-4 py-12 text-center"
                    role="cell"
                  >
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : !hasData ? (
                <tr role="row">
                  <td
                    colSpan={columns.length}
                    className="px-4 py-12 text-center text-sm text-muted-foreground"
                    role="cell"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                rows.map((row) => {
                  const rowClass =
                    typeof rowClassName === "function"
                      ? rowClassName(row.original)
                      : rowClassName;

                  return (
                    <tr
                      key={row.id}
                      role="row"
                      className={cn(
                        "border-t border-border transition-colors hover:bg-muted/50",
                        rowClass
                      )}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          role="cell"
                          className="px-4 py-3 text-sm"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pagination && hasData && !loading && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {paginationState.pageIndex * paginationState.pageSize + 1}-
            {Math.min(
              (paginationState.pageIndex + 1) * paginationState.pageSize,
              data.length
            )}{" "}
            of {data.length} results
          </div>
          <Pagination
            total={data.length}
            page={paginationState.pageIndex + 1}
            pageSize={paginationState.pageSize}
            onPageChange={(page) => table.setPageIndex(page - 1)}
          />
        </div>
      )}
    </div>
  );
}

DataTable.displayName = "DataTable";

export { DataTable };
export type { ColumnDef, SortingState, PaginationState };
