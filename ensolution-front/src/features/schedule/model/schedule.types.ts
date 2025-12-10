import type { CompanyResponse } from "@/features/company/model";
import type { StackDetailResponse } from "@/features/stack/model";
import type { WorkplaceResponse } from "@/features/workplace/model";
import type { ScheduleStatus } from "@model/common.types";

export interface ScheduleResponse {
  id: number;
  stackId: number;
  teamId: number;
  measureDate: Date;
  measurementType: string;
  status: ScheduleStatus;
  createdAt: Date;
}

export interface ScheduleDetailResponse {
  schedule: ScheduleResponse,
  stack: StackDetailResponse,
  workplace: WorkplaceResponse,
  company: CompanyResponse
}

export interface ScheduleTableView {
  id: number;
  workplaceId: number;
  workplaceName: string;
  stackId: number;
  stackName: string;
  teamId: number;
  teamName: string;
  measureDate: Date;
  measurementType: string;
  status: ScheduleStatus;
  createdAt: Date;
}

export interface ScheduleRegisterRequest {
  stackId: number;
  teamId: number;
  measureDate: Date;
  measurementType: string;
}

export interface ScheduleUpdateRequest {
  stackId: number;
  teamId: number;
  measureDate: Date;
  measurementType: string;
}

export interface ScheduleStatusUpdateRequest {
  status: ScheduleStatus;
}