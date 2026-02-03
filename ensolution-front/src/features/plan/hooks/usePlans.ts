import { useState, useEffect } from "react";

import type { PlanTableView } from "@plan/model";
import { getPlans } from "@plan/api/planApi";

export const usePlans = () => {
  const [plans, setPlans] = useState<PlanTableView[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPlans = async () => {
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
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return {
    plans,
    loading,
    refetch: fetchPlans,
  };
};
