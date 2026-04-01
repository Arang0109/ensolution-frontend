import { useState } from "react";

import type { TypedEquipmentResponse } from "@/entities/agency/equipment/model";
import type {
  PlanInfoEditForm, MeasurementSheetEditForm,
  WeatherEditForm, MoistureEditForm, ExhaustGasEditForm, MeasurementpointEditForm,
  MeasurementItemEditForm, SampleEditForm,
  ParticleSampleEditForm,
} from "@/entities/plan/model";
import { SheetTab } from "@plan/ui";
import { CATEGORY_LABELS } from "@/entities/plan/model";

import { EditableTabs } from "@/shared/ui";

export interface FieldDataTabProps {
  planInfo: PlanInfoEditForm;
  allSheets: MeasurementSheetEditForm[];
  measurementItems: MeasurementItemEditForm[];

  updatePlanInfoField: (name: keyof PlanInfoEditForm, value: string) => void;
  updateSheetField: (sheetIndex: number, name: keyof MeasurementSheetEditForm, value: string) => void;
  updateWeatherField: (sheetIndex: number, name: keyof WeatherEditForm, value: string | null) => void;
  updateMoistureField: (sheetIndex: number, name: keyof MoistureEditForm, value: string | null) => void;
  updateExhaustGasField: (sheetIndex: number, name: keyof ExhaustGasEditForm, value: string | null, index: number) => void;
  updateMeasurementPointField: (sheetIndex: number, pointIndex: number, name: keyof MeasurementpointEditForm, value: string) => void;
  updateSheetSampleItems: (sheetIndex: number, primaryItemId: number | null, concurrentItemIds: number[]) => void;
  updateSampleField: (sheetIndex: number, sampleIndex: number, name: keyof SampleEditForm, value: string) => void;
  updateParticleField: (sheetIndex: number, name: keyof ParticleSampleEditForm, value: string | null) => void;

  selectedPS?: TypedEquipmentResponse;
  selectedGS?: TypedEquipmentResponse;
  selectedPT?: TypedEquipmentResponse;
  selectedNZ?: TypedEquipmentResponse;

  isParticle: boolean;

  addSheet: () => void;
  removeSheet: (index: number) => void;
}

export const FieldDataTab = ({
  planInfo,
  allSheets,
  measurementItems,
  updatePlanInfoField,
  updateSheetField,
  updateWeatherField,
  updateMoistureField,
  updateExhaustGasField,
  updateMeasurementPointField,
  updateSheetSampleItems,
  updateSampleField,
  updateParticleField,
  selectedPS,
  selectedGS,
  selectedPT,
  selectedNZ,

  isParticle,

  addSheet,
  removeSheet,
}: FieldDataTabProps) => {
  const [activeSheetIndex, setActiveSheetIndex] = useState(0);
  
  const handleRemoveSheet = (index: number) => {
    removeSheet(index);
    if (activeSheetIndex >= allSheets.length - 1) {
      setActiveSheetIndex(Math.max(0, allSheets.length - 2));
    }
  };

  const handleAddSheet = () => {
    addSheet();
    setActiveSheetIndex(allSheets.length);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs text-gray-500">측정시작시간</label>
            <input
              type="time"
              value={planInfo.measureStartTime}
              onChange={(e) => updatePlanInfoField("measureStartTime", e.target.value)}
              className="w-full px-3 py-2 text-sm text-gray-800 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
          <span className="text-gray-400 text-sm mt-5">~</span>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs text-gray-500">측정종료시간</label>
            <input
              type="time"
              value={planInfo.measureEndTime}
              onChange={(e) => updatePlanInfoField("measureEndTime", e.target.value)}
              className="w-full px-3 py-2 text-sm text-gray-800 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
        </div>
      </section>

      <div>
        {/* 기록지 서브탭 */}
        <EditableTabs
          tabs={allSheets.map((sheet) => ({ label: CATEGORY_LABELS[sheet.category] ?? "가스상" }))}
          activeIndex={activeSheetIndex}
          onTabChange={setActiveSheetIndex}
          onAddTab={handleAddSheet}
          onRemoveTab={handleRemoveSheet}
          addLabel="기록지 추가"
        />

        {/* 기록지 내용 */}
        {allSheets.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">
            기록지를 추가하세요
          </div>
        ) : (
          <SheetTab
            key={activeSheetIndex}
            sheet={allSheets[activeSheetIndex]}
            allSheets={allSheets}
            measurementItems={measurementItems}
            planInfo={planInfo}
            onPlanInfoChange={updatePlanInfoField}
            onSheetInfoChange={(name, value) => updateSheetField(activeSheetIndex, name, value)}
            onWeatherChange={(name, value) => updateWeatherField(activeSheetIndex, name, value)}
            onMoistureChange={(name, value) => updateMoistureField(activeSheetIndex, name, value)}
            onExhaustGasChange={(name, value, index) => updateExhaustGasField(activeSheetIndex, name, value, index)}
            onMeasurementPointChange={(pointIndex, name, value) => updateMeasurementPointField(activeSheetIndex, pointIndex, name, value)}
            onSampleItemsChange={(primaryItemId, concurrentItemIds) => updateSheetSampleItems(activeSheetIndex, primaryItemId, concurrentItemIds)}
            onSampleChange={(sampleIndex, name, value) => updateSampleField(activeSheetIndex, sampleIndex, name, value)}
            onParticleSampleChange={(name, value) => updateParticleField(activeSheetIndex, name, value)}
            selectedPS={selectedPS}
            selectedGS={selectedGS}
            selectedPT={selectedPT}
            selectedNZ={selectedNZ}
            isParticle={isParticle}
          />
        )}
      </div>

      {/* ── 분류 ──────────────────────────────────────── */}
      
    </div>
  );
};