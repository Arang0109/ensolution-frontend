import { useState } from "react";

import { getDefaultPlanCreateForm } from "@plan/model";
import type { PlanCreateForm } from "@plan/model";

import type { ValidationErrors } from "@shared/model";

export const usePlanCreate = () => {
  const [form, setForm] = useState<PlanCreateForm>(getDefaultPlanCreateForm());
  const [errors, setErrors] = useState<ValidationErrors>({});

  const onChange = (
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

  const onMeasurementIdsChange = (ids: number[]) => {
    setForm(prev => ({
      ...prev,
      measurementIds: ids,
    }));
  };


  const reset = () => {
    setForm(getDefaultPlanCreateForm());
    setErrors({});
  }

  const validate = () => {
    const validationErrors: ValidationErrors = {};
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }

  return {
    form,
    errors,
    onChange,
    onMeasurementIdsChange,
    reset,
    validate,
  };
}