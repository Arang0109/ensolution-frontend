import { axiosPrivate } from "@/common/api";
import type { ApiResponseMessage } from "@/common/model";
import type { StackResponse, StackDetailResponse, StackRegisterRequest, StackUpdateRequest } from "@stack/model";

export const registerStack = async (
  data: StackRegisterRequest
): Promise<ApiResponseMessage<void>> => {
  const res = await axiosPrivate.post("/stacks", data);
  return res.data;
}

export const getStacks = async (): Promise<ApiResponseMessage<StackResponse[]>> => {
  const res = await axiosPrivate.get("/stacks");
  return res.data;
}

export const getStack = async (
  stackId: number
): Promise<ApiResponseMessage<StackDetailResponse>> => {
  const res = await axiosPrivate.get(`/stacks/${stackId}`);
  return res.data;
}

export const patchStack = async (
  stackId: number,
  data: StackUpdateRequest
): Promise<ApiResponseMessage<StackResponse>> => {
  const res = await axiosPrivate.patch(`/stacks/${stackId}`, data);
  return res.data;
}

export const deleteStack = async (
  stackId: number
): Promise<ApiResponseMessage<void>> => {
  const res = await axiosPrivate.delete(`/stacks/${stackId}`);
  return res.data;
}