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

import { EditableTabs, TableLabelCell, TableInputCell } from "@/shared/ui";

export interface FieldDataTabProps {
  planInfo: PlanInfoEditForm;
  allSheets: MeasurementSheetEditForm[];
  measurementItems: MeasurementItemEditForm[];

  updatePlanInfoField: (name: keyof PlanInfoEditForm, value: string) => void;
  updateSheetField: (sheetIndex: number, name: keyof MeasurementSheetEditForm, value: string) => void;
  updateWeatherField: (sheetIndex: number, name: keyof WeatherEditForm, value: string | null) => void;
  updateMoistureField: (sheetIndex: number, name: keyof MoistureEditForm, value: string | null) => void;
  updateExhaustGasField: (sheetIndex: number, name: keyof ExhaustGasEditForm, value: string | null, index?: number) => void;
  updateMeasurementPointField: (sheetIndex: number, pointIndex: number, name: keyof MeasurementpointEditForm, value: string) => void;
  updateSheetSampleItems: (sheetIndex: number, primaryItemId: number | null, concurrentItemIds: number[]) => void;
  updateSampleField: (sheetIndex: number, sampleIndex: number, name: keyof SampleEditForm, value: string) => void;
  updateParticleField: (sheetIndex: number, name: keyof ParticleSampleEditForm, value: string | null) => void;

  selectedPS?: TypedEquipmentResponse;
  selectedGS?: TypedEquipmentResponse;
  selectedPT?: TypedEquipmentResponse;
  selectedNZ?: TypedEquipmentResponse;

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