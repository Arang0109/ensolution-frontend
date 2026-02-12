import type { StackMeasurementResponse } from "@stack/model";
import type { PlanStatus } from "@shared/model/common-types";

import type { MeasurementField, MeasurementType, MeasurementResponse } from "@plan/model";

// ============ Response Types ============

export interface PlanResponse {
  id: number;
  stackId: number;
  teamId: number;
  measureField: string;
  measureDate: string;
  measurementType: string;
  status: PlanStatus;
  createdAt: Date;
}

export interface PlanDetailResponse {
  plan: PlanResponse;
  measurementInfo: MeasurementResponse;
}

export interface PlanPollutantResponse {
  id: number;
  planId: number;
  stackMeasurement: StackMeasurementResponse;
}

export interface PlanTableView {
  id: number;
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

// ============ Form Types (Client-side) ============

/**
 * 클라이언트 폼 상태 타입
 * - 폼 입력 및 상태 관리에 사용
 * - flat 구조로 관리
 */
export interface PlanFormData {
  // 시료채취정보
  measurementField: MeasurementField;
  measureDate: string;
  measurementType: MeasurementType;

  // 사업장/배출구
  workplaceId: number;
  stackId: number;
  measurementIds: number[];

  // 팀/인력
  teamId: number;
  staffIds: number[];
}

// ============ Request Types (Server DTO) ============

/**
 * 측정일정 등록 요청 DTO
 * - 서버 API 형식에 맞춘 중첩 구조
 */
export interface PlanRegisterRequest {
  plan: {
    stackId: number;
    teamId: number;
    measureDate: string;
    measurementType: MeasurementType;
    measurementIds: number[];
  };

  companyId: number;
  workplaceId: number;

  vehicleNumber: string;
  seniorUserId: number;
  juniorUserId: number;

  particleSamplerId: number;
  gasSamplerId: number;
  pitotTubeId: number;
  nozzleId: number;
}

export interface PlanPollutant {
  stackMeasurementId: number;
}

export interface PlanUpdateRequest {
  stackId: number;
  teamId: number;
  measureField: string;
  measureDate: string;
  measurementType: string;
}

export interface PlanStatusUpdateRequest {
  status: PlanStatus;
}

// ============ Utility Functions ============

/**
 * PlanFormData를 PlanRegisterRequest로 변환
 * - 폼 제출 시 서버 DTO 형식으로 변환
 */
export const toRegisterRequest = (
  form: PlanFormData,
  companyId: number
): PlanRegisterRequest => ({
  plan: {
    stackId: form.stackId,
    teamId: form.teamId,
    measureDate: form.measureDate,
    measurementType: form.measurementType,
    measurementIds: form.measurementIds,
  },
  companyId,
  workplaceId: form.workplaceId,
  // TODO: 추후 장비/인력 정보 추가
  vehicleNumber: "",
  seniorUserId: 0,
  juniorUserId: 0,
  particleSamplerId: 0,
  gasSamplerId: 0,
  pitotTubeId: 0,
  nozzleId: 0,
});