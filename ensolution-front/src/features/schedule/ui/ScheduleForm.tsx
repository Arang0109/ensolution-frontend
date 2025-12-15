import { SearchableSelect } from "@schedule/components/SearchableSelect";
import { MeasurementMultiSelect } from "@schedule/components/MeasurementMultiSelect";
import type { ScheduleRegisterRequest } from "@schedule/model";
import type { WorkplaceResponse } from "@workplace/model";
import type { TeamResponse } from "@agency/model/agency.types";
import type { StackResponse } from "@stack/model";
import type { StackMeasurementResponse } from "@stack/model";

interface ScheduleFormProps {
  form: ScheduleRegisterRequest;
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setFieldValue: <K extends keyof ScheduleRegisterRequest>(
    key: K,
    value: ScheduleRegisterRequest[K]
  ) => void;
  filteredWorkplaces: WorkplaceResponse[];
  filteredTeams: TeamResponse[];
  filteredStacks: StackResponse[];
  selectedWorkplaceId: number;
  handleWorkplaceChange: (workplaceId: number) => void;
  loading: boolean;
  loadingStacks: boolean;
  availableMeasurements: StackMeasurementResponse[];
  loadingMeasurements: boolean;
}

export const ScheduleForm = ({
  form,
  isSubmitting,
  onChange,
  onSubmit,
  setFieldValue,
  filteredWorkplaces,
  filteredTeams,
  filteredStacks,
  selectedWorkplaceId,
  handleWorkplaceChange,
  loading,
  loadingStacks,
  availableMeasurements,
  loadingMeasurements,
}: ScheduleFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* 사업장 선택 */}
      <SearchableSelect
        id="workplace"
        label="사업장"
        placeholder="사업장을 선택하세요"
        value={selectedWorkplaceId}
        options={filteredWorkplaces}
        getOptionLabel={(workplace) => workplace.name}
        getOptionValue={(workplace) => workplace.id}
        onChange={handleWorkplaceChange}
        disabled={isSubmitting || loading}
        loading={loading}
        emptyMessage="사업장이 없습니다"
        required
      />

      {/* 배출구 선택 */}
      <SearchableSelect
        id="stackId"
        label="배출구"
        placeholder={
          !selectedWorkplaceId
            ? "먼저 사업장을 선택하세요"
            : "배출구를 선택하세요"
        }
        value={form.stackId}
        options={filteredStacks}
        getOptionLabel={(stack) => `${stack.name} (${stack.semsNumber})`}
        getOptionValue={(stack) => stack.id}
        onChange={(value) => setFieldValue("stackId", value)}
        disabled={isSubmitting || !selectedWorkplaceId || loadingStacks}
        loading={loadingStacks}
        emptyMessage="배출구가 없습니다"
        required
      />

      {/* 측정항목 선택 (Multi-select) */}
      <MeasurementMultiSelect
        id="measurementIds"
        label="측정항목"
        placeholder={
          !form.stackId
            ? "먼저 배출구를 선택하세요"
            : "측정항목을 선택하세요"
        }
        measurements={availableMeasurements}
        selectedIds={form.measurementIds}
        onChange={(selectedIds) => setFieldValue("measurementIds", selectedIds)}
        disabled={isSubmitting || !form.stackId || loadingMeasurements}
        loading={loadingMeasurements}
        emptyMessage="등록된 측정항목이 없습니다"
        required
      />

      {/* 측정팀 선택 */}
      <SearchableSelect
        id="teamId"
        label="측정팀"
        placeholder="측정팀을 선택하세요"
        value={form.teamId}
        options={filteredTeams}
        getOptionLabel={(team) => team.name}
        getOptionValue={(team) => team.id}
        onChange={(value) => setFieldValue("teamId", value)}
        disabled={isSubmitting || loading}
        loading={loading}
        emptyMessage="측정팀이 없습니다"
        required
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
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
          disabled={isSubmitting}
          required
        />
      </div>

      {/* 측정 종류 */}
      <div>
        <label htmlFor="measurementType" className="block text-sm font-medium text-gray-700 mb-1">
          측정 종류 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="measurementType"
          name="measurementType"
          value={form.measurementType}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
          placeholder="측정 종류를 입력하세요 (예: 정기검사, 수시검사)"
          disabled={isSubmitting}
          required
        />
      </div>

      {/* Submit button */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-brown-500 to-brown-600 text-white rounded-lg hover:from-brown-600 hover:to-brown-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? '등록 중...' : '측정일정 등록'}
        </button>
      </div>
    </form>
  );
};
