import { useNavigate } from "react-router-dom";
import type { PlanTableResponse } from "@/entities/plan/model";

import { MEASUREMENT_TYPE, PLAN_STATUS, PLAN_STATUS_COLORS } from "@/entities/plan/model";

import { TableContainer } from "@shared/ui";
import { formatDate } from "@shared/lib";

interface PlanTableProps {
  plans: PlanTableResponse[];
}

export const PlanTable = ({ plans }: PlanTableProps) => {
  const navigate = useNavigate();

  return (
    <TableContainer>
      <thead className="bg-gray-50">
        <tr>
          <th className="px-3 py-2 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
            측정일
          </th>
          <th className="px-3 py-2 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
            상태
          </th>
          <th className="px-6 py-2 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
            측정항목
          </th>
          <th className="px-6 py-2 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
            의뢰기관
          </th>
          <th className="px-6 py-2 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
            사업장
          </th>
          <th className="px-6 py-2 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
            측정시설
          </th>
          <th className="px-3 py-2 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
            팀
          </th>
          <th className="px-6 py-2 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
            측정 종류
          </th>
          <th className="px-3 py-2 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
            등록일
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {plans.map((plan) => (
          <tr
            key={plan.id}
            onClick={() => navigate(`/plan/${plan.id}`)}
            className="hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
              {formatDate(plan.measureDate)}
            </td>
            <td className="px-3 py-2 whitespace-nowrap">
              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${PLAN_STATUS_COLORS[plan.status]}`}>
                {PLAN_STATUS[plan.status]}
              </span>
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {plan.measurementItems.join(", ")}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {plan.companyName}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {plan.workplaceName}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {plan.stackName}
            </td>
            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
              {plan.teamName}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {MEASUREMENT_TYPE[plan.measurementType as keyof typeof MEASUREMENT_TYPE] ?? "-"}
            </td>
            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
              {new Date(plan.createdAt).toLocaleDateString('ko-KR')}
            </td>
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
};
