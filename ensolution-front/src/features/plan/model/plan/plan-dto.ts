import type { MeasurementField, PlanStatus, MeasurementDocResponse } from "@plan/model";

export interface PlanRegister {
  stackId: number;
  teamId: number;
  measurementField: MeasurementField; 
  measureDate: string;
  measurementType: string;
  measurementItemIds: number[];
};

export interface PlanRegisterRequest {
  plan: PlanRegister;

  referenceNumber: string;
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
  status: PlanStatus;

  stackId: number;
  teamId: number;
  measurementField: MeasurementField;
  measureDate: string;
  measurementType: string;

  createdAt: Date;
}

export interface PlanDetailResponse {
  plan: PlanResponse;
  measurementInfo: MeasurementDocResponse;
}

export interface PlanTableResponse {
  id: number;

  status: PlanStatus;
  measurementField: MeasurementField;
  measureDate: string;
  measurementType: string;

  companyName: string;
  workplaceName: string;
  stackName: string;
  teamName: string;

  measurementItems: string[];
  createdAt: Date;
}

export interface PlanUpdateRequest {
  stackId: number;
  teamId: number;
  measurementField: MeasurementField;
  measureDate: string;
  measurementType: string;
}

export interface PlanStatusUpdateRequest {
  status: PlanStatus;
}