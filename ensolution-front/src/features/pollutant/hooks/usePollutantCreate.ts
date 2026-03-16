import { useState } from "react";

import { getDefaultPollutantCreateForm } from "@pollutant/model";
import type { PollutantCreateForm } from "@pollutant/model";
import { validatePollutant } from "@pollutant/lib";

import type { ValidationErrors } from "@shared/model";

export const usePollutantCreate = () => {
  const [form, setForm] = useState<PollutantCreateForm>(getDefaultPollutantCreateForm());
  const [errors, setErrors] = useState<ValidationErrors>({});

  const onChange = (
    name: keyof PollutantCreateForm,
    value: string
  ) => {
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));

    setErrors(prev => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const validate = () => {
    const validationErrors = validatePollutant(form);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;

  };

  return {
    form,
    errors,
    onChange,
    validate,
  };
}