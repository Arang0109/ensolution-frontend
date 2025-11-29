import { axiosPrivate } from "@/common/api";
import type { ApiResponseMessage } from "@/common/model";
import type { UserResponse, UserUpdateRequest, Team } from "@auth/model";

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

export const getTeams = async (): Promise<ApiResponseMessage<Team[]>> => {
  const res = await axiosPrivate.get("/teams");
  return res.data;
}