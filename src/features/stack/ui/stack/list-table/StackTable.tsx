import { useNavigate } from "react-router-dom";

import type { StackResponse } from "@/entities/stack/model";
import { SHAPE_LABELS, ORIENTATION_LABELS } from "@/entities/stack/model"

import { TableContainer } from "@shared/ui";
import { GRADE_LABELS } from "@shared/model";
import { formatHeight, formatLength } from "@shared/lib";

interface StackTableProps {
  stacks: StackResponse[];
}

export const StackTable = ({ stacks }: StackTableProps) => {

  const navigate = useNavigate();
  
  return (
  <TableContainer>
      <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500">
              시설명
            </th>
            <th className="hidden md:table-cell px-6 py-3 text-left text-sm font-medium text-gray-500">
              SEMS번호
            </th>
            <th className="hidden md:table-cell px-6 py-3 text-left text-sm font-medium text-gray-500">
              종별
            </th>
            <th className="hidden md:table-cell px-6 py-3 text-left text-sm font-medium text-gray-500">
              높이
            </th>
            <th className="hidden md:table-cell px-6 py-3 text-left text-sm font-medium text-gray-500">
              직경(수평 | 수직)
            </th>
            <th className="hidden md:table-cell px-6 py-3 text-left text-sm font-medium text-gray-500">
              모양
            </th>
            <th className="hidden md:table-cell px-6 py-3 text-left text-sm font-medium text-gray-500">
              방향
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {stacks.map((stack) => (
            <tr
              key={stack.id}
              onClick={() => navigate(`/stack/${stack.id}`)}
              className="cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-3 md:px-6 md:py-4 text-xs md:text-sm font-medium text-gray-900">
                {stack.name}
              </td>
              <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
                {stack.semsNumber}
              </td>
              <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
                {GRADE_LABELS[stack.grade] ?? '-'}
              </td>
              <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
                {formatHeight(Number(stack.height))}
              </td>
              <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
                {stack.shape === "CIRCULAR"
                  ? formatLength(Number(stack.horizontalLength))
                  : `${formatLength(Number(stack.horizontalLength))} | ${formatLength(
                      Number(stack.verticalLength)
                    )}`}
              </td>
              <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
                {SHAPE_LABELS[stack.shape] ?? '-'}
              </td>
              <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
                {ORIENTATION_LABELS[stack.orientation] ?? '-'}
              </td>
            </tr>
          ))}
        </tbody>
    </TableContainer>
  )

 
}