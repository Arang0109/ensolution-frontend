import type { WorkplaceCreateForm, WorkplaceUpdateForm } from "@entities/workplace/model";

import { stripBizNumber } from "@/shared/lib";

import type { ValidationErrors } from "@shared/model";

export const validateWorkplace = (form: WorkplaceCreateForm | WorkplaceUpdateForm): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!form.name.trim()) {
    errors.name = "사업장명은 필수 입력사항입니다.";
  }

  const cleanBiz = stripBizNumber(form.bizNumber);

  if (!cleanBiz) {
    errors.bizNumber = "사업자번호는 필수 입력사항입니다.";
  } else if (!/^\d{10}$/.test(cleanBiz)) {
    errors.bizNumber = "사업자번호는 10자리 숫자여야 합니다.";
  }

  return errors;
};