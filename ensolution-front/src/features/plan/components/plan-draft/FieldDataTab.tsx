import type { TypedEquipmentResponse } from "@/entities/agency/equipment/model";
import type {
  PlanInfoEditForm, MeasurementSheetEditForm,
  WeatherEditForm, MoistureEditForm, ExhaustGasEditForm, MeasurementpointEditForm,
  MeasurementItemEditForm, SampleEditForm,
} from "@plan/model";
import { useFieldDataCalculation } from "@plan/hooks";
import {
  WeatherSection, MoistureSection, ExhaustGasSection, StackProfileSection, MeasurementPointSection,
  ReportInfoSection,
  SampleInfoSection
} from "@plan/components";

export interface FieldDataTabProps {
  planInfo: PlanInfoEditForm;
  sheet: MeasurementSheetEditForm;
  allSheets: MeasurementSheetEditForm[];
  measurementItems: MeasurementItemEditForm[];

  onPlanInfoChange: (name: keyof PlanInfoEditForm, value: string) => void;
  onSheetInfoChange: (name: keyof MeasurementSheetEditForm, value: string) => void;
  onWeatherChange: (name: keyof WeatherEditForm, value: string | null) => void;
  onMoistureChange: (name: keyof MoistureEditForm, value: string | null) => void;
  onExhaustGasChange: (name: keyof ExhaustGasEditForm, value: string | null, index: number) => void;
  onMeasurementPointChange: (pointIndex: number, name: keyof MeasurementpointEditForm, value: string) => void;
  onSampleItemsChange: (primaryItemId: number | null, concurrentItemIds: number[]) => void;
  onSampleChange: (sampleIndex: number, name: keyof SampleEditForm, value: string) => void;

  selectedPS?: TypedEquipmentResponse;
  selectedGS?: TypedEquipmentResponse;
  selectedPT?: TypedEquipmentResponse;
  selectedNZ?: TypedEquipmentResponse;

  isParticle: boolean;
}

// ─── 모바일 카드 스타일 상수 ────────────────────────────────────────
const mobileWrap = "sm:hidden rounded-lg border border-gray-200 overflow-hidden";
const desktopWrap = "hidden sm:block rounded-lg border border-gray-200 overflow-hidden";

export const FieldDataTab = ({
  planInfo,
  sheet,
  allSheets,
  measurementItems,
  onPlanInfoChange,
  onSheetInfoChange,
  onWeatherChange,
  onMoistureChange,
  onExhaustGasChange,
  onMeasurementPointChange,
  onSampleItemsChange,
  onSampleChange,
  selectedPT,
  selectedNZ,

  isParticle,
}: FieldDataTabProps) => {

  const {
    atmosphericPressure,
    calcMoisture,
    calcExhaustGas,
    calcMeasurePoint,
  } = useFieldDataCalculation(planInfo, sheet, selectedPT);

  return (
    <div className="space-y-6">

      {/* ── 분류 ──────────────────────────────────────── */}
      <ReportInfoSection
        mobileWrap={mobileWrap}
        desktopWrap={desktopWrap}

        sheet={sheet}
        onChange={onSheetInfoChange}
      />

      {/* ── 시료 정보 ──────────────────────────────────────── */}
      <SampleInfoSection
        sheet={sheet}
        allSheets={allSheets}
        measurementItems={measurementItems}
        onSampleItemsChange={onSampleItemsChange}
        onSampleChange={onSampleChange}
      />

      {/* ── 기상정보 ─────────────────────────────────── */}
      <WeatherSection
        mobileWrap={mobileWrap}
        desktopWrap={desktopWrap}

        weather={sheet.weather}
        onChange={onWeatherChange}

        atmosphericPressure={atmosphericPressure}
      />

      {/* ── 수분량정보 ────────────────────────────────── */}
      <MoistureSection
        mobileWrap={mobileWrap}
        desktopWrap={desktopWrap}

        moisture={sheet.moisture}
        onChange={onMoistureChange}

        weightDiff={calcMoisture.weightDiff}
        tempAvg={calcMoisture.tempAvg}
        dryVolumeDiff={calcMoisture.dryVolumeDiff}
        pressureToMmHg={calcMoisture.pressureToMmHg}
        pressureToInchH2O={calcMoisture.pressureToInchH2O}

        moistureRatio={calcMoisture.moistureRatio}
      />

      {/* ── 배출가스정보 ──────────────────────────────── */}
      <ExhaustGasSection
        mobileWrap={mobileWrap}
        desktopWrap={desktopWrap}

        exhaustGas={sheet.exhaustGas}
        onChange={onExhaustGasChange}

        standardOxygen={planInfo.standardOxygen}

        o2ConcentrationAvg={calcExhaustGas.o2ConcentrationAvg}
        co2ConcentrationAvg={calcExhaustGas.co2ConcentrationAvg}
        coConcentrationAvg={calcExhaustGas.coConcentrationAvg}
        n2ConcentrationAvg={calcExhaustGas.n2ConcentrationAvg}
        noxConcentrationAvg={calcExhaustGas.noxConcentrationAvg}
        soxConcentrationAvg={calcExhaustGas.soxConcentrationAvg}
        oxygenCorrectionFactor={calcExhaustGas.oxygenCorrectionFactor}
        gasDensity={calcExhaustGas.gasDensity}
      />

      <StackProfileSection
        mobileWrap={mobileWrap}
        desktopWrap={desktopWrap}

        planInfo={planInfo}
        onChange={onPlanInfoChange}

        stackArea={calcMeasurePoint.area}
        measurePointCnt={calcMeasurePoint.measurePointCnt}
      />

      <MeasurementPointSection
        sheet={sheet}
        onChange={onMeasurementPointChange}

        measurePointLength={calcMeasurePoint.measurePointLength}
        AvgGasTemp={calcMeasurePoint.AvgGasTemp}
        AvgPd={calcMeasurePoint.AvgPd}
        AvgPs={calcMeasurePoint.AvgPs}
        avgInTemp={calcMeasurePoint.avgInTemp}
        avgOutTemp={calcMeasurePoint.avgOutTemp}

        standardDensity={calcMeasurePoint.standardDensity}
        gasVelocity={calcMeasurePoint.gasVelocity}
        pointVelocities={calcMeasurePoint.pointVelocities}
        pitotTubeCoefficient={calcMeasurePoint.pitotTubeCoefficient}
        quantity={calcMeasurePoint.quantity}
        standardQuantity={calcMeasurePoint.standardQuantity}

        selectedNZ={selectedNZ}

        isParticle={isParticle}
      />
    </div>
  );
};