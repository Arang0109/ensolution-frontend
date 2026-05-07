export const ReportLabelCell = ({
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
      bg-gray-300 border border-black
      p-1 md:p-2
      text-center text-[9px] sm:text-xs
      font-semibold text-black whitespace-nowrap
    `}
  >
    {children}
  </th>
)