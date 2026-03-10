import type {
  MeasurementStatus,
  PreInfoDocResponse, MeasurementEquipmentResponse, ClientDocResponse,
  WeatherDocResponse, MoistureDocResponse, ExhaustGasDocResponse,
  MeasurementPointDocResponse, MeasureDataDocResponse, StackMeasurementDocResponse
} from "@plan/model";
import type { WeatherCondition, WindDirection } from "@plan/model";
import type { Shape, Orientation } from "@stack/model";
import type { Grade } from "@shared/model";

export interface MeasurementDocResponse {
  id: string;

  planId: number;
  status: MeasurementStatus;

  preInfo: PreInfoDocResponse;
  measurementItems: StackMeasurementDocResponse[];
  equipment: MeasurementEquipmentResponse;
  client: ClientDocResponse;

  weather: WeatherDocResponse;
  moisture: MoistureDocResponse;
  exhaustGas: ExhaustGasDocResponse;

  measureData: MeasureDataDocResponse;
  measurementPoints: MeasurementPointDocResponse[];

  createdAt: string;
  updatedAt: string;
}

export interface DraftUpdateRequest {
  preInfo: PreInfoUpdateRequest;
  client: ClientUpdateRequest;
  
  measurementItems: number[];

  particleSamplerId: string | null;
  gasSamplerId: string | null;
  pitotTubeId: string | null;
  nozzleId: string | null;

  weather: WeatherUpdateRequest;
  moisture: MoistureUpdateRequest;
  exhaustGas: ExhaustGasUpdateRequest;

  measureData: MeasureDataUpdataRequest;
  measurementPoints: MeasurementPointUpdateRequest[];
}

export interface PreInfoUpdateRequest {
  referenceNumber: string;
  measureDate: string;
  measurementField: string;
  measurementType: string;
  teamName: string;
  vehicleNumber: string;
  mentor: string;
  mentee: string;
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

export interface MeasureDataUpdataRequest {
  measurementPointCnt: string;
  standardDesiredGasVolume: string;
  measuringTime: string;
  nozzleSize: string;
}