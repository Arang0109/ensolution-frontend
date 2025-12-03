import { useState, useEffect } from "react";
import type { TeamDetailResponse } from "@agency/model/agency.types";
import { getTeam } from "@agency/api/AgencyApi";

export const useTeamDetail = (teamId: number) => {
  const [data, setData] = useState<TeamDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeamDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getTeam(teamId);
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "팀 상세 정보를 불러오는데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamDetail();
  }, [teamId]);

  return {
    team: data?.team,
    users: data?.users || [],
    vehicles: data?.vehicles || [],
    loading,
    error,
    refetch: fetchTeamDetail
  };
};
