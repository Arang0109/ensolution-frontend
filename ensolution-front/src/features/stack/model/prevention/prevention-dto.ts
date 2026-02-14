import type { FacilityResponse, TargetResponse, FacilityRegisterRequest, TargetRegisterRequest } from '@stack/model';

export interface PreventionResponse {
  id: number;
  stackId: number;
  name: string;
  remark: string;
  createdAt: string;
  modifiedAt: string;
}

export interface PreventionRegisterRequest {
  prevention: PreventionRegister;
  facilities: Omit<FacilityRegisterRequest, 'preventionId'>[];
  targets: Omit<TargetRegisterRequest, 'preventionId'>[];
}

export interface PreventionUpdate {
  name: string;
  remark: string;
}

export interface PreventionUpdateRequest {
  prevention: PreventionUpdate;
  facilities: Omit<FacilityRegisterRequest, 'preventionId'>[];
  targets: Omit<TargetRegisterRequest, 'preventionId'>[];
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