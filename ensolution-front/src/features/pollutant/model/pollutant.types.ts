export interface PollutantResponse {
  id: number;
  nameKr: string;
  nameEn: string;
  method: string;
  phase: string;
  equipmentName: string;
  testMethodName: string;
  samplingTime: number;
  samplingVolume: string;
}

export interface PollutantRegisterRequest {
  nameKr: string;
  nameEn: string;
  method: string;
  phase: string;
  equipmentName: string;
  testMethodName: string;
  samplingTime: number;
  samplingVolume: string;
}

export interface PollutantUpdateRequest {
  nameKr: string;
  nameEn: string;
  method: string;
  phase: string;
  equipmentName: string;
  testMethodName: string;
  samplingTime: number;
  samplingVolume: string;
}