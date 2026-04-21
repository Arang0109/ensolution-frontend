import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import type { TypedEquipmentResponse } from "@/entities/agency/equipment/model";
import type {
  PlanInfoEditForm, MeasurementSheetEditForm,
  WeatherEditForm, MoistureEditForm, ExhaustGasEditForm, MeasurementpointEditForm,
  MeasurementItemEditForm, SampleEditForm,
  ParticleSampleEditForm,
} from "@/entities/plan/model";
import { useFieldDataCalculation } from "@plan/hooks";
import {
  WeatherSection, MoistureSection, ExhaustGasSection, MeasurementPointSection,
  ReportInfoSection,
  // SampleInfoSection
} from "@/features/plan/ui";
import { Button } from "@shared/ui";
import { ReportPreviewModal } from "../modal/ReportPreviewModal";

export interface SheetTabProps {
  planInfo: PlanInfoEditForm;
  sheet: MeasurementSheetEditForm;
  measurementItems: MeasurementItemEditForm[];

  onPlanInfoChange: (name: keyof PlanInfoEditForm, value: string) => void;
  onSheetInfoChange: (name: keyof MeasurementSheetEditForm, value: string) => void;
  onWeatherChange: (name: keyof WeatherEditForm, value: string | null) => void;
  onMoistureChange: (name: keyof MoistureEditForm, value: string | null) => void;
  onExhaustGasChange: (name: keyof ExhaustGasEditForm, value: string | null, index: number) => void;
  onMeasurementPointChange: (pointIndex: number, name: keyof MeasurementpointEditForm, value: string) => void;
  onSampleItemsChange: (primaryItemId: number | null, concurrentItemIds: number[]) => void;
  onSampleChange: (sampleIndex: number, name: keyof SampleEditForm, value: string) => void;
  onParticleSampleChange: (name: keyof ParticleSampleEditForm, value: string | null) => void;

  selectedPS?: TypedEquipmentResponse;
  selectedGS?: TypedEquipmentResponse;
  selectedPT?: TypedEquipmentResponse;
  selectedNZ?: TypedEquipmentResponse;

  sheetIndex: number;
}

// ─── 모바일 카드 스타일 상수 ────────────────────────────────────────
const mobileWrap = "sm:hidden rounded-lg border border-gray-200 overflow-hidden";
const desktopWrap = "hidden sm:block rounded-lg border border-gray-200 overflow-hidden";

