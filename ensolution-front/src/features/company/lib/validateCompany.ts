import type { CompanyCreateForm } from "@company/model";

import { stripBizNumber } from "@/shared/lib";

export type ValidationErrors = Record<string, string>;

export const validateCompany = (form: CompanyCreateForm): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!form.name.trim()) {
    errors.name = "의뢰기관명은 필수 입력사항입니다.";
  }

  const cleanBiz = stripBizNumber(form.bizNumber);

  if (!cleanBiz) {
    errors.bizNumber = "사업자번호는 필수 입력사항입니다.";
  } else if (!/^\d{10}$/.test(cleanBiz)) {
    errors.bizNumber = "사업자번호는 10자리 숫자여야 합니다.";
  }

  if(!form.ceoName.trim()) { errors.ceoName = "대표자명은 필수 입력사항입니다."}

  return errors;
};