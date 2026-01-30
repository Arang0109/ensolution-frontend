import { useState } from "react";

import { registerTeam } from "@agency/api/AgencyApi";

import type { TeamRegisterRequest } from "@agency/model";

const getDefaultForm = (): TeamRegisterRequest => ({
  name: "",
  particleSamplerId: "",
  gasSamplerId: "",
  pitotTubeId: "",
  nozzleId: "",
});

export const useTeamForm = () => {
  const [form, setForm] = useState<TeamRegisterRequest>(getDefaultForm());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await registerTeam(form);
      return { success: res.status, message: res.message };
    } catch {
      return { success: false, message: "등록 중 오류가 발생했습니다." };
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm(getDefaultForm());
  };

  return {
    form,
    isSubmitting,
    onChange,
    onSubmit,
    resetForm,
  };
};
