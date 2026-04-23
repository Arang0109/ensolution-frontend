import { axiosPrivate } from "@/shared/api";
import type { ApiResponseMessage } from "@/shared/model";
import type { WorkplaceResponse, WorkplaceDetailResponse, WorkplaceRegisterRequest, WorkplaceUpdateRequest } from "@entities/workplace/model";

export const registerWorkplace = async (
  data: WorkplaceRegisterRequest
): Promise<ApiResponseMessage<void>> => {
  const res = await axiosPrivate.post("/workplaces", data);
  return res.data;
}

export const getWorkplaces = async (): Promise<ApiResponseMessage<WorkplaceResponse[]>> => {
  const res = await axiosPrivate.get("/workplaces");
  return res.data;
}

export const getWorkplace = async (
  workplaceId: number
): Promise<ApiResponseMessage<WorkplaceDetailResponse>> => {
  const res = await axiosPrivate.get(`/workplaces/${workplaceId}`);
  return res.data;
}

export const patchWorkplace = async (
  workplaceId: number,
  data: WorkplaceUpdateRequest
): Promise<ApiResponseMessage<WorkplaceResponse>> => {
  const res = await axiosPrivate.patch(`/workplaces/${workplaceId}`, data);
  return res.data;
}

export const deleteWorkplace = async (
  workplaceId: number
): Promise<ApiResponseMessage<void>> => {
  const res = await axiosPrivate.delete(`/workplaces/${workplaceId}`);
  return res.data;
}