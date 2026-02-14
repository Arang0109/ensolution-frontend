import { useState, useEffect, useCallback } from "react";

import { getPollutants } from "@pollutant/api/pollutantApi";

import type { PollutantResponse } from "@pollutant/model";

export const usePollutants = () => {
  const [pollutants, setPollutants] = useState<PollutantResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPollutants = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getPollutants();

      if (!res.status || !res.data) {
        setPollutants([]);
        return;
      }
      
      setPollutants(res.data);
    } catch (error) {
      console.error(error);
      setError('측정물질 목록을 불러오지 못했습니다.');
      setPollutants([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPollutants();
  }, [fetchPollutants])

  return {
    pollutants,
    loading,
    error,
    reload: fetchPollutants,
  };
};
