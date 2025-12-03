import { useState, useEffect } from "react";
import type { TeamResponse } from "@agency/model/agency.types";
import { getTeams } from "@agency/api/AgencyApi";

export const useTeams = () => {
  const [teams, setTeams] = useState<TeamResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getTeams();
      setTeams(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "팀 목록을 불러오는데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return { teams, loading, error, refetch: fetchTeams };
};
