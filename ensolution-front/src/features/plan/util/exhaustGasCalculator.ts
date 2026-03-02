import type { FieldDataEditForm, ExhaustGasEditForm, PreInfoEditForm } from "@plan/model";
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
  return (100 - Number(o2ConcentrationAvg(exhaustGas)) - Number(co2ConcentrationAvg(exhaustGas)) - Number(coConcentrationAvg((exhaustGas)))).toFixed(1);
}

const calcOxygenCorrectionFactor = (exhaustGas: ExhaustGasEditForm, standardOxygen: string) => {
  if (!standardOxygen) {
    return "-"; // 보정계수 없음
  }

  const std = Number(standardOxygen);
  const o2AvgRaw = o2ConcentrationAvg(exhaustGas);
  const o2 = Number(o2AvgRaw);

  if (!Number.isFinite(std) || !Number.isFinite(o2)) return "-";

  const numerator = 21 - std;
  const denominator = 21 - o2;

  if (denominator === 0) return "-";
  if (o2 >= 21) return "-";

  const factor = numerator / denominator;

  if (!Number.isFinite(factor) || factor <= 0) return "-";

  return factor.toFixed(1);
}

const calcGasDensity = (
  o2Avg: string,
  co2Avg: string,
  n2Avg: string,
  moistureRatio: string
) => {
  const o2 = (32 / 22.4 * Number(o2Avg)) / 100;
  const co2 = (44 / 22.4 * Number(co2Avg)) / 100;
  const n2 = (28 / 22.4 * Number(n2Avg)) / 100;

  const dryGasDensity = o2 + co2 + n2;

  const moisture = (18 / 22.4 * Number(moistureRatio)) / 100;

  return ((dryGasDensity * (100 - Number(moistureRatio)) / 100) + moisture).toFixed(2);

}

export const exhaustGasCalculator = (fieldData: FieldDataEditForm, preInfo: PreInfoEditForm, moistureRatio: string) => {
  const e = fieldData.exhaustGas;
  const stdO2 = preInfo.standardOxygen;
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
    oxygenCorrectionFactor: calcOxygenCorrectionFactor(e, stdO2),
    gasDensity: calcGasDensity(
      o2Avg,
      co2Avg,
      n2Avg,
      moistureRatio
    )
  };
};