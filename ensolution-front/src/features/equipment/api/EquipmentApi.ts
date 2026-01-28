import { axiosPrivate } from "@common/api";

import type { ApiResponseMessage } from "@common/model";
import type {
  EquipmentResponse,
  TypedEquipmentResponse,
  TypedEquipmentRegisterRequest,
  TypedEquipmentUpdateRequest,
  EquipmentSpecMap
} from "../model";
import type { EquipType } from "../model/equipment.types";

export const registerEquipment = async <T extends keyof EquipmentSpecMap>(
  data: TypedEquipmentRegisterRequest<T>
): Promise<ApiResponseMessage<TypedEquipmentResponse<T>>> => {
  const res = await axiosPrivate.post("/equipments", data);
  return res.data;
};

export const getEquipments = async ():Promise<ApiResponseMessage<EquipmentResponse[]>> => {
  const res = await axiosPrivate.get("/equipments");
  return res.data;
}

export const patchEquipment = async <T extends keyof EquipmentSpecMap>(
  equipmentId: string,
  data: TypedEquipmentUpdateRequest<T>
): Promise<ApiResponseMessage<TypedEquipmentResponse<T>>> => {
  const res = await axiosPrivate.patch(`/equipments/${equipmentId}`, data);
  return res.data;
};

export const getParticleSamplerList = async ():Promise<
  ApiResponseMessage<TypedEquipmentResponse<typeof EquipType.PARTICLE_SAMPLER>[]>
> => {
  const res = await axiosPrivate.get("/equpiments/particle-sampler");
  return res.data;
}

export const getPitotTubeList = async ():Promise<
  ApiResponseMessage<TypedEquipmentResponse<typeof EquipType.PITOT_TUBE>[]>
> => {
  const res = await axiosPrivate.get("/equpiments/pitot-tube");
  return res.data;
}

export const getNozzleList = async ():Promise<
  ApiResponseMessage<TypedEquipmentResponse<typeof EquipType.NOZZLE>[]>
> => {
  const res = await axiosPrivate.get("/equpiments/nozzle");
  return res.data;
}