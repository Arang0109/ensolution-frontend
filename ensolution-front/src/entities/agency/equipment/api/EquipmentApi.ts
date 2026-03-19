import { axiosPrivate } from "@shared/api";

import type { ApiResponseMessage } from "@shared/model";
import type {
  EquipmentRegisterRequest,
  EquipmentResponse,
  TypedEquipmentResponse,
  EquipmentUpdateRequest,
  EquipmentSpecMap,
  EquipType
} from "@/entities/agency/equipment/model";

export const registerEquipment = async <T extends keyof EquipmentSpecMap>(
  data: EquipmentRegisterRequest<T>
): Promise<ApiResponseMessage<EquipmentResponse<T>>> => {
  const res = await axiosPrivate.post("/equipments", data);
  return res.data;
};

export const getEquipments = async (
  type?: EquipType
): Promise<ApiResponseMessage<TypedEquipmentResponse[]>> => {
  const res = await axiosPrivate.get("/equipments", {
    params: { type }
  });
  return res.data;
}

export const patchEquipment = async <T extends keyof EquipmentSpecMap>(
  equipmentId: string,
  data: EquipmentUpdateRequest<T>
): Promise<ApiResponseMessage<TypedEquipmentResponse>> => {
  const res = await axiosPrivate.patch(`/equipments/${equipmentId}`, data);
  return res.data;
};
