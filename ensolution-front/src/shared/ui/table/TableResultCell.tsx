import React from "react";

export const TableResultCell = ({
  value,
  unit,
  colSpan,
}: {
  value: string | number;
  unit?: React.ReactNode;
  colSpan?: number;
}) => (
  <td colSpan={colSpan} className="border border-gray-200 bg-blue-50/50">
    <div className="flex items-center flex-wrap gap-0.5 px-2 py-2 sm:px-4 sm:py-2.5">
      <span className="text-xs sm:text-sm font-medium text-blue-700">{value}</span>
      {unit && <span className="text-xs text-blue-400">{unit}</span>}
    </div>
  </td>
);
