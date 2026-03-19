import { useNavigate } from "react-router-dom";

import type { CompanyResponse } from "@entities/company/model";

import { formatBizNumber } from "@shared/lib";
import { TableContainer } from "@shared/ui";

interface CompanyTableProps {
  companies: CompanyResponse[];
}

export const CompanyTable = ({ companies }: CompanyTableProps) => {
  const navigate = useNavigate();

  return (
    <TableContainer>
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500">
            업체명
          </th>
          <th className="hidden md:table-cell px-6 py-3 text-left text-sm font-medium text-gray-500">
            주소
          </th>
          <th className="hidden md:table-cell px-6 py-3 text-left text-sm font-medium text-gray-500">
            사업자번호
          </th>
          <th className="hidden md:table-cell px-6 py-3 text-left text-sm font-medium text-gray-500">
            대표자
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {companies.map((company) => (
          <tr
            key={company.id}
            onClick={() => navigate(`/company/${company.id}`)}
            className="cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <td className="px-4 py-3 md:px-6 md:py-4 text-xs md:text-sm font-medium text-gray-900">
              {company.name}
            </td>
            <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600 truncate max-w-xs">
              {company.address}
            </td>
            <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
              {formatBizNumber(company.bizNumber) ?? "-"}
            </td>
            <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
              {company.ceoName}
            </td>
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
};