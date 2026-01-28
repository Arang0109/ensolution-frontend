import { useState, useEffect, useCallback } from "react";

import { useToast } from "@common/hooks";
import { getTeams } from "@agency/api/AgencyApi";

import type { TeamResponse } from "@agency/model";

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