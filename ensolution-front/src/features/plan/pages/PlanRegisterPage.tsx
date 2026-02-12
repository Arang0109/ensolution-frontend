import { useNavigate } from "react-router-dom";

import { usePlanForm } from "@plan/hooks";
import { PlanRegisterForm } from "@plan/ui";

import { useToast } from "@app/providers/toast";

import { Button } from "@shared/ui";
import { ChevronLeft } from 'lucide-react';

export const PlanRegisterPage = () => {
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
  } = usePlanForm();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const result = await onSubmit(e);

    if (result?.success) {
      showToast(result.message || "측정일정이 등록되었습니다.");
      navigate("/plan");
    } else {
      showToast(result?.message ?? "등록 실패", "error");
    }
  };

  return (
    <div className="px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <Button 
            label="뒤로가기"
            size="xl"
            variant="ghost"
            icon={<ChevronLeft />}
            onClick={() => navigate(-1)}
          />
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <PlanRegisterForm
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
  );
};
