import { useState, useEffect } from "react";
import type { PlanDetailResponse } from "@plan/model";
import { getPlan } from "@plan/api/planApi";

export const usePlanDetail = (planId: number) => {
  const [planDetail, setPlanDetail] = useState<PlanDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlan = async () => {
      setLoading(true);
      try {
        const res = await getPlan(planId);
        if (res.status && res.data) {
          setPlanDetail(res.data);
        } else {
          setPlanDetail(null);
        }
      } catch (error) {
        console.error("Failed to load plan:", error);
        setPlanDetail(null);
      } finally {
        setLoading(false);
      }
    };

    if (planId) {
      fetchPlan();
    }
  }, [planId]);

  return { planDetail, loading };
};
