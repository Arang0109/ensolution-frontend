import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useToast } from "@common/hooks";
import { Button } from "@common/ui";

import { useScheduleDetail, useScheduleActions } from "@schedule/hooks";
import { FullPageLoader, EmptyState, Tabs } from "@common/components";
import { PreInfoTab, MeasurementInfoTab, MeasurementDataTab, LabDataTab } from "@schedule/components/tabs";

export const ScheduleDetailPage = () => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { scheduleDetail, loading } = useScheduleDetail(Number(scheduleId));
  const { isDeleting, handleDelete } = useScheduleActions();

  const [activeTab, setActiveTab] = useState("measurementinfo");

  const handleDeleteClick = async () => {
    if (!scheduleId) return;

    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmed) return;

    const result = await handleDelete(Number(scheduleId));

    if (result.success) {
      showToast(result.message, "success");
      navigate("/schedule");
    } else {
      showToast(result.message, "error");
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
    { id: "measurementinfo", label: "측정 정보" },
    { id: "preinfo", label: "업체/시설 정보" },
    { id: "measurement", label: "측정 데이터" },
    { id: "lab", label: "실험 데이터" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "measurementinfo":
        return <MeasurementInfoTab scheduleDetail={scheduleDetail} />;
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
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/schedule")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {`${scheduleDetail.workplace.name} - ${scheduleDetail.stack.stack.name}`}
            </h1>
          </div>
        </div>
        <Button
                label="삭제"
                onClick={handleDeleteClick}
                disabled={isDeleting}
        />
      </div>

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
