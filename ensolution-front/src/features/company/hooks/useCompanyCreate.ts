import { useState } from "react";

import {
  getDefaultCompanyCreateForm
} from "@company/model";
import type { CompanyCreateForm } from "@company/model";
import { validateCompany } from "@company/lib";
import type { ValidationErrors } from "@company/lib";

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