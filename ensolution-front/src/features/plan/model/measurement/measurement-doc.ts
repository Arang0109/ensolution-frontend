import type {
  MeasurementStatus,
  PreInfoDocResponse, MeasurementEquipmentResponse, ClientDocResponse,
  WeatherDocResponse, MoistureDocResponse, ExhaustGasDocResponse,
  MeasurementPointDocResponse,
} from "@plan/model";
import type { Shape, Orientation } from "@stack/model";
import type { Grade } from "@shared/model";

export interface MeasurementDocResponse {
  id: string;

  planId: number;
  status: MeasurementStatus;

  measurementPointCnt: number;
  circularAxisCoords: number[];

  preInfo: PreInfoDocResponse;
  equipment: MeasurementEquipmentResponse;
  client: ClientDocResponse;

  weather: WeatherDocResponse;
  moisture: MoistureDocResponse;
  exhaustGas: ExhaustGasDocResponse;

  measurementPoints: MeasurementPointDocResponse[];

  pitotTubeCoefficient: number;
  quantity: number;

  createdAt: string;
  updatedAt: string;
}

export interface DraftUpdateRequest {
  preInfo: PreInfoUpdateRequest;
  client: ClientUpdateRequest;
  
  pollutantIdList: number[] | null;

  particleSamplerId: string | null;
  gasSamplerId: string | null;
  pitotTubeId: string | null;
  nozzleId: string | null;
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