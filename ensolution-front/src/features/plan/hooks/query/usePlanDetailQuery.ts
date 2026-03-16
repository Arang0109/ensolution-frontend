import { useState, useEffect } from "react"

import type { PlanDetailResponse } from "@plan/model"
import { fetchPlan } from "@plan/api/planApi";

export const usePlanDetailQuery = (planId: number) => {
  const [plan, setPlan] = useState<PlanDetailResponse | undefined>();
  const [isLoading, setIsLoading] = useState(false);;

  useEffect(() => {
    if (!planId) return;

    const load = async () => {
      setIsLoading(true);
      try {
        const { data } = await fetchPlan(planId);
        setPlan(data);
      } catch (error) {
        console.error(error);
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