import { TableLabelCell } from "@shared/ui";

const colSpanClass: Record<number, string> = {
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
};

export const TableReadonlyCell = ({ label, value, colSpan }: { label: string; value: string; colSpan?: number }) => (
  <>
    <TableLabelCell>
      {label}
    </TableLabelCell>
    <td colSpan={colSpan} className={`border border-gray-200 bg-gray-50/50${colSpan ? ` ${colSpanClass[colSpan] ?? ''}` : ''}`}>
      <input
        value={value}
        readOnly
        className="w-full px-4 py-2.5 text-sm text-gray-500 bg-transparent focus:outline-none cursor-default"
      />
    </td>
  </>
);