import type { CompanyResponse } from "@entities/company/model";
import type { WorkplaceResponse } from "@entities/workplace/model";
import type { StackDetailResponse, StackResponse } from "@/entities/stack/model";

import { PreInfoSection, StackSection, TeamSection } from "@/features/plan/ui";
import type { PlanCreateForm } from "@/entities/plan/model";

import { Button } from "@shared/ui";
import { usePreventSubmitOnEnter } from "@shared/hooks";
import type { ValidationErrors } from "@shared/model";
import type { TeamResponse } from "@entities/agency/team/model";
import type { UserResponse } from "@/entities/user/model";
import type { EquipmentResponse } from "@/entities/agency/equipment/model";

export interface PlanCreateContentProps {
  form: PlanCreateForm;
  errors: ValidationErrors;
  reset: () => void;
  onChange: (
    name: keyof PlanCreateForm,
    value: string | number |  null
  ) => void;
  onMeasurementItemsChange: (ids: number[]) => void;

  creating: boolean;

  companies: CompanyResponse[];
  filteredWorkplaces: WorkplaceResponse[];
  filteredStacks: StackResponse[];

  teams: TeamResponse[];
  users: UserResponse[];
  filteredParticleSampler: EquipmentResponse[];
  filteredGasSampler: EquipmentResponse[];
  filteredPitotTube: EquipmentResponse[];
  filteredNozzle: EquipmentResponse[];

  stack: StackDetailResponse | undefined;

  selectedCompanyId: number | null;
  selectedWorkplaceId: number | null;
  selectedStackId: number | null;

  handleSelectCompany: (id: number) => void;
  handleSelectWorkplace: (id: number) => void;
  handleSelectStack: (id: number) => void;
  handleSelectTeam: (id: number) => void;

  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const PlanCreateContent = ({
  form,
  onChange,
  onMeasurementItemsChange,

  creating,

  companies,
  filteredWorkplaces,
  filteredStacks,

  teams,
  users,
  filteredParticleSampler,
  filteredGasSampler,
  filteredPitotTube,
  filteredNozzle,

  stack,

  selectedCompanyId,
  selectedWorkplaceId,
  selectedStackId,

  handleSelectCompany,
  handleSelectWorkplace,
  handleSelectStack,
  handleSelectTeam,

  handleSubmit,

}: PlanCreateContentProps) => {
  const preventSubmitOnEnter = usePreventSubmitOnEnter();

  return (
    <form onSubmit={handleSubmit} onKeyDown={preventSubmitOnEnter} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <PreInfoSection
            form={form}
            creating={creating}
            onChange={onChange}
            companies={companies}
            filteredWorkplaces={filteredWorkplaces}
            onCompanyChange={handleSelectCompany}
            onWorkplaceChange={handleSelectWorkplace}
            selectedCompanyId={selectedCompanyId}
            selectedWorkplaceId={selectedWorkplaceId}
          />
        </div>
        <div className="space-y-6">
          <StackSection
            form={form}
            creating={creating}
            onChange={onChange}
            onMeasurementItemsChange={onMeasurementItemsChange}
            filteredStacks={filteredStacks}
            selectedStackId={selectedStackId}
            onStackChange={handleSelectStack}
            stack={stack}
          />
        </div>
      </div>
      <TeamSection
        form={form}
        creating={creating}
        onChange={onChange}
        onTeamChange={handleSelectTeam}
        teams={teams}
        users={users}
        filteredParticleSampler={filteredParticleSampler}
        filteredGasSampler={filteredGasSampler}
        filteredPitotTube={filteredPitotTube}
        filteredNozzle={filteredNozzle}
      />

      <div className="flex gap-3 pt-4">
        <Button
          label="측정계획 작성"
          variant="primary"
          size="md"
          width="full"
          type="submit"
          onClick={() => console.log(form)}
          disabled={creating}
        />
      </div>
    </form>
  );
};
