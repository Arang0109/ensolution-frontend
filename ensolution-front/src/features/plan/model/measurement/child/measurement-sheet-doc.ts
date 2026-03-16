import type {
  WeatherDocResponse, MoistureDocResponse, ExhaustGasDocResponse,
  MeasurementPointDocResponse,
  Category
} from "@plan/model";

export interface MeasurementSheetDocResponse {
  category: Category;
  referenceNumber: string;

  weather: WeatherDocResponse;
  moisture: MoistureDocResponse;
  exhaustGas: ExhaustGasDocResponse;

  measurementPoints: MeasurementPointDocResponse[];

  quantity: string;
  pitotTubeCoefficient: string;
  nozzleSize: string;

  startTime: string;
  endTime: string;
}