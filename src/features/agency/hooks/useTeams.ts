import { useState, useEffect, useCallback } from "react";

import { useToast } from "@app/providers/toast";
import { getTeams } from "@entities/agency/team/api/AgencyApi";

import type { TeamResponse } from "@entities/agency/team/model";

export const useTeams = () => {
  const [teams, setTeams] = useState<TeamResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const fetchTeams = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getTeams();
      setTeams(res.status && res.data ? res.data : []);
    } catch (error) {
      console.error(error);
      showToast('팀 목록을 불러오지 못했습니다.', 'error');
      setTeams([]);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  return {
    teams,
    loading,
    refetch: fetchTeams
  }
}