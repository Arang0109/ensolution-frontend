import type { PointRecord } from "@shared/lib";
import { calculator } from "@shared/lib";

const convertFromSTP = (value: number, temperature: number, pressure: number): number => {
  return value * (273/temperature) * (pressure/760);
}

const calcStandardGasDensity = (
  o2Avg: number,
  co2Avg: number,
  coAvg: number,
  n2Avg: number,
  Xw: number
) => {

  const o2 = (32 / 22.4 * o2Avg) / 100;
  const co2 = (44 / 22.4 * co2Avg) / 100;
  const co = (28 / 22.4 * coAvg) / 100;
  const n2 = (28 / 22.4 * n2Avg) / 100;

  const dryGasDensity = o2 + co2 + co + n2;

  const moisture = (18 / 22.4 * Xw) / 100;

  return (dryGasDensity * (100 - Xw) / 100) + moisture;
};

export const densityCalculator = (
  Xw: number | null,
  o2: number,
  co2: number,
  co: number,
  n2: number,

  gasTemperatureRecord: PointRecord,
  PsRecord: PointRecord,
  AvgTg: number | null,
  Pg: number | null,
  Pa: number | null,
) => {
  const {
    round, safeCalc
  } = calculator;

  const standardGasDensity = safeCalc([Xw], () =>
    round(calcStandardGasDensity(o2, co2, co, n2, Xw!), 2)
  );

  const gasDensity = safeCalc([standardGasDensity, AvgTg, Pg], () =>
    round(convertFromSTP(standardGasDensity!, AvgTg!, Pg!), 3)
  );

  const gasDensityList: PointRecord = Object.fromEntries(
    Object.entries(gasTemperatureRecord).map(([key, Ts]) => {
      const Ps = PsRecord[Number(key)];
      if (standardGasDensity === null || Pa === null || Ts === null || Ps === null) return [key, null];
      const pg = round(Pa + Ps, 2);
      const tg = 273 + Ts;
      return [key, round(convertFromSTP(standardGasDensity, tg, pg), 3)];
    })
  );

  return {
    standardGasDensity,
    gasDensity,
    gasDensityList
  }
}