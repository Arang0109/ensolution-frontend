import { useCallback, useState } from "react"
import type { PlanDetailResponse } from "@plan/model"
import { getPlan } from "@plan/api/planApi";

export const usePlanDetail = () => {
  const [plan, setPlan] = useState<PlanDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPlan = useCallback(async (planId: number) => {
    setLoading(true);
    try {
      const { status, data } = await getPlan(planId);
      setPlan(status? data : null);
    } catch (error) {
      console.log(error);
      setPlan(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { plan, fetchPlan, loading }
}