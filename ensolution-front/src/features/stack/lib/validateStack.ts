import type { StackCreateForm, StackUpdateForm } from "@stack/model";

import type { ValidationErrors } from "@shared/model";

export const validateStack = (form: StackCreateForm | StackUpdateForm): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!form.name.trim()) {
    errors.name = "측정시설명은 필수 입력사항입니다.";
  }

  return errors;
};