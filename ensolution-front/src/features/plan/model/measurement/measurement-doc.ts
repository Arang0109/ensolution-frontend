import type {
  MeasurementStatus,
  PreInfoDocResponse, MeasurementEquipmentResponse, ClientDocResponse,
  WeatherDocResponse, MoistureDocResponse, ExhaustGasDocResponse,
  MeasurementPointDocResponse,
} from "@plan/model";

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