import { useState } from "react";
import { useToast } from "@app/providers/toast";

import type { Phase } from "@shared/model";

import { registerPollutant } from "@pollutant/api/pollutantApi";
import type { PollutantRegisterRequest } from "@pollutant/model";

export const usePollutantForm = () => {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<PollutantRegisterRequest>({
    nameKr: "",
    nameEn: "",
    method: "",
    phase: "" as Phase,
    equipmentName: "",
    testMethodName: "",
    samplingTime: "",
    samplingVolume: "",
  });

  const onChange = (
    name: keyof PollutantRegisterRequest,
    value: string,
    type?: "number" | "text"
  ) => {
    setForm(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await registerPollutant(form);
      showToast("측정물질이 등록되었습니다.", "success")
      return { success: res.status, message: res.message };
    } catch {
      showToast('측정물질 등록 중 오류가 발생했습니다.','error');
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
}