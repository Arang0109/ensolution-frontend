import type { PlanDetailResponse } from "@plan/model";

const STATUS_LABELS: Record<string, string> = {
  MEASURING: "측정 중",
  ANALYZING: "분석 중",
  COMPLETED: "완료",
  CANCELED: "취소",
};

interface PlanSidebarProps {
  planDetail: PlanDetailResponse;
}

export const PlanSidebar = ({ planDetail }: PlanSidebarProps) => {
  const { plan, stack } = planDetail;

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">현재 상태</h3>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">진행 상태</p>
            <p className="text-lg font-semibold text-blue-700">
              {STATUS_LABELS[plan.status]}
            </p>
          </div>
        </div>
      </div>

      {/* Stack Info Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">배출구 정보</h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-gray-600">배출구명</p>
            <p className="font-medium text-gray-800">{stack.stack.name}</p>
          </div>
          <div>
            <p className="text-gray-600">SEMS 번호</p>
            <p className="font-medium text-gray-800">{stack.stack.semsNumber || "-"}</p>
          </div>
          <div>
            <p className="text-gray-600">배출구 모양</p>
            <p className="font-medium text-gray-800">{stack.stack.shape || "-"}</p>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">추가 정보</h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-gray-600">일정 ID</p>
            <p className="font-medium text-gray-800">{plan.id}</p>
          </div>
          <div>
            <p className="text-gray-600">등록일</p>
            <p className="font-medium text-gray-800">
              {new Date(plan.createdAt).toLocaleDateString('ko-KR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
