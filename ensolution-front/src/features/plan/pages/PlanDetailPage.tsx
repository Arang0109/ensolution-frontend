import { useState } from "react";

import { PlanInfoTab, FieldDataTab, LabDataTab, EquipmentTab } from "@plan/components";
import { usePlanDraftViewModel } from "@plan/hooks"

import { Button, FullPageLoader, Tabs } from "@shared/ui";
import { PLAN_DETAIL_TABS, DEFAULT_PLAN_DETAIL_TAB } from "@/shared/model";
import { ChevronLeft } from 'lucide-react';

export const PlanDetailPage = () => {
  const [activeTab, setActiveTab] = useState<string>(DEFAULT_PLAN_DETAIL_TAB);

  const {
    editForm,
    isLoading,
    stack,

    goBack,

    handleSaveDraft,
    handleDeleteDraft,
    updatePreInfoField,
    updateEquipmentField,
    updateMeasurementItems,
  } = usePlanDraftViewModel();

  if (isLoading) {
    return (<FullPageLoader />);
  }

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
          />}
          {activeTab === "MEASUREMENT" && <FieldDataTab />}
          {activeTab === "LAB" && <LabDataTab />}
        </div>

        

        {/* Actions */}
        <div className="flex justify-end mt-6">
          <Button label="임시저장" type="submit" variant="primary" onClick={() => handleSaveDraft()}/>
        </div>
      </div>
    </div>
  );
}