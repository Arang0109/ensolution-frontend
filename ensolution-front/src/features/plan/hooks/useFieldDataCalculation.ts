import type { PlanInfoEditForm, MeasurementSheetEditForm } from "@/entities/plan/model";
import type { TypedEquipmentResponse } from "@/entities/agency/equipment/model";

import { fieldDataCalculator } from "@plan/util";

export const useFieldDataCalculation = (
  planInfo: PlanInfoEditForm,
  sheet: MeasurementSheetEditForm,
  selectedPS?: TypedEquipmentResponse,
  selectedPT?: TypedEquipmentResponse,
  selectedNZ?: TypedEquipmentResponse
) => {
  const {
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
    orificeDpRecord,

    recommendList,
  } = fieldDataCalculator(planInfo, sheet, selectedPS, selectedNZ, selectedPT)

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
    orificeDpRecord,

    recommendList,
  }
};