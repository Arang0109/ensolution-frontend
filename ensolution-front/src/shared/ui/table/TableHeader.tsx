import type { ReactNode } from "react";

interface TableHeaderColumn {
  label: ReactNode;
  colSpan?: number;
  className?: string;
}

interface TableHeaderProps {
  columns: TableHeaderColumn[];
  /** columns에 className이 없을 때 적용되는 기본 스타일 */
  defaultThClassName?: string;
}

export const TableHeader = ({ columns, defaultThClassName }: TableHeaderProps) => (
  <thead>
    <tr>
      {columns.map((col, i) => (
        <th
          key={i}
          colSpan={col.colSpan}
          className={col.className ?? defaultThClassName}
        >
          {col.label}
        </th>
      ))}
    </tr>
  </thead>
);
