import { useNavigate } from "react-router-dom";
import { useSchedules } from "@schedule/hooks";
import { ScheduleTable } from "@schedule/components";

export const ScheduleListPage = () => {
  const navigate = useNavigate();
  const { schedules, loading } = useSchedules();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">측정일정 관리</h1>
        <button
          onClick={() => navigate("/schedule/add")}
          className="px-4 py-2 bg-gradient-to-r from-brown-500 to-brown-600 text-white rounded-lg hover:from-brown-600 hover:to-brown-700 transition-colors flex items-center gap-2 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          일정 등록
        </button>
      </div>

      {/* Schedule Table */}
      <ScheduleTable schedules={schedules} />
    </div>
  );
};
