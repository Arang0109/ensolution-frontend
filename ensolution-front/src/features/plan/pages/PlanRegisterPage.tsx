import { usePlanRegisterViewModel } from "@plan/hooks";
import { PlanCreateContent } from "@plan/components";

import { Button } from "@shared/ui";
import { ChevronLeft } from 'lucide-react';

export const PlanRegisterPage = () => {
  const {
    form,
    errors,
    reset,
    onChange,
    onMeasurementIdsChange,

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

    goBack,
    handleSubmit,
  } = usePlanRegisterViewModel();

  return (
    <div className="px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <Button 
            label="뒤로가기"
            size="xl"
            variant="ghost"
            icon={<ChevronLeft />}
            onClick={goBack}
          />
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <PlanCreateContent
            form={form}
            errors={errors}
            reset={reset}
            onChange={onChange}
            onMeasurementIdsChange={onMeasurementIdsChange}

            creating={creating}

            companies={companies}
            filteredWorkplaces={filteredWorkplaces}
            filteredStacks={filteredStacks}

            teams={teams}
            users={users}
            filteredParticleSampler={filteredParticleSampler}
            filteredGasSampler={filteredGasSampler}
            filteredPitotTube={filteredPitotTube}
            filteredNozzle={filteredNozzle}

            stack={stack}

            selectedCompanyId={selectedCompanyId}
            selectedWorkplaceId={selectedWorkplaceId}
            selectedStackId={selectedStackId}

            handleSelectCompany={handleSelectCompany}
            handleSelectWorkplace={handleSelectWorkplace}
            handleSelectStack={handleSelectStack}
            
            handleSelectTeam={handleSelectTeam}

            handleSubmit={handleSubmit}
          />
        </div>

        {/* Help text */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 안내사항</h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>사업장을 선택하면 해당 사업장의 배출구 목록이 표시됩니다.</li>
            <li>배출구를 선택하면 등록된 측정항목을 선택할 수 있습니다.</li>
            <li>측정항목은 여러 개를 선택할 수 있습니다.</li>
            <li>모든 필수 항목을 입력해야 등록이 가능합니다.</li>
          </ul>
        </div>
      </div>
  );
};
