import type { FieldDataEditForm, MoistureEditForm } from "@plan/model";

const toNumber = (v?: string) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

const calcMoistureWeightDiff = (moisture: MoistureEditForm) => {
  const before = toNumber(moisture.beforeWeight);
  const after = toNumber(moisture.afterWeight);

  if (before === null || after === null) return null;

  return Number((after - before).toFixed(2));
};

const caclMoistureGasTemperatureAvg = (moisture: MoistureEditForm) => {
  const inTemp = toNumber(moisture.inTemperature);
  const outTemp = toNumber(moisture.outTemperature);

  if (inTemp === null || outTemp === null) return null;

  return Number(((inTemp + outTemp) / 2).toFixed(1));
};

const calcMoisturDryVolumeDiff = (moisture: MoistureEditForm) => {
  const before = toNumber(moisture.beforeDryVolume);
  const after = toNumber(moisture.afterDryVolume);
  
  if (before === null || after === null) return null;

  return Number((after - before).toFixed(2));
};

const convertMoistureGaugePressureToMmHg = (moisture: MoistureEditForm) => {
  const pressure = toNumber(moisture.gasMeterGaugePressure);
  if (pressure === null) return null;

  return Number((pressure * 760 / 10332).toFixed(3));
};

const convertMoistureGaugePressureToInchH2O = (moisture: MoistureEditForm) => {
  const pressure = toNumber(moisture.gasMeterGaugePressure);
  if (pressure === null) return null;

  return Number((pressure / 25.4).toFixed(1));
};

const mmH2OToMmHg = (mmH2O: number) => mmH2O / 13.6;

const calcMoistureRatio = (
  moisture: MoistureEditForm,
  atmosphericPressure: number,
  gaugePressureMmH2O: boolean = true  // O55가 mmH2O면 true, mmHg면 false
) => {
  const beforeW = toNumber(moisture.beforeWeight);
  const afterW = toNumber(moisture.afterWeight);
  const beforeV = toNumber(moisture.beforeDryVolume);
  const afterV = toNumber(moisture.afterDryVolume);
  const inTemp = toNumber(moisture.inTemperature);
  const outTemp = toNumber(moisture.outTemperature);
  const gaugeRaw = toNumber(moisture.gasMeterGaugePressure);

  if (
    beforeW === null ||
    afterW === null ||
    beforeV === null ||
    afterV === null ||
    inTemp === null ||
    outTemp === null ||
    gaugeRaw === null
  ) {
    return null;
  }

  const waterG = afterW - beforeW;              // H50
  const meterVol = afterV - beforeV;            // H58
  const avgTempC = (inTemp + outTemp) / 2;      // H53

  if (waterG <= 0 || meterVol <= 0) return 0;

  // (22.4/18)*H50 : 물(g) -> 표준상태 수증기 부피(L)
  const waterVolStp = (22.4 / 18) * waterG;

  // O55 단위 처리: mmH2O면 mmHg로 변환, mmHg면 그대로
  const gaugeMmHg = gaugePressureMmH2O ? mmH2OToMmHg(gaugeRaw) : gaugeRaw;

  // H58*(273/(273+H53))*((H20+O55)/760)
  const dryVolStp =
    meterVol *
    (273 / (273 + avgTempC)) *
    ((atmosphericPressure + gaugeMmHg) / 760);

  const ratio = (waterVolStp / (dryVolStp + waterVolStp)) * 100;

  return Number(ratio.toFixed(2));
};

export const moistureCalculator = (fieldData: FieldDataEditForm, atmosphericPressure: number) => {
  const moisture = fieldData.moisture;

  return {
    weightDiff: calcMoistureWeightDiff(moisture),
    tempAvg: caclMoistureGasTemperatureAvg(moisture),
    dryVolumeDiff: calcMoisturDryVolumeDiff(moisture),
    pressureToMmHg: convertMoistureGaugePressureToMmHg(moisture),
    pressureToInchH2O: convertMoistureGaugePressureToInchH2O(moisture),
    moistureRatio: calcMoistureRatio(moisture, atmosphericPressure)
  };
};