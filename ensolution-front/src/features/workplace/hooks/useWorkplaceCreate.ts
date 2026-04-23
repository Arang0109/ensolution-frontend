import { useState } from "react";

import { getDefaultWorkplaceCreateForm } from "@entities/workplace/model";
import type { WorkplaceCreateForm } from "@entities/workplace/model";
import { validateWorkplace } from "@/features/workplace/lib";

import type { ValidationErrors } from "@shared/model";
import { formatBizNumber } from "@shared/lib";


export const useWorkplaceCreate = (companyId: number) => {
  const [form, setForm] = useState(getDefaultWorkplaceCreateForm(companyId));
  const [errors, setErrors] = useState<ValidationErrors>({});

  const onChange = (
    name: keyof WorkplaceCreateForm,
    value: string
  ) => {
    setForm(prev => ({
      ...prev,
      [name]:
        name === "bizNumber"
          ? formatBizNumber(value)
          : value,
    }));
  };

  const validate = () => {
    const validationErrors = validateWorkplace(form);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return {
    form,
    errors,
    onChange,
    validate,
  };
};