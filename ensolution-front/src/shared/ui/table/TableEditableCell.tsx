import { TableLabelCell } from "@shared/ui";

export const TableEditableCell = ({
  label,
  value,
  onChange,
  colSpan,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  colSpan?: number;
  placeholder?: string;
}) => (
  <>
    <TableLabelCell>
      {label}
    </TableLabelCell>
    <td colSpan={colSpan} className="border border-gray-200 bg-white">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "-"}
        className="w-full px-2 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-400"
      />
    </td>
  </>
);