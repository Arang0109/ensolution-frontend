import type { Orientation, Shape } from "@/entities/stack/model";
import type { Grade } from "@shared/model";

export interface ClientDocResponse {
  company: CompanySnapshot;
  stack: StackSnapshot;
}

export interface CompanySnapshot {
  companyId: number;
  workplaceId: number;

  companyName: string;
  workplaceName: string;

  ceoName: string;
  address: string;
  bizNumber: string;

  manager: string;
  businessCategory: string;

  grade: Grade;
}

export interface StackSnapshot {
  stackId: number;
  name: string;
  semsNumber: string;

  grade: Grade;

  height: string;
  horizontalLength: string;
  verticalLength: string;

  shape: Shape;
  orientation: Orientation;

  standardOxygen: string;

  preventions: PreventionSnapshot[];
}

export interface PreventionSnapshot {
  preventionId: number;
  name: string;

  facilities: FacilitySnapshot[];
  targets: TargetSnapshot[];
}

export interface FacilitySnapshot {
  facilityId: number;
  name: string;

  fuelUsage: string;
  itemOutput: string;
  fuelInput: string;
  fuelType: string;
}

export interface TargetSnapshot {
  targetId: number;
  targetSubstance: string;
  removalEfficiency: string;
}