import { SHAPE_LABELS, ORIENTATION_LABELS } from "@stack/model";
import { GRADE_LABELS } from "@shared/model";
import type { PlanFormData } from "@plan/model";
import type { StackResponse, StackMeasurementResponse } from "@stack/model";

import { SelectField, MultiSelectField } from "@shared/ui";

interface FacilityInfoCardProps {
  form: PlanFormData;
  isSubmitting: boolean;
  setFieldValue: <K extends keyof PlanFormData>(
    key: K,
    value: PlanFormData[K]
  ) => void;
  filteredStacks: StackResponse[];
  selectedStack: StackResponse | null;
  loadingStacks: boolean;
  availableMeasurements: StackMeasurementResponse[];
  loadingMeasurements: boolean;
}

export const FacilityInfoCard = ({
  form,
  isSubmitting,
  setFieldValue,
  filteredStacks,
  selectedStack,
  loadingStacks,
  availableMeasurements,
  loadingMeasurements,
}: FacilityInfoCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">측정시설</h2>
      <div className="space-y-4">
        {/* 측정시설 (배출구 선택) */}
        <SelectField
          id="stackId"
          label="측정시설"
          value={form.stackId}
          options={filteredStacks}
          getOptionLabel={(stack) => `${stack.name} (${stack.semsNumber})`}
          getOptionValue={(stack) => stack.id}
          onChange={(value) => setFieldValue("stackId", value)}
          disabled={isSubmitting || !form.workplaceId || loadingStacks}
          required
        />

        {/* 배출구 정보 (읽기 전용) */}
        {selectedStack && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">배출구 상세정보</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">배출구명:</span>
                <span className="ml-2 font-medium text-gray-900">{selectedStack.name}</span>
              </div>
              <div>
                <span className="text-gray-600">SEMS번호:</span>
                <span className="ml-2 font-medium text-gray-900">{selectedStack.semsNumber}</span>
              </div>
              <div>
                <span className="text-gray-600">등급:</span>
                <span className="ml-2 font-medium text-gray-900">{GRADE_LABELS[selectedStack.grade]}</span>
              </div>
              <div>
                <span className="text-gray-600">형태:</span>
                <span className="ml-2 font-medium text-gray-900">{SHAPE_LABELS[selectedStack.shape]}</span>
              </div>
              <div>
                <span className="text-gray-600">방향:</span>
                <span className="ml-2 font-medium text-gray-900">{ORIENTATION_LABELS[selectedStack.orientation]}</span>
              </div>
              <div>
                <span className="text-gray-600">높이:</span>
                <span className="ml-2 font-medium text-gray-900">{selectedStack.height}m</span>
              </div>
              {selectedStack.shape === "CIRCULAR" ? (
                <div>
                  <span className="text-gray-600">직경:</span>
                  <span className="ml-2 font-medium text-gray-900">{selectedStack.horizontalLength}m</span>
                </div>
              ) : (
                <>
                  <div>
                    <span className="text-gray-600">가로:</span>
                    <span className="ml-2 font-medium text-gray-900">{selectedStack.horizontalLength}m</span>
                  </div>
                  <div>
                    <span className="text-gray-600">세로:</span>
                    <span className="ml-2 font-medium text-gray-900">{selectedStack.verticalLength}m</span>
                  </div>
                </>
              )}
            </div>
            {selectedStack.remark && (
              <div className="pt-2 border-t border-gray-200">
                <span className="text-gray-600 text-sm">비고:</span>
                <p className="mt-1 text-sm text-gray-900">{selectedStack.remark}</p>
              </div>
            )}
          </div>
        )}

        {/* 측정항목 선택 (Multi-select) */}
        <MultiSelectField
          label="측정항목"
          options={availableMeasurements}
          value={form.measurementIds}   // ⭐ 반드시 필요
          getOptionLabel={(p) => p.pollutant.nameKr}
          getOptionValue={(p) => p.id}
          onChange={(selectedIds) => setFieldValue("measurementIds", selectedIds)}
          disabled={isSubmitting || !form.stackId || loadingMeasurements}
        />

      </div>
    </div>
  );
};
