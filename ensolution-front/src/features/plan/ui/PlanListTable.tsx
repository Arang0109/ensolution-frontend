import { useNavigate } from "react-router-dom";
import type { PlanTableView } from "@plan/model";

import { TableContainer } from "@shared/ui";

interface PlanTableProps {
  plans: PlanTableView[];
}

const STATUS_LABELS: Record<string, string> = {
  MEASURING: "측정 중",
  ANALYZING: "분석 중",
  COMPLETED: "완료",
  CANCELED: "취소",
};

const STATUS_COLORS: Record<string, string> = {
  MEASURING: "bg-blue-100 text-blue-800",
  ANALYZING: "bg-yellow-100 text-yellow-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELED: "bg-gray-100 text-gray-800",
};

export const PlanListTable = ({ plans }: PlanTableProps) => {
  const navigate = useNavigate();

  if (plans.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-lg">등록된 측정일정이 없습니다.</p>
        <p className="text-gray-400 text-sm mt-2">일정 등록 버튼을 눌러 새로운 일정을 등록하세요.</p>
      </div>
    );
  }

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
              {new Date(plan.measureDate).toLocaleDateString('ko-KR')}
            </td>
            <td className="px-3 py-2 whitespace-nowrap">
              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${STATUS_COLORS[plan.status]}`}>
                {STATUS_LABELS[plan.status]}
              </span>
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {plan.measurements.join(", ")}
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
              {plan.measurementType}
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
