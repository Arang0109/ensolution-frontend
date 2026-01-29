import { axiosPrivate } from "@/shared/api";
import type { ApiResponseMessage } from "@/shared/model";
import type {
  StackMeasurementResponse,
  StackMeasurementCreateRequest,
  StackMeasurementUpdateRequest,
} from "@/features/stack/model/stack-measurement-types";

export const registerStackMeasurement = async (
  data: StackMeasurementCreateRequest
): Promise<ApiResponseMessage<StackMeasurementResponse>> => {
  const res = await axiosPrivate.post("/stack-measurements", data);
  return res.data;
};

export const getStackMeasurements = async (): Promise<ApiResponseMessage<StackMeasurementResponse[]>> => {
  const res = await axiosPrivate.get("/stack-measurements");
  return res.data;
};

export const getStackMeasurement = async (
  measurementId: number
): Promise<ApiResponseMessage<StackMeasurementResponse>> => {
  const res = await axiosPrivate.get(`/stack-measurements/${measurementId}`);
  return res.data;
};

export const patchStackMeasurement = async (
  measurementId: number,
  data: StackMeasurementUpdateRequest
): Promise<ApiResponseMessage<StackMeasurementResponse>> => {
  const res = await axiosPrivate.patch(`/stack-measurements/${measurementId}`, data);
  return res.data;
};

export const deleteStackMeasurement = async (
  measurementId: number
): Promise<ApiResponseMessage<void>> => {
  const res = await axiosPrivate.delete(`/stack-measurements/${measurementId}`);
  return res.data;
};
