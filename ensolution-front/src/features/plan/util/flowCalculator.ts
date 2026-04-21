import type { PointRecord } from "@shared/lib";
import { calculator } from "@shared/lib";

const calcGasVelocity = (
  Cp: number,
  Pv: number,
  gasDensity: number,
) => Cp * Math.sqrt((2 * 9.81 * Pv) / gasDensity)

const findPitotTubeCoefficient = (
  pitotTubeCoefficients:  { coefficient: string; velocity: string }[],
  v: number,
) => {
  let appliedCoefficient = 0.84;

  pitotTubeCoefficients.forEach((item) => {
    const vLimit = Number(item.velocity);
    const c = Number(item.coefficient);

    if (v >= vLimit) {
      appliedCoefficient = c;
    }
  });

  return appliedCoefficient;
}

const calcQuantity = (
  area: number,
  velocity: number
) => 60 * 60 * area * velocity;

const calcStandardQuantity = (
  quantity: number,
  Tg: number,
  Pg: number,
  Xw: number
) => {

  return quantity * (273 / Tg) * (Pg / 760) * (1 - (Xw/100));
};

export const flowCalculator = (
  pitotTubeCoefficients: { coefficient: string; velocity: string }[],
  dynamicPressureRecord: PointRecord,
  gasDensity: number | null,
  gasDensityRecord: PointRecord,
  area: number | null,
  gasTemperatureRecord: PointRecord,
  PgRecord: PointRecord,
  Xw: number | null,
  AvgPv: number | null
) => {
  const { safeCalc, round, validValues, calcAverage } = calculator;

  const postGasVelocity = safeCalc([AvgPv, gasDensity], () =>
    round(calcGasVelocity(0.84, AvgPv!, gasDensity!), 3)
  );

  const Cp = safeCalc([postGasVelocity], () =>
    findPitotTubeCoefficient(pitotTubeCoefficients, postGasVelocity!)
  );

  const gasVelocity = safeCalc([Cp, AvgPv, gasDensity], () =>
    round(calcGasVelocity(Cp!, AvgPv!, gasDensity!), 3)
  );

  const VsList: PointRecord = Object.fromEntries(
    Object.entries(gasDensityRecord).map(([key, gd]) => {
      const Pv = dynamicPressureRecord[Number(key)];
      if (Cp === null || gd === null || Pv === null) return [key, null];
      return [key, round(calcGasVelocity(Cp, Pv, gd), 3)];
    })
  );

  const quantity = safeCalc([area, gasVelocity], () =>
    round(calcQuantity(area!, gasVelocity!), 1)
  );
  const validPg = validValues(PgRecord);
  const Pg = validPg.length ? round(validPg.reduce((acc, cur) => acc + cur, 0) / validPg.length, 2) : null;

  const validTg = validValues(gasTemperatureRecord);
  const Tg = validTg.length ? calcAverage(validTg) + 273 : null;

  const standardQuantity = safeCalc([quantity, Tg, Pg, Xw], () =>
    round(calcStandardQuantity(quantity!, Tg!, Pg!, Xw!), 1)
  );

  return {
    Cp,
    Vs: gasVelocity,
    VsList,

    quantity,
    standardQuantity
  }
}
