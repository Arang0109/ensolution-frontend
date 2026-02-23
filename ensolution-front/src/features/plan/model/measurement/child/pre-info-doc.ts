import type { Cycle } from "@stack/model";

export interface PreInfoDocResponse {
  referenceNumber: string;
  measureDate: string;
  measurementField: string;
  measurementType: string;
  teamId: number;
  teamName: string;
  vehicleNumber: string;
  mentor: string;
  mentee: string;

  simplifiedMeasurement: boolean;
  measurementItems: StackMeasurementDocResponse[];
}

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
  cycle: Cycle;
  allowance: string;
}