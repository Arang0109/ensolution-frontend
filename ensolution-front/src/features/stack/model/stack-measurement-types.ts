import type { Cycle } from "@/shared/model";
import type { PollutantResponse } from "@/features/pollutant/model/pollutant-types";

export interface StackMeasurementResponse {
  id: number;
  stackId: number;
  pollutant: PollutantResponse;
  cycle: Cycle;
  allowance: number | null;
  createdAt: Date;
  modifiedAt: Date;
}

export interface StackMeasurementCreateRequest {
  stackId: number;
  pollutantId: number;
  cycle: Cycle;
  allowance: number | null;
}

export interface StackMeasurementUpdateRequest {
  cycle: Cycle;
  allowance: number | null;
}