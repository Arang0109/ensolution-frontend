import type { CompanyResponse } from "@company/model";
import type { StackDetailResponse, StackMeasurementResponse } from "@stack/model";
import type { WorkplaceResponse } from "@workplace/model";
import type { ScheduleStatus } from "@common/model/common.types";

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
  company: CompanyResponse,
  measurements: SchedulePollutantResponse[]
}

export interface SchedulePollutantResponse {
  id: number;
  scheduleId: number;
  stackMeasurement: StackMeasurementResponse;
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
  // 시료채취정보
  measurementField: "대기"; // 측정분야 (현재는 대기만)
  measureDate: Date; // 측정일
  measurementType: "자가측정용" | "환경영향평가" | "인허가용" | "참고용"; // 측정용도
  workplaceId: number; // 측정대상 사업장

  // 측정시설
  stackId: number; // 측정시설
  measurementIds: number[]; // 측정항목

  // 출장인력 및 장비
  teamId: number; // 현장팀
  staffIds: number[]; // 측정인력 (복수선택)
}

export interface SchedulePollutant {
  stackMeasurementId: number;
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