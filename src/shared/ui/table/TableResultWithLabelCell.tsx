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
  <td colSpan={colSpan} className="border border-black bg-gray-200">
    <div className="flex flex-col px-2 py-1 sm:px-4 sm:py-2">
      <span className="text-[9px] sm:text-sm text-black-400 mb-0.5 font-semibold">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className="text-[10px] sm:text-sm font-bold">{value}</span>
        {unit && <span className="text-[10px] md:text-xs">{unit}</span>}
      </div>
    </div>
  </td>
);
