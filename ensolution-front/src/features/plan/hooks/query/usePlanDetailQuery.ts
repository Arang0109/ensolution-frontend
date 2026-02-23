import { useState, useEffect } from "react"

import type { PlanDetailResponse } from "@plan/model"
import { fetchPlan } from "@plan/api/planApi";

export const usePlanDetailQuery = (planId: number) => {
  const [plan, setPlan] = useState<PlanDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!planId) return;

    const load = async () => {
      setIsLoading(true);
      try {
        const { status, data } = await fetchPlan(planId);
        setPlan(status ? data : null);
      } catch (error) {
        console.error(error);
        setPlan(null);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [planId]);

  return {
    plan,
    isLoading
  };
};