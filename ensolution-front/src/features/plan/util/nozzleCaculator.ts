import type { PointRecord } from "@shared/lib";
import { calculator } from "@shared/lib";

export type OrificeDpEntry = {
  orificeDp: number | null;
  kFactor: number | null;
  isokineticRatio: number | null;
};
export type OrificeDpRecord = Record<number, OrificeDpEntry>;

const convertFromSTP = (value: number, temperature: number, pressure: number): number => {
  return value * (temperature/273) * (760/pressure);
}

const calcKFactor = (
  Cp: number,
  nozzleSize: number,
  deltaH: number,
  Xw: number,
  Md: number,
  Mw: number,
  Tm: number,
  Tg: number,
  Pa: number,
  Pg: number,
) => {
  // 공정시험법 개정 시 K 변경 必
  // const K = 7.45 * Math.pow(10, -5);
  const K = 8.03989 * Math.pow(10, -5);
  const NZ = nozzleSize * 10

  return K * Math.pow(Cp, 2) * deltaH * Math.pow(NZ, 4) * Math.pow(1-(Xw/100), 2) *
    (Md * Tm * Pg) / (Mw * Tg * Pa)
}

export const nozzleCalculator = (
  nozzleSizes: { diameter: string }[],
  deltaH: number | null, // 오리피스 보정 계수
  Cp: number | null, // 피토우관 계수
  Vr: number | null, // 채취하기 원하는 흡입량
  AvgTg: number | null,
  AvgTm: number | null,
  Xw: number | null,
  Mw: number | null,
  Pa: number | null,
  Pg: number | null,
  AvgPv: number | null,
  Md: number | null,
  selectedNozzle: number | null,
  PgRecord: PointRecord,
  TmRecord: PointRecord,
  gasTemperatureRecord: PointRecord,
  dynamicPressureRecord: PointRecord,
) => {
  const { safeCalc, round, toNumber } = calculator;

  const nozzles = nozzleSizes.map(v => toNumber(v.diameter)).filter((v): v is number => v !== null);

  // 1. Dn에 따른 recommendNozzleList 만들기
  const recommendNozzleList: {
    nozzle: number,
    orificeDp: number | null,
    Vm: number | null,
    Vlc: number | null,
    samplingTime: number | null,
  }[] = [];

  for (let i = 0; i < nozzles.length; i++) {
    const kFactor = safeCalc([Cp, nozzles, deltaH, Xw, Md, Mw, AvgTm, AvgTg, Pa, Pg], () =>
      round(calcKFactor(Cp!, nozzles[i]!, deltaH!, Xw!, Md!, Mw!, AvgTm!, AvgTg!, Pa!, Pg!), 2)
    );

    const orificeDp = safeCalc([kFactor, AvgPv], () =>
      round(kFactor! * AvgPv!, 2)
    );

    const Pm = safeCalc([Pa, orificeDp], () => Pa! + (orificeDp!/13.6));

    const Vm = safeCalc([Vr, AvgTm, Pm], () => round(convertFromSTP(Vr!, AvgTm!, Pm!), 5));

    recommendNozzleList.push({
      nozzle: nozzles[i],
      orificeDp: orificeDp,
      Vm: Vm,
      Vlc: null,
      samplingTime: null, });
  };

  // 2. 측정점별 orificeDpRecord 만들기
  const orificeDpRecord: OrificeDpRecord = {};

  Object.keys(gasTemperatureRecord).map(Number).forEach(i => {
    const Tg_raw = gasTemperatureRecord[i];
    const Tg = Tg_raw !== null ? Tg_raw + 273 : null;
    const Tm_raw = TmRecord[i];
    const Tm = Tm_raw !== null ? Tm_raw + 273 : null;
    const Pg_i = PgRecord[i];
    const Pv = dynamicPressureRecord[i];

    const kFactor = safeCalc([Cp, selectedNozzle, deltaH, Xw, Md, Mw, Tm, Tg, Pa, Pg_i], () =>
      round(calcKFactor(Cp!, selectedNozzle!, deltaH!, Xw!, Md!, Mw!, Tm!, Tg!, Pa!, Pg_i!), 2)
    );

    const orificeDp = safeCalc([kFactor, Pv], () =>
      round(kFactor! * Pv!, 2)
    );

    orificeDpRecord[i] = {
      orificeDp,
      kFactor,
      isokineticRatio: null,
    };
  });

  return {
    recommendNozzleList,
    orificeDpRecord,
  }
}
