import { useState, useEffect } from "react";

import { patchTeam } from "@agency/api/AgencyApi";

import type { TeamResponse, TeamUpdateRequest } from "@agency/model";

export const useTeamEditForm = (team: TeamResponse | null) => {
  const [form, setForm] = useState<TeamUpdateRequest | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (team) {
      setForm({
        name: team.name,
        vehicleNumber: team.vehicleNumber,
        particleSamplerId: team.particleSamplerId,
        gasSamplerId: team.gasSamplerId,
        pitotTubeId: team.pitotTubeId,
        nozzleId: team.nozzleId,
      });
    } else {
      setForm(null);
    }
  }, [team]);

  const onChange = (
    name: keyof TeamUpdateRequest,
    value: string
  ) => {
    setForm(prev => prev ? { ...prev, [name]: value } : null);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!team || !form) return { success: false, message: "팀 정보가 없습니다." };

    setIsSubmitting(true);

    try {
      const res = await patchTeam(team.id, form);
      return { success: res.status, message: res.message };
    } catch {
      return { success: false, message: "수정 중 오류가 발생했습니다." };
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
