import type { ExhaustGasEditForm } from "@/entities/plan/model";
import { calculator } from "@shared/lib";


const calcDryMolecularWeight = (
  o2: number,
  co2: number,
  co: number,
  n2: number,
) => (0.32 * o2) + (0.44 * co2) + (0.28 * co) + (0.28 * n2)

const calcMolecularWeight = (
  Md: number,
  Xw: number,
) => {
  const B = Xw / 100;

  return Md * (1 - B) + (18 * B)
}

const calcNitrogenAvg = (
  o2: number,
  co2: number,
  co: number
) => {
  return 100 - o2 - co2 - co;
};

const calcOxygenCorrectionFactor = (
  standardOxygen: number,
  o2: number

) => {
  return (21 - standardOxygen) / (21 - o2);
};

export const gasCalculator = (
  exhaustGas: ExhaustGasEditForm,
  standardOxygen: number | null,
  moistureRatio: number | null,
) => {
  const { safeCalc, toNumbers, calcAverage, round } = calculator;

  const e = exhaustGas;

  const o2 = toNumbers(e.o2Concentration);
  const co2 = toNumbers(e.co2Concentration);
  const co = toNumbers(e.coConcentration);
  const nox = toNumbers(e.noxConcentration);
  const sox = toNumbers(e.soxConcentration);

  const o2Avg = round(calcAverage(o2 ?? [0]), 1);
  const co2Avg = round(calcAverage(co2 ?? [0]), 1);
  const coAvg = round(calcAverage(co ?? [0]), 1);
  const n2Avg = round(calcNitrogenAvg(o2Avg, co2Avg, coAvg), 1);
  
  const noxAvg = safeCalc([nox], () =>
    round(calcAverage(nox!), 1)
  );
  const soxAvg = safeCalc([sox], () =>
    round(calcAverage(sox!), 1)
  );

  const oxygenCorrectionFactor = safeCalc([standardOxygen, o2Avg], () => 
      round(calcOxygenCorrectionFactor(standardOxygen!, o2Avg!), 2)
    );

  const Md = safeCalc([o2Avg, co2Avg, coAvg, n2Avg, moistureRatio], () => 
    round(calcDryMolecularWeight(o2Avg!, co2Avg!, coAvg!, n2Avg!), 3)
  );

  const Mw = safeCalc([Md, moistureRatio], () => 
    round(calcMolecularWeight(Md!, moistureRatio!), 3)
  );

  return {
    o2ConcentrationAvg: o2Avg,
    co2ConcentrationAvg: co2Avg,
    coConcentrationAvg: coAvg,
    n2ConcentrationAvg: n2Avg,
    noxConcentrationAvg: noxAvg,
    soxConcentrationAvg: soxAvg,
    
    oxygenCorrectionFactor: oxygenCorrectionFactor,
    Md,
    Mw
  };
};