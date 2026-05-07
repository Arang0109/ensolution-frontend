import type { Cycle } from "@/entities/stack/model";

export const DEFAULT_CYCLE: Cycle = "MONTHLY_1";

export interface StackMeasurementCreateForm {
  stackId: number;
  pollutantId: number | null;
  cycle: Cycle;
  allowance: string;
}

export const getDefaultStackMeasurementCreateForm = (stackId: number): StackMeasurementCreateForm => ({
  stackId: stackId,
  pollutantId: null,
  cycle: DEFAULT_CYCLE,
  allowance: "",
});

export interface StackMeasurementUpdateForm {
  cycle: Cycle;
  allowance: string;
}

export const getDefaultStackMeasurementUpdateForm = ():StackMeasurementUpdateForm => ({
  cycle: DEFAULT_CYCLE,
  allowance: "",
});