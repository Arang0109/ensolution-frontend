import { useState, useMemo } from "react";

import type { PollutantResponse } from "@pollutant/model/pollutant.types";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";

import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

interface PollutantTableProps {
  pollutants: PollutantResponse[];
  onEdit: (pollutant: PollutantResponse) => void;
  onDelete: (pollutant: PollutantResponse) => void;
  isDeleting: boolean;
}

const columnHelper = createColumnHelper<PollutantResponse>();

export const PollutantTable = ({
  pollutants,
  onEdit,
  onDelete,
  isDeleting,
}: PollutantTableProps) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const handleDelete = async (pollutant: PollutantResponse) => {
    if (
      window.confirm(
        `"${pollutant.nameKr}" 측정물질을 삭제하시겠습니까?`
      )
    ) {
      setDeletingId(pollutant.id);
      await onDelete(pollutant);
      setDeletingId(null);
    }
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor(
        row => {
          const nameKr = row.nameKr?.trim();
          const nameEn = row.nameEn?.trim();

          if (!nameKr && !nameEn) return "-";
          if (!nameEn) return nameKr;
          if (!nameKr) return nameEn;

          return `${nameKr} (${nameEn})`;
        },
        {
          id: "name",
          header: "측정물질명",
          cell: (info) => (
            <span className="font-medium text-gray-900">
              {info.getValue()}
            </span>
          ),
        }
      ),

      columnHelper.accessor("method", {
        header: "측정방법",
        cell: (info) => (
          <span className="text-gray-600">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("equipmentName", {
        header: "시험기기",
        cell: (info) => (
          <span className="text-gray-600">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("testMethodName", {
        header: "공정시험법",
        cell: (info) => (
          <span className="text-gray-600">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("samplingTime", {
        header: "채취시간 (분)",
        cell: (info) => (
          <span className="text-gray-900">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("samplingVolume", {
        header: "채취량",
        cell: (info) => (
          <span className="text-gray-900">{info.getValue()}</span>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "관리",
        cell: (info) => (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => onEdit(info.row.original)}
              className="px-3 py-1.5 bg-gradient-to-r from-neutral-800 to-neutral-900 text-white text-sm rounded-md hover:from-neutral-900 hover:to-neutral-950 transition-colors shadow-sm"
            >
              수정
            </button>
            <button
              onClick={() => handleDelete(info.row.original)}
              disabled={isDeleting && deletingId === info.row.original.id}
              className="px-3 py-1.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm rounded-md hover:from-primary-600 hover:to-primary-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting && deletingId === info.row.original.id
                ? "삭제 중..."
                : "삭제"}
            </button>
          </div>
        ),
        enableSorting: false,
        enableColumnFilter: false,
      }),
    ],
    [onEdit, onDelete, isDeleting, deletingId]
  );

  const table = useReactTable({
    data: pollutants,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (pollutants.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">등록된 측정물질이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Search Filters */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              측정물질명 검색
            </label>
            <input
              type="text"
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(e) =>
                table.getColumn("name")?.setFilterValue(e.target.value)
              }
              placeholder="검색..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              측정방법 검색
            </label>
            <input
              type="text"
              value={(table.getColumn("method")?.getFilterValue() as string) ?? ""}
              onChange={(e) =>
                table.getColumn("method")?.setFilterValue(e.target.value)
              }
              placeholder="검색..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
        {(columnFilters.length > 0) && (
          <div className="mt-3">
            <button
              onClick={() => setColumnFilters([])}
              className="text-sm text-neutral-600 hover:text-neutral-700 font-medium"
            >
              필터 초기화
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-neutral-800 to-neutral-900 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`px-6 py-4 text-left text-sm font-semibold ${
                      header.column.getCanSort() ? "cursor-pointer select-none" : ""
                    } ${header.id === "actions" ? "text-center" : ""}`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <span className="text-white/80">
                          {header.column.getIsSorted() === "asc" ? (
                            <FaSortUp />
                          ) : header.column.getIsSorted() === "desc" ? (
                            <FaSortDown />
                          ) : (
                            <FaSort />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`px-6 py-4 text-sm ${
                      cell.column.id === "actions" ? "text-center" : ""
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Results info */}
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 text-sm text-gray-600">
        총 {table.getFilteredRowModel().rows.length}개 항목
        {columnFilters.length > 0 && ` (전체 ${pollutants.length}개 중 필터됨)`}
      </div>
    </div>
  );
};