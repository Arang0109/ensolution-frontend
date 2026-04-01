import type { Cycle } from "@/entities/stack/model";

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
  suctionQuantity: string;
  gasMeterGaugePressure: string;
  inTemperature: string;
  outTemperature: string;
  beforeVolume: string;
  afterVolume: string;
  blankSampleNumber: string;
  sampleNumber: string;
  
  startTime: string;
  endTime: string;
}