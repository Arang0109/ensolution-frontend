import type {
  MeasurementEquipmentResponse,ClientDocResponse,
  MeasurementSheetDocResponse, MeasurementItemDocResponse,
  MeasurementField,
  MeasurementType,
  PlanStatus
} from "@/entities/plan/model";
import type { WeatherCondition, WindDirection } from "@/entities/plan/model";
import type { Shape, Orientation, Cycle } from "@/entities/stack/model";
import type { Grade } from "@shared/model";

export interface MeasurementDocResponse {
  id: string;

  planId: number;
  teamId: number;

  status: PlanStatus;
  referenceNumber: string;
  measureDate: string;
  receivedDate: string;
  analysisDate: string;
  measurementField: MeasurementField;
  measurementType: MeasurementType;
  teamName: string;
  vehicleNumber: string;
  mentor: string;
  mentee: string;

  client: ClientDocResponse;
  equipment: MeasurementEquipmentResponse;
  measurementItems: MeasurementItemDocResponse[];

  sheets: MeasurementSheetDocResponse[];

  measurementPointCnt: number;

  createdAt: string;
  updatedAt: string;
}

export interface DraftUpdateRequest {
  referenceNumber: string;
  measureDate: string;
  receivedDate: string;
  analysisDate: string;
  measurementField: MeasurementField;
  measurementType: MeasurementType;
  teamName: string;
  vehicleNumber: string;
  mentor: string;
  mentee: string;

  client: ClientUpdateRequest;

  particleSamplerId: string | null;
  gasSamplerId: string | null;
  pitotTubeId: string | null;
  nozzleId: string | null;

  measurementItems: MeasurementItemUpdateRequest[];

  sheets: MeasurementSheetUpdateRequest[];
}

export interface ClientUpdateRequest {
  company: CompanyUpdateRequest;
  stack: StackUpdateRequest;
}

export interface CompanyUpdateRequest {
  companyName: string;
    workplaceName: string;
    ceoName: string;
    address: string;
    bizNumber: string;
    manager: string;
    businessCategory: string;
    grade: Grade;
}

export interface StackUpdateRequest {
  name: string;
  semsNumber: string;
  height: string;
  horizontalLength: string;
  verticalLength: string;
  shape: Shape;
  orientation: Orientation;
  standardOxygen: string;
  grade: Grade;
}

export interface MeasurementItemUpdateRequest {
  stackMeasurementId: number;
  pollutantId: number;
  pollutantNameKr: string;
  pollutantNameEn: string;
  method: string;
  testEquipment: string;
  testMethod: string;
  samplingTime: string;
  samplingVolume: string;
  cycle: Cycle;
  allowance: string;
}

export interface MeasurementSheetUpdateRequest {
  category: string;
  referenceNumber: string;

  weather: WeatherUpdateRequest;
  moisture: MoistureUpdateRequest;
  exhaustGas: ExhaustGasUpdateRequest;

  measurementPoints: MeasurementPointUpdateRequest[];

  quantity: string;
  pitotTubeCoefficient: string;
  nozzleSize: string;

  startTime: string;
  endTime: string;
}

export interface WeatherUpdateRequest {
  pressure: PressureUpdateRequest;
  weatherCondition: WeatherCondition;
  temperature: string;
  humidity: string;
  windDirection: WindDirection;
  windSpeed: string;
}

export interface PressureUpdateRequest {
  pressure: string;
  unit: string;
}

export interface MoistureUpdateRequest {
  weight: MoistureWeight;
  gasMeterTemperature: MoistureGasTemp;
  dryGasVolume: MoistureDryVolume;

  suctionVelocity: string;
  gasMeterGaugePressure: string;
}

export interface MoistureWeight {
  before: string;
  after: string;
}

export interface MoistureGasTemp {
  in: string;
  out: string;
}

export interface MoistureDryVolume {
  before: string;
  after: string;
}

export interface ExhaustGasUpdateRequest {
  o2Concentration: string[];
  co2Concentration: string[];
  coConcentration: string[];
  noxConcentration: string[];
  soxConcentration: string[];
}

export interface MeasurementPointUpdateRequest {
  gasTemperature: string;
  dynamicPressure: string;
  staticPressure: string;

  equipmentTemperature: EquipmentGasTemp;
  equipmentVolume: EquipmentVolume;

  measureTime: string;
  vacuumGaugePressure: string;
  finalImpingerTemperature: string;
}

export interface EquipmentGasTemp {
  inletTemperature: string;
  outletTemperature: string;
}

export interface EquipmentVolume {
  beforeVolume: string;
  afterVolume: string;
}