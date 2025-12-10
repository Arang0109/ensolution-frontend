import { useState } from "react";
import { registerSchedule } from "@schedule/api/scheduleApi";
import type { ScheduleRegisterRequest } from "@schedule/model";

export const useScheduleForm = () => {
  const [form, setForm] = useState<ScheduleRegisterRequest>({
    stackId: 0,
    teamId: 0,
    measureDate: new Date(),
    measurementType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "measureDate") {
      setForm(prev => ({ ...prev, [name]: new Date(value) }));
    } else if (name === "stackId" || name === "teamId") {
      setForm(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.stackId || !form.teamId || !form.measurementType) {
      return { success: false, message: "모든 필수 항목을 입력해주세요." };
    }

    setIsSubmitting(true);
    try {
      const res = await registerSchedule(form);
      setForm({
        stackId: 0,
        teamId: 0,
        measureDate: new Date(),
        measurementType: "",
      });
      return { success: res.status, message: res.message };
    } catch (error) {
      return { success: false, message: "등록 중 오류가 발생했습니다." };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    setForm,
    isSubmitting,
    onChange,
    onSubmit,
  };
};
