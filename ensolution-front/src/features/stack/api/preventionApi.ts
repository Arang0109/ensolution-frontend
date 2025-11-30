import { axiosPrivate } from "@/common/api";
import type { ApiResponseMessage } from "@/common/model";
import type { 
  PreventionResponse, PreventionDetailResponse, PreventionRegisterRequest, PreventionUpdateRequest
} from "@stack/model";

export const registerPrevention = async (
  data: PreventionRegisterRequest
): Promise<ApiResponseMessage<void>> => {
  const res = await axiosPrivate.post("/preventions", data);
  return res.data;
}

export const getPrevention = async (
  preventionId: number
): Promise<ApiResponseMessage<PreventionDetailResponse>> => {
  const res = await axiosPrivate.get(`/preventions/${preventionId}`);
  return res.data;
}

export const patchPrevention = async (
  preventionId: number,
  data: PreventionUpdateRequest
): Promise<ApiResponseMessage<PreventionResponse>> => {
  const res = await axiosPrivate.patch(`/preventions/${preventionId}`, data);
  return res.data;
}

export const deletePrevention = async (
  preventionId: number
): Promise<ApiResponseMessage<void>> => {
  const res = await axiosPrivate.delete(`/preventions/${preventionId}`);
  return res.data;
}