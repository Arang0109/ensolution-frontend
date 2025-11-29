import type { Grade, Shape, Orientation } from '@model/common.types';

export interface Stack {
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

export interface Prevention {
  id: number;
  stackId: number;
  name: string;
  remark: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface Facility {
  id: number;
  preventionId: number;
  name: string;
  fuelUsage: string;
  itemOutput: string;
  fuelInput: string;
  fuelType: string;
  remark: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface Target {
  id: number;
  preventionId: number;
  targetSubstance: string;
  removalEfficiency: number;
  createdAt: Date;
  modifiedAt: Date;
}

export interface StackDetailResponse {
  stack: Stack;
  preventions: Prevention[];
}
