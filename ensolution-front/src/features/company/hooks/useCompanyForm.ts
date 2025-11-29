import { useState } from "react";
import type { CompanyRegisterRequest } from "@company/model";
import { registerCompany } from "@company/api/companyApi";

export const useCompanyForm = () => {
  const [form, setForm] = useState<CompanyRegisterRequest>({
    name: "",
    address: "",
    ceoName: "",
    bizNumber: "",
    remark: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await registerCompany(form);
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