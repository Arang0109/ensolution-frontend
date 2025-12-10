import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useScheduleDetail, useScheduleActions } from "@schedule/hooks";
import type { ScheduleUpdateRequest } from "@schedule/model";
import { DetailPageHeader, FullPageLoader, EmptyState } from "@/common/components";
import { ScheduleInfoCard, ScheduleSidebar } from "@schedule/components";

export const ScheduleDetailPage = () => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const { schedule, loading } = useScheduleDetail(Number(scheduleId));
  const { isDeleting, isUpdating, handleDelete, handleUpdate } = useScheduleActions();

  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<ScheduleUpdateRequest>({
    stackId: 0,
    teamId: 0,
    measureDate: new Date(),
    measurementType: "",
  });

  useEffect(() => {
    if (schedule) {
      setEditForm({
        stackId: schedule.stackId,
        teamId: schedule.teamId,
        measureDate: schedule.measureDate,
        measurementType: schedule.measurementType,
      });
    }
  }, [schedule]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "measureDate") {
      setEditForm(prev => ({ ...prev, [name]: new Date(value) }));
    } else if (name === "stackId" || name === "teamId") {
      setEditForm(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setEditForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSubmit = async () => {
    if (!scheduleId) return;

    const result = await handleUpdate(Number(scheduleId), editForm);

    if (result.success) {
      alert(result.message);
      setIsEditMode(false);
      window.location.reload();
    } else {
      alert(result.message);
    }
  };

  const handleDeleteClick = async () => {
    if (!scheduleId) return;

    const result = await handleDelete(Number(scheduleId));

    if (result.success) {
      alert(result.message);
      navigate("/schedule");
    } else {
      alert(result.message);
    }
  };

  const handleStartEdit = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    if (schedule) {
      setEditForm({
        stackId: schedule.stackId,
        teamId: schedule.teamId,
        measureDate: schedule.measureDate,
        measurementType: schedule.measurementType,
      });
    }
    setIsEditMode(false);
  };

  if (loading) {
    return <FullPageLoader message="일정 정보를 불러오는 중입니다..." />;
  }

  if (!schedule) {
    return (
      <EmptyState
        title="일정 정보를 찾을 수 없습니다."
        actionLabel="목록으로 돌아가기"
        onAction={() => navigate("/schedule")}
      />
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <DetailPageHeader
        title={`측정일정 #${schedule.id}`}
        isEditMode={isEditMode}
        isUpdating={isUpdating}
        isDeleting={isDeleting}
        onEdit={handleStartEdit}
        onCancel={handleCancelEdit}
        onSave={handleEditSubmit}
        onDelete={handleDeleteClick}
        backUrl="/schedule"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule Info Card */}
        <div className="lg:col-span-2 space-y-6">
          <ScheduleInfoCard
            schedule={schedule}
            isEditMode={isEditMode}
            editForm={editForm}
            onChange={handleEditChange}
          />
        </div>

        {/* Sidebar */}
        <ScheduleSidebar schedule={schedule} />
      </div>
    </div>
  );
};
