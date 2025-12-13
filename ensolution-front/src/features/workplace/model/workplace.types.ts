import type { Grade } from '@common/model/common.types';
import type { StackResponse } from '@stack/model/stack.types';

export interface WorkplaceResponse {
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
  workplace: WorkplaceResponse;
  stacks: StackResponse[];
}
