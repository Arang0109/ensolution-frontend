import { axiosPrivate } from "@/common/api";
import type { ApiResponseMessage } from "@/common/model";
import type {
  VehicleResponse, VehicleRegisterRequest, VehicleUpdateRequest,
  TeamResponse, TeamDetailResponse, TeamRegisterRequest, TeamUpdateRequest
} from "@agency/model/agency.types";

export const registerVehicle = async (
  data: VehicleRegisterRequest
): Promise<ApiResponseMessage<VehicleResponse>> => {
  const res = await axiosPrivate.post("/vehicles", data);
  return res.data;
}

export const getVehicles = async (): Promise<ApiResponseMessage<VehicleResponse[]>> => {
  const res = await axiosPrivate.get("/vehicles");
  return res.data;
}

export const getVehicle = async (
  vehicleId: number
): Promise<ApiResponseMessage<VehicleResponse>> => {
  const res = await axiosPrivate.get(`/vehicles/${vehicleId}`);
  return res.data;
}

export const patchVehicle = async (
  vehicleId: number,
  data: VehicleUpdateRequest
): Promise<ApiResponseMessage<VehicleResponse>> => {
  const res = await axiosPrivate.patch(`/vehicles/${vehicleId}`, data);
  return res.data;
}

export const deleteVehicle = async (
  vehicleId: number
): Promise<ApiResponseMessage<void>> => {
  const res = await axiosPrivate.delete(`/vehicles/${vehicleId}`);
  return res.data;
}

/////

export const registerTeam = async (
  data: TeamRegisterRequest
): Promise<ApiResponseMessage<TeamResponse>> => {
  const res = await axiosPrivate.post("/teams", data);
  return res.data;
}

export const getTeams = async (): Promise<ApiResponseMessage<TeamResponse[]>> => {
  const res = await axiosPrivate.get("/teams");
  return res.data;
}

export const getTeam = async (
  teamId: number
): Promise<ApiResponseMessage<TeamDetailResponse>> => {
  const res = await axiosPrivate.get(`/teams/${teamId}`);
  return res.data;
}

export const patchTeam = async (
  teamId: number,
  data: TeamUpdateRequest
): Promise<ApiResponseMessage<TeamResponse>> => {
  const res = await axiosPrivate.patch(`/teams/${teamId}`, data);
  return res.data;
}

export const deleteTeam = async (
  teamId: number
): Promise<ApiResponseMessage<void>> => {
  const res = await axiosPrivate.delete(`/teams/${teamId}`);
  return res.data;
}