import { axiosPrivate } from "@/shared/api";
import type { ApiResponseMessage } from "@/shared/model";
import type { UserResponse, UserUpdateRequest } from "@/entities/user/model";
import type { TeamResponse } from "@/entities/agency/team/model";

export const getProfile = async (): Promise<ApiResponseMessage<UserResponse>> => {
  const res = await axiosPrivate.get("/users/me");
  return res.data;
}

export const patchProfile = async (data: UserUpdateRequest): Promise<ApiResponseMessage<UserResponse>> => {
  const res = await axiosPrivate.patch("/users/me", data);
  return res.data;
}

export const deleteProfile = async (): Promise<ApiResponseMessage<void>> => {
  const res = await axiosPrivate.delete("/users/me");
  return res.data;
}

export const getTeams = async (): Promise<ApiResponseMessage<TeamResponse[]>> => {
  const res = await axiosPrivate.get("/teams");
  return res.data;
}

export const getUsers = async (): Promise<ApiResponseMessage<UserResponse[]>> => {
  const res = await axiosPrivate.get("/users/all");
  return res.data;
}