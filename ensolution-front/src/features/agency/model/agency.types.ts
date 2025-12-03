import type { UserResponse } from "@auth/model";

export interface TeamResponse {
  id: number;
  name: string;
}

export interface TeamRegisterRequest {
  name: string;
}

export interface TeamUpdateRequest {
  name: string;
}

export interface TeamDetailResponse {
  team: TeamResponse;
  users: UserResponse[];
  vehicles: VehicleResponse[];
}

export interface VehicleResponse {
  id: number;
  teamId: number;
  vehicleNumber: string;
}

export interface VehicleRegisterRequest {
  teamId: number;
  vehicleNumber: string;
}

export interface VehicleUpdateRequest {
  teamId: number;
  vehicleNumber: string;
}