export interface TargetResponse {
  id: number;
  preventionId: number;
  targetSubstance: string;
  removalEfficiency: number;
  createdAt: Date;
  modifiedAt: Date;
}

export interface TargetRegisterRequest {
  preventionId: number;
  targetSubstance: string;
  removalEfficiency: number;
}

export interface TargetUpdateRequest {
  targetSubstance: string;
  removalEfficiency: number;
}

export interface TargetForm {
  targetSubstance: string;
  removalEfficiency: number;
}