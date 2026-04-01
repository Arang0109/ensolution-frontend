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
  <td colSpan={colSpan} className="border border-slate-200 bg-teal-50">
    <div className="flex flex-col px-2 py-1 sm:px-4 sm:py-2">
      <span className="text-[9px] sm:text-sm text-black-400 mb-0.5">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className="text-[10px] sm:text-sm font-bold text-teal-700">{value}</span>
        {unit && <span className="text-[10px] md:text-xs text-teal-400">{unit}</span>}
      </div>
    </div>
  </td>
);
