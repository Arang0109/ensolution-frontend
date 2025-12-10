import { axiosPrivate } from "@/common/api";
import type { ApiResponseMessage } from "@/common/model";
import type { ScheduleResponse, ScheduleRegisterRequest, ScheduleStatusUpdateRequest, ScheduleUpdateRequest, ScheduleTableView } from "@schedule/model";

export const registerSchedule = async (
  data: ScheduleRegisterRequest
): Promise<ApiResponseMessage<ScheduleResponse>> => {
  const res = await axiosPrivate.post("/schedules", data);
  return res.data;
}

export const getSchedules = async (): Promise<ApiResponseMessage<ScheduleTableView[]>> => {
  const res = await axiosPrivate.get("/schedules");
  console.log(res.data);
  return res.data;
}

export const patchSchedule = async (
  scheduleId: number,
  data: ScheduleUpdateRequest
): Promise<ApiResponseMessage<ScheduleResponse>> => {
  const res = await axiosPrivate.patch(`/schedules/${scheduleId}`, data);
  return res.data;
}

export const patchScheduleStatus = async (
  scheduleId: number,
  data: ScheduleStatusUpdateRequest
): Promise<ApiResponseMessage<ScheduleResponse>> => {
  const res = await axiosPrivate.patch(`/schedules/${scheduleId}/status`, data);
  return res.data;
}

export const deleteSchedule = async (
  scheduleId: number
): Promise<ApiResponseMessage<void>> => {
  const res = await axiosPrivate.delete(`/schedules/${scheduleId}`);
  return res.data;
}