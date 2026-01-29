export interface TargetResponse {
  id: number;
  preventionId: number;
  targetSubstance: string;
  removalEfficiency: number | null;
  createdAt: Date;
  modifiedAt: Date;
}

export interface TargetRegisterRequest {
  preventionId: number;
  targetSubstance: string;
  removalEfficiency: number | null;
}

export interface TargetUpdateRequest {
  targetSubstance: string;
  removalEfficiency: number | null;
}

export interface TargetForm {
  targetSubstance: string;
  removalEfficiency: number | null;
}