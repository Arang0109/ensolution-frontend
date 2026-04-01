import type { MoistureEditForm } from "@/entities/plan/model";
import { calculator } from "@shared/lib";

const convertToSTP = (value: number, temperature: number, pressure: number): number => {
  return value * (273 / (273 + temperature)) * (pressure / 760);
}

const calcWaterVolumeStp = (waterG: number) =>
  (22.4 / 18) * waterG;

const calcMoistureRatioPure = (
  waterVolStp: number,
  dryVolStp: number
) =>
  (waterVolStp / (dryVolStp + waterVolStp)) * 100;

export const moistureCalculator = (
  moisture: MoistureEditForm,
  atmosphericPressure: number | null,
  gaugePressureMmHg: number | null,
) => {
  const {
    safeCalc, toNumber, round, calcDelta, calcAverage
  } = calculator;

  const m = moisture;

  const beforeW = toNumber(m.beforeWeight);
  const afterW = toNumber(m.afterWeight);
  const beforeV = toNumber(m.beforeDryVolume);
  const afterV = toNumber(m.afterDryVolume);
  const inTemp = toNumber(m.inTemperature);
  const outTemp = toNumber(m.outTemperature);

  const ma = safeCalc([beforeW, afterW], () =>
    round(calcDelta(beforeW!, afterW!), 2)
  );

  const Tm = safeCalc([inTemp, outTemp], () =>
    round(calcAverage([inTemp!, outTemp!]), 1)
  );

  const Vm = safeCalc([beforeV, afterV], () =>
    round(calcDelta(beforeV!, afterV!), 2)
  );

  const waterVolStp = safeCalc([ma], () =>
    calcWaterVolumeStp(ma!)
  );

  const Pm = safeCalc([atmosphericPressure, gaugePressureMmHg], () =>
    atmosphericPressure! + gaugePressureMmHg!
  );

  const dryVolStp = safeCalc([Vm, Tm, Pm], () => 
    convertToSTP(Vm!, Tm!, Pm!)
  );

  // 공정시험법 상 소수점 1자리까지 표기한다. (수정 必)
  const Xw = safeCalc([waterVolStp, dryVolStp], () =>
    round(calcMoistureRatioPure(waterVolStp!, dryVolStp!), 2)
  );

  return {
    ma,
    Tm_g: Tm,
    Vm_g: Vm,

    Xw,
  };
};