import type { Grade } from '@/shared/model';

export const DEFAULT_GRADE: Grade = "TYPE_1";

export interface WorkplaceCreateForm {
  companyId: number;
  name: string;
  address: string;
  bizNumber: string;
  businessCategory: string;
  grade: Grade;
  remark: string;
}

export const getDefaultWorkplaceCreateForm = (companyId: number): WorkplaceCreateForm => ({
  companyId: companyId,
  name: "",
  address: "",
  bizNumber: "",
  businessCategory: "",
  grade: DEFAULT_GRADE,
  remark: "",
});

export interface WorkplaceUpdateForm {
  companyId: number;
  name: string;
  address: string;
  bizNumber: string;
  businessCategory: string;
  grade: Grade;
  remark: string;
}

export const getDefaultWorkplaceUpdateForm = (companyId: number): WorkplaceUpdateForm => ({
  companyId: companyId,
  name: "",
  address: "",
  bizNumber: "",
  businessCategory: "",
  grade: DEFAULT_GRADE,
  remark: "",
});