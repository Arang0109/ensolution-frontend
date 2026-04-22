import React from "react";

export const TableActionCell = ({
  children,
  colSpan,
}: {
  children: React.ReactNode;
  colSpan?: number;
}) => (
  <td colSpan={colSpan} className="border border-black">
    <div className="flex items-center px-2 py-2 sm:px-3 sm:py-2.5">
      {children}
    </div>
  </td>
);
