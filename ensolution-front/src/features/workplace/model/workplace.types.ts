import type { Grade } from '@model/common.types';
import type { Stack } from '@stack/model/stack.types';

export interface Workplace {
  id: number;
  companyId: number;
  name: string;
  address: string;
  bizNumber: string;
  businessCategory: string;
  grade: Grade;
  remark: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface WorkplaceRegisterRequest {
  name: string;
  companyId: number;
  address: string;
  bizNumber: string;
  businessCategory: string;
  grade: Grade;
  remark: string;
}

export interface WorkplaceUpdateRequest {
  name: string;
  address: string;
  bizNumber: string;
  businessCategory: string;
  grade: Grade;
  remark: string;
}

export interface WorkplaceDetailResponse {
  workplace: Workplace;
  stacks: Stack[];
}
