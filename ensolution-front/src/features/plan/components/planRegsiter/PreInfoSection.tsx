import type { PlanCreateForm } from "@plan/model";
import { MEASUREMENT_FIELD_OPTIONS, MEASUREMENT_TYPE_OPTIONS } from "@plan/model";
import type { CompanyResponse } from "@company/model";
import type { WorkplaceResponse } from "@workplace/model";

import { InputField, SelectField, RadioGroupField } from "@shared/ui";

interface PreInfoSectionProps {
  form: PlanCreateForm;
  creating: boolean;
  onChange: (
    name: keyof PlanCreateForm,
    value: string
  ) => void;

  companies: CompanyResponse[];
  filteredWorkplaces: WorkplaceResponse[];

  selectedCompanyId: number | null;
  selectedWorkplaceId: number | null;

  onCompanyChange: (id: number) => void;
  onWorkplaceChange: (id: number) => void;
}

export const PreInfoSection = ({
  form,
  creating,
  onChange,
  companies,
  filteredWorkplaces,

  selectedCompanyId,
  selectedWorkplaceId,

  onCompanyChange,
  onWorkplaceChange,
}: PreInfoSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">시료채취정보</h2>
      <div className="space-y-4">
        {/* 측정분야 */}
        <RadioGroupField
          name="measurementField"
          options={MEASUREMENT_FIELD_OPTIONS}
          value={form.measureField}
          onChange={(value) => onChange("measureField", value)}
          disabled={creating}
        />

        {/* 측정일 */}
        <InputField
          id="measureDate"
          label="측정일"
          name="measureDate"
          type="date"
          onChange={(value) => onChange("measureDate", value)}
          value={form.measureDate}
          disabled={creating}
          required
        />

        <SelectField
          id="measurementType"
          label="측정용도"
          name="measurementType"
          options={MEASUREMENT_TYPE_OPTIONS}
          getOptionLabel={(o) => o.label}
          getOptionValue={(o) => o.value}
          onChange={(value) => onChange("measurementType", value)}
          value={form.measurementType}
          disabled={creating}
          required
        />

        <SelectField
          id="companiy"
          label="측정대행 의뢰기관"
          name="company"
          options={companies}
          getOptionLabel={(c) => c.name}
          getOptionValue={(c) => c.id}
          value={selectedCompanyId}
          onChange={onCompanyChange}
          disabled={creating}
          required
        />

        <SelectField
          id="workplace"
          label="측정대상 사업장"
          name="workplace"
          options={filteredWorkplaces}
          getOptionLabel={(w) => w.name}
          getOptionValue={(w) => w.id}
          value={selectedWorkplaceId}
          onChange={onWorkplaceChange}
          disabled={creating}
          required
        />
      </div>
    </div>
  );
};
