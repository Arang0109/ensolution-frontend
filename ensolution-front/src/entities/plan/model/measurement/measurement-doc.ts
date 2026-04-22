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

  measureStartTime: string;
  measureEndTime: string;

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
  measurementField: MeasurementField | null;
  measurementType: MeasurementType | null;
  teamName: string;
  vehicleNumber: string;
  mentor: string;
  mentee: string;

  measureStartTime: string;
  measureEndTime: string;

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
  samples: SampleUpdateRequest[];
  particleSample: ParticleSampleUpdateRequest;

  quantity: string;
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

  gasAnalyzerStartTime: string;
  thcAnalyzerStartTime: string;
}

export interface MeasurementPointUpdateRequest {
  Ts: string;
  Pv: string;
  Ps: string;

  equipmentTemperature: EquipmentGasTemp;
  equipmentVolume: EquipmentVolume;

  samplingTime: string;
  vacuumGaugePressure: string;
  finalImpingerTemperature: string;
}

export interface EquipmentGasTemp {
  inTm: string;
  outTm: string;
}

export interface EquipmentVolume {
  beforeVm: string;
  afterVm: string;
}

export interface SampleUpdateRequest {
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

export interface ParticleSampleUpdateRequest {
  Cp: string; // 피토우관 계수
  nozzleSize: string; // 노즐 사이즈 (cm)

  Vm: string;
  samplingTime: string;

  kFactor: string // K Factor
  orificeDp: string // 오리피스 차압 (mmHg)
  isokineticRatio: string // 등속흡입계수

  samplingStartTime: string; // 입자상 물질 채취시작 시간
  samplingEndTime: string; // 입자상 물질 채취종료 시간

  thimbleFilter: string;
  bgThimbleFilter: string;
}