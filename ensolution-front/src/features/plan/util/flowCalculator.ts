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
) => 60 * area * velocity;

const calcStandardQuantity = (
  quantity: number,
  Tg: number,
  Pg: number,
  Xw: number
) => {

  return quantity *
    (273 / Tg) *
    (Pg / 760) *
    (1 - Xw / 100) *
    60;;
};

export const flowCalculator = (
  pitotTubeCoefficients: { coefficient: string; velocity: string }[],
  dynamicPressureList: number[] | null,
  standardGasDensity: number | null,
  standardGasDensityList: number[] | null,
  area: number | null,
  gasTemperatureList: number[] | null,
  PgList:  number[] | null,
  Xw: number | null,
  AvgPv: number | null
) => {
  const { safeCalc, round } = calculator;

  const postGasVelocity = safeCalc([AvgPv, standardGasDensity], () =>
    round(calcGasVelocity(0.84, AvgPv!, standardGasDensity!), 3)
  );

  const Cp = safeCalc([postGasVelocity], () =>
    findPitotTubeCoefficient(pitotTubeCoefficients, postGasVelocity!)
  );

  const gasVelocity = safeCalc([Cp, AvgPv, standardGasDensity], () =>
    round(calcGasVelocity(Cp!, AvgPv!, standardGasDensity!), 3)
  );

  const VsList = safeCalc([Cp, dynamicPressureList, standardGasDensityList], () =>
    standardGasDensityList!.map((standardGasDensity, i) => {
      const Pv = dynamicPressureList![i];
      return round(calcGasVelocity(Cp!, Pv!, standardGasDensity!), 3);
    })
  );

  const quantity = safeCalc([area, gasVelocity], () =>
    round(calcQuantity(area!, gasVelocity!), 1)
  );

  const Pg = safeCalc([PgList], () =>
    PgList!.reduce((acc, cur) => acc + cur, 0) / PgList!.length
  )

  const Tg = safeCalc([gasTemperatureList], () =>
    gasTemperatureList!.reduce((acc, cur) => acc + cur, 0) / gasTemperatureList!.length
  )

  const standardQuantity = safeCalc([gasVelocity, Tg, Pg, Xw], () =>
    round(calcStandardQuantity(gasVelocity!, Tg!, Pg!, Xw!), 1)
  );


  return {
    Cp,
    Vs: gasVelocity,
    VsList,

    quantity,
    standardQuantity
  }
}