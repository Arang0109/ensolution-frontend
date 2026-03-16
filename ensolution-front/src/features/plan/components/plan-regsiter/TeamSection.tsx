import type { PlanCreateForm } from "@plan/model";
import type { TeamResponse } from "@/features/agency/model/agency-types";
import type { UserResponse } from "@/features/auth/model";

import { InputField, SelectField } from "@shared/ui";
import type { EquipmentResponse } from "@/features/equipment/model";

interface TeamSectionProps {
  form: PlanCreateForm;
  creating: boolean;
  onChange: (
    name: keyof PlanCreateForm,
    value: string | number | null
  ) => void;
  onTeamChange: (teamId: number) => void;

  teams: TeamResponse[];
  users: UserResponse[];
  filteredParticleSampler: EquipmentResponse[];
  filteredGasSampler: EquipmentResponse[];
  filteredPitotTube: EquipmentResponse[];
  filteredNozzle: EquipmentResponse[];
}

export const TeamSection = ({
  form,
  creating,
  onChange,
  onTeamChange,

  teams,
  users,
  filteredParticleSampler,
  filteredGasSampler,
  filteredPitotTube,
  filteredNozzle,
}: TeamSectionProps) => {

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">출장인력 및 장비</h2>
      <div className="space-y-4">
        {/* 현장팀 선택 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="space-y-6">
            <SelectField
              id="team"
              label="현장팀"
              name="team"
              options={teams}
              getOptionLabel={(team) => team.name}
              getOptionValue={(team) => team.id}
              value={form.teamId}
              onChange={(value) => onTeamChange(Number(value))}
              disabled={creating}
              required
            />
          </div>
          <div className="space-y-6">
            <InputField
              id="vehicleNumber"
              label="차량번호"
              name="vehicleNumber"
              value={form.vehicleNumber}
              onChange={(value) => onChange("vehicleNumber", value)}
              disabled={creating}
              required
            />
          </div>
          <div className="space-y-6">
            <SelectField
              id="mentor"
              label="사수"
              name="mentor"
              options={users}
              getOptionLabel={(user) => user.name}
              getOptionValue={(user) => user.name}
              value={form.mentor}
              onChange={(value) => onChange("mentor", value)}
              disabled={creating}
              required
            />
          </div>
          <div className="space-y-6">
            <SelectField
              id="mentee"
              label="부사수"
              name="mentee"
              options={users}
              getOptionLabel={(user) => user.name}
              getOptionValue={(user) => user.name}
              value={form.mentee}
              onChange={(value) => onChange("mentee", value)}
              disabled={creating}
              required
            />
          </div>
        </div>
        

        {/* 장비 정보 */}
        <h3 className="text-lg font-semibold text-gray-800">장비 정보</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SelectField
            id="particleSamplerId"
            label="입자상 시료채취기"
            name="particleSamplerId"
            options={filteredParticleSampler}
            getOptionLabel={(eq) => eq.alias || eq.managementNumber}
            getOptionValue={(eq) => eq.id}
            value={form.particleSamplerId}
            onChange={(value) => onChange("particleSamplerId", value)}
            disabled={creating}
          />
          <SelectField
            id="gasSamplerId"
            label="가스상 시료채취기"
            name="gasSamplerId"
            options={filteredGasSampler}
            getOptionLabel={(eq) => eq.alias || eq.managementNumber}
            getOptionValue={(eq) => eq.id}
            value={form.gasSamplerId}
            onChange={(value) => onChange("gasSamplerId", value)}
            disabled={creating}
          />
          <SelectField
            id="pitotTubeId"
            label="피토관"
            name="pitotTubeId"
            options={filteredPitotTube}
            getOptionLabel={(eq) => eq.alias || eq.managementNumber}
            getOptionValue={(eq) => eq.id}
            value={form.pitotTubeId}
            onChange={(value) => onChange("pitotTubeId", value)}
            disabled={creating}
          />
          <SelectField
            id="nozzleId"
            label="노즐"
            name="nozzleId"
            options={filteredNozzle}
            getOptionLabel={(eq) => eq.alias || eq.managementNumber}
            getOptionValue={(eq) => eq.id}
            value={form.nozzleId}
            onChange={(value) => onChange("nozzleId", value)}
            disabled={creating}
          />
        </div>
      </div>
    </div>
  );
};
