import type { UserResponse } from "@auth/model";

export interface TeamResponse {
  id: number;
  name: string;
  vehicleNumber: string;
  particleSamplerId: string;
  gasSamplerId: string;
  pitotTubeId: string;
  nozzleId: string;
}

export interface TeamRegisterRequest {
  name: string;
  particleSamplerId: string;
  gasSamplerId: string;
  pitotTubeId: string;
  nozzleId: string;
}

export interface TeamUpdateRequest {
  name: string;
  particleSamplerId: string;
  gasSamplerId: string;
  pitotTubeId: string;
  nozzleId: string;
}

export interface TeamDetailResponse {
  team: TeamResponse;
  users: UserResponse[];
}