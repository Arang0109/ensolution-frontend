import { useState } from "react";

import { getDefaultStackCreateForm } from "@stack/model";
import type { StackCreateForm } from "@stack/model";
import { validateStack } from "@stack/lib";

import type { ValidationErrors } from "@shared/model";

export const useStackCreate = (workplaceId: number) => {
  const [form, setForm] = useState<StackCreateForm>(getDefaultStackCreateForm(workplaceId));
  const [errors, setErrors] = useState<ValidationErrors>({});

  const onChange = (
    name: keyof StackCreateForm,
    value: string,
  ) => {
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const validattionErrors = validateStack(form);
    setErrors(validattionErrors);
    return Object.keys(validattionErrors).length === 0;
  }

  return {
    form,
    errors,
    onChange,
    validate,
  };
};