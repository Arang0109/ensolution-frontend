import { usePlanRegisterViewModel } from "@/features/plan/hooks";
import { PlanCreateContent } from "@/features/plan/ui";

import { Button, Breadcrumbs } from "@shared/ui";

export const PlanRegisterPage = () => {
  const {
    form,
    errors,
    resetForm,
    updateField,
    setMeasurementItems,

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

  const breadcrumbsContents = [
    {title: "대시보드", path: "/dashboard"},
    {title: "측정계획", path: "/plan"},
  ]

  return (
    <div className="px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Breadcrumbs
          contents={breadcrumbsContents}
          />
          <Button 
              label="뒤로가기"
              variant="ghost"
              onClick={goBack}
            />
        </div>
        

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md md:p-8">
          <PlanCreateContent
            form={form}
            errors={errors}
            reset={resetForm}
            onChange={updateField}
            onMeasurementItemsChange={setMeasurementItems}

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
          <h3 className="text-xs md:text-sm font-semibold text-blue-900 mb-2">💡 안내사항</h3>
          <ul className="text-xs md:text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>사업장을 선택하면 해당 사업장의 측정시설 목록이 표시됩니다.</li>
            <li>측정시설을 선택하면 등록된 측정항목을 선택할 수 있습니다.</li>
            <li>측정항목은 여러 개를 선택할 수 있습니다.</li>
          </ul>
        </div>
      </div>
  );
};
