import { useState } from "react";

import { registerCompany } from "@company/api/companyApi";

import type { CompanyRegisterRequest } from "@company/model";
import { formatBizNumber, stripBizNumber } from "@shared/lib";

export const useCompanyForm = () => {
  const [form, setForm] = useState<CompanyRegisterRequest>({
    name: "",
    address: "",
    ceoName: "",
    bizNumber: "",
    remark: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (
    name: keyof CompanyRegisterRequest,
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...form,
      bizNumber: stripBizNumber(form.bizNumber),
    };

    try {
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
    isSubmitting,
    onChange,
    onSubmit,
  };
};