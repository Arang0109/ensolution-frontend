import type {
  CompanyCreateForm, CompanyRegisterRequest,
  CompanyUpdateForm, CompanyUpdateRequest
} from "@company/model";
import { stripBizNumber } from "@shared/lib";

export const mapCreateFormToRequest = (
  form: CompanyCreateForm
): CompanyRegisterRequest => ({
  ...form,
  bizNumber: stripBizNumber(form.bizNumber),
});

export const mapUpdateFormToRequest = (
  form: CompanyUpdateForm
): CompanyUpdateRequest => ({
  ...form,
  bizNumber: stripBizNumber(form.bizNumber),
});