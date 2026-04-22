import React from "react";

export const TableInputCell = ({
  value,
  onChange,
  placeholder,
  colSpan,
  unit,
  type,
}: {
  value: string;
  type?: React.HTMLInputTypeAttribute;
  onChange: (v: string) => void;
  placeholder?: string;
  colSpan?: number;
  unit?: React.ReactNode;
}) => (
  <td colSpan={colSpan} className="border border-black">
    <div className="flex items-center">
      <input
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? ""}
        className="
          w-full p-2 sm:px-3 sm:py-2.5
          text-[10px] sm:text-sm bg-transparent
          focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400"
      />
      {unit && <span className="pr-1 text-[6px] text-gray-700 shrink-0"><i>{unit}</i></span>}
    </div>
  </td>
);
