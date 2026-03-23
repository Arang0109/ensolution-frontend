import { calcSquareArea, calcCircleArea, calcArrayAvg } from "@plan/util";
import type { FieldDataEditForm, PreInfoEditForm } from "@/entities/plan/model";

import type { PitotTubeSpec, TypedEquipmentResponse } from "@/entities/agency/equipment/model";

const toNumber = (v?: string) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

const calcArea = (preInfo: PreInfoEditForm): number | null => {
  if (preInfo.shape === "CIRCULAR") {
    const a = calcCircleArea(preInfo.horizontalLength);
    return toNumber(a);
  }

  if (preInfo.shape === "RECTANGULAR") {
    const a = calcSquareArea(
      preInfo.horizontalLength,
      preInfo.verticalLength
    );
    return toNumber(a);
  }

  return null;
};

const calcMeasurementPointLength = (
  diameter: string,
  measurePointCnt: number
) => {
  const d = parseFloat(diameter);
  if (isNaN(d) || measurePointCnt <= 0) return [];

  const R = d / 2;
  const z = measurePointCnt / 4;
  const arr: string[] = [];

  for (let n = 1; n <= z + 1 / 4; n++) {
    const result = R * Math.sqrt((2 * n - 1) / (2 * z));
    arr.push(((result) * 100).toFixed(1));
  }

  return arr;
};

export const calcMeasurePointCnt = (preInfo: PreInfoEditForm) => {
  if (preInfo.shape == 'CIRCULAR') {
    const diameter = parseFloat(preInfo.horizontalLength);

    if ( diameter <= 1 ) {
      return 4;
    } else if ( diameter <= 2 ) {
      return 8;
    } else if ( diameter <= 4 ) {
      return 12;
    } else if ( diameter <= 4.5 ) {
      return 16;
    } else { return 20; }
  }

  if (preInfo.shape == 'RECTANGULAR') {
    const area = calcArea(preInfo);
    const horizontal = parseFloat(preInfo.horizontalLength);
    const vertical = parseFloat(preInfo.verticalLength);
    
    if (!area) return 1;

    if ( area <= 0.25 ) return 1;

    if ( area <= 1 ) {
      return Math.ceil(horizontal / 0.5) * Math.ceil(vertical / 0.5);
    } else if ( area <= 4 ) {
      return Math.ceil(horizontal / 0.667) * Math.ceil(vertical / 0.667);
    } else if ( area <= 20) {
      return Math.ceil(horizontal) * Math.ceil(vertical);
    } else { return 20; }
  }

  return 1;
}

const calcStandardDensity = (
  density: number | null,
  temperature: number | null,
  atmPressure: number | null,
  staticPressure: number | null
) => {

  if (
    density === null ||
    temperature === null ||
    atmPressure === null ||
    staticPressure === null
  ) {
    return null;
  }

  const Ps = staticPressure / 13.6;

  const result =
    density *
    (273 / (273 + temperature)) *
    ((atmPressure + Ps) / 760);

  return Number(result.toFixed(3));
};

const calcPointVelocities = (
  points: FieldDataEditForm["measurementPoints"],
  coefficients: { coefficient: string; velocity: string }[],
  standardDensity: number | null
) => {

  if (standardDensity === null) return [];

  return points.map((p) => {
    const dp = toNumber(p.dynamicPressure);

    if (dp === null) return null;

    const result = calcGasVelocity(
      coefficients,
      dp,
      standardDensity
    );

    return result.velocity;
  });
};

const calcGasVelocity = (
  coefficients: { coefficient: string; velocity: string }[],
  dynamicPressure: number | null,
  standardDensity: number | null
) => {

  if (dynamicPressure === null || standardDensity === null) {
    return {
      velocity: null,
      coefficient: null
    };
  }

  const baseCoefficient = 0.84;

  const baseVelocity =
    baseCoefficient *
    Math.sqrt((2 * 9.81 * dynamicPressure) / standardDensity);

  let appliedCoefficient = baseCoefficient;

  coefficients.forEach((item) => {
    const vLimit = Number(item.velocity);
    const c = Number(item.coefficient);

    if (baseVelocity >= vLimit) {
      appliedCoefficient = c;
    }
  });

  const finalVelocity =
    appliedCoefficient *
    Math.sqrt((2 * 9.81 * dynamicPressure) / standardDensity);

  return {
    velocity: Number(finalVelocity.toFixed(3)),
    coefficient: Number(appliedCoefficient.toFixed(3))
  };
};

const calcQuantity = (
  area: number | null,
  velocity: number | null
) => {

  if (area === null || velocity === null) return null;

  const result = 60 * area * velocity;

  return Number(result.toFixed(1));
};

const calcStandardQuantity = (
  quantity: number | null,
  gasTemperature: number | null,
  staticPressure: number | null,
  moistureRatio: number | null,
  atmosphericPressure: number | null
) => {

  if (
    quantity === null ||
    gasTemperature === null ||
    staticPressure === null ||
    moistureRatio === null ||
    atmosphericPressure === null
  ) {
    return null;
  }

  const Ps = staticPressure / 13.6;

  const result =
    quantity *
    (273 / (273 + gasTemperature)) *
    ((atmosphericPressure + Ps) / 760) *
    (1 - moistureRatio / 100) *
    60;

  return Number(result.toFixed(1));
};

export const measurePointCaculator = (
  preInfo: PreInfoEditForm,
  fieldData: FieldDataEditForm,
  gasDensity: number | null,
  atmosphericPressure: number | null,
  moistureRatio: number | null,
  selectedPT?: TypedEquipmentResponse
) => {

  const area = calcArea(preInfo);
  const measurePointCnt = calcMeasurePointCnt(preInfo);

  const measurePointLength =
    calcMeasurementPointLength(preInfo.horizontalLength, measurePointCnt);

  const coefficients =
    (selectedPT?.spec as PitotTubeSpec | undefined)?.coefficients ?? [];

  const AvgGasTemp = calcArrayAvg(
    fieldData.measurementPoints.map((p) => p.gasTemperature)
  );

  const AvgPd = calcArrayAvg(
    fieldData.measurementPoints.map((p) => p.dynamicPressure)
  );

  const AvgPs = calcArrayAvg(
    fieldData.measurementPoints.map((p) => p.staticPressure)
  );

  const avgInTemp = calcArrayAvg(
    fieldData.measurementPoints.map((p) => p.inEquipmentTemperature)
  );

  const avgOutTemp = calcArrayAvg(
    fieldData.measurementPoints.map((p) => p.outEquipmentTemperature)
  );

  const standardDensity = calcStandardDensity(
    gasDensity,
    AvgGasTemp,
    atmosphericPressure,
    AvgPs
  );

  const pointVelocities = calcPointVelocities(
    fieldData.measurementPoints,
    coefficients,
    standardDensity
  );

  const velocityResult = calcGasVelocity(
    coefficients,
    AvgPd,
    standardDensity
  );

  const quantity = calcQuantity(
    area,
    velocityResult.velocity
  );

  const standardQuantity = calcStandardQuantity(
    quantity,
    AvgGasTemp,
    AvgPs,
    moistureRatio,
    atmosphericPressure
  );

  return {
    area,
    measurePointCnt: Math.ceil(measurePointCnt / 4),
    measurePointLength,

    AvgGasTemp,
    AvgPd,
    AvgPs,
    avgInTemp,
    avgOutTemp,

    pointVelocities,

    standardDensity,
    gasVelocity: velocityResult.velocity,
    pitotTubeCoefficient: velocityResult.coefficient,
    quantity,
    standardQuantity
  };
};