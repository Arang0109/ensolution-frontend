export const TableLabelCell = ({ children }: { children: React.ReactNode }) => (
  <th
    scope="row"
    className="bg-gray-100 border border-gray-200 px-4 py-2.5 text-left text-xs font-semibold text-gray-600 whitespace-nowrap w-32"
  >
    {children}
  </th>
)