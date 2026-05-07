import type { PointRecord } from "@shared/lib";
import { calculator } from "@shared/lib";

const convertHpaToMmHg = (value: number): number => {
  return (value * 760) / 1013.25;
};

const convertMmH2OToInchH2O = (value: number): number => {
  return value / 25.4;
}

const convertMmH2OToMmHg = (value: number): number => {
  return value / 13.6;
}

export const pressureCalculator = (
  atmosphericPressure: number | null, // 측정공에서의 대기압
  gasMeterGaugePressure: number | null, // 가스미터 게이지압
  staticPressureRecord: PointRecord, // 측정점 별 배출가스 정압
  avgPs: number | null, // 평균 배출가스 정압
) => {
  const { safeCalc, round } = calculator;

  const Pa = safeCalc([atmosphericPressure], () =>
    round(convertHpaToMmHg(atmosphericPressure!), 1)
  );

  const PsList: PointRecord = Object.fromEntries(
    Object.entries(staticPressureRecord).map(([key, Ps]) => [
      key,
      Ps !== null ? round(convertMmH2OToMmHg(Ps), 2) : null,
    ])
  );

  const PgList: PointRecord = Object.fromEntries(
    Object.entries(PsList).map(([key, Ps]) => [
      key,
      Pa !== null && Ps !== null ? round(Pa + Ps, 2) : null,
    ])
  );

  const Pm_g = safeCalc([gasMeterGaugePressure], () =>
    round(convertMmH2OToMmHg(gasMeterGaugePressure!), 2)
  );

  const Pm_g_inchH2O = safeCalc([gasMeterGaugePressure], () =>
    round(convertMmH2OToInchH2O(gasMeterGaugePressure!), 1)
  );

  const Pg = safeCalc([Pa, avgPs], () => round(Pa! + round(convertMmH2OToMmHg(avgPs!), 2), 2));

  return {
    Pa, // 대기압 (mmHg)
    Pg, // 배출가스 절대압력 (mmHg)
    PgList, // 측정점별 배출가스 절대압력 (mmHg)
    PsList, // 측정점별 배출가스 정압 (mmHg)

    Pm_g, // 수분측정을 위한 가스미터 게이지압 (mmHg)
    Pm_g_inchH2O, // 수분측정을 위한 가스미터 게이지압 (inchH2O)
  };
};