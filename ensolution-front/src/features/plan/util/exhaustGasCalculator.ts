import type { FieldDataEditForm, ExhaustGasEditForm, PreInfoEditForm } from "@/entities/plan/model";
import { calcArrayAvg } from "@plan/util";

const o2ConcentrationAvg = (exhaustGas: ExhaustGasEditForm) => {
  return calcArrayAvg(exhaustGas.o2Concentration);
}

const co2ConcentrationAvg = (exhaustGas: ExhaustGasEditForm) => {
  return calcArrayAvg(exhaustGas.co2Concentration);
}

const coConcentrationAvg = (exhaustGas: ExhaustGasEditForm) => {
  return calcArrayAvg(exhaustGas.coConcentration);
}

const noxConcentrationAvg = (exhaustGas: ExhaustGasEditForm) => {
  return calcArrayAvg(exhaustGas.noxConcentration);
}

const soxConcentrationAvg = (exhaustGas: ExhaustGasEditForm) => {
  return calcArrayAvg(exhaustGas.soxConcentration);
}

const calcNitrogenAvg = (exhaustGas: ExhaustGasEditForm) => {

  const o2 = o2ConcentrationAvg(exhaustGas);
  const co2 = co2ConcentrationAvg(exhaustGas);
  const co = coConcentrationAvg(exhaustGas);

  if (o2 === null || co2 === null || co === null) return null;

  return Number((100 - o2 - co2 - co).toFixed(1));
};

const calcOxygenCorrectionFactor = (
  exhaustGas: ExhaustGasEditForm,
  standardOxygen?: string
) => {

  if (!standardOxygen) return null;

  const std = Number(standardOxygen);
  const o2 = o2ConcentrationAvg(exhaustGas);

  if (!Number.isFinite(std) || o2 === null) return null;

  const denominator = 21 - o2;

  if (denominator === 0 || o2 >= 21) return null;

  const factor = (21 - std) / denominator;

  if (!Number.isFinite(factor) || factor <= 0) return null;

  return Number(factor.toFixed(1));
};

const calcGasDensity = (
  o2Avg: number | null,
  co2Avg: number | null,
  n2Avg: number | null,
  moistureRatio: number | null
) => {

  if (
    o2Avg === null ||
    co2Avg === null ||
    n2Avg === null ||
    moistureRatio === null
  ) {
    return null;
  }

  const o2 = (32 / 22.4 * o2Avg) / 100;
  const co2 = (44 / 22.4 * co2Avg) / 100;
  const n2 = (28 / 22.4 * n2Avg) / 100;

  const dryGasDensity = o2 + co2 + n2;

  const moisture = (18 / 22.4 * moistureRatio) / 100;

  const density =
    (dryGasDensity * (100 - moistureRatio) / 100) + moisture;

  return Number(density.toFixed(2));
};

export const exhaustGasCalculator = (
  fieldData: FieldDataEditForm,
  preInfo: PreInfoEditForm,
  moistureRatio: number | null
) => {

  const e = fieldData.exhaustGas;

  const o2Avg = o2ConcentrationAvg(e);
  const co2Avg = co2ConcentrationAvg(e);
  const coAvg = coConcentrationAvg(e);
  const n2Avg = calcNitrogenAvg(e);

  return {
    o2ConcentrationAvg: o2Avg,
    co2ConcentrationAvg: co2Avg,
    coConcentrationAvg: coAvg,
    n2ConcentrationAvg: n2Avg,
    noxConcentrationAvg: noxConcentrationAvg(e),
    soxConcentrationAvg: soxConcentrationAvg(e),
    oxygenCorrectionFactor: calcOxygenCorrectionFactor(e, preInfo.standardOxygen),
    gasDensity: calcGasDensity(o2Avg, co2Avg, n2Avg, moistureRatio)
  };
};