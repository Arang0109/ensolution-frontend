import type { Grade, Shape, Orientation } from '@common/model/common.types';
import type { PreventionResponse, PreventionDetailResponse, StackMeasurementResponse } from '@stack/model';

export interface StackResponse {
  id: number;
  workplaceId: number;
  name: string;
  semsNumber: string;
  grade: Grade;
  height: string;
  horizontalLength: string;
  verticalLength: string;
  shape: Shape;
  orientation: Orientation;
  remark: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface StackRegisterRequest {
  name: string;
  workplaceId: number;
  semsNumber: string;
  grade: Grade;
  height: string;
  horizontalLength: string;
  verticalLength: string;
  shape: Shape;
  orientation: Orientation;
  remark: string;
}

export interface StackUpdateRequest {
  name: string;
  semsNumber: string;
  grade: Grade;
  height: string;
  horizontalLength: string;
  verticalLength: string;
  shape: Shape;
  orientation: Orientation;
  remark: string;
}

export interface StackDetailResponse {
  stack: StackResponse;
  preventions: PreventionResponse[];
  stackMeasurements: StackMeasurementResponse[];
}

export interface StackDetailWithPreventionsResponse {
  stack: StackResponse;
  preventions: PreventionDetailResponse[];
  stackMeasurements: StackMeasurementResponse[];
}
