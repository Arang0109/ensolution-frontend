import { axiosPrivate } from "@/shared/api";

import type { ApiResponseMessage } from "@/shared/types";
import type { PollutantResponse, PollutantRegisterRequest, PollutantUpdateRequest } from "@/features/pollutant/model/pollutant-types";

export const registerPollutant = async (
  data: PollutantRegisterRequest
): Promise<ApiResponseMessage<PollutantResponse>> => {
  const res = await axiosPrivate.post("/pollutants", data);
  return res.data;
}

export const getPollutants = async (): Promise<ApiResponseMessage<PollutantResponse[]>> => {
  const res = await axiosPrivate.get("/pollutants");
  return res.data;
}

export const getPollutant = async (pollutantId: number): Promise<ApiResponseMessage<PollutantResponse>> => {
  const res = await axiosPrivate.get(`/pollutants/${pollutantId}`);
  return res.data;
}

export const patchPollutant = async (
  pollutantId: number,
  data: PollutantUpdateRequest
): Promise<ApiResponseMessage<PollutantResponse>> => {
  const res = await axiosPrivate.patch(`/pollutants/${pollutantId}`, data);
  return res.data;
}

export const deletePollutant = async (
  pollutantId: number
): Promise<ApiResponseMessage<void>> => {
  const res = await axiosPrivate.delete(`/pollutants/${pollutantId}`);
  return res.data;
}