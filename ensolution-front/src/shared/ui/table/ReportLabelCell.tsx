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
      bg-slate-100 border border-black
      p-1 md:p-2
      text-center text-[9px] sm:text-xs
      font-semibold text-slate-700 whitespace-nowrap
    `}
  >
    {children}
  </th>
)