import type { Grade, Orientation, Shape, Cycle } from "@/shared/model";

export interface MeasurementResponse {
  id: string;
  planId: number;
  status: string;

  measurementPointCnt: number;
  circularAxisCoords: number[] | null;

  preInfo: PreInfoResponse;
  equipment: MeasurementEquipmentResponse;
  client: ClientResponse;

  weather: WeatherResponse | null;
  moisture: MoistureResponse | null;
  exhaustGas: ExhaustGasResponse | null;

  measurementPoints: MeasurementPointResponse[] | null;

  pitotTubeCoefficient: number | null;
  quantity: number | null;

  createdAt: string | null;
  updatedAt: string | null;

  draft: boolean;
}

export interface ClientResponse {
  company: CompanySnapshot;
  stack: StackSnapshot;
}

export interface CompanySnapshot {
  companyId: number;
  workplaceId: number;

  companyName: string;
  workplaceName: string;

  ceoName: string;
  address: string;
  bizNumber: string;

  manager: string;
  businessCategory: string;

  grade: Grade;
}

export interface StackSnapshot {
  stackId: number;
  name: string;
  semsNumber: string;

  grade: Grade;

  height: number;
  horizontalLength: number;
  verticalLength: number;

  shape: Shape;
  orientation: Orientation;

  standardOxygen: number | null;

  preventions: PreventionSnapshot[];
}

export interface PreventionSnapshot {
  preventionId: number;
  name: string;

  facilities: FacilitySnapshot[];
  targets: TargetSnapshot[];
}

export interface FacilitySnapshot {
  facilityId: number;
  name: string;

  fuelUsage: string | null;
  itemOutput: string | null;
  fuelInput: string | null;
  fuelType: string | null;
}

export interface TargetSnapshot {
  targetId: number;
  targetSubstance: string;
  removalEfficiency: number | null;
}

export interface WeatherResponse {
  pressure?: WeatherPressureSnapshot;

  weatherCondition?: string;
  temperature?: number;
  humidity?: number;

  windDirection?: string;
  windSpeed?: number;

  convertedPressure?: number;
}

export interface WeatherPressureSnapshot {
  pressure?: number;
  unit?: string;
}

export interface MoistureResponse {
  weight?: MoistureWeightSnapshot;
  gasMeterTemperature?: GasMeterTemperatureSnapshot;
  dryGasVolume?: DryGasVolumeSnapshot;

  suctionVelocity?: number;
  gasMeterGaugePressure?: number;

  moistureRatio?: number;
}

export interface MoistureWeightSnapshot {
  before?: number;
  after?: number;
}

export interface GasMeterTemperatureSnapshot {
  in?: number;
  out?: number;
}

export interface DryGasVolumeSnapshot {
  before?: number;
  after?: number;
}

export interface ExhaustGasResponse {
  o2Concentration?: number[];
  co2Concentration?: number[];
  coConcentration?: number[];
  noxConcentration?: number[];
  soxConcentration?: number[];

  gasDensity?: number;
  o2CorrectionFactor?: number;
}

export interface MeasurementPointResponse {
  gasTemperature?: number;
  dynamicPressure?: number;
  staticPressure?: number;

  equipmentTemperature?: EquipmentTemperatureSnapshot;
  equipmentVolume?: EquipmentVolumeSnapshot;

  measureTime?: number;
  vacuumGaugePressure?: number;
  finalImpingerTemperature?: number;

  gasVelocity?: number;
  gasDensity?: number;

  collectedWaterVolume?: number;

  kFactor?: number;
  orificeDifferentialPressure?: number;
  nozzleSize?: number;
}

export interface EquipmentTemperatureSnapshot {
  inletTemperature?: number;
  outletTemperature?: number;

  averageTemperature?: number;
}

export interface EquipmentVolumeSnapshot {
  beforeVolume?: number;
  afterVolume?: number;

  requiredVolume?: number;
  expectedVolume?: number;
  actualCollectedVolume?: number;
}

export interface MeasurementEquipmentResponse {
  particleSampler?: ParticleSamplerSnapshot;
  gasSampler?: GasSamplerSnapshot;
  pitotTube?: PitotTubeSnapshot;
  nozzle?: NozzleSnapshot;
}

export interface ParticleSamplerSnapshot {
  equipmentId: string;
  managementNumber: string;
  alias: string;

  totalVolume: number;
  deltaH: number;     // 오리피스 보정 계수
  yd: number;
}

export interface GasSamplerSnapshot {
  equipmentId: string;
  managementNumber: string;
  alias: string;

  totalVolume: number;
}

export interface PitotTubeSnapshot {
  equipmentId: string;
  managementNumber: string;
  alias: string;

  pitotTubeType: string; // 나중에 enum으로 바꾸는거 추천

  coefficients: PitotCoefficient[];
}

export interface PitotCoefficient {
  velocity: number;
  coefficient: number;
}

export interface NozzleSnapshot {
  equipmentId: string;
  managementNumber: string;
  alias: string;

  diameters: NozzleDiameter[];
}

export interface NozzleDiameter {
  diameter: number;
}

export interface PreInfoResponse {
  measureDate: string;
  measurementType: string;
  teamId: number;
  teamName: string;
  vehicleNumber: string;
  mentor: string;
  mentee: string;

  simplifiedMeasurement: boolean;
  measurementItems: StackMeasurementResponse[];
}

export interface StackMeasurementResponse {
  stackMeasurementId: number;
  pollutantId: number;
  pollutantNameKr: string;
  pollutantNameEn: string;
  method: string;
  equipmentName: string;
  testMethodName: string;
  samplingTime: string;
  samplingVolume: string;
  cycle: Cycle;
  allowance: string;
}
