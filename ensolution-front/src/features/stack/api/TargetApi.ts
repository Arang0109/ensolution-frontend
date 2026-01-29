import { axiosPrivate } from "@/shared/api";
import type { ApiResponseMessage } from "@/shared/types";
import type { 
  TargetRegisterRequest, TargetUpdateRequest, TargetResponse
} from "@stack/model";

export const registerTarget = async (
  data: TargetRegisterRequest
): Promise<ApiResponseMessage<void>> => {
  const res = await axiosPrivate.post("/targets", data);
  return res.data;
}

export const patchTarget = async (
  targetId: number,
  data: TargetUpdateRequest
): Promise<ApiResponseMessage<TargetResponse>> => {
  const res = await axiosPrivate.patch(`/targets/${targetId}`, data);
  return res.data;
}

export const deleteTarget = async (
  targetId: number
): Promise<ApiResponseMessage<void>> => {
  const res = await axiosPrivate.delete(`/targets/${targetId}`);
  return res.data;
}