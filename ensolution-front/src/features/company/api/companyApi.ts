import { axiosPrivate } from "@/shared/api";

import type { ApiResponseMessage } from "@/shared/model";
import type { CompanyResponse, CompanyDetailResponse, CompanyRegisterRequest, CompanyUpdateRequest } from "@company/model";

export const registerCompany = async (
  data: CompanyRegisterRequest
): Promise<ApiResponseMessage<void>> => {
  const res = await axiosPrivate.post("/companies", data);
  return res.data;
}

export const getCompanies = async (): Promise<ApiResponseMessage<CompanyResponse[]>> => {
  const res = await axiosPrivate.get("/companies");
  return res.data;
}

export const getCompany = async (
  companyId: number
): Promise<ApiResponseMessage<CompanyDetailResponse>> => {
  const res = await axiosPrivate.get(`/companies/${companyId}`);
  return res.data;
}

export const patchCompany = async (
  companyId: number,
  data: CompanyUpdateRequest
): Promise<ApiResponseMessage<CompanyResponse>> => {
  const res = await axiosPrivate.patch(`/companies/${companyId}`, data);
  return res.data;
}

export const deleteCompany = async (
  companyId: number
): Promise<ApiResponseMessage<void>> => {
  const res = await axiosPrivate.delete(`/companies/${companyId}`);
  return res.data;
}