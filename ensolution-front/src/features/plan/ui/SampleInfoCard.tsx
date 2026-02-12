import { SearchableSelect } from "@plan/components/SearchableSelect";
import type { PlanFormData } from "@plan/model";
import { MEASUREMENT_TYPES, MEASUREMENT_FIELD_OPTIONS } from "@plan/model";
import type { WorkplaceResponse } from "@workplace/model";

import { RadioButton } from "@shared/ui";

interface SampleInfoCardProps {
  form: PlanFormData;
  isSubmitting: boolean;
  onChange: (name: keyof PlanFormData, value: string | number | Date) => void;
  filteredWorkplaces: WorkplaceResponse[];
  handleWorkplaceChange: (workplaceId: number) => void;
  loading: boolean;
}

export const SampleInfoCard = ({
  form,
  isSubmitting,
  onChange,
  filteredWorkplaces,
  handleWorkplaceChange,
  loading,
}: SampleInfoCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">시료채취정보</h2>
      <div className="space-y-4">
        {/* 측정분야 */}
        <RadioButton
          options={MEASUREMENT_FIELD_OPTIONS}
          value={form.measurementField}
          onChange={(value) => onChange("measurementField", value)}
          disabled={isSubmitting}
        />

        {/* 측정일 */}
        <div>
          <label htmlFor="measureDate" className="block text-sm font-medium text-gray-700 mb-1">
            측정일 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="measureDate"
            name="measureDate"
            value={form.measureDate ? new Date(form.measureDate).toISOString().split('T')[0] : ""}
            onChange={(e) => onChange("measureDate", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={isSubmitting}
            required
          />
        </div>

        {/* 측정용도 */}
        <div>
          <label htmlFor="measurementType" className="block text-sm font-medium text-gray-700 mb-1">
            측정용도 <span className="text-red-500">*</span>
          </label>
          <select
            id="measurementType"
            name="measurementType"
            value={form.measurementType}
            onChange={(e) => onChange("measurementType", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={isSubmitting}
            required
          >
            <option value={MEASUREMENT_TYPES.SELF}>자가측정용</option>
            <option value={MEASUREMENT_TYPES.IMPACT}>환경영향평가</option>
            <option value={MEASUREMENT_TYPES.PERMIT}>인허가용</option>
            <option value={MEASUREMENT_TYPES.REFERENCE}>참고용</option>
          </select>
        </div>

        {/* 측정대상 사업장 */}
        <SearchableSelect
          id="workplace"
          label="측정대상 사업장"
          placeholder="사업장을 선택하세요"
          value={form.workplaceId}
          options={filteredWorkplaces}
          getOptionLabel={(workplace) => workplace.name}
          getOptionValue={(workplace) => workplace.id}
          onChange={handleWorkplaceChange}
          disabled={isSubmitting || loading}
          loading={loading}
          emptyMessage="사업장이 없습니다"
          required
        />
      </div>
    </div>
  );
};
