import { useState } from "react";
import type { Grade, Orientation, Shape } from "@common/model";
import type { StackRegisterRequest } from "@stack/model";
import { registerStack } from "@stack/api/stackApi";

export const useStackForm = () => {
  const [form, setForm] = useState<StackRegisterRequest>({
    name: "",
    workplaceId: 0,
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await registerStack(form);
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