import { useState } from "react";

import type { Grade } from "@/shared/model";
import type { WorkplaceRegisterRequest } from "@workplace/model";
import { registerWorkplace } from "@workplace/api/workplaceApi";
import { formatBizNumber, stripBizNumber } from "@shared/lib";

export const useWorkplaceForm = (companyId: number) => {
  const [form, setForm] = useState<WorkplaceRegisterRequest>({
    companyId,
    name: "",
    address: "",
    bizNumber: "",
    businessCategory: "",
    grade: "" as Grade,
    remark: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (
    name: keyof WorkplaceRegisterRequest,
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
      const res = await registerWorkplace(payload);
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