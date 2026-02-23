import { useState } from "react";

import { getDefaultPlanCreateForm } from "@plan/model";
import type { PlanCreateForm } from "@plan/model";

import type { ValidationErrors } from "@shared/model";

export const usePlanCreateForm = () => {
  const [form, setForm] = useState<PlanCreateForm>(getDefaultPlanCreateForm());
  const [errors, setErrors] = useState<ValidationErrors>({});

  const updateField = (
    name: keyof PlanCreateForm,
    value: string | number | null,
  ) => {
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));

    setErrors(prev => ({
      ...prev,
      [name]: "",
    }));
  };

  const setMeasurementIds = (ids: number[]) => {
    setForm(prev => ({
      ...prev,
      measurementIds: ids,
    }));
  };


  const resetForm = () => {
    setForm(getDefaultPlanCreateForm());
    setErrors({});
  }

  const validateForm = () => {
    const validationErrors: ValidationErrors = {};
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }

  return {
    form,
    errors,
    updateField,
    setMeasurementIds,
    resetForm,
    validateForm,
  };
}