import { useState } from "react";

import { registerCompany } from "@company/api/companyApi";

import {
  getDefaultCompanyForm,
  mapCreateFormToRequest
} from "@company/model";

import type {
  CompanyCreateForm
} from "@company/model";

import { validateCompany } from "@company/lib";

import { formatBizNumber } from "@shared/lib";

export const useCompanyCreateForm = () => {
  const [form, setForm] = useState<CompanyCreateForm>(getDefaultCompanyForm());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (
    name: keyof CompanyCreateForm,
    value: string
  ) => {
    setForm(prev => ({
      ...prev,
      [name]:
        name === "bizNumber"
          ? formatBizNumber(value)
          : value,
    }));

    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const onSubmit = async () => {
    const validationErrors = validateCompany(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = mapCreateFormToRequest(form);
      const res = await registerCompany(payload);
      return { success: res.status, message: res.message };
    } catch {
      return { success: false, message: "등록 중 오류가 발생했습니다." };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    errors,
    isSubmitting,
    onChange,
    onSubmit,
  };
};