import type { ScheduleDetailResponse, ScheduleUpdateRequest } from "@schedule/model";

const STATUS_LABELS: Record<string, string> = {
  MEASURING: "측정 중",
  ANALYZING: "분석 중",
  COMPLETED: "완료",
  CANCELED: "취소",
};

interface ScheduleInfoCardProps {
  scheduleDetail: ScheduleDetailResponse;
  isEditMode?: boolean;
  editForm?: ScheduleUpdateRequest;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const ScheduleInfoCard = ({
  scheduleDetail,
  isEditMode = false,
  editForm,
  onChange,
}: ScheduleInfoCardProps) => {
  const { schedule, stack, workplace, company } = scheduleDetail;
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">일정 정보</h2>

      <div className="space-y-4">
        {/* Company and Workplace Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              업체명
            </label>
            <p className="text-gray-800 font-medium">{company.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              사업장
            </label>
            <p className="text-gray-800 font-medium">{workplace.name}</p>
          </div>
        </div>

        {/* Stack and Team Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              배출구
            </label>
            {isEditMode && editForm && onChange ? (
              <input
                type="number"
                name="stackId"
                value={editForm.stackId}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            ) : (
              <p className="text-gray-800 font-medium">{stack.stack.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              팀 ID
            </label>
            {isEditMode && editForm && onChange ? (
              <input
                type="number"
                name="teamId"
                value={editForm.teamId}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            ) : (
              <p className="text-gray-800 font-medium">{schedule.teamId}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              측정일
            </label>
            {isEditMode && editForm && onChange ? (
              <input
                type="date"
                name="measureDate"
                value={new Date(editForm.measureDate).toISOString().split('T')[0]}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            ) : (
              <p className="text-gray-800 font-medium">
                {new Date(schedule.measureDate).toLocaleDateString('ko-KR')}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              측정 종류
            </label>
            {isEditMode && editForm && onChange ? (
              <input
                type="text"
                name="measurementType"
                value={editForm.measurementType}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            ) : (
              <p className="text-gray-800 font-medium">{schedule.measurementType}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            상태
          </label>
          <p className="text-gray-800 font-medium">{STATUS_LABELS[schedule.status]}</p>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            등록일: {new Date(schedule.createdAt).toLocaleString('ko-KR')}
          </p>
        </div>
      </div>
    </div>
  );
};
