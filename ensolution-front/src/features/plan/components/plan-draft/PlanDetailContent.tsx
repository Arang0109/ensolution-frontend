import { useState } from "react";

import { PlanInfoTab, FieldDataTab, LabDataTab, EquipmentTab } from "@plan/components";
import { usePlanDraftViewModel, usePlanEditForm, useSelectedEquipments } from "@plan/hooks"

import { Button, Tabs } from "@shared/ui";
import { PLAN_DETAIL_TABS, DEFAULT_PLAN_DETAIL_TAB } from "@/shared/model";
import { ChevronLeft } from 'lucide-react';

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
    isParticle
  } = viewModel;

  const {
    editForm,

    updatePreInfoField,
    updateEquipmentField,

    updateWeatherField,
    updateMoistureField,
    updateExhaustGasField,

    updateMeasureDataField,
    updateMeasurementPointField,
    updateMeasurementItems
  } = usePlanEditForm(plan);

  const {
    particleSamplers, gasSamplers, pitotTubes, nozzles,
    selectedPS, selectedGS, selectedPT, selectedNZ,
  } = useSelectedEquipments(editForm.equipment);

  return (
    <div className="px-3 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-4">
        <Button 
          label="뒤로가기"
          size="xl"
          variant="ghost"
          icon={<ChevronLeft />}
          onClick={goBack}
        />
        <Button 
          label="삭제"
          size="xl"
          variant="danger"
          onClick={handleDeleteDraft}
        />
        <Tabs
          tabs={PLAN_DETAIL_TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "PREINFO" &&
          <PlanInfoTab
            preInfo={editForm.preInfo}
            measurementItems={editForm.measurementItems}
            stack={stack}
            onChange={updatePreInfoField}
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
          {activeTab === "MEASUREMENT" &&
          <FieldDataTab
            preInfo={editForm.preInfo}
            fieldData={editForm.fieldData}
            onWeatherChange={updateWeatherField}
            onMoistureChange={updateMoistureField}
            onExhaustGasChange={updateExhaustGasField}
            onPreInfoChange={updatePreInfoField}
            onMeasureDataChange={updateMeasureDataField}
            onMeasurementPointChange={updateMeasurementPointField}
            selectedPS={selectedPS}
            selectedGS={selectedGS}
            selectedPT={selectedPT}
            selectedNZ={selectedNZ}
            isParticle={isParticle}
          />}
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