import { useNavigate } from "react-router-dom";

import { useScheduleForm } from "@schedule/hooks";
import { ScheduleForm } from "@schedule/ui/ScheduleForm";

import { useToast } from "@common/hooks";

export const ScheduleAddPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {
    form,
    isSubmitting,
    onChange,
    onSubmit,
    setFieldValue,
    filteredWorkplaces,
    filteredTeams,
    filteredStacks,
    selectedStack,
    handleWorkplaceChange,
    loading,
    loadingStacks,
    availableMeasurements,
    loadingMeasurements,
  } = useScheduleForm();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const result = await onSubmit(e);

    if (result?.success) {
      showToast(result.message || "측정일정이 등록되었습니다.");
      navigate("/schedule");
    } else {
      showToast(result?.message ?? "등록 실패", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
              disabled={isSubmitting}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-3xl font-bold text-gray-900">측정일정 등록</h1>
          </div>
          <p className="text-gray-600 ml-9">새로운 측정일정을 등록합니다.</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <ScheduleForm
            form={form}
            isSubmitting={isSubmitting}
            onChange={onChange}
            onSubmit={handleSubmit}
            setFieldValue={setFieldValue}
            filteredWorkplaces={filteredWorkplaces}
            filteredTeams={filteredTeams}
            filteredStacks={filteredStacks}
            selectedStack={selectedStack}
            handleWorkplaceChange={handleWorkplaceChange}
            loading={loading}
            loadingStacks={loadingStacks}
            availableMeasurements={availableMeasurements}
            loadingMeasurements={loadingMeasurements}
          />
        </div>

        {/* Help text */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 안내사항</h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>사업장을 선택하면 해당 사업장의 배출구 목록이 표시됩니다.</li>
            <li>배출구를 선택하면 등록된 측정항목을 선택할 수 있습니다.</li>
            <li>측정항목은 여러 개를 선택할 수 있습니다.</li>
            <li>모든 필수 항목을 입력해야 등록이 가능합니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
