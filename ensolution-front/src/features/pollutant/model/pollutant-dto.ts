import type { Method, Phase } from "@pollutant/model";

export interface PollutantResponse {
  id: number;
  nameKr: string;
  nameEn: string;
  method: Method;
  phase: Phase;
  equipmentName: string;
  testMethodName: string;
  samplingTime: string;
  samplingVolume: string;
}

export interface PollutantRegisterRequest {
  nameKr: string;
  nameEn: string;
  method: Method;
  phase: Phase;
  equipmentName: string;
  testMethodName: string;
  samplingTime: string;
  samplingVolume: string;
}

export interface PollutantUpdateRequest {
  nameKr: string;
  nameEn: string;
  method: Method;
  phase: Phase;
  equipmentName: string;
  testMethodName: string;
  samplingTime: string;
  samplingVolume: string;
}