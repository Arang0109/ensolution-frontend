import { useState, useEffect, useCallback } from "react";

import type { PlanTableResponse } from "@plan/model";
import { getPlans } from "@plan/api/planApi";

export const usePlans = () => {
  const [plans, setPlans] = useState<PlanTableResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getPlans();
      if (res.status && res.data) {
        setPlans(res.data);
      } else {
        setPlans([]);
      }
    } catch (error) {
      console.error("Failed to load plans:", error);
      setError('측정계획 목록을 불러오지 못했습니다.');
      setPlans([]);
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return {
    plans,
    error,
    loading,
    reload: fetchPlans,
  };
};
