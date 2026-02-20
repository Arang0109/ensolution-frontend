import { useState } from "react";

import { PreinfoTab, MeasurementTab, LabTab } from "@plan/components";
import { usePlanDetailVM } from "@plan/hooks"

import { Button, FullPageLoader, Tabs } from "@shared/ui";
import { PLAN_DETAIL_TABS, DEFAULT_PLAN_DETAIL_TAB } from "@/shared/model";
import { ChevronLeft } from 'lucide-react';

export const PlanDetailPage = () => {
  const [activeTab, setActiveTab] = useState<string>(DEFAULT_PLAN_DETAIL_TAB);

  const {
    // plan,
    loading,

    goBack,
  } = usePlanDetailVM();

  if (loading) {
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
        <Tabs
          tabs={PLAN_DETAIL_TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "PREINFO" && <PreinfoTab />}
          {activeTab === "MEASUREMENT" && <MeasurementTab />}
          {activeTab === "LAB" && <LabTab />}
        </div>
      </div>
    </div>
  );
}