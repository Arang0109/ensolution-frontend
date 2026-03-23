import type {
  WeatherDocResponse, MoistureDocResponse, ExhaustGasDocResponse,
  Category
} from "@/entities/plan/model";

export interface MeasurementSheetDocResponse {
  category: Category;
  referenceNumber: string;

  weather: WeatherDocResponse;
  moisture: MoistureDocResponse;
  exhaustGas: ExhaustGasDocResponse;

  measurementPoints: MeasurementPointDocResponse[];
  samples: SampleDocResponse[];

  quantity: string;
  pitotTubeCoefficient: string;
  nozzleSize: string;

  startTime: string;
  endTime: string;
}

export interface SampleDocResponse {
  startTime: string;
  endTime: string;
  suctionQuantity: string;
  gasMeterGaugePressure: string;
  inTemperature: string;
  outTemperature: string;
  beforeVolume: string;
  afterVolume: string;
  blankSampleNumber: string;
  sampleNumber: string;
  samplingVolume: string;
}

export interface MeasurementPointDocResponse {
  gasTemperature: string;
  dynamicPressure: string;
  staticPressure: string;

  equipmentTemperature: EquipmentTemperatureSnapshot;
  equipmentVolume: EquipmentVolumeSnapshot;
  
  vacuumGaugePressure: string;
  finalImpingerTemperature: string;
  measureTime: string;

  gasVelocity: string;
  gasDensity: string;

  collectedWaterVolume: string;

  kFactor: string;
  orificeDifferentialPressure: string;
  isokineticRatio: string;
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