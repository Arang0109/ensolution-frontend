import { TableLabelCell } from "@shared/ui";

export const TableReadonlyCell = ({ label, value, colSpan }: { label: string; value: string; colSpan?: number }) => (
  <>
    <TableLabelCell>
      {label}
    </TableLabelCell>
    <td colSpan={colSpan} className="border border-slate-200 bg-white">
      <input
        value={value}
        readOnly
        className="w-full p-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-gray-500 bg-transparent focus:outline-none cursor-default"
      />
    </td>
  </>
);