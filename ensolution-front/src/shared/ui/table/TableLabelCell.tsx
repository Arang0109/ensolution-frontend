export const TableLabelCell = ({
  children,
  colSpan,
}: {
  children: React.ReactNode,
  colSpan?: number
 }) => (
  <th
    scope="row"
    colSpan={colSpan}
    className={`
      bg-slate-100 border border-slate-200
      p-1 pr-3 md:p-2
      text-right text-[9px] sm:text-xs
      font-semibold text-slate-700 whitespace-nowrap
    `}
  >
    {children}
  </th>
)