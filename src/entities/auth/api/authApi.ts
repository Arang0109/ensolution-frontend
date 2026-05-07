import { axiosPrivate, axiosPublic } from "@shared/api";
import type { ApiResponseMessage } from "@/shared/model";
import type { LoginRequest, LoginResponse } from "@entities/auth/model";

export const loginApi = async (data: LoginRequest): Promise<ApiResponseMessage<LoginResponse>> => {
  const res = await axiosPublic.post<ApiResponseMessage<LoginResponse>>("/auth/login", data);
  return res.data;
}

export const logoutApi = async ():Promise<ApiResponseMessage<void>> => {
  const res = await axiosPrivate.post("/auth/logout");
  return res.data;
}