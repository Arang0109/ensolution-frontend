import { useState } from "react";

import type { TypedEquipmentResponse } from "@/entities/agency/equipment/model";
import type { PlanInfoEditForm, MeasurementSheetEditForm, MeasurementItemEditForm } from "@/entities/plan/model";
import { SheetTab } from "@/features/plan/ui";
import { usePlanEditStore } from "@/features/plan/store";
import { CATEGORY_LABELS } from "@/entities/plan/model";

import { EditableTabs, TableLabelCell, TableInputCell } from "@/shared/ui";

export interface FieldDataTabProps {
  planInfo: PlanInfoEditForm;
  allSheets: MeasurementSheetEditForm[];
  measurementItems: MeasurementItemEditForm[];

  selectedPS?: TypedEquipmentResponse;
  selectedGS?: TypedEquipmentResponse;
  selectedPT?: TypedEquipmentResponse;
  selectedNZ?: TypedEquipmentResponse;
}

export const FieldDataTab = ({
  planInfo,
  allSheets,
  measurementItems,
  selectedPS,
  selectedGS,
  selectedPT,
  selectedNZ,
}: FieldDataTabProps) => {
  const [activeSheetIndex, setActiveSheetIndex] = useState(0);

  const removeSheet = usePlanEditStore((s) => s.removeSheet);
  const addSheet = usePlanEditStore((s) => s.addSheet);
  
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

  const updatePlanInfoField = usePlanEditStore((s) => s.updatePlanInfoField);
  const updateSheetField = usePlanEditStore((s) => s.updateSheetField);
  const updateWeatherField = usePlanEditStore((s) => s.updateWeatherField);
  const updateMoistureField = usePlanEditStore((s) => s.updateMoistureField);
  const updateExhaustGasField = usePlanEditStore((s) => s.updateExhaustGasField);
  const updateMeasurementPointField = usePlanEditStore((s) => s.updateMeasurementPointField);
  const updateSheetSampleItems = usePlanEditStore((s) => s.updateSheetSampleItems);
  const updateSampleField = usePlanEditStore((s) => s.updateSampleField);
  const updateParticleField = usePlanEditStore((s) => s.updateParticleField);

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <table className="w-full table-fixed border-collapse text-sm">
            <tbody>
              <tr>
                <TableLabelCell>시료채취 시작시간</TableLabelCell>
                <TableLabelCell>시료채취 종료시간</TableLabelCell>
              </tr>
              <tr>
                <TableInputCell
                  type="time"
                  value={planInfo.measureStartTime}
                  onChange={(value) => updatePlanInfoField("measureStartTime", value)}
                />
                <TableInputCell
                  type="time"
                  value={planInfo.measureEndTime}
                  onChange={(value) => updatePlanInfoField("measureEndTime", value)}
                />
              </tr>
            </tbody>
          </table>
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
            sheetIndex={activeSheetIndex}
            sheet={allSheets[activeSheetIndex]}
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
          />
        )}
      </div>

      {/* ── 분류 ──────────────────────────────────────── */}
      
    </div>
  );
};