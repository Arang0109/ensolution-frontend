import type { Workplace } from '@workplace/model/workplace.types';

export interface Company {
  id: number;
  name: string;
  address: string;
  ceoName: string;
  bizNumber: string;
  remark: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface CompanyRegisterRequest {
  name: string;
  address: string;
  ceoName: string;
  bizNumber: string;
  remark: string;
}

export interface CompanyUpdateRequest {
  name: string;
  address: string;
  ceoName: string;
  bizNumber: string;
  remark: string;
}

export interface CompanyDetailResponse {
  company: Company;
  workplaces: Workplace[];
}
