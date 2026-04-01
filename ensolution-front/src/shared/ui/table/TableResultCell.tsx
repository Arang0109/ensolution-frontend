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
  <td colSpan={colSpan} className="border border-slate-200 bg-teal-50">
    <div className="flex items-center flex-wrap gap-0.5 p-1 sm:px-4 sm:py-2.5">
      <span className="text-[10px] sm:text-sm font-bold text-teal-700">{value}</span>
      {unit && <span className="text-[9px] text-teal-400"><i>{unit}</i></span>}
    </div>
  </td>
);
