import type { PlanFormData } from "@plan/model";
import { MEASUREMENT_FIELD_OPTIONS, MEASUREMENT_TYPES_OPTIONS } from "@plan/model";
import type { WorkplaceResponse } from "@workplace/model";

import { InputField, SelectField, RadioGroupField } from "@shared/ui";

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
}: SampleInfoCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">시료채취정보</h2>
      <div className="space-y-4">
        {/* 측정분야 */}
        <RadioGroupField
          name="measurementField"
          options={MEASUREMENT_FIELD_OPTIONS}
          value={form.measurementField}
          onChange={(value) => onChange("measurementField", value)}
          disabled={isSubmitting}
        />

        {/* 측정일 */}
        <InputField
          id="measureDate"
          label="측정일"
          name="measureDate"
          type="date"
          onChange={(value) => onChange("measureDate", value)}
          value={form.measureDate ? new Date(form.measureDate).toISOString().split('T')[0] : ""}
          disabled={isSubmitting}
          required
        />

        <SelectField
          id="measurementType"
          label="측정용도"
          name="measurementType"
          options={MEASUREMENT_TYPES_OPTIONS}
          getOptionLabel={(o) => o.label}
          getOptionValue={(o) => o.value}
          onChange={(value) => onChange("measurementType", value)}
          value={form.measurementType}
          disabled={isSubmitting}
          required
        />

        <SelectField
          id="workplace"
          label="측정대상 사업장"
          name="workplace"
          options={filteredWorkplaces}
          getOptionLabel={(w) => w.name}
          getOptionValue={(w) => w.id}
          value={form.workplaceId}
          onChange={handleWorkplaceChange}
          disabled={isSubmitting}
          required
        />
      </div>
    </div>
  );
};
