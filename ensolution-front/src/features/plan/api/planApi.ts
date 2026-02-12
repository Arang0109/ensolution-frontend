import { axiosPrivate } from "@/shared/api";
import type { ApiResponseMessage } from "@/shared/model";

import type {
  PlanResponse, PlanRegisterRequest, PlanStatusUpdateRequest,
  PlanUpdateRequest, PlanTableView, PlanDetailResponse, PlanPollutant } from "@plan/model"

export const registerPlan = async (
  data: PlanRegisterRequest
): Promise<ApiResponseMessage<PlanResponse>> => {
  const res = await axiosPrivate.post("/plans", data);
  return res.data;
}

export const registerMeasurements = async (
  planId: number,
  data: PlanPollutant[]
): Promise<ApiResponseMessage<void>> => {
  const res = await axiosPrivate.post(`/plans/${planId}/measurements`, data);
  return res.data;
}

export const getPlans = async (): Promise<ApiResponseMessage<PlanTableView[]>> => {
  const res = await axiosPrivate.get("/plans");
  return res.data;
}

export const getPlan = async (
  planId: number
): Promise<ApiResponseMessage<PlanDetailResponse>> => {
  const res = await axiosPrivate.get(`/plans/${planId}`);
  return res.data;
}

export const patchPlan = async (
  planId: number,
  data: PlanUpdateRequest
): Promise<ApiResponseMessage<PlanResponse>> => {
  const res = await axiosPrivate.patch(`/plans/${planId}`, data);
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

export const deleteMeasurement = async (
  planId: number,
  measurementId: number
): Promise<ApiResponseMessage<void>> => {
  const res = await axiosPrivate.delete(`/plans/${planId}/measurements/${measurementId}`);
  return res.data;
}