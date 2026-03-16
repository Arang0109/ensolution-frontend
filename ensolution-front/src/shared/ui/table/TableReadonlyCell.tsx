import { TableLabelCell } from "@shared/ui";

export const TableReadonlyCell = ({ label, value, colSpan }: { label: string; value: string; colSpan?: number }) => (
  <>
    <TableLabelCell>
      {label}
    </TableLabelCell>
    <td colSpan={colSpan} className="border border-gray-200 bg-white">
      <input
        value={value}
        readOnly
        className="w-full px-4 py-2.5 text-sm text-gray-500 bg-transparent focus:outline-none cursor-default"
      />
    </td>
  </>
);