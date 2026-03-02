import React from "react";

export const TableInputCell = ({
  value,
  onChange,
  placeholder,
  colSpan,
  unit,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  colSpan?: number;
  unit?: React.ReactNode;
}) => (
  <td colSpan={colSpan} className="border border-gray-200 bg-white">
    <div className="flex items-center">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? ""}
        className="w-full px-2 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-400"
      />
      {unit && <span className="pr-2 sm:pr-4 text-xs text-gray-400 shrink-0">{unit}</span>}
    </div>
  </td>
);
