interface TableContainerProps {
  children: React.ReactNode;
  tableFixed?: boolean;
}

export const TableContainer = ({ children, tableFixed }: TableContainerProps) => (
  <div className="overflow-x-auto bg-white rounded-lg [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
    <table
      className={`w-full divide-y divide-gray-200${tableFixed ? " table-fixed" : ""}`}
    >
      {children}
    </table>
  </div>
);  