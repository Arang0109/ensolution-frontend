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
}) => {
  const isNumber = type === "number";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (isNumber) {
      // 숫자, 소수점, 음수 부호만 허용
      if (raw === "" || raw === "-" || /^-?\d*\.?\d*$/.test(raw)) {
        onChange(raw);
      }
    } else {
      onChange(raw);
    }
  };

  return (
  <td colSpan={colSpan} className="border border-black">
    <div className="flex items-center">
      <input
        value={value}
        type={isNumber ? "text" : type}
        inputMode={isNumber ? "numeric" : undefined}
        onChange={handleChange}
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
};
