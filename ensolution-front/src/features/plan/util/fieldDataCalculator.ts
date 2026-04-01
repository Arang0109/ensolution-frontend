import type { MeasurementSheetEditForm, PlanInfoEditForm } from "@/entities/plan/model";

import type { NozzleSpec, ParticleSamplerSpec, PitotTubeSpec, TypedEquipmentResponse } from "@/entities/agency/equipment/model";

import {
  pressureCalculator,
  densityCalculator,
  gasCalculator,
  stackCalculator,
  moistureCalculator,
  flowCalculator,
  nozzleCalculator,
  isokineticRatioCalculator,
} from "@plan/util";

import type { PointRecord } from "@shared/lib";
import { calculator } from "@shared/lib";

export const fieldDataCalculator = (
  planInfo: PlanInfoEditForm,
  sheet: MeasurementSheetEditForm,
  selectedPS?: TypedEquipmentResponse,
  selectedNZ?: TypedEquipmentResponse,
  selectedPT?: TypedEquipmentResponse
) => {
  const { round, toNumber, toNumbers, toNumberRecord, validValues, calcAverage } = calculator;

  const Pa_hpa = toNumber(sheet.weather.pressure); // 대기압 (Hpa)

  const gasMeterGaugePressure = toNumber(sheet.moisture.gasMeterGaugePressure); // 수분측정을 위한 가스미터 게이지압 (mmH2O)

  // 각 측정점 정보 Record (인덱스 보존, null 제거 없음) //
  const gasTemperatureRecord = toNumberRecord(sheet.measurementPoints.map((p) => p.Ts));
  const dynamicPressureRecord = toNumberRecord(sheet.measurementPoints.map((p) => p.Pv));
  const staticPressureRecord  = toNumberRecord(sheet.measurementPoints.map((p) => p.Ps));
  const inTmRecord            = toNumberRecord(sheet.measurementPoints.map((p) => p.inTm));
  const outTmRecord           = toNumberRecord(sheet.measurementPoints.map((p) => p.outTm));
  const beforeVmRecord        = toNumberRecord(sheet.measurementPoints.map((p) => p.beforeVm));
  const afterVmRecord         = toNumberRecord(sheet.measurementPoints.map((p) => p.afterVm));
  const samplingTimeRecord    = toNumberRecord(sheet.measurementPoints.map((p) => p.samplingTime));
  /////////////////////////////////////////////////////////////

  // 측정점별 평균 온도 (inTm + outTm) / 2
  const TmRecord: PointRecord = Object.fromEntries(
    Object.entries(inTmRecord).map(([key, inTm]) => {
      const outTm = outTmRecord[Number(key)];
      return [key, inTm !== null && outTm !== null ? (inTm + outTm) / 2 : null];
    })
  );

  // 측정점별 채취 건조가스량 afterVm - beforeVm
  const VmRecord: PointRecord = Object.fromEntries(
    Object.entries(beforeVmRecord).map(([key, bVm]) => {
      const aVm = afterVmRecord[Number(key)];
      return [key, bVm !== null && aVm !== null ? aVm - bVm : null];
    })
  );

  const validTg  = validValues(gasTemperatureRecord);
  const validPv  = validValues(dynamicPressureRecord);
  const validPs  = validValues(staticPressureRecord);
  const validInTm  = validValues(inTmRecord);
  const validOutTm = validValues(outTmRecord);
  const validTm  = validValues(TmRecord);

  const AvgTg = validTg.length  ? round(calcAverage(validTg), 1) + 273  : null; // 평균 배출가스 온도 (°K)
  const AvgPv = validPv.length  ? round(calcAverage(validPv), 1)         : null; // 평균 배출가스 동압 (mmH2O)
  const AvgPs = validPs.length  ? round(calcAverage(validPs), 1)         : null; // 평균 배출가스 정압 (mmH2O)
  const avgInTm  = validInTm.length  ? round(calcAverage(validInTm), 1)  : null; // 평균 가스미터 입구 온도 (°C)
  const avgOutTm = validOutTm.length ? round(calcAverage(validOutTm), 1) : null; // 평균 가스미터 출구 온도 (°C)
  const AvgTm = validTm.length  ? round(calcAverage(validTm), 1) + 273   : null;

  const standardOxygen = toNumber(planInfo.standardOxygen);                           // 측정시설의 기준산소농도
  const diameters = toNumbers([planInfo.horizontalLength, planInfo.verticalLength]);  // 측정시설 가로,세로길이

  const CpList = (selectedPT?.spec as PitotTubeSpec | undefined)?.coefficients ?? []; // 피토우관 계수 목록
  const nozzleList = (selectedNZ?.spec as NozzleSpec | undefined)?.diameters ?? [];   // 노즐사이즈 목록
  const deltaH = (selectedPS?.spec as ParticleSamplerSpec | undefined)?.orificeDp ?? 46; // 오리피스보정계수 (△H@)

  // 1. 측정시설의 면적, 측정점 계산 로직
  const { area, measurementPointCnt } = stackCalculator(planInfo.shape, diameters);

  // Pa: 측정공에서의 대기압 (mmHg)
  // Pg: 배출가스 절대압력 (Pa + AvgPs/13.6) (mmHg)
  // PsList: 측정점 별 배출가스 정압 (mmHg)
  // PgList: 측정점 별 배출가스 절대압력 (Pa + Ps/13.6) (mmHg)
  // Pm_g: 수분측정을 위한 가스미터 게이지압 (mmHg)
  // Pm_g_inchH2O: 수분측정을 위한 가스미터 게이지압 (inchH2O)
  const { Pa, Pg, PgList, PsList, Pm_g, Pm_g_inchH2O } = pressureCalculator(Pa_hpa, gasMeterGaugePressure, staticPressureRecord, AvgPs);

  // ma: 흡습된 수분의 질량 (g)
  // Tm_g: 가스미터에서의 흡입 가스온도 (°C)
  // Vm_g: 흡입한 건조가스량 (L)
  // Xw: 배출가스 중의 수증기의 부피 백분율 (%)
  const { ma, Tm_g, Vm_g, Xw } = moistureCalculator(sheet.moisture, Pa, Pm_g);

  // concentrationAvg: 배출가스 조성물질의 평균값
  // oxygenCorrectionFactor: 산소보정계수
  // Md: 건조배출가스 분자량
  // Mw: 습윤배출가스 분자량
  const {
    o2ConcentrationAvg, co2ConcentrationAvg, coConcentrationAvg, n2ConcentrationAvg, noxConcentrationAvg, soxConcentrationAvg,
    oxygenCorrectionFactor, Md, Mw
  } = gasCalculator(sheet.exhaustGas, standardOxygen, Xw);

  // standardGasDensity: 표준상태에서의 습윤배출가스 밀도
  // gasDensity: 실제 배출가스 밀도
  // gasDensityList: 측정점 별 배출가스 밀도
  const { standardGasDensity, gasDensity, gasDensityList } = densityCalculator(
    Xw, o2ConcentrationAvg, co2ConcentrationAvg, coConcentrationAvg, n2ConcentrationAvg, gasTemperatureRecord, PsList,
    AvgTg, Pg, Pa
  );

  // Cp: 피토우관 계수
  // Vs: 평균 배출가스 유속 (m/s)
  // VsList: 측정점 별 배출가스 유속 (m/s)
  const { Cp, Vs, VsList, quantity, standardQuantity } = flowCalculator(CpList, dynamicPressureRecord, gasDensity, gasDensityList, area, gasTemperatureRecord, PgList, Xw, AvgPv);

  const Vr = toNumber(sheet.particleSample.Vr);
  const selectedNozzle = toNumber(sheet.particleSample.nozzleSize);

  // kFactor: K Factor
  // orificeDp: 오리피스차압 (mmH2O)
  const { recommendNozzleList, orificeDpRecord } = nozzleCalculator(
    nozzleList, deltaH, Cp, Vr,
    AvgTg, AvgTm, Xw, Mw, Pa, Pg, AvgPv, Md,
    selectedNozzle, PgList, TmRecord, gasTemperatureRecord, dynamicPressureRecord
  );

  // Vlc: 채취된 물의 총량 (mL)
  // isokineticRatio: 등속흡입계수 (%)
  // expectSamplingVolume: 예상 채취량 (Sm3)
  const { recommendList, orificeDpRecord: orificeDpResult } = isokineticRatioCalculator(
    recommendNozzleList, Xw, Pa, Pg, AvgTm, AvgTg, Vs,
    selectedNozzle, orificeDpRecord, VmRecord, TmRecord, VsList, gasTemperatureRecord, samplingTimeRecord
  );

  return {
    area, // 측정시설 면적 (m²)
    measurementPointCnt,

    Pa, // 측정공에서 위치에서의 대기압 (mmHg)
    Pg, // 배출가스 절대압력 (Pa + AvgPs/13.6) (mmHg)
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
    Md, // 건조배출가스의 분자량
    Mw, // 습윤배출가스의 분자량
    standardGasDensity, // 표준상태에서의 습윤배출가스밀도
    gasDensity, // 배출가스 밀도
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
    orificeDpRecord: orificeDpResult,

    recommendList,
  };
};
