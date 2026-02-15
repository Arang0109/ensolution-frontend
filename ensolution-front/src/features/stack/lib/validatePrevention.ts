import type { PreventionBundleCreateForm, PreventionBundleUpdateForm } from "@stack/model";

import type { ValidationErrors } from "@shared/model";

export const validatePrevention = (form: PreventionBundleCreateForm | PreventionBundleUpdateForm): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!form.prevention.name.trim()) {
    errors.preventionName = "방지시설명은 필수 입력사항입니다.";
  }

  return errors;
};