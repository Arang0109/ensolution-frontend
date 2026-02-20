export interface MeasurementPointDocResponse {
  gasTemperature: string;
  dynamicPressure: string;
  staticPressure: string;

  equipmentTemperature: EquipmentTemperatureSnapshot;
  equipmentVolume: EquipmentVolumeSnapshot;

  measureTime: string;
  vacuumGaugePressure: string;
  finalImpingerTemperature: string;

  gasVelocity: string;
  gasDensity: string;

  collectedWaterVolume: string;

  kFactor: string;
  orificeDifferentialPressure: string;
  nozzleSize: string;
}

export interface EquipmentTemperatureSnapshot {
  inletTemperature: string;
  outletTemperature: string;

  averageTemperature: string;
}

export interface EquipmentVolumeSnapshot {
  beforeVolume: string;
  afterVolume: string;

  requiredVolume: string;
  expectedVolume?: string;
  actualCollectedVolume: string;
}