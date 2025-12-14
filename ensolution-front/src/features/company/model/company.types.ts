import type {  WorkplaceResponse } from '@workplace/model/workplace.types';

export interface CompanyResponse {
  id: number;
  name: string;
  address: string;
  ceoName: string;
  bizNumber: string;
  remark: string;
  createdAt: string;
  modifiedAt: string;
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
  company: CompanyResponse;
  workplaces: WorkplaceResponse[];
}
