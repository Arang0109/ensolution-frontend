import { axiosPrivate } from "@/common/api";
import type { ApiResponseMessage } from "@/common/model";
import type { 
  FacilityRegisterRequest, FacilityUpdateRequest, FacilityResponse
} from "@stack/model";

export const registerFacility = async (
  data: FacilityRegisterRequest
): Promise<ApiResponseMessage<void>> => {
  const res = await axiosPrivate.post("/facilities", data);
  return res.data;
}

export const patchFacility = async (
  facilityId: number,
  data: FacilityUpdateRequest
): Promise<ApiResponseMessage<FacilityResponse>> => {
  const res = await axiosPrivate.patch(`/facilities/${facilityId}`, data);
  return res.data;
}

export const deleteFacility = async (
  facilityId: number
): Promise<ApiResponseMessage<void>> => {
  const res = await axiosPrivate.delete(`/facilities/${facilityId}`);
  return res.data;
}