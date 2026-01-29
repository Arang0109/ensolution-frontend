import type { FacilityResponse, TargetResponse, FacilityRegisterRequest, TargetRegisterRequest } from '@stack/model';

export interface PreventionResponse {
  id: number;
  stackId: number;
  name: string;
  remark: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface PreventionRegisterRequest {
  prevention: PreventionRegister;
  facilities: Omit<FacilityRegisterRequest, 'preventionId'>[];
  targets: Omit<TargetRegisterRequest, 'preventionId'>[];
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

export interface PreventionRegister {
  name: string;
  stackId: number;
  remark: string;
}