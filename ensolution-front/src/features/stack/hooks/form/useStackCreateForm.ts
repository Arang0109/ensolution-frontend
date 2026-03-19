import { useState } from "react";

import { getDefaultStackCreateForm } from "@/entities/stack/model";
import type { StackCreateForm } from "@/entities/stack/model";
import { validateStack } from "@stack/lib";

import type { ValidationErrors } from "@shared/model";

export const useStackCreateForm = (workplaceId: number) => {
  const [form, setForm] = useState<StackCreateForm>(getDefaultStackCreateForm(workplaceId));
  const [errors, setErrors] = useState<ValidationErrors>({});

  const updateField = (
    name: keyof StackCreateForm,
    value: string,
  ) => {
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const validationErrors = validateStack(form);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }

  return {
    form,
    errors,
    updateField,
    validateForm,
  };
};