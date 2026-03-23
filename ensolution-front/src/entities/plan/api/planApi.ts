import { axiosPrivate } from "@/shared/api";
import type { ApiResponseMessage } from "@/shared/model";

import type {
  PlanResponse, PlanRegisterRequest, PlanStatusUpdateRequest,
  PlanTableResponse, PlanDetailResponse, MeasurementItemsUpdateRequest } from "@/entities/plan/model"

export const registerPlan = async (
  data: PlanRegisterRequest
): Promise<ApiResponseMessage<PlanResponse>> => {
  const res = await axiosPrivate.post("/plans", data);
  return res.data;
}

export const fetchPlans = async (): Promise<ApiResponseMessage<PlanTableResponse[]>> => {
  const res = await axiosPrivate.get("/plans");
  return res.data;
}

export const fetchPlan = async (
  planId: number
): Promise<ApiResponseMessage<PlanDetailResponse>> => {
  const res = await axiosPrivate.get(`/plans/${planId}`);
  return res.data;
}

export const updateMeasurement = async (
  planId: number,
  data: MeasurementItemsUpdateRequest[]
): Promise<ApiResponseMessage<void>> => {
  const res = await axiosPrivate.post(`/plans/${planId}/measurements`, data);
  return res.data;
}

export const patchPlanStatus = async (
  planId: number,
  data: PlanStatusUpdateRequest
): Promise<ApiResponseMessage<PlanResponse>> => {
  const res = await axiosPrivate.patch(`/plans/${planId}/status`, data);
  return res.data;
}

export const deletePlan = async (
  planId: number
): Promise<ApiResponseMessage<void>> => {
  const res = await axiosPrivate.delete(`/plans/${planId}`);
  return res.data;
}