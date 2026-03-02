export const TableLabelCell = ({ children }: { children: React.ReactNode }) => (
  <th
    scope="row"
    className="bg-gray-100 border border-gray-200 px-2 py-2 sm:px-4 sm:py-2.5 text-center text-xs font-semibold text-gray-600 whitespace-nowrap w-24 sm:w-32"
  >
    {children}
  </th>
)