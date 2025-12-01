import { useState, useEffect } from "react";
import type { PollutantResponse } from "@pollutant/model/pollutant.types";
import { getPollutants } from "@pollutant/api/pollutantApi";

export const usePollutants = () => {
  const [pollutants, setPollutants] = useState<PollutantResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPollutants = async () => {
    setLoading(true);
    try {
      const res = await getPollutants();
      if (res.status && res.data) {
        setPollutants(res.data);
      } else {
        setPollutants([]);
      }
    } catch (error) {
      console.error("Failed to load pollutants:", error);
      setPollutants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPollutants();
  }, []);

  return {
    pollutants,
    loading,
    refetch: fetchPollutants,
  };
};
