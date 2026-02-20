import type { StackMeasurementResponse } from "@stack/model";
import type { MeasurementField, PlanStatus, MeasurementDocResponse } from "@plan/model";

export interface PlanRegister {
  stackId: number;
  teamId: number;
  measureDate: string;
  measureField: MeasurementField; 
  measurementType: string;
  measurementIds: number[];
};

export interface PlanRegisterRequest {
  plan: PlanRegister;

  simplifiedMeasurement: boolean;
  vehicleNumber: string;
  mentor: string;
  mentee: string;

  particleSamplerId: string;
  gasSamplerId: string;
  pitotTubeId: string;
  nozzleId: string;
}

export interface PlanResponse {
  id: number;
  stackId: number;
  teamId: number;
  measureField: MeasurementField;
  measureDate: string;
  measurementType: string;
  status: PlanStatus;
  createdAt: Date;
}

export interface PlanDetailResponse {
  plan: PlanResponse;
  measurementInfo: MeasurementDocResponse;
}

export interface PlanTableResponse {
  id: number;
  measureField: MeasurementField;
  measureDate: string;
  measurementType: string;

  companyName: string;
  workplaceName: string;
  stackName: string;
  teamName: string;

  measurements: string[];

  status: PlanStatus;
  createdAt: Date;
}

export interface PlanMeasurementResponse {
  id: number;
  planId: number;
  stackMeasurement: StackMeasurementResponse;
}

export interface PlanUpdateRequest {
  stackId: number;
  teamId: number;
  measureField: MeasurementField;
  measureDate: string;
  measurementType: string;
}

export interface PlanStatusUpdateRequest {
  status: PlanStatus;
}

export interface MeasurementItemsUpdateRequest {
  stackMeasurementId: number;
}