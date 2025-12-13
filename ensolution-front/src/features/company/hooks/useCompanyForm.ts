import { useState } from "react";

import { registerCompany } from "@company/api/companyApi";

import type { CompanyRegisterRequest } from "@company/model";
import { formatBizNumber, stripBizNumber } from "@common/utils/formatters";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // 사업자번호일 때 자동 포맷팅 적용
    if (name === "bizNumber") {
      return setForm(prev => ({
        ...prev,
        bizNumber: formatBizNumber(value)
      }));
    }

    setForm(prev => ({ ...prev, [name]: value }));
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