import React from "react";

export const TableResultWithLabelCell = ({
  label,
  value,
  unit,
  colSpan,
}: {
  label: React.ReactNode;
  value: string | number;
  unit?: React.ReactNode;
  colSpan?: number;
}) => (
  <td colSpan={colSpan} className="border border-gray-200 bg-blue-50/50">
    <div className="flex flex-col px-2 py-1.5 sm:px-4 sm:py-2">
      <span className="text-xs text-black-400 mb-0.5">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className="text-xs sm:text-sm font-medium text-blue-700">{value}</span>
        {unit && <span className="text-xs text-blue-400">{unit}</span>}
      </div>
    </div>
  </td>
);
