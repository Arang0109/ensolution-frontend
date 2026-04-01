import type { PointRecord } from "@shared/lib";
import { calculator } from "@shared/lib"
import type { OrificeDpRecord } from "./nozzleCaculator";

const calcExpectSamplingTime = (
  Pa: number,
  Pg: number,
  orificeDp: number,
  Vm: number,
  Vlc: number,
  Tm: number,
  Tg: number,
  Vs: number,
  An: number,
) => {
  const Pm = Pa + (orificeDp/13.6);

  const a = Tg * ((0.00346 * Vlc) + (Vm * (Pm/Tm))) * 1.667 * Math.pow(10,2);
  const b = Pg * Vs * An;

  return a / b;
}

const calcIsokineticRatio = (
  Vlc: number,
  Vm: number,
  Pm: number,
  Pg: number,
  Tm: number,
  Tg: number,
  t: number,
  Vs: number,
  An: number
) => {
  const a = Tg * (0.00346 * Vlc + Vm * (Pm / Tm));
  const b = Pg * t * Vs * An;

  return (a / b) * (1.667 * Math.pow(10, 4));
}

const calcVlc = (
  Xw: number,
  Vm: number
) => {
  return Vm * Math.pow(10,3) * (Xw/(100-Xw)) * (18/22.4);
}

export const isokineticRatioCalculator = (
  recommendNozzleList: {
    nozzle: number,
    orificeDp: number | null,
    Vm: number | null,
    Vlc: number | null,
    samplingTime: number | null,
  }[],
  Xw: number | null,
  Pa: number | null,
  Pg: number | null,
  AvgTm: number | null,
  AvgTg: number | null,
  Vs: number | null,
  selectedNozzle: number | null,
  orificeDpRecord: OrificeDpRecord,
  VmRecord: PointRecord,
  TmRecord: PointRecord,
  VsRecord: PointRecord,
  gasTemperatureRecord: PointRecord,
  samplingTimeRecord: PointRecord,
) => {
  const { safeCalc, round, calcArea } = calculator;

  // 1. recommendNozzleList 구하기
  for (let i = 0; i < recommendNozzleList.length; i++) {
    const Vm = recommendNozzleList[i].Vm;
    const orificeDp = recommendNozzleList[i].orificeDp
    recommendNozzleList[i].Vlc = safeCalc([Xw, Vm], () => round(calcVlc(Xw!, Vm!), 2));

    const Dn = recommendNozzleList[i].nozzle; // cm
    const An = round(calcArea('CIRCULAR', [Dn]), 3);

    recommendNozzleList[i].samplingTime = safeCalc([Pa, Pg, orificeDp, Vm, recommendNozzleList[i].Vlc, AvgTm, AvgTg, Vs, An], () =>
      round(calcExpectSamplingTime(Pa!, Pg!, orificeDp!, Vm!, recommendNozzleList[i].Vlc!, AvgTm!, AvgTg!, Vs!, An!), 1)
    );
  };

  // 2. 측정점별 isokineticRatio 계산
  Object.keys(orificeDpRecord).map(Number).forEach(i => {
    const Vm = VmRecord[i];
    const Vlc = safeCalc([Vm, Xw], () => round(calcVlc(Xw!, Vm!), 2));
    const orificeDp = orificeDpRecord[i].orificeDp;
    const Pm = safeCalc([Pa, orificeDp], () => Pa! + (orificeDp!/13.6));
    const Tm_raw = TmRecord[i];
    const Tm = Tm_raw !== null ? Tm_raw + 273 : null;
    const Vs_i = VsRecord[i];
    const Tg_raw = gasTemperatureRecord[i];
    const Tg = Tg_raw !== null ? Tg_raw + 273 : null;
    const t = samplingTimeRecord[i];
    const An = safeCalc([selectedNozzle], () => round(calcArea('CIRCULAR', [selectedNozzle!]), 3));

    orificeDpRecord[i].isokineticRatio = safeCalc([Vlc, Vm, Pm, Pg, Tm, Tg, t, Vs_i, An], () =>
      round(calcIsokineticRatio(Vlc!, Vm!, Pm!, Pg!, Tm!, Tg!, t!, Vs_i!, An!), 1)
    );
  });

  return {
    recommendList: recommendNozzleList,
    orificeDpRecord,
  };
}
