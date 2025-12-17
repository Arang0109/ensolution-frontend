import { useNavigate } from "react-router-dom";

import { useSchedules } from "@schedule/hooks";
import { ScheduleTable } from "@schedule/components";

import { Button } from "@common/ui";

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
        <Button
           onClick={() => navigate("/schedule/add")}
           label="일정 등록"
        />
      </div>

      {/* Schedule Table */}
      <ScheduleTable schedules={schedules} />
    </div>
  );
};
