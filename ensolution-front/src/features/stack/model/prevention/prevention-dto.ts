import type { 
  FacilityResponse, FacilityRegisterRequest, FacilityUpdateRequest, 
  TargetResponse, TargetRegisterRequest, TargetUpdateRequest
} from '@stack/model';

export interface PreventionResponse {
  id: number;
  stackId: number;
  name: string;
  remark: string;
  createdAt: string;
  modifiedAt: string;
}

export interface PreventionRegister {
  name: string;
  stackId: number;
  remark: string;
}

export interface PreventionUpdate {
  name: string;
  remark: string;
}

export interface PreventionRegisterRequest {
  prevention: PreventionRegister;
  facilities: FacilityRegisterRequest[];
  targets: TargetRegisterRequest[];
}

export interface PreventionUpdateRequest {
  prevention: PreventionUpdate;
  facilities: FacilityUpdateRequest[];
  targets: TargetUpdateRequest[];
}

export interface PreventionDetailResponse {
  prevention: PreventionResponse;
  facilities: FacilityResponse[];
  targets: TargetResponse[];
}