interface TableContainerProps {
  children: React.ReactNode;
}

export const TableContainer = ({ children }: TableContainerProps) => (
  <div className="overflow-x-auto bg-white rounded-lg shadow">
    <table className="w-full divide-y divide-gray-200">
      {children}
    </table>
  </div>
);