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
  <td colSpan={colSpan} className="border border-black bg-gray-200">
    <div className="flex items-center">
      <span className="
        w-full p-2 sm:px-3 sm:py-2.5
        text-[10px] sm:text-sm font-bold">{value}</span>
      {unit && <span className="pr-1 text-[6px] text-gray-700 shrink-0"><i>{unit}</i></span>}
    </div>
  </td>
);
