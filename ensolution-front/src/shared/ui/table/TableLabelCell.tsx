export const TableLabelCell = ({ children }: { children: React.ReactNode }) => (
  <th
    scope="row"
    className="bg-gray-100 border border-gray-200 px-2 py-2 text-center text-[9px] sm:text-xs font-semibold text-gray-600 whitespace-nowrap w-16 sm:w-24"
  >
    {children}
  </th>
)