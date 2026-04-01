export interface MeasurementEquipmentResponse {
  particleSampler: ParticleSamplerSnapshot;
  gasSampler: GasSamplerSnapshot;
  pitotTube: PitotTubeSnapshot;
  nozzle: NozzleSnapshot;
}

export interface ParticleSamplerSnapshot {
  equipmentId: string;
  managementNumber: string;
  alias: string;

  totalVolume: string;
  deltaH: string;     // 오리피스 보정 계수
  yd: string;
}

export interface GasSamplerSnapshot {
  equipmentId: string;
  managementNumber: string;
  alias: string;

  totalVolume: string;
}

export interface PitotTubeSnapshot {
  equipmentId: string;
  managementNumber: string;
  alias: string;
  pitotTubeType: string; // 나중에 enum으로 바꾸는거 추천

  coefficients: PitotCoefficient[];
}

export interface PitotCoefficient {
  velocity: string;
  coefficient: string;
}

export interface NozzleSnapshot {
  equipmentId: string;
  managementNumber: string;
  alias: string;

  diameters: NozzleDiameter[];
}

export interface NozzleDiameter {
  diameter: string;
}