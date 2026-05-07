import { useNavigate } from "react-router-dom";

import type { WorkplaceResponse } from "@entities/workplace/model";

import { formatBizNumber } from "@shared/lib";
import { GRADE_LABELS } from "@shared/model";
import { TableContainer } from "@shared/ui";

interface WorkplaceTableProps {
  workplaces: WorkplaceResponse[];
}

export const WorkplaceTable = ({ workplaces }: WorkplaceTableProps) => {
  const navigate = useNavigate();

  return (
    <TableContainer>
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500">
            사업장명
          </th>
          <th className="hidden md:table-cell px-6 py-3 text-left text-sm font-medium text-gray-500">
            주소
          </th>
          <th className="hidden md:table-cell px-6 py-3 text-left text-sm font-medium text-gray-500">
            사업자번호
          </th>
          <th className="hidden md:table-cell px-6 py-3 text-left text-sm font-medium text-gray-500">
            업종
          </th>
          <th className="hidden md:table-cell px-6 py-3 text-left text-sm font-medium text-gray-500">
            규모
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {workplaces.map((workplace) => (
          <tr
            key={workplace.id}
            onClick={() => navigate(`/workplace/${workplace.id}`)}
            className="cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <td className="px-4 py-3 md:px-6 md:py-4 text-xs md:text-sm font-medium text-gray-900">
              {workplace.name}
            </td>
            <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600 truncate max-w-xs">
              {workplace.address}
            </td>
            <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
              {formatBizNumber(workplace.bizNumber) ?? '-'}
            </td>
            <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
              {workplace.businessCategory}
            </td>
            <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
              {GRADE_LABELS[workplace.grade] ?? '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
};