export const SheetTab = ({
  planInfo,
  sheet,
  // measurementItems,
  onSheetInfoChange,
  onWeatherChange,
  onMoistureChange,
  onExhaustGasChange,
  onMeasurementPointChange,
  // onSampleItemsChange,
  // onSampleChange,
  onParticleSampleChange,
  selectedPS,
  selectedPT,
  selectedNZ,

  sheetIndex,
}: SheetTabProps) => {
  const { planId } = useParams();
  const [showAddModal, setShowAddModal] = useState(false);

  const isParticle = sheet.category != "GAS";
  const prevIsParticle = useRef(isParticle);

  useEffect(() => {
    if (prevIsParticle.current && !isParticle) {
      const particlePointFields = ["inTm", "outTm", "samplingTime", "beforeVm", "afterVm", "vacuumGaugePressure", "finalImpingerTemperature"] as const;
      sheet.measurementPoints.forEach((_, idx) => {
        particlePointFields.forEach((field) => onMeasurementPointChange(idx, field, ""));
      });

      const particleSampleFields = ["Vr", "Cp", "nozzleSize", "Vm", "samplingTime", "kFactor", "orificeDp", "isokineticRatio", "samplingStartTime", "samplingEndTime"] as const;
      particleSampleFields.forEach((key) => onParticleSampleChange(key, null));
    }
    prevIsParticle.current = isParticle;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isParticle]);

  const {
    area, // 측정시설 면적 (m²)
    // measurementPointCnt,

    Pa, // 측정공에서 위치에서의 대기압 (mmHg)
    // Pg, // 배출가스 절대압력 (Pa + AvgPs/13.6) (mmHg)
    Pm_g, // 가스상 가스미터게이지압 (mmHg)
    Pm_g_inchH2O, // 가스상 가스미터게이지압 (inchH2O)

    Xw, // 수분량 (%)
    ma, // 흡습된 수분의 질량 (g)
    Tm_g, // 가스미터에서의 흡입 가스온도
    Vm_g, // 흡입한 건조가스량
    
    o2: o2ConcentrationAvg,
    co2: co2ConcentrationAvg,
    co: coConcentrationAvg,
    n2: n2ConcentrationAvg,
    nox: noxConcentrationAvg,
    sox: soxConcentrationAvg,

    oxygenCorrectionFactor,
    // Md, // 건조배출가스의 분자량
    // Mw, // 습윤배출가스의 분자량
    standardGasDensity, // 표준상태에서의 습윤배출가스밀도
    // gasDensity, // 배출가스 밀도
    gasDensityList, // 측정점 별 배출가스 밀도

    Tg: AvgTg, // 평균 배출가스 온도 (K)
    Pv: AvgPv, // 평균 배출가스 동압 (mmH2O)
    Ps: AvgPs, // 평균 배출가스 동압 (mmHg)
    inTm: avgInTm,
    outTm: avgOutTm,

    Vs,
    Cp, // 피토우관계수
    quantity,
    standardQuantity,

    VsList,
    orificeDpRecord,

    recommendList,
  } = useFieldDataCalculation(planInfo, sheet, selectedPS, selectedPT, selectedNZ);

  const orificeDpRecordStr = JSON.stringify(orificeDpRecord);
  useEffect(() => {
    Object.entries(orificeDpRecord).forEach(([key, entry]) => {
      const idx = Number(key);
      const mp = sheet.measurementPoints[idx];
      if (!mp) return;

      const calcOrificeDp = entry.orificeDp !== null ? String(entry.orificeDp) : "";
      const calcKFactor = entry.kFactor !== null ? String(entry.kFactor) : "";

      if (mp.orificeDp !== calcOrificeDp) {
        onMeasurementPointChange(idx, "orificeDp", calcOrificeDp);
      }
      if (mp.kFactor !== calcKFactor) {
        onMeasurementPointChange(idx, "kFactor", calcKFactor);
      }
    });

    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orificeDpRecordStr]);

  return (
    <div className="space-y-6 mt-4">
      <div className="flex justify-end">
        <Button label="기록지 미리보기" onClick={() => setShowAddModal(true)} variant="secondary" size="sm" />
      </div>

      {/* ── 분류 ──────────────────────────────────────── */}
      <ReportInfoSection
        mobileWrap={mobileWrap}
        desktopWrap={desktopWrap}

        sheet={sheet}
        onChange={onSheetInfoChange}
      />

      {/* ── 시료 정보 ──────────────────────────────────────── */}
      {/* <SampleInfoSection
        sheet={sheet}
        allSheets={allSheets}
        measurementItems={measurementItems}
        onSampleItemsChange={onSampleItemsChange}
        onSampleChange={onSampleChange}
      /> */}

      {/* ── 기상정보 ─────────────────────────────────── */}
      <WeatherSection
        mobileWrap={mobileWrap}
        desktopWrap={desktopWrap}

        weather={sheet.weather}
        onChange={onWeatherChange}

        atmosphericPressure={Pa}
      />

      {/* ── 수분량정보 ────────────────────────────────── */}
      <MoistureSection
        mobileWrap={mobileWrap}
        desktopWrap={desktopWrap}

        moisture={sheet.moisture}
        onChange={onMoistureChange}

        weightDiff={ma}
        tempAvg={Tm_g}
        dryVolumeDiff={Vm_g}
        pressureToMmHg={Pm_g}
        pressureToInchH2O={Pm_g_inchH2O}

        moistureRatio={Xw}
      />

      {/* ── 배출가스정보 ──────────────────────────────── */}
      <ExhaustGasSection
        mobileWrap={mobileWrap}
        desktopWrap={desktopWrap}

        exhaustGas={sheet.exhaustGas}
        onChange={onExhaustGasChange}

        standardOxygen={planInfo.standardOxygen}

        o2ConcentrationAvg={o2ConcentrationAvg}
        co2ConcentrationAvg={co2ConcentrationAvg}
        coConcentrationAvg={coConcentrationAvg}
        n2ConcentrationAvg={n2ConcentrationAvg}
        noxConcentrationAvg={noxConcentrationAvg}
        soxConcentrationAvg={soxConcentrationAvg}
        oxygenCorrectionFactor={oxygenCorrectionFactor}
        standardGasDensity={standardGasDensity}
      />

      <MeasurementPointSection
        sheet={sheet}
        onChange={onMeasurementPointChange}
        onSheetChange={onSheetInfoChange}
        onParticleSampleChange={onParticleSampleChange}

        AvgGasTemp={AvgTg}
        AvgPd={AvgPv}
        AvgPs={AvgPs}
        avgInTemp={avgInTm}
        avgOutTemp={avgOutTm}

        recommendList={recommendList}
        orificeDpRecord={orificeDpRecord}

        gasDensityList={gasDensityList}
        avgGasVelocity={Vs}
        gasVelocityList={VsList}
        pitotTubeCoefficient={Cp}
        quantity={quantity}
        standardQuantity={standardQuantity}

        selectedNZ={selectedNZ}

        isParticle={isParticle}
      />

      {showAddModal && (
        <ReportPreviewModal
          onClose={() => setShowAddModal(false)}
          planId={Number(planId ?? 0)}
          sheetIndex={sheetIndex}
          sheet={sheet}
          planInfo={planInfo}

          area={area}
          Pa={Pa}
          Xw={Xw}
          Cp={Cp}

          Tg={AvgTg}
          Pv={AvgPv}
          Ps={AvgPs}
          inTm={avgInTm}
          outTm={avgOutTm}

          o2={o2ConcentrationAvg}
          co2={co2ConcentrationAvg}

          orificeDpRecord={orificeDpRecord}
        />
      )}
    </div>
  );
};