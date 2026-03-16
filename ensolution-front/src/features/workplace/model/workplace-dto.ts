import type { StackResponse } from '@stack/model';

import type { Grade } from '@shared/model';

export interface WorkplaceResponse {
  id: number;
  companyId: number;
  name: string;
  address: string;
  bizNumber: string;
  businessCategory: string;
  grade: Grade;
  remark: string;
  createdAt: string;
  modifiedAt: string;
}

export interface WorkplaceRegisterRequest {
  companyId: number;
  name: string;
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
