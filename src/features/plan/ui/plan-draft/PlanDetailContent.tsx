import { useState } from "react";

import { PlanInfoTab, FieldDataTab, LabDataTab, EquipmentTab } from "@/features/plan/ui";
import { usePlanDraftViewModel, usePlanEditForm, useSelectedEquipments } from "@/features/plan/hooks"

import { Button, Tabs, Breadcrumbs } from "@shared/ui";
import { PLAN_DETAIL_TABS, DEFAULT_PLAN_DETAIL_TAB } from "@/shared/model";

type PlanDetailContentProps = {
  viewModel: ReturnType<typeof usePlanDraftViewModel>;
};

export const PlanDetailContent = ({
  viewModel,
}: PlanDetailContentProps) => {
  const [activeTab, setActiveTab] = useState<string>(DEFAULT_PLAN_DETAIL_TAB);

  const {
    plan,
    stack,
    goBack,
    handleSaveDraft,
    handleDeleteDraft,
    handleReportDownload,
  } = viewModel;

  const { editForm } = usePlanEditForm(plan);

  const {
    particleSamplers, gasSamplers, pitotTubes, nozzles,
    selectedPS, selectedGS, selectedPT, selectedNZ,
  } = useSelectedEquipments(editForm.equipment);

  const breadcrumbsContents = [
    {title: "대시보드", path: "/dashboard"},
    {title: "측정계획", path: "/plan"},
  ];

  return (
    <div className="px-3 sm:px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Breadcrumbs
          contents={breadcrumbsContents}
        />
        <Button
            onClick={goBack}
            label="뒤로가기"
        />
        <Button
          label="삭제"
          variant="danger"
          onClick={handleDeleteDraft}
        />
      </div>
      {/* Header */}
      <div className="mb-4">
        <Tabs
          tabs={PLAN_DETAIL_TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "PREINFO" &&
          <PlanInfoTab
            stack={stack}
          />}
          {activeTab === "EQUIPMENT" &&
          <EquipmentTab
            equipment={editForm.equipment}
            particleSamplers={particleSamplers}
            gasSamplers={gasSamplers}
            pitotTubes={pitotTubes}
            nozzles={nozzles}
            selectedPS={selectedPS}
            selectedGS={selectedGS}
            selectedPT={selectedPT}
            selectedNZ={selectedNZ}
          />}
          {activeTab === "MEASUREMENT" && (
          <FieldDataTab
            planInfo={editForm.planInfo}
            allSheets={editForm.sheets}
            measurementItems={editForm.measurementItems}
            selectedPS={selectedPS}
            selectedGS={selectedGS}
            selectedPT={selectedPT}
            selectedNZ={selectedNZ}
          />
          )}
          {activeTab === "LAB" && <LabDataTab />}
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-6 gap-1.5">
          <Button label="저장" type="submit" variant="primary" onClick={() => handleSaveDraft(editForm)}/>
          <Button label="성적서 다운로드" type="button" variant="primary" onClick={() => handleReportDownload(Number(plan?.plan.id))} />
        </div>
      </div>
    </div>
  );
};