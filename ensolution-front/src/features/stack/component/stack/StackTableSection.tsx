import { useNavigate } from "react-router-dom";

import type { StackResponse } from "@stack/model";
import { SHAPE_LABELS, ORIENTATION_LABELS } from "@stack/model"

import { TableContainer } from "@shared/ui";
import { GRADE_LABELS } from "@shared/model";
import { formatHeight, formatLength } from "@shared/lib";

interface StackTableSectionProps {
  stacks: StackResponse[];
}

export const StackTableSection = ({ stacks }: StackTableSectionProps) => {

  const navigate = useNavigate();
  
  return (
  <TableContainer>
      <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              시설명
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              SEMS번호
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              종별
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              높이
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              직경(수평 | 수직)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              모양
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
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
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {stack.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-xs">
                {stack.semsNumber}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {GRADE_LABELS[stack.grade] ?? '-'}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {formatHeight(Number(stack.height))}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-xs">
                {stack.shape === "CIRCULAR"
                  ? formatLength(Number(stack.horizontalLength))
                  : `${formatLength(Number(stack.horizontalLength))} | ${formatLength(
                      Number(stack.verticalLength)
                    )}`}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {SHAPE_LABELS[stack.shape] ?? '-'}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {ORIENTATION_LABELS[stack.orientation] ?? '-'}
              </td>
            </tr>
          ))}
        </tbody>
    </TableContainer>
  )

 
}