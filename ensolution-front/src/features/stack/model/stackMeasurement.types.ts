import type { Cycle } from "@/common/model";

export interface StackMeasurementResponse {
  id: number;
  stackId: number;
  pollutantId: number;
  cycle: Cycle;
  allowance: number;
  createdAt: Date;
  modifiedAt: Date;
}

export interface StackMeasurementCreateRequest {
  stackId: number;
  pollutantId: number;
  cycle: Cycle;
  allowance: number;
}

export interface StackMeasurementUpdateRequest {
  cycle: Cycle;
  allowance: number;
}