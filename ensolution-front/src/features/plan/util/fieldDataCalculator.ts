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

import { calculator } from "@shared/lib";

export const fieldDataCalculator = (
  planInfo: PlanInfoEditForm,
  sheet: MeasurementSheetEditForm,
  selectedPS?: TypedEquipmentResponse,
  selectedNZ?: TypedEquipmentResponse,
  selectedPT?: TypedEquipmentResponse
) => {
  const { safeCalc, round, toNumber, toNumbers, calcAverage } = calculator;

  const Pa_hpa = toNumber(sheet.weather.pressure); // 대기압 (Hpa)

  const gasMeterGaugePressure = toNumber(sheet.moisture.gasMeterGaugePressure); // 수분측정을 위한 가스미터 게이지압 (mmH2O)
  
  // 각 측정점 정보 List //
  const gasTemperatureList = toNumbers(sheet.measurementPoints.map((p) => p.Ts));
  const dynamicPressureList = toNumbers(sheet.measurementPoints.map((p) => p.Pv));
  const staticPressureList = toNumbers(sheet.measurementPoints.map((p) => p.Ps));
  const inTmList = toNumbers(sheet.measurementPoints.map((p) => p.inTm));
  const outTMList = toNumbers(sheet.measurementPoints.map((p) => p.outTm));
  ////////////////////////

  const TmList = safeCalc([inTmList, outTMList], () =>
    inTmList!.map((inTm, i) => {
      const outTm = outTMList![i];
      return (inTm + outTm) / 2;
    })
  );

  const AvgTg = safeCalc([gasTemperatureList], () => round(calcAverage(gasTemperatureList!), 0) + 273);     // 평균 배출가스 온도 (°K)
  const AvgPv = safeCalc([dynamicPressureList], () => round(calcAverage(dynamicPressureList!), 1));           // 평균 배출가스 동압 (mmH2O)
  const AvgPs = safeCalc([staticPressureList], () => round(calcAverage(staticPressureList!), 1));           // 평균 배출가스 정압 (mmH2O)
  const avgInTm =  safeCalc([inTmList], () => round(calcAverage(inTmList!), 1));    // 평균 가스미터 입구 온도 (°C)
  const avgOutTm = safeCalc([outTMList], () => round(calcAverage(outTMList!), 1));  // 평균 가스미터 출구 온도 (°C)
  const AvgTm = safeCalc([TmList], () => round(calcAverage(TmList!), 1) + 273);

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
  const { Pa, Pg, PgList, PsList, Pm_g, Pm_g_inchH2O } = pressureCalculator(Pa_hpa, gasMeterGaugePressure, staticPressureList, AvgPs);

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
  const { gasDensity, standardGasDensity, standardGasDensityList } = densityCalculator(
    Xw, o2ConcentrationAvg, co2ConcentrationAvg, coConcentrationAvg, n2ConcentrationAvg, gasTemperatureList, PsList,
    AvgTg, Pg, Pa
  );

  // Cp: 피토우관 계수
  // Vs: 평균 배출가스 유속 (m/s)
  // VsList: 측정점 별 배출가스 유속 (m/s)
  const { Cp, Vs, VsList, quantity, standardQuantity } = flowCalculator(CpList, dynamicPressureList, standardGasDensity, standardGasDensityList, area, gasTemperatureList, PgList, Xw, AvgPv);

  const Vr = toNumber(sheet.particleSample.Vr);
  const selectedNozzle = toNumber(sheet.particleSample.nozzleSize);

  // kFactor: K Factor
  // orificeDp: 오리피스차압 (mmH2O)
  const { recommendNozzleList, orificeDpList } = nozzleCalculator(
    nozzleList, deltaH, Cp, Vr,
    AvgTg, AvgTm, Xw, Mw, Pa, Pg, AvgPv, Md,
    selectedNozzle, PgList, TmList, gasTemperatureList, dynamicPressureList, measurementPointCnt
  );

  // Vlc: 채취된 물의 총량 (mL)
  // isokineticRatio: 등속흡입계수 (%)
  // expectSamplingVolume: 예상 채취량 (Sm3)
  const { recommendList } = isokineticRatioCalculator(
    recommendNozzleList, Xw, Pa, Pg, AvgTm, AvgTg, Vs,
    selectedNozzle
  );

  return {
    Pa, // 측정공에서 위치에서의 대기압 (mmHg)
    Pg, // 배출가스 절대압력 (Pa + AvgPs/13.6) (mmHg)
    Pm_g, // 가스상 가스미터게이지압 (mmHg)
    Pm_g_inchH2O, // 가스상 가스미터게이지압 (inchH2O)

    Xw, // 수분량 (%)

    area, // 측정시설 면적 (m²)
    measurementPointCnt,

    AvgTg, // 평균 배출가스 온도 (K)
    AvgPv, // 평균 배출가스 동압 (mmH2O)
    AvgPs, // 평균 배출가스 동압 (mmHg)
    avgInTm,
    avgOutTm,

    o2ConcentrationAvg, co2ConcentrationAvg, coConcentrationAvg, n2ConcentrationAvg, noxConcentrationAvg, soxConcentrationAvg,

    oxygenCorrectionFactor,
    Md, Mw, // Md: 건조배출가스의 분자량, Mw: 습윤배출가스의 분자량

    recommendList,
    orificeDpList,

    ma, // 흡습된 수분의 질량 (g)
    Tm_g, // 가스미터에서의 흡입 가스온도
    Vm_g, // 흡입한 건조가스량

    gasDensity, // 배출가스 밀도
    standardGasDensity, // 표준상태에서의 습윤배출가스밀도
    standardGasDensityList, // 측정점 별 배출가스 밀도
    
    Vs, // 배출가스 유속 (m/s)
    VsList, // 측정점 별 배출가스 유속 (m/s)
    Cp, // 피토우관계수
    quantity,
    standardQuantity,
  };
};