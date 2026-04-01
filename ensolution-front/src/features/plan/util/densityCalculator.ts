import { calculator } from "@shared/lib";

const convertToSTP = (value: number, temperature: number, pressure: number): number => {
  return value * (273/temperature) * (pressure/760);
}

const calcGasDensity = (
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

  gasTemperatureList: number[] | null,
  PsList: number[] | null,
  AvgTg: number | null,
  Pg: number | null,
  Pa: number | null,
) => {
  const {
    round, safeCalc
  } = calculator;

  const gasDensity = safeCalc([Xw], () =>
    round(calcGasDensity(o2, co2, co, n2, Xw!), 2)
  );

  const standardGasDensity = safeCalc([gasDensity, AvgTg, Pg], () => round(convertToSTP(gasDensity!, AvgTg!, Pg!), 3));

  const standardGasDensityList = safeCalc([gasDensity, gasTemperatureList, PsList, Pa], () =>
    gasTemperatureList!.map((Ts, i) => {
      const Pg = round(Pa! + PsList![i], 2);
      const Tg = 273 + Ts!;
      return round(convertToSTP(gasDensity!, Tg!, Pg!), 3);
    })
  );

  return {
    standardGasDensity,
    gasDensity,
    standardGasDensityList
  }
}