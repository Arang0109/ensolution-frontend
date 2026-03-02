import type { Cycle } from "@stack/model";

export interface StackMeasurementDocResponse {
  stackMeasurementId: number;
  pollutantId: number;
  pollutantNameKr: string;
  pollutantNameEn: string;
  method: string;
  equipmentName: string;
  testMethodName: string;
  samplingTime: string;
  samplingVolume: string;
  startTime: string;
  endTime: string;
  cycle: Cycle;
  allowance: string;
}