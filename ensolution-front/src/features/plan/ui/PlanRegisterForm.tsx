import { SampleInfoCard } from "@/features/plan/ui/SampleInfoCard";
import { FacilityInfoCard } from "@plan/components/FacilityInfoCard";
import { TeamEquipmentCard } from "@plan/components/TeamEquipmentCard";

import type { PlanFormData } from "@plan/model";
import type { WorkplaceResponse } from "@workplace/model";
import type { TeamResponse } from "@agency/model";
import type { StackResponse, StackMeasurementResponse } from "@stack/model";

interface PlanFormProps {
  form: PlanFormData;
  isSubmitting: boolean;
  onChange: (name: keyof PlanFormData, value: string | number | Date) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setFieldValue: <K extends keyof PlanFormData>(
    key: K,
    value: PlanFormData[K]
  ) => void;
  filteredWorkplaces: WorkplaceResponse[];
  filteredTeams: TeamResponse[];
  filteredStacks: StackResponse[];
  selectedStack: StackResponse | null;
  handleWorkplaceChange: (workplaceId: number) => void;
  loading: boolean;
  loadingStacks: boolean;
  availableMeasurements: StackMeasurementResponse[];
  loadingMeasurements: boolean;
}

export const PlanRegisterForm = ({
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
}: PlanFormProps) => {
  // Prevent Enter key from submitting the form
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && e.target instanceof HTMLInputElement && e.target.type !== "submit") {
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={onSubmit} onKeyDown={handleKeyDown} className="space-y-6">
      {/* 2-column grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column: 시료채취정보 + 출장인력 및 장비 */}
        <div className="space-y-6">
          <SampleInfoCard
            form={form}
            isSubmitting={isSubmitting}
            onChange={onChange}
            filteredWorkplaces={filteredWorkplaces}
            handleWorkplaceChange={handleWorkplaceChange}
            loading={loading}
          />

          <TeamEquipmentCard
            form={form}
            isSubmitting={isSubmitting}
            setFieldValue={setFieldValue}
            filteredTeams={filteredTeams}
            loading={loading}
          />
        </div>

        {/* Right column: 측정시설 */}
        <div>
          <FacilityInfoCard
            form={form}
            isSubmitting={isSubmitting}
            setFieldValue={setFieldValue}
            filteredStacks={filteredStacks}
            selectedStack={selectedStack}
            loadingStacks={loadingStacks}
            availableMeasurements={availableMeasurements}
            loadingMeasurements={loadingMeasurements}
          />
        </div>
      </div>

      {/* Submit button */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-neutral-800 to-neutral-900 text-white rounded-lg hover:from-neutral-900 hover:to-neutral-950 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? '등록 중...' : '측정일정 등록'}
        </button>
      </div>
    </form>
  );
};
