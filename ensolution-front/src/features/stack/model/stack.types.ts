import type { Grade, Shape, Orientation } from '@model/common.types';
import type { PreventionResponse, PreventionDetailResponse } from '@stack/model';

export interface StackResponse {
  id: number;
  workplaceId: number;
  name: string;
  semsNumber: string;
  grade: Grade;
  height: string;
  horizontalLength: number;
  verticalLength: number;
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
  horizontalLength: number;
  verticalLength: number;
  shape: Shape;
  orientation: Orientation;
  remark: string;
}

export interface StackUpdateRequest {
  name: string;
  semsNumber: string;
  grade: Grade;
  height: string;
  horizontalLength: number;
  verticalLength: number;
  shape: Shape;
  orientation: Orientation;
  remark: string;
}

export interface StackDetailResponse {
  stack: StackResponse;
  preventions: PreventionResponse[];
}

export interface StackDetailWithPreventionsResponse {
  stack: StackResponse;
  preventions: PreventionDetailResponse[];
}
