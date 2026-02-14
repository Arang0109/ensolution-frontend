import type { PreventionResponse, StackMeasurementResponse } from '@stack/model';

import type { Shape, Orientation } from '@stack/model';
import type { Grade } from '@shared/model';

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
  createdAt: string;
  modifiedAt: string;
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