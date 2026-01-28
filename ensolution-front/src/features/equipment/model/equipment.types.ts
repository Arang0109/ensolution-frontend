import type { EquipType, PitotTubeType } from "./equipment.constants";

export interface EquipmentRegisterResponse {
  equipmentId: string;
}

export interface EquipmentResponse<TSpec = unknown> {
  id: string;

  type: EquipType;

  managementNumber: string;
  serialNumber: string;
  modelName: string;
  equipmentName: string;
  alias: string;

  price: number;          // BigDecimal → number
  manufacturer: string;
  originCountry: string;
  purchaseDate: string;   // LocalDate → ISO 문자열 (yyyy-MM-dd)
  remark: string;

  calibrationCycle: number;
  lastCalibrationDate: string;

  spec: TSpec;
}

export interface EquipmentRegisterRequest<TSpec = unknown> {
  type: EquipType;

  managementNumber: string;
  serialNumber: string;
  modelName: string;
  equipmentName: string;
  alias: string;

  price: number;          // BigDecimal → number
  manufacturer: string;
  originCountry: string;
  purchaseDate: string;   // LocalDate → ISO 문자열 (yyyy-MM-dd)
  remark: string;

  calibrationCycle: number;

  spec: TSpec;
}

export interface EquipmentUpdateRequest<TSpec = unknown> {
  type: EquipType;

  managementNumber: string;
  serialNumber: string;
  modelName: string;
  equipmentName: string;
  alias: string;

  price: number;          // BigDecimal → number
  manufacturer: string;
  originCountry: string;
  purchaseDate: string;   // LocalDate → ISO 문자열 (yyyy-MM-dd)
  remark: string;

  calibrationCycle: number;

  spec: TSpec;
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
  type: PitotTubeType;
  coefficients: {
    coefficient: number;
    velocity: number;
  }[];
}
export interface NozzleSpec {
  nozzleDiameters: {
    diameter: number
  }[];
}

export type EquipmentSpecMap = {
  [EquipType.PARTICLE_SAMPLER]: ParticleSamplerSpec;
  [EquipType.GAS_SAMPLER]: GasSamplerSpec;
  [EquipType.PITOT_TUBE]: PitotTubeSpec;
  [EquipType.NOZZLE]: NozzleSpec;
  [EquipType.OTHER]: unknown;
};

export type TypedEquipmentResponse<T extends keyof EquipmentSpecMap> =
  EquipmentResponse<EquipmentSpecMap[T]> & { type: T };

export type TypedEquipmentRegisterRequest<T extends keyof EquipmentSpecMap> =
  EquipmentRegisterRequest<EquipmentSpecMap[T]> & { type: T };

export type TypedEquipmentUpdateRequest<T extends keyof EquipmentSpecMap> =
  EquipmentUpdateRequest<EquipmentSpecMap[T]> & { type: T };