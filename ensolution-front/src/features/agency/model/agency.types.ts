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
}