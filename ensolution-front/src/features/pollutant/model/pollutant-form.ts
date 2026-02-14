import type { Phase, Method } from "@pollutant/model";

export const DEFAULT_PHASE: Phase = 'PARTICLE';
export const DEFAULT_METHOD: Method = 'FIELD_MEASUREMENT';

export interface PollutantCreateForm {
  nameKr: string;
  nameEn: string;
  method: Method;
  phase: Phase;
  equipmentName: string;
  testMethodName: string;
  samplingTime: string;
  samplingVolume: string;
}

export const getDefaultPollutantCreateForm = (): PollutantCreateForm => ({
  nameKr: "",
  nameEn: "",
  method: DEFAULT_METHOD,
  phase: DEFAULT_PHASE,
  equipmentName: "",
  testMethodName: "",
  samplingTime: "",
  samplingVolume: "",
})

export interface PollutantEditForm {
  nameKr: string;
  nameEn: string;
  method: Method;
  phase: Phase;
  equipmentName: string;
  testMethodName: string;
  samplingTime: string;
  samplingVolume: string;
}

export const getDefaultPollutantEditForm = (): PollutantEditForm => ({
  nameKr: "",
  nameEn: "",
  method: DEFAULT_METHOD,
  phase: DEFAULT_PHASE,
  equipmentName: "",
  testMethodName: "",
  samplingTime: "",
  samplingVolume: "",
})