import type { FieldDataEditForm, MoistureEditForm } from "@plan/model";

const toNumber = (v?: string) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

const calcMoistureWeightDiff = (moisture: MoistureEditForm): string => {
  const before = toNumber(moisture.beforeWeight);
  const after = toNumber(moisture.afterWeight);

  if (before === null || after === null) return "";

  return (after - before).toFixed(2);
};

const caclMoistureGasTemperatureAvg = (moisture: MoistureEditForm): string => {
  const inTemp = toNumber(moisture.inTemperature);
  const outTemp = toNumber(moisture.outTemperature);

  if (inTemp === null || outTemp === null) return "";

  return ((inTemp + outTemp) / 2).toFixed(1);
};

const calcMoisturDryVolumeDiff = (moisture: MoistureEditForm): string => {
  const before = toNumber(moisture.beforeDryVolume);
  const after = toNumber(moisture.afterDryVolume);
  
  if (before === null || after === null) return "";

  return (after - before).toFixed(2);
};

const convertMoistureGaugePressureToMmHg = (moisture: MoistureEditForm): string => {
  const pressure = parseFloat(moisture.gasMeterGaugePressure) || 0;
  return (pressure * 760 / 10332).toFixed(3);
};

const convertMoistureGaugePressureToInchH2O = (moisture: MoistureEditForm): string => {
  const pressure = parseFloat(moisture.gasMeterGaugePressure) || 0;
  return (pressure / 25.4).toFixed(1);
};

const mmH2OToMmHg = (mmH2O: number) => mmH2O / 13.6;

const calcMoistureRatio = (
  moisture: MoistureEditForm,
  atmosphericPressureHpa: string,     // H20이 hPa라면 이걸 사용
  gaugePressureMmH2O: boolean = true  // O55가 mmH2O면 true, mmHg면 false
): string => {
  const beforeW = parseFloat(moisture.beforeWeight);
  const afterW = parseFloat(moisture.afterWeight);
  const beforeV = parseFloat(moisture.beforeDryVolume);
  const afterV = parseFloat(moisture.afterDryVolume);
  const inTemp = parseFloat(moisture.inTemperature);
  const outTemp = parseFloat(moisture.outTemperature);
  const gaugeRaw = parseFloat(moisture.gasMeterGaugePressure);

  if ([beforeW, afterW, beforeV, afterV, inTemp, outTemp, gaugeRaw].some(isNaN)) return "";

  const waterG = afterW - beforeW;              // H50
  const meterVol = afterV - beforeV;            // H58
  const avgTempC = (inTemp + outTemp) / 2;      // H53

  if (waterG <= 0) return "0.00";
  if (meterVol <= 0) return "";

  // (22.4/18)*H50 : 물(g) -> 표준상태 수증기 부피(L)
  const waterVolStp = (22.4 / 18) * waterG;

  // H20이 hPa라면 mmHg로 변환: (760/1013.25)
  const atmHpa = parseFloat(atmosphericPressureHpa);
  if (isNaN(atmHpa)) return "";
  const atmMmHg = atmHpa * 760 / 1013.25;

  // O55 단위 처리: mmH2O면 mmHg로 변환, mmHg면 그대로
  const gaugeMmHg = gaugePressureMmH2O ? mmH2OToMmHg(gaugeRaw) : gaugeRaw;

  // H58*(273/(273+H53))*((H20+O55)/760)
  const dryVolStp =
    meterVol *
    (273 / (273 + avgTempC)) *
    ((atmMmHg + gaugeMmHg) / 760);

  const ratio = (waterVolStp / (dryVolStp + waterVolStp)) * 100;
  return ratio.toFixed(2);
};

export const moistureCalculator = (fieldData: FieldDataEditForm) => {
  const m = fieldData.moisture;
  const atm = fieldData.weather.pressure;

  return {
    weightDiff: calcMoistureWeightDiff(m),
    tempAvg: caclMoistureGasTemperatureAvg(m),
    dryVolumeDiff: calcMoisturDryVolumeDiff(m),
    pressureToMmHg: convertMoistureGaugePressureToMmHg(m),
    pressureToInchH2O: convertMoistureGaugePressureToInchH2O(m),
    moistureRatio: calcMoistureRatio(m, atm)
  };
};