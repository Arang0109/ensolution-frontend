import type { Grade } from '@/shared/model';

const DEFAULT_GRADE: Grade = "TYPE_1";

export interface WorkplaceCreateForm {
  companyId: number;
  name: string;
  address: string;
  bizNumber: string;
  businessCategory: string;
  grade: Grade;
  remark: string;
}

export const getDefaultWorkplaceCreateForm = (): WorkplaceCreateForm => ({
  companyId: 1,
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

export const getDefaultWorkplaceUpdateForm = (): WorkplaceUpdateForm => ({
  companyId: 1,
  name: "",
  address: "",
  bizNumber: "",
  businessCategory: "",
  grade: DEFAULT_GRADE,
  remark: "",
});