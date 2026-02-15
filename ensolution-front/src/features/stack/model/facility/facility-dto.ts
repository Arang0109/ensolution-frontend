export interface FacilityResponse {
  id: number;
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
  fuelUsage: string;
  itemOutput: string;
  fuelInput: string;
  fuelType: string;
  remark: string;
}

export interface FacilityUpdateRequest {
  id: number | null;
  name: string;
  fuelUsage: string;
  itemOutput: string;
  fuelInput: string;
  fuelType: string;
  remark: string;
}