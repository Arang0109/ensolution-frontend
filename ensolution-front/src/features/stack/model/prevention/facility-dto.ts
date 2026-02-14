export interface FacilityResponse {
  id: number;
  preventionId: number;
  name: string;
  fuelUsage: string;
  itemOutput: string;
  fuelInput: string;
  fuelType: string;
  remark: string;
  createdAt: string;
  modifiedAt: string;
}

export interface FacilityRegisterRequest {
  name: string;
  preventionId: number;
  fuelUsage: string;
  itemOutput: string;
  fuelInput: string;
  fuelType: string;
  remark: string;
}

export interface FacilityUpdateRequest {
  name: string;
  fuelUsage: string;
  itemOutput: string;
  fuelInput: string;
  fuelType: string;
  remark: string;
}

export interface FacilityForm {
  name: string;
  fuelUsage: string;
  itemOutput: string;
  fuelInput: string;
  fuelType: string;
  remark: string;
}