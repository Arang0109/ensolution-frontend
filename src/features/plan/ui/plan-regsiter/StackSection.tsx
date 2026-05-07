import { Fragment } from "react";

import type { StackDetailResponse, StackResponse } from "@/entities/stack/model";
import type { PlanCreateForm } from "@/entities/plan/model"

import { CYCLE_LABELS } from "@entities/stack/model";

import { SelectField } from "@shared/ui";

interface StackSectionProps {
  form: PlanCreateForm;
  creating: boolean;
  onChange: (
    name: keyof PlanCreateForm,
    value: string
  ) => void;

  onMeasurementItemsChange: (items: number[]) => void;

  filteredStacks: StackResponse[];

  stack: StackDetailResponse | undefined;

  selectedStackId: number | null;

  onStackChange: (id: number) => void;
}

export const StackSection = ({
  form,
  creating,

  filteredStacks,
  onMeasurementItemsChange,

  stack,

  selectedStackId,

  onStackChange,
}: StackSectionProps) => {

  const handleMeasurementChange = (ids: number[]) => {
    if (!stack) return;

    onMeasurementItemsChange(ids);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-3 border border-black">
      <h2 className="text-sm md:text-xl font-semibold mb-4 text-gray-900">측정시설정보</h2>

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
        <Fragment>
          {/* 주기별 전체 항목 표시 */}
          {(() => {
            const grouped = stack.stackMeasurements.reduce<Record<string, typeof stack.stackMeasurements>>((acc, sm) => {
              if (!acc[sm.cycle]) acc[sm.cycle] = [];
              acc[sm.cycle].push(sm);
              return acc;
            }, {});

            return (
              <div className="space-y-2">
                {Object.entries(grouped).map(([cycle, items]) => (
                  <div key={cycle} className="space-y-1">
                    <p className="text-xs text-gray-600 font-medium">{CYCLE_LABELS[cycle as keyof typeof CYCLE_LABELS]}</p>
                    <div className="flex flex-wrap gap-2">
                      {items.map((sm) => {
                        const isSelected = form.measurementItemIds.includes(sm.id);
                        return (
                          <span
                            key={sm.id}
                            onClick={() => !creating && handleMeasurementChange(
                              isSelected
                                ? form.measurementItemIds.filter((id) => id !== sm.id)
                                : [...form.measurementItemIds, sm.id]
                            )}
                            className={`
                              inline-flex items-center
                              px-3 py-2
                              rounded-md text-xs font-medium transition-colors 
                              ${
                                creating ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                              } ${
                                isSelected
                                  ? "bg-blue-50 text-blue-700"
                                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                              }
                            `}
                          >
                            {sm.pollutant.nameKr}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </Fragment>
      )}
    </div>
  )
}
