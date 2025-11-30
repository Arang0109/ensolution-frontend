import type { FacilityResponse, TargetResponse } from '@stack/model';

export interface PreventionResponse {
  id: number;
  stackId: number;
  name: string;
  remark: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface PreventionRegisterRequest {
  name: string;
  stackId: number;
  remark: string;
}

export interface PreventionUpdateRequest {
  name: string;
  remark: string;
}

export interface PreventionDetailResponse {
  prevention: PreventionResponse;
  facilities: FacilityResponse[];
  targets: TargetResponse[];
}