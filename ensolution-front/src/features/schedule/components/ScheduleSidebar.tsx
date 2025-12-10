import type { ScheduleResponse } from "@schedule/model";

const STATUS_LABELS: Record<string, string> = {
  MEASURING: "측정 중",
  ANALYZING: "분석 중",
  COMPLETED: "완료",
  CANCELED: "취소",
};

interface ScheduleSidebarProps {
  schedule: ScheduleResponse;
}

export const ScheduleSidebar = ({ schedule }: ScheduleSidebarProps) => {
  return (
    <div className="space-y-6">
      {/* Status Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">현재 상태</h3>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">진행 상태</p>
            <p className="text-lg font-semibold text-blue-700">
              {STATUS_LABELS[schedule.status]}
            </p>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">추가 정보</h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-gray-600">ID</p>
            <p className="font-medium text-gray-800">{schedule.id}</p>
          </div>
          <div>
            <p className="text-gray-600">등록일</p>
            <p className="font-medium text-gray-800">
              {new Date(schedule.createdAt).toLocaleDateString('ko-KR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
