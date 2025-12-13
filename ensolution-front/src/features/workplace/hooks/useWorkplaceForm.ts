import { useState } from "react";

import type { Grade } from "@common/model";
import type { WorkplaceRegisterRequest } from "@workplace/model";
import { registerWorkplace } from "@workplace/api/workplaceApi";

export const useWorkplaceForm = () => {
  const [form, setForm] = useState<WorkplaceRegisterRequest>({
    name: "",
    companyId: 0,
    address: "",
    bizNumber: "",
    businessCategory: "",
    grade: "" as Grade,
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
      const res = await registerWorkplace(form);
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