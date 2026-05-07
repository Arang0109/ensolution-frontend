import type { EquipType, PitotTubeType } from "./equipment-constants";

export interface EquipmentResponse<T extends EquipType = EquipType> {
  type: T,
  id: string;

  managementNumber: string;
  serialNumber: string;
  modelName: string;
  equipmentName: string;
  alias: string;

  price: number;
  manufacturer: string;
  originCountry: string;
  purchaseDate: string;
  remark: string;

  calibrationCycle: number;
  lastCalibrationDate: string;

  spec: EquipmentSpecMap[T];
}

export interface EquipmentRegisterRequest<T extends EquipType = EquipType> {
  type: T,

  managementNumber: string;
  serialNumber: string;
  modelName: string;
  equipmentName: string;
  alias: string;

  price: number;
  manufacturer: string;
  originCountry: string;
  purchaseDate: string;
  remark: string;

  calibrationCycle: number;

  spec: EquipmentSpecMap[T];
}

export interface EquipmentUpdateRequest<T extends EquipType = EquipType> {
  type: T,

  managementNumber: string;
  serialNumber: string;
  modelName: string;
  equipmentName: string;
  alias: string;

  price: number;
  manufacturer: string;
  originCountry: string;
  purchaseDate: string;
  remark: string;

  calibrationCycle: number;

  spec: EquipmentSpecMap[T];
}

export interface ParticleSamplerSpec {
  totalVolume: number,
  orificeDp: number,
  yd: number
}

export interface GasSamplerSpec {
  totalVolume: number,
}

export interface PitotTubeSpec {
  pitotTubeType: PitotTubeType;
  coefficients: {
    coefficient: string;
    velocity: string;
  }[];
}
export interface NozzleSpec {
  diameters: {
    diameter: string
  }[];
}

export type EquipmentSpecMap = {
  [EquipType.PARTICLE_SAMPLER]: ParticleSamplerSpec;
  [EquipType.GAS_SAMPLER]: GasSamplerSpec;
  [EquipType.PITOT_TUBE]: PitotTubeSpec;
  [EquipType.NOZZLE]: NozzleSpec;
  [EquipType.OTHER]: Record<string, unknown>;
};

export type TypedEquipmentResponse = {
  [K in EquipType]: EquipmentResponse<K>
}[EquipType];
