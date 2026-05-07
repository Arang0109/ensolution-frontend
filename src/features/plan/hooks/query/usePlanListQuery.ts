import { useState, useEffect, useCallback } from "react";

import type { PlanTableResponse } from "@/entities/plan/model";
import { fetchPlans } from "@/entities/plan/api/planApi";

export const usePlanListQuery = () => {
  const [plans, setPlans] = useState<PlanTableResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetchPlans = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetchPlans();
      if (res.status && res.data) {
        setPlans(res.data);
      } else {
        setPlans([]);
      }
    } catch (error) {
      console.error(error);
      setError('측정계획 목록을 불러오지 못했습니다.');
      setPlans([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetchPlans();
  }, [refetchPlans]);

  return {
    plans,
    error,
    isLoading,
    reload: refetchPlans,
  };
};
