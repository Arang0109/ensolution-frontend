import type { PollutantResponse } from "@/features/pollutant/model";

import type { Cycle } from "@/entities/stack/model";

export interface StackMeasurementResponse {
  id: number;
  stackId: number;
  pollutant: PollutantResponse;
  cycle: Cycle;
  allowance: string;
  createdAt: string;
  modifiedAt: string;
}

export interface StackMeasurementCreateRequest {
  stackId: number;
  pollutantId: number | null;
  cycle: Cycle;
  allowance: string;
}

export interface StackMeasurementUpdateRequest {
  cycle: Cycle;
  allowance: string;
}