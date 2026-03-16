import type { Cycle } from "@stack/model";

export interface MeasurementItemDocResponse {
  stackMeasurementId: number;
  pollutantId: number;
  pollutantNameKr: string;
  pollutantNameEn: string;
  method: string;
  testEquipment: string;
  testMethod: string;
  samplingTime: string;
  samplingVolume: string;
  cycle: Cycle;
  allowance: string;
  
  startTime: string;
  endTime: string;
}