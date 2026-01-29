import { SearchableSelect } from "@schedule/components/SearchableSelect";
import type { ScheduleRegisterRequest } from "@schedule/model";
import type { TeamResponse } from "@/features/agency/model/agency-types";

interface TeamEquipmentCardProps {
  form: ScheduleRegisterRequest;
  isSubmitting: boolean;
  setFieldValue: <K extends keyof ScheduleRegisterRequest>(
    key: K,
    value: ScheduleRegisterRequest[K]
  ) => void;
  filteredTeams: TeamResponse[];
  loading: boolean;
}

export const TeamEquipmentCard = ({
  form,
  isSubmitting,
  setFieldValue,
  filteredTeams,
  loading,
}: TeamEquipmentCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">출장인력 및 장비</h2>
      <div className="space-y-4">
        {/* 현장팀 선택 */}
        <SearchableSelect
          id="teamId"
          label="현장팀"
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

        {/* 측정인력 (추후 추가 예정) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            측정인력
          </label>
          <div className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 text-sm">
            측정인력 데이터는 추후 추가 예정입니다
          </div>
          <p className="mt-1 text-xs text-gray-500">
            * 복수 선택이 가능합니다
          </p>
        </div>

        {/* 장비 정보 (추후 추가 예정) */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">장비 정보</h3>
          <p className="text-sm text-blue-800">
            장비 관리 기능은 추후 추가될 예정입니다.
          </p>
        </div>
      </div>
    </div>
  );
};
