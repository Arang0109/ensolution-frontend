import type { PollutantCreateForm, PollutantEditForm } from "@pollutant/model";

import type { ValidationErrors } from "@shared/model";

export const validatePollutant = (form: PollutantCreateForm | PollutantEditForm): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!form.nameKr.trim()) {
    errors.nameKr = "측정물질(한글명)은 필수 입력사항입니다.";
  }

  return errors;
};