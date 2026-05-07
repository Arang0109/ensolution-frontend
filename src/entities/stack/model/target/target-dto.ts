export interface TargetResponse {
  id: number;
  preventionId: number;
  targetSubstance: string;
  removalEfficiency: string;
  createdAt: string;
  modifiedAt: string;
}

export interface TargetRegisterRequest {
  targetSubstance: string;
  removalEfficiency: string;
}

export interface TargetUpdateRequest {
  id: number | null;
  targetSubstance: string;
  removalEfficiency: string;
}