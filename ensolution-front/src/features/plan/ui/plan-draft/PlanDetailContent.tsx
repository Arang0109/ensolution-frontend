import { useState } from "react";

import { PlanInfoTab, FieldDataTab, LabDataTab, EquipmentTab } from "@/features/plan/ui";
import { usePlanDraftViewModel, usePlanEditForm, useSelectedEquipments } from "@plan/hooks"
import { CATEGORY_LABELS } from "@/entities/plan/model";

import { Button, Tabs, Breadcrumbs } from "@shared/ui";
import { PLAN_DETAIL_TABS, DEFAULT_PLAN_DETAIL_TAB } from "@/shared/model";
import { Plus, X } from 'lucide-react';

type PlanDetailContentProps = {
  viewModel: ReturnType<typeof usePlanDraftViewModel>;
};

export const PlanDetailContent = ({
  viewModel,
}: PlanDetailContentProps) => {
  const [activeTab, setActiveTab] = useState<string>(DEFAULT_PLAN_DETAIL_TAB);
  const [activeSheetIndex, setActiveSheetIndex] = useState(0);

  const {
    plan,
    stack,
    goBack,
    handleSaveDraft,
    handleDeleteDraft,
    isParticle
  } = viewModel;

  const {
    editForm,

    updatePlanInfoField,
    updateEquipmentField,
    updateSheetField,

    updateWeatherField,
    updateMoistureField,
    updateExhaustGasField,

    updateMeasurementPointField,
    updateMeasurementItems,
    updateSheetSampleItems,
    updateSampleField,
    addSheet,
    removeSheet,
  } = usePlanEditForm(plan);

  const {
    particleSamplers, gasSamplers, pitotTubes, nozzles,
    selectedPS, selectedGS, selectedPT, selectedNZ,
  } = useSelectedEquipments(editForm.equipment);

  const handleRemoveSheet = (index: number) => {
    removeSheet(index);
    if (activeSheetIndex >= editForm.sheets.length - 1) {
      setActiveSheetIndex(Math.max(0, editForm.sheets.length - 2));
    }
  };

  const handleAddSheet = () => {
    addSheet();
    setActiveSheetIndex(editForm.sheets.length);
  };

  const breadcrumbsContents = [
    {title: "대시보드", path: "/dashboard"},
    {title: "측정계획", path: "/plan"},
  ]

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
            planInfo={editForm.planInfo}
            measurementItems={editForm.measurementItems}
            stack={stack}
            onChange={updatePlanInfoField}
            onMeasurementItemsChange={updateMeasurementItems}
          />}
          {activeTab === "EQUIPMENT" &&
          <EquipmentTab
            equipment={editForm.equipment}
            onChange={updateEquipmentField}
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
            <div>
              {/* 기록지 서브탭 */}
              <div className="flex items-center gap-1 mb-4 border-b border-gray-200">
                {editForm.sheets.map((sheet, i) => (
                  <div key={i} className="flex items-center">
                    <button
                      onClick={() => setActiveSheetIndex(i)}
                      className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeSheetIndex === i
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {CATEGORY_LABELS[sheet.category] ?? "기타"}
                    </button>
                    {editForm.sheets.length > 1 && (
                      <button
                        onClick={() => handleRemoveSheet(i)}
                        className="ml-0.5 mb-0.5 p-0.5 text-gray-400 hover:text-red-500 transition-colors"
                        title="기록지 삭제"
                      >
                        <X size={13} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={handleAddSheet}
                  className="ml-2 mb-1 flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
                >
                  <Plus size={13} />
                  기록지 추가
                </button>
              </div>

              {/* 기록지 내용 */}
              {editForm.sheets.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-sm">
                  기록지를 추가하세요
                </div>
              ) : (
                <FieldDataTab
                  key={activeSheetIndex}
                  sheet={editForm.sheets[activeSheetIndex]}
                  allSheets={editForm.sheets}
                  measurementItems={editForm.measurementItems}
                  planInfo={editForm.planInfo}
                  onPlanInfoChange={updatePlanInfoField}
                  onSheetInfoChange={(name, value) => updateSheetField(activeSheetIndex, name, value)}
                  onWeatherChange={(name, value) => updateWeatherField(activeSheetIndex, name, value)}
                  onMoistureChange={(name, value) => updateMoistureField(activeSheetIndex, name, value)}
                  onExhaustGasChange={(name, value, index) => updateExhaustGasField(activeSheetIndex, name, value, index)}
                  onMeasurementPointChange={(pointIndex, name, value) => updateMeasurementPointField(activeSheetIndex, pointIndex, name, value)}
                  onSampleItemsChange={(primary, concurrent) => updateSheetSampleItems(activeSheetIndex, primary, concurrent)}
                  onSampleChange={(sampleIndex, name, value) => updateSampleField(activeSheetIndex, sampleIndex, name, value)}
                  selectedPS={selectedPS}
                  selectedGS={selectedGS}
                  selectedPT={selectedPT}
                  selectedNZ={selectedNZ}
                  isParticle={isParticle}
                />
              )}
            </div>
          )}
          {activeTab === "LAB" && <LabDataTab />}
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-6">
          <Button label="임시저장" type="submit" variant="primary" onClick={() => handleSaveDraft(editForm)}/>
        </div>
      </div>
    </div>
  );
};