import type { StackDetailResponse, StackResponse } from "@stack/model";
import type { PlanCreateForm } from "@plan/model"
import { StackDetailCard } from "@plan/components";

import { SelectField, MultiSelectField } from "@shared/ui";

interface StackSectionProps {
  form: PlanCreateForm;
  creating: boolean;
  onChange: (
    name: keyof PlanCreateForm,
    value: string
  ) => void;

  onMeasurementIdsChange: (ids: number[]) => void;

  filteredStacks: StackResponse[];

  stack: StackDetailResponse | null;

  selectedStackId: number | null;

  onStackChange: (id: number) => void;
}

export const StackSection = ({
  form,
  creating,

  filteredStacks,
  onMeasurementIdsChange,

  stack,

  selectedStackId,

  onStackChange,
}: StackSectionProps) => {

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">측정시설정보</h2>

      <SelectField
        id="stack"
        label="측정시설"
        name="stack"
        options={filteredStacks}
        getOptionLabel={(s) => s.name}
        getOptionValue={(s) => s.id}
        value={selectedStackId}
        onChange={onStackChange}
        disabled={creating}
        required
      />

      {stack && (
        <>
          <StackDetailCard stack={stack} />

          <MultiSelectField
            label="측정항목"
            options={stack.stackMeasurements}
            getOptionLabel={(s) => s.pollutant.nameKr}
            getOptionValue={(s) => s.id}
            value={form.measurementIds}
            onChange={onMeasurementIdsChange}
            disabled={creating}
          />
        </>
      )}
    </div>
  )
}
