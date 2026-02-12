import { useState } from "react";
import { useToast } from "@app/providers/toast";

import type { Grade, Orientation, Shape } from "@shared/model";
import type { StackRegisterRequest } from "@stack/model";
import { registerStack } from "@stack/api/stackApi";

export const useStackForm = (workplaceId: number) => {
  const { showToast } = useToast();
  const [form, setForm] = useState<StackRegisterRequest>({
    workplaceId,
    name: "",
    semsNumber: "",
    grade: "" as Grade,
    height: "",
    horizontalLength: "",
    verticalLength: "",
    shape: "" as Shape,
    orientation: "" as Orientation,
    remark: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (
    name: keyof StackRegisterRequest,
    value: string,
  ) => {
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...form,
      grade: form.grade || null,
      shape: form.shape || null,
      orientation: form.orientation || null,
    };

    try {
      const res = await registerStack(payload);
      showToast('측정시설이 등록되었습니다.','success');
      return { success: res.status, message: res.message };
    } catch {
      showToast('측정시설 등록 중 오류가 발생했습니다.','error');
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