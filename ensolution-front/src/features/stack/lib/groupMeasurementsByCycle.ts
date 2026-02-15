import type { StackMeasurementResponse } from "@stack/model";
import type { Cycle } from "@/shared/model";

export interface MeasurementsByCycle {
  cycle: Cycle;
  measurements: StackMeasurementResponse[];
}

const cycleOrder: Cycle[] = [
  "MONTHLY_2",
  "MONTHLY_1",
  "BIMONTHLY",
  "QUARTERLY",
  "SEMI_ANNUAL",
  "ANNUAL",
];

export const groupMeasurementsByCycle = (
  measurements: StackMeasurementResponse[]
): MeasurementsByCycle[] => {
  const grouped = measurements.reduce((acc, measurement) => {
    const cycle = measurement.cycle;
    if (!acc[cycle]) acc[cycle] = [];
    acc[cycle].push(measurement);
    return acc;
  }, {} as Record<Cycle, StackMeasurementResponse[]>);

  return cycleOrder
    .filter(cycle => grouped[cycle])
    .map(cycle => ({
      cycle,
      measurements: grouped[cycle],
    }));
};