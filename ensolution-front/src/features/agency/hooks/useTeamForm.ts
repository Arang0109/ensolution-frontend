import { useState } from "react";
import type { TeamRegisterRequest, TeamUpdateRequest } from "@agency/model/agency.types";
import { registerTeam, patchTeam } from "@agency/api/AgencyApi";

export const useTeamForm = (teamId?: number) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (data: TeamRegisterRequest) => {
    try {
      setLoading(true);
      setError(null);
      const response = await registerTeam(data);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "팀 등록에 실패했습니다.");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data: TeamUpdateRequest) => {
    if (!teamId) throw new Error("Team ID is required for update");

    try {
      setLoading(true);
      setError(null);
      const response = await patchTeam(teamId, data);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "팀 수정에 실패했습니다.");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, handleUpdate, loading, error };
};
