interface TableContainerProps {
  children: React.ReactNode;
  tableFixed?: boolean;
  tableClassName?: string;
}

export const TableContainer = ({ children, tableFixed, tableClassName }: TableContainerProps) => (
  <div className="overflow-x-auto bg-white rounded-lg">
    <table
      className={`w-full divide-y divide-gray-200${tableFixed ? " table-fixed" : ""}${tableClassName ? ` ${tableClassName}` : ""}`}
    >
      {children}
    </table>
  </div>
);  