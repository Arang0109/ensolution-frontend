import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useScheduleDetail, useScheduleActions } from "@schedule/hooks";
import { DetailPageHeader, FullPageLoader, EmptyState, Tabs } from "@common/components";
import { PreInfoTab, MeasurementDataTab, LabDataTab } from "@schedule/components/tabs";

export const ScheduleDetailPage = () => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const { scheduleDetail, loading } = useScheduleDetail(Number(scheduleId));
  const { isDeleting, handleDelete } = useScheduleActions();

  const [activeTab, setActiveTab] = useState("preinfo");

  const handleDeleteClick = async () => {
    if (!scheduleId) return;

    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmed) return;

    const result = await handleDelete(Number(scheduleId));

    if (result.success) {
      alert(result.message);
      navigate("/schedule");
    } else {
      alert(result.message);
    }
  };

  if (loading) {
    return <FullPageLoader message="일정 정보를 불러오는 중입니다..." />;
  }

  if (!scheduleDetail) {
    return (
      <EmptyState
        title="일정 정보를 찾을 수 없습니다."
        actionLabel="목록으로 돌아가기"
        onAction={() => navigate("/schedule")}
      />
    );
  }

  const tabs = [
    { id: "preinfo", label: "업체/시설 정보" },
    { id: "pollutant", label: "측정 정보" },
    { id: "measurement", label: "측정 데이터" },
    { id: "lab", label: "실험 데이터" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "preinfo":
        return <PreInfoTab scheduleDetail={scheduleDetail} />;
      case "measurement":
        return <MeasurementDataTab />;
      case "lab":
        return <LabDataTab />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <DetailPageHeader
        title={`${scheduleDetail.workplace.name} - ${scheduleDetail.stack.stack.name}`}
        isEditMode={false}
        isDeleting={isDeleting}
        onDelete={handleDeleteClick}
        onUpdate={() => {}}
        onSave={() => {}}
        onCancel={() => {}}
        backUrl={() => navigate("/schedule")}
      />

      {/* Tabs */}
      <div className="mt-6">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
};
