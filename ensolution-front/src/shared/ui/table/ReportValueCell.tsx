export const ReportValueCell = ({
  children,
  colSpan,
  rowSpan,
}: {
  children?: React.ReactNode,
  colSpan?: number
  rowSpan?: number
}) => (
  <th
    scope="row"
    colSpan={colSpan}
    rowSpan={rowSpan}
    className={`
      border border-black
      p-1 md:p-2
      text-center text-[9px] sm:text-xs
      text-gray-800 whitespace-nowrap
    `}
  >
    {children}
  </th>
)