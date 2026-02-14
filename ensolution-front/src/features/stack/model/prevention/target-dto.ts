export interface TargetResponse {
  id: number;
  preventionId: number;
  targetSubstance: string;
  removalEfficiency: string;
  createdAt: string;
  modifiedAt: string;
}

export interface TargetRegisterRequest {
  preventionId: number;
  targetSubstance: string;
  removalEfficiency: string;
}

export interface TargetUpdateRequest {
  targetSubstance: string;
  removalEfficiency: string;
}

export interface TargetForm {
  targetSubstance: string;
  removalEfficiency: string;
}