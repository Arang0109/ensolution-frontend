import { useState } from "react";

import {
  getDefaultCompanyCreateForm
} from "@entities/company/model";
import type { CompanyCreateForm } from "@entities/company/model";
import { validateCompany } from "@/features/company/lib";

import type { ValidationErrors } from "@shared/model";
import { formatBizNumber } from "@/shared/lib";

export const useCompanyCreate = () => {
  const [form, setForm] = useState(getDefaultCompanyCreateForm());
  const [errors, setErrors] = useState<ValidationErrors>({});

  const onChange = (name: keyof CompanyCreateForm, value: string) => {
    setForm(prev => ({
      ...prev,
      [name]: name === "bizNumber" ? formatBizNumber(value) : value,
    }));

    setErrors(prev => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const validate = () => {
    const validationErrors = validateCompany(form);
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