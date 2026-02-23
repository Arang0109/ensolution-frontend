import { TableLabelCell } from "@shared/ui";

const colSpanClass: Record<number, string> = {
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
};

export const TableSelectableCell = ({
  label,
  value,
  onChange,
  options,
  colSpan,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string | number; label: string }[];
  colSpan?: number;
  placeholder?: string;
}) => (
  <>
    <TableLabelCell>
      {label}
    </TableLabelCell>
    <td colSpan={colSpan} className={`border border-gray-200 bg-white${colSpan ? ` ${colSpanClass[colSpan] ?? ''}` : ''}`}>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-4 pr-10 py-2.5 text-sm text-gray-800 bg-transparent appearance-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-400 cursor-pointer"
        >
          <option value="" disabled>
            {placeholder ?? "선택"}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </td>
  </>
);
