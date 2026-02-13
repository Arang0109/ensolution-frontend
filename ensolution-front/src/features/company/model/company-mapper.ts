import type { CompanyCreateForm, CompanyRegisterRequest } from "@company/model";
import { stripBizNumber } from "@shared/lib";

export const mapCreateFormToRequest = (
  form: CompanyCreateForm
): CompanyRegisterRequest => ({
  ...form,
  bizNumber: stripBizNumber(form.bizNumber),
